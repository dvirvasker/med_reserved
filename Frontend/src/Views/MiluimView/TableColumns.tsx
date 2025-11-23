import { System, iCustomTableColumn, iStringTableColumn, iDateTableColumn, iMetaTableColumn, reservevisits, ColumnsType, tipultype } from "../../interfaces";
import { spaceSeperator } from "../../hooks/useTanstackTable";
import { Typography } from "@mui/material";

const COLUMNS: ColumnsType<reservevisits>[] = [
    {
        accessorKey: "name",
        header: "שם",
        type: "String",
        id: "name"
    } as iStringTableColumn<reservevisits>,
    {
        accessorKey: "family",
        header: "שם משפחה",
        id: "family",
        type: "String",
    } as iStringTableColumn<reservevisits>,
    {
        accessorKey: "civilian_number",
        header: "תעודת זהות",
        id: "civilian_number",
        type: "String",
    } as iStringTableColumn<reservevisits>,
    {
        accessorKey: "personal_number",
        header: "מספר אישי",
        id: "personal_number",
        type: "String",
    } as iStringTableColumn<reservevisits>,
    {
        accessorKey: "present",
        header: "התייצב",
        id: "present",
        type: "String",
    },
    {
        accessorKey: "todayPresent",
        header: "התייצב היום",
        id: "todayPresent",
        type: "String",
    } as iStringTableColumn<reservevisits>,
    {
        accessorKey: "dailSent",
        header: "נשלח חייגן",
        id: "dailSent",
        type: "String",
    } as iStringTableColumn<reservevisits>,
    {
        accessorKey: "shamapOpen",
        header: "נפתח שמ``פ",
        id: "shamapOpen",
        type: "String",
    } as iStringTableColumn<reservevisits>,
    {
        accessorKey: "subject",
        header: "מקצוע",
        id: "subject",
        type: "String",
    } as iStringTableColumn<reservevisits>,
    {
        accessorKey: "job",
        header: "תפקיד",
        id: "job",
        type: "String",
    } as iStringTableColumn<reservevisits>,
    {
        accessorKey: "unit",
        header: "יחידה",
        id: "unit",
        type: "String",
    } as iStringTableColumn<reservevisits>,
    {
        accessorKey: "ta",
        header: "תא",
        id: "ta",
        type: "String",
    } as iStringTableColumn<reservevisits>,
    {
        accessorKey: "details",
        header: "הערות",
        id: "details",
        type: "String",
    } as iStringTableColumn<reservevisits>,
    {
        accessorKey: "update",
        header: "עדכן",
        id: "update",
        type: "String",
    } as iStringTableColumn<reservevisits>,
    {
        accessorKey: "delete",
        header: "מחק",
        id: "delete",
        type: "String",
    } as iStringTableColumn<reservevisits>,
    // {
    //     accessorKey: "status",
    //     header: "סטטוס הכלי",
    //     type: "String",
    //     id: "status"
    // } as iStringTableColumn<reservevisits>,
    // {
    //     accessorKey: "zminot",
    //     header: "זמינות",
    //     type: "String",
    //     id: "zminot"
    // } as iStringTableColumn<reservevisits>,
    // {
    //     accessorKey: "kshirot",
    //     header: "כשירות למלחמה",
    //     type: "String",
    //     id: "kshirot"
    // } as iStringTableColumn<reservevisits>,
    // // needs to be a function
    // {
    //     accessorKey: "daysOff",
    //     header: "ימי שהייה",
    //     type: "String",
    //     id: "daysOff"
    // } as iStringTableColumn<reservevisits>,
    // {
    //     accessorKey: "mikum",
    //     header: "מיקום",
    //     type: "String",
    //     id: "mikum"
    // } as iStringTableColumn<reservevisits>,
    // {
    //     accessorKey: "lastCalibrationDate",
    //     header: "מועד כיול אחרון",
    //     type: "String",
    //     id: "lastCalibrationDate"
    // },
    // {
    //     accessorKey: "tags",
    //     id: "tags",
    //     header: "קבוצות",
    //     type: "Custom",
    //     parser: (objects: string[] | undefined) => objects?.filter(Boolean) ?? [],
    //     cell: (items: string[] | undefined) => items?.map(item => <Typography>{item}</Typography>),
    //     filterFn: (cellValue: string[], valueFromFilter: string[]) => {
    //         return valueFromFilter.some(filterValue => cellValue.some(itemInCell => filterValue === itemInCell));
    //     },
    //     sortFn: (items: string[]) => items.length
    // } as iCustomTableColumn<reservevisits>,
    // {
    //     accessorKey: "tipuls",
    //     id: "tipuls",
    //     header: "סיבות אי זמינות",
    //     type: "Custom",
    //     parser: (objects: tipultype[]) => objects.map(object => object.tipul_key).filter(Boolean),
    //     cell: (items: string[]) => items?.map(item => <Typography>{item}</Typography>),
    //     filterFn: (cellValue: string[], valueFromFilter: string[]) => {
    //         return valueFromFilter.some(filterValue => cellValue.some(itemInCell => filterValue === itemInCell));
    //     },
    //     sortFn: (items: string[]) => items.length


    // } as iCustomTableColumn<reservevisits>,
    // {
    //     accessorKey: "updatedAt",
    //     header: "תאריך עדכון אחרון",
    //     type: "Date",
    //     id: "updatedAt"
    // } as iDateTableColumn<reservevisits>,
    // {
    //     accessorKey: "systems",
    //     id: "systems",
    //     header: "מערכות על גבי פלטפורמה",
    //     type: "Custom",
    //     parser: (objects: System[]) => objects.map(object => {
    //         if (!object.name)
    //             return null;

    //         const name = object.name;
    //         const kashir = object.kashir ? "כשיר" : "לא כשיר"
    //         return `${name}${spaceSeperator}${kashir}`
    //     }).filter(Boolean),
    //     cell: (items: string[]) => items.map(item => {
    //         const [name, kshirot] = item.split(spaceSeperator);
    //         if (!(name && kshirot)) {
    //             return null;
    //         }
    //         return (
    //             <Typography>
    //                 {name} {" "}
    //                 <span style={{ color: kshirot === "כשיר" ? "green" : "red" }}>({kshirot})</span>
    //             </Typography>
    //         )
    //     }).filter(Boolean),
    //     filterFn: (cellValue: string[], valueFromFilter: string) => {
    //         // currently we only filter by if system exists or not
    //         return cellValue && cellValue.length > 0;
    //     },
    //     sortFn: (items: string[]) => items.length
    // } as iCustomTableColumn<reservevisits>,
    // // a field to contain all hh_stands in system
    // {
    //     id: "hh_stands",
    //     type: "Meta",
    //     accessorFn: row => {
    //         const hasHHStands = row.tipuls?.some(tipul => tipul.hh_stands);
    //         return hasHHStands ? "עומד על חח" : null;
    //     },
    //     filterFn: (cellValue: string, valueFromFilter: string) => {
    //         return cellValue === "עומד על חח";
    //     }

    // } as iMetaTableColumn<reservevisits>
];


export default COLUMNS;