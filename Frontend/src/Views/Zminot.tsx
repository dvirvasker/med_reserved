import { Box, Typography } from "@mui/material";
import Card from "../Components/Card";
import { ColumnsType, System, cardatasType, iFilter, iMultiSelectFilter, iToggleFilter } from "../interfaces";
import useCache from "../hooks/useCache";
import { useMemo } from "preact/hooks";
import createTanstackTable, { onTableMultiSelectFilterChange, onTableToggleFilterChange } from "../assets/Functions/tableHandlers";
import DataGridTable from "../Components/DataGridTable";
import { gdodValues, generateRandomCardatasList, hativaValues, kshirotOptions, magadValues, magadalValues, makatValues, mkabazValues, ogdaValues, pikodValues, zminotOptions } from "../assets/Functions/mock/mockCardatas";
import { DataGridNavbar } from "../Components/Navbar";


const ZminotView = () => {
    const visibleColumnsKey = "zminot_table_visible_columns";
    const visibleColumnCache = useCache(visibleColumnsKey, () => ({}));
    const tableColumns: ColumnsType<cardatasType>[] = useMemo(() => [
        {
            accessorKey: "carnumber",
            header: "צ'",
            id: "carnumber"
        },
        {
            accessorKey: "makat",
            header: "מקט",
            id: "makat"
        },
        {
            accessorKey: "status",
            header: "סטטוס",
            id: "status"
        },
        {
            accessorKey: "zminot",
            header: "זמינות",
            id: "zminot"
        },
        {
            accessorKey: "kshirot",
            header: "כשירות",
            id: "kshirot"
        },
        {
            accessorKey: "mikum",
            header: "מיקום",
            id: "mikum"
        },
        {
            accessorKey: "magadalName",
            header: "שם מאגד על",
            id: "magadalName"
        },
        {
            accessorKey: "magadName",
            header: "שם מאגד",
            id: "magadName"
        },
        {
            accessorKey: "mkabazName",
            header: "שם מקבץ",
            id: "mkabazName"
        },
        {
            accessorKey: "makatName",
            header: "תיאור מקט",
            id: "makatName"
        },
        {
            accessorKey: "pikodName",
            header: "שם פיקוד",
            id: "pikodName"
        },
        {
            accessorKey: "ogdaName",
            header: "שם אוגדה",
            id: "ogdaName"
        },
        {
            accessorKey: "hativaName",
            header: "שם חטיבה",
            id: "hativaName"
        },
        {
            accessorKey: "gdodName",
            header: "תיאור גדוד",
            id: "gdodName"
        },
        {
            accessorKey: "gdod",
            header: "גדוד",
            id: "gdod"
        },
        {
            accessorKey: "createdAt",
            header: "נוצר בתאריך",
            type: "Date",
            id: "createdAt"
        },
        {
            accessorKey: "updatedAt",
            header: "עודכן בתאריך",
            type: "Date",
            id: "updatedAt" 
        },
        {
            accessorKey: "updatedBy",
            id: "updatedBy",
            header: "עודכן על ידי"
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
            onClick: (newFilterState => onTableToggleFilterChange({id: "zminot", value: newFilterState}, table)),
            width: 4,
            
        } as iToggleFilter,
        {
            title: "כשירות",
            id: "kshirot",
            type: "TOGGLE",
            options: kshirotOptions,
            onClick: (newFilterState => onTableToggleFilterChange({id: "kshirot", value: newFilterState}, table)),
            width: 4,
        },
        {
            title: "מערכות",
            id: "systems",
            type: "TOGGLE",
            options: [{id: "exists", value: "קיים"}],
            onClick: (newFilterState => onTableToggleFilterChange({id: "systems", value: newFilterState}, table)),
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
        <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
          <DataGridNavbar table={table} title="טבלת זמינות" cache={visibleColumnCache} filterColumns={columnsFilter}/>
            <Card>
                <DataGridTable table={table} />
            </Card>
            
        </Box>
    )

};

export default ZminotView;