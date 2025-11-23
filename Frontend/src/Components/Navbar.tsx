import { useEffect, useMemo, useState, useContext } from "preact/hooks";
import Card from "./Card"
import { Box, Breadcrumbs, Button, Divider, Link, TextField, ToggleButton, ToggleButtonGroup, Typography, styled, useTheme } from "@mui/material";
import { CacheHook, iFilter, iSelectable, iToggleFilter } from "../interfaces";
import { Table } from "@tanstack/react-table";
import Filter from "./Filter/Filter";
import useCache from "../hooks/useCache";
import useDebounce from "../hooks/useDebounce";
import { useSignal, useSignalEffect } from "@preact/signals";
import { setNewDisplayedColumns } from "../assets/Functions/tableHandlers";
import { SiteContext } from "../context/SiteContext";
import { isAuthenticated } from "../auth/index";
import axios from "axios";

const StyledCard = styled(Card)(({ theme }) => ({
    minHeight: 78,
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    marginX: theme.spacing(4)
}));

export const Header = ({ setSearch }: { depth?: iSelectable[], setSearch: (value: string) => void }) => {
    const ctx = useContext(SiteContext);
    const theme = useTheme();
    const alignment = useMemo(() => ctx.isInDarkMode ? "kshirot" : "zminot", [ctx.isInDarkMode]);
    const [immediate, debounced, setImmediate] = useDebounce("", 200);
    const [typeUser, setTypeUser] = useState("");
    const { user } = isAuthenticated();

    let typeUserNmae: string = "";

    const getUnit = async () => {
        if (user.role === "0") {
            typeUserNmae = "מנהל מערכת";
        } else if (user.role === "1") {
            await axios
                .get(`http://localhost:8000/api/units/${user.unit}`)
                .then((response) => {
                    console.log(response.data);
                    typeUserNmae = response.data[0].name;
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (user.role === "2") {
            await axios
                .get(`http://localhost:8000/api/region/${user.region}`)
                .then((response) => {
                    typeUserNmae = response.data[0].name;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        setTypeUser(typeUserNmae);
    };

    useEffect(() => {
        setSearch(debounced);
    }, [debounced])

    useEffect(() => {
        getUnit();
    }, [])

    return (
        <StyledCard>
            <Breadcrumbs style={{ flexGrow: 1 }}>
                {/* {depth.slice(0, depth.length - 1).map(item => (
                    <Link key={item.id} underline="hover" color="inherit" href={item.id} variant="h6">
                        {item.value}
                    </Link>
                ))} */}
                <Typography fontWeight="bolder" color={theme => theme.palette.primary.dark} variant="h6">{typeUser}</Typography>
            </Breadcrumbs>
            <Box display="flex" gap={1} >
                {/* <TextField label="חיפוש גלובלי" size="small" value={immediate} onChange={(event: any) => setImmediate(event.target.value)} /> */}
                <ToggleButtonGroup style={{ color: theme.palette.primary.dark }} size="small" value={alignment} exclusive onChange={() => ctx.toggleDarkMode()}>
                    <ToggleButton style={{ color: theme.palette.primary.dark }} value="zminot" color="secondary">זמינות</ToggleButton>
                    <ToggleButton style={{ color: theme.palette.primary.dark }} value="kshirot">כשירות</ToggleButton>
                </ToggleButtonGroup>
            </Box>

        </StyledCard>
    )
};

export const DefaultNavbar = ({ title }: { title: string }) => {
    const [alignment, setAlignment] = useState("zminot");
    return (
        <StyledCard>
            <Typography variant="h6">{title}</Typography>
            <ToggleButtonGroup size="small" value={alignment} exclusive onChange={console.log} style={{ marginRight: "auto" }}>
                <ToggleButton value="zminot">זמינות</ToggleButton>
                <ToggleButton value="kshirot">כשירות</ToggleButton>
            </ToggleButtonGroup>
        </StyledCard>
    )
};
export const UnitTreeNavbar = ({ title, setSearch }: { title: string, setSearch: (value: string) => void }) => {
    const [alignment, setAlignment] = useState("zminot");
    const [immediate, debounced, setImmediate] = useDebounce("", 200);
    useEffect(() => {
        setSearch(debounced);
    }, [debounced])

    return (
        <StyledCard>
            <Typography style={{ flexGrow: 1 }} variant="h6">{title}</Typography>
            <Box display="flex" gap={1}>
                <TextField label="חיפוש גלובלי" size="small" value={immediate} onChange={(event: any) => setImmediate(event.target.value)} />
                <ToggleButtonGroup size="small" value={alignment} exclusive onChange={console.log} style={{ marginRight: "auto" }}>
                    <ToggleButton value="zminot">זמינות</ToggleButton>
                    <ToggleButton value="kshirot">כשירות</ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </StyledCard>
    )
};


// will include column hiding, global filtering, expand to column filter
interface iDataGridNavbar<T> {
    table: Table<T>,
    filterColumns: iFilter[],
    title: string,
    cache: CacheHook<any>

}
export const DataGridNavbar: React.FC<iDataGridNavbar<any>> = ({ table, title, cache, filterColumns }) => {
    type currentDisplayed = "" | "COLUMNS" | "FILTER_DATA";
    const currentDisplay = useSignal<currentDisplayed>("");
    const allColumns = table.getAllColumns().map(column => ({ id: column.columnDef.id, value: column.columnDef.header }));
    const visibleColumns = table.getVisibleFlatColumns().map(column => ({ id: column.columnDef.id, value: column.columnDef.header }));
    const [immediate, debounced, setImmediate] = useDebounce("", 200);
    const theme = useTheme();

    useEffect(() => {
        if (debounced)
            table.setGlobalFilter(debounced);
    }, [debounced]);

    const columnFilter: iFilter[] = [{
        title: "עמודות מוצגות",
        id: "visibleColumns",
        options: allColumns,
        type: "TOGGLE",
        selectAll: true,
        flexDirection: "row",
        defaultValues: visibleColumns,
        onClick: (filter) => setNewDisplayedColumns(filter, table, cache)
    } as iToggleFilter
    ];

    return (
        <StyledCard style={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center" }}>
            <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                <Typography>{title}</Typography>
                <Box display="flex" gap={1}>
                    <Button
                        style={{ color: theme.palette.primary.dark, borderBlockColor: theme.palette.primary.dark, borderInlineColor: theme.palette.primary.dark }}
                        variant={currentDisplay.value === "COLUMNS" ? "contained" : "outlined"}
                        onClick={() => currentDisplay.value = currentDisplay.value === "COLUMNS" ? "" : "COLUMNS"}
                    >
                        עמודות
                    </Button>
                    <Button
                        style={{ color: theme.palette.primary.dark, borderBlockColor: theme.palette.primary.dark, borderInlineColor: theme.palette.primary.dark }}
                        variant={currentDisplay.value === "FILTER_DATA" ? "contained" : "outlined"}
                        onClick={() => currentDisplay.value = currentDisplay.value === "FILTER_DATA" ? "" : "FILTER_DATA"}
                    >
                        סינון
                    </Button>
                    <TextField label="חיפוש גלובלי" size="small" value={immediate} onChange={(event: any) => setImmediate(event.target.value)} />
                </Box>
            </Box>
            <Divider />
            <Box width="100%" display={currentDisplay.value === "COLUMNS" ? "block" : "none"}>
                <Divider sx={{ marginY: 2 }} />
                <Filter filterFields={columnFilter} />
            </Box>
            <Box width="100%" display={currentDisplay.value === "FILTER_DATA" ? "block" : "none"}>
                <Divider sx={{ marginY: 2 }} />
                <Filter filterFields={filterColumns} />
            </Box>
        </StyledCard>
    );
};

// will include breadcrumbs to menu. the last item in depth is always current menu
export const DashboardNavbar = ({ depth, setSearch }: { depth: iSelectable[], setSearch: (value: string) => void }) => {
    const ctx = useContext(SiteContext);
    const alignment = useMemo(() => ctx.isInDarkMode ? "kshirot" : "zminot", [ctx.isInDarkMode]);
    const [immediate, debounced, setImmediate] = useDebounce("", 200);

    useEffect(() => {
        setSearch(debounced);
    }, [debounced])

    return (
        <StyledCard>
            <Breadcrumbs style={{ flexGrow: 1 }}>
                {depth.slice(0, depth.length - 1).map(item => (
                    <Link key={item.id} underline="hover" color="inherit" href={item.id} variant="h6">
                        {item.value}
                    </Link>
                ))}
                <Typography fontWeight="bolder" color={theme => theme.palette.text.primary} variant="h6">{depth[depth.length - 1].value}</Typography>
            </Breadcrumbs>
            <Box display="flex" gap={1} >
                <TextField label="חיפוש גלובלי" size="small" value={immediate} onChange={(event: any) => setImmediate(event.target.value)} />
                {/* <ToggleButtonGroup size="small" value={alignment} exclusive onChange={() => ctx.toggleDarkMode()}>
                    <ToggleButton value="zminot" color="secondary">זמינות</ToggleButton>
                    <ToggleButton value="kshirot">כשירות</ToggleButton>
                </ToggleButtonGroup> */}
            </Box>

        </StyledCard>
    )
};


