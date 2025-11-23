import { Box, Typography } from "@mui/material";
import Card from "../Components/Card";
import { ColumnsType, System, cardatasType, iFilter, iMultiSelectFilter, iToggleFilter } from "../interfaces";
import useCache from "../hooks/useCache";
import { useMemo } from "preact/hooks";
import createTanstackTable, { onTableMultiSelectFilterChange, onTableToggleFilterChange } from "../assets/Functions/tableHandlers";
import DataGridTable from "../Components/DataGridTable";
import { gdodValues, generateRandomCardatasList, hativaValues, kshirotOptions, magadValues, magadalValues, makatValues, mkabazValues, ogdaValues, pikodValues, zminotOptions } from "../assets/Functions/mock/mockMiluimPage";
import { DataGridNavbar } from "../Components/Navbar";
import { DataGridFooter } from "../Components/Footer";


const MiluimPageView = () => {
    const visibleColumnsKey = "zminot_table_visible_columns";
    const visibleColumnCache = useCache(visibleColumnsKey, () => ({}));
    const tableColumns: ColumnsType<cardatasType>[] = useMemo(() => [
        {
            accessorKey: "name",
            header: "שם",
            id: "name"
        },
        {
            accessorKey: "family",
            header: "שם משפחה",
            id: "family"
        },
        {
            accessorKey: "civilian_number",
            header: "תעודת זהות",
            id: "civilian_number"
        },
        {
            accessorKey: "personal_number",
            header: "מספר אישי",
            id: "personal_number"
        },
        {
            accessorKey: "present",
            header: "התייצב",
            id: "present"
        },
        {
            accessorKey: "todayPresent",
            header: "התייצב היום",
            id: "todayPresent"
        },
        {
            accessorKey: "dailSent",
            header: "נשלח חייגן",
            id: "dailSent"
        },
        {
            accessorKey: "shamapOpen",
            header: "נפתח שמ``פ",
            id: "shamapOpen"
        },
        {
            accessorKey: "subject",
            header: "מקצוע",
            id: "subject"
        },
        {
            accessorKey: "job",
            header: "תפקיד",
            id: "job"
        },
        {
            accessorKey: "unit",
            header: "יחידה",
            id: "unit"
        },
        {
            accessorKey: "ta",
            header: "תא",
            id: "ta"
        },
        {
            accessorKey: "details",
            header: "הערות",
            id: "details"
        },
        {
            accessorKey: "gdodName",
            header: "תיאור גדוד",
            id: "gdodName"
        },
        {
            accessorKey: "update",
            header: "עדכן",
            id: "update"
        },
        {
            accessorKey: "delete",
            header: "מחק",
            // type: "Date",
            id: "delete"
        },
        // {
        //     accessorKey: "systems",
        //     id: "systems",
        //     header: "מערכות",
        //     type: "custom",
        //     parser: (objects: System[]) => objects.map(object => {
        //         const name = object.name ?? "שם לא ידוע";
        //         const kashir = object.kashir ? "כשיר" : "לא כשיר"
        //         return `${name} ${kashir}`
        //     }),
        //     cellRenderer: (items: string[]) => items.map(item => {
        //         const [name, kshirot] = item.split(" ");
        //         return (
        //             <Typography>
        //                 {name} {" "}
        //                 <span>({kshirot})</span>
        //             </Typography>
        //         )
        //     }),
        //     filterFn: (cellValue: string, valueFromFilter: any) => {
        //         // currently we only filter by if system exists or not
        //         return cellValue && cellValue.length > 0;
        //     }
        // }
    ], []);
    const data: cardatasType[] = useMemo(() => generateRandomCardatasList(30_000), []);
    const table = createTanstackTable<cardatasType>(data, tableColumns, visibleColumnCache.cacheValue);

    const columnsFilter: iFilter[] = useMemo(() => [
        {
            title: "זמינות",
            id: "zminot",
            options: zminotOptions,
            type: "TOGGLE",
            onClick: (newFilterState => onTableToggleFilterChange({ id: "zminot", value: newFilterState }, table)),
            width: 4,

        } as iToggleFilter,
        {
            title: "כשירות",
            id: "kshirot",
            type: "TOGGLE",
            options: kshirotOptions,
            onClick: (newFilterState => onTableToggleFilterChange({ id: "kshirot", value: newFilterState }, table)),
            width: 4,
        },
        {
            title: "מערכות",
            id: "systems",
            type: "TOGGLE",
            options: [{ id: "exists", value: "קיים" }],
            onClick: (newFilterState => onTableToggleFilterChange({ id: "systems", value: newFilterState }, table)),
            width: 4,
        },
        {
            title: "פיקוד",
            id: "pikodName",
            options: pikodValues,
            type: "MULTISELECT",
            onChange: (data) => onTableMultiSelectFilterChange(data, table),
            width: 3,
        } as iMultiSelectFilter,
        {
            title: "אוגדה",
            id: "ogdaName",
            options: ogdaValues,
            type: "MULTISELECT",
            dependsOn: "pikodName",
            width: 3,
            onChange: (data) => onTableMultiSelectFilterChange(data, table)
        },
        {
            title: "חטיבה",
            id: "hativaName",
            options: hativaValues,
            type: "MULTISELECT",
            enabledWhen: ["ogdaName"],
            width: 3,
            onChange: (data) => onTableMultiSelectFilterChange(data, table),
        },
        {
            title: "גדוד",
            id: "gdodName",
            options: gdodValues,
            enabledWhen: ["hativaName"],
            type: "MULTISELECT",
            width: 3,
            onChange: (data) => onTableMultiSelectFilterChange(data, table),
        },
        {
            title: "מאגד על",
            id: "magadalName",
            options: magadalValues,
            type: "MULTISELECT",
            width: 3,
            onChange: (data) => onTableMultiSelectFilterChange(data, table),
        },
        {
            title: "מאגד",
            id: "magadName",
            enabledWhen: ["magadalName"],
            options: magadValues,
            type: "MULTISELECT",
            width: 3,
            onChange: (data) => onTableMultiSelectFilterChange(data, table),
        },
        {
            title: "מקבץ",
            id: "mkabazName",
            options: mkabazValues,
            enabledWhen: ["magadName"],
            type: "MULTISELECT",
            width: 3,
            onChange: (data) => onTableMultiSelectFilterChange(data, table),
        },
        {
            title: "מקט",
            id: "makatName",
            enabledWhen: ["mkabazName"],
            options: makatValues,
            type: "MULTISELECT",
            width: 3,
            onChange: (data) => onTableMultiSelectFilterChange(data, table),
        },
    ], []);
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <DataGridNavbar table={table} title="טבלת אנשי מילואים" cache={visibleColumnCache} filterColumns={columnsFilter} />
            <Card>
                <DataGridTable table={table} />
            </Card>
            <DataGridFooter table={table} excelFileName="טבלת זמינות כלל צהלית" />
        </Box>
    )

};

export default MiluimPageView;