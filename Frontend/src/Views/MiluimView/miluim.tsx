import { Box } from "@mui/material";
import Card from "../../Components/Card";
import { ColumnsType, iFilter, cardatasType, } from "../../interfaces";
import useCache from "../../hooks/useCache";
import { useMemo } from "preact/hooks";
import useTanstackTable from "../../hooks/useTanstackTable";
import DataGridTable from "../../Components/DataGridTable";
import { DataGridNavbar } from "../../Components/Navbar";
import { generateRandomCardatasList } from "../../assets/Functions/mock/mockMiluimPage";
import COLUMNS from "./TableColumns";
import FILTERS from "./FilterColumns";
import { DataGridFooter } from "../../Components/Footer";
import { Header } from "../../Components/Navbar";

const ZminotView = () => {
    const visibleColumnsKey = "zminot_table_visible_columns";
    const visibleColumnCache = useCache(visibleColumnsKey, () => ({}));
    const tableColumns: ColumnsType<cardatasType>[] = useMemo(() => COLUMNS, []);
    const data: cardatasType[] = useMemo(() => generateRandomCardatasList(500), []);
    const table = useTanstackTable<cardatasType>(data, tableColumns, visibleColumnCache.cacheValue);

    const columnsFilter: iFilter[] = useMemo(() => FILTERS(table), []);
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
            <Header
                setSearch={value => console.log(value)}
            />
            <DataGridNavbar table={table} title="טבלת אנשי מילואים" cache={visibleColumnCache} filterColumns={columnsFilter} />
            <Card style={{ flexGrow: 0, overflowY: "auto", padding: 0 }}>
                <DataGridTable table={table} />
            </Card>
            <DataGridFooter table={table} excelFileName="טבלת אנשי מילואים" />
        </Box>
    )

};

export default ZminotView;