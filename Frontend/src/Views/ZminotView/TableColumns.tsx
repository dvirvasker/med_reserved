import { System, iCustomTableColumn, iStringTableColumn, iDateTableColumn,iMetaTableColumn, cardatasType, ColumnsType, tipultype} from "../../interfaces";
import { spaceSeperator } from "../../hooks/useTanstackTable";
import { Typography } from "@mui/material";

const COLUMNS: ColumnsType<cardatasType>[] = [
    {
        accessorKey: "carnumber",
        header: "צ'",
        type: "String",
        id: "carnumber"
    } as iStringTableColumn<cardatasType>,
    {
        accessorKey: "magadalName",
        header: "מאגד על",
        type: "String",
        id: "magadalName"
    } as iStringTableColumn<cardatasType>,
    {
        accessorKey: "magadName",
        header: "מאגד",
        type: "String",
        id: "magadName"
    } as iStringTableColumn<cardatasType>,
    {
        accessorKey: "mkabazName",
        header: "מקבץ",
        type: "String",
        id: "mkabazName"
    } as iStringTableColumn<cardatasType>,
    {
        accessorKey: "makat",
        header: "מקט",
        type: "String",
        id: "makat"
    },
    {
        accessorKey: "makatName",
        header: "תיאור מקט",
        type: "String",
        id: "makatName"
    } as iStringTableColumn<cardatasType>,
    {
        accessorKey: "family",
        header: "משפחה",
        id: "family",
        type: "String",
    } as iStringTableColumn<cardatasType>,
    {
        accessorKey: "pikodName",
        header: "פיקוד",
        type: "String",
        id: "pikodName"
    } as iStringTableColumn<cardatasType>,
    {
        accessorKey: "ogdaName",
        header: "אוגדה",
        type: "String",
        id: "ogdaName"
    } as iStringTableColumn<cardatasType>,
    {
        accessorKey: "hativaName",
        header: "חטיבה",
        type: "String",
        id: "hativaName"
    } as iStringTableColumn<cardatasType>,
    {
        accessorKey: "gdodName",
        header: "גדוד",
        type: "String",
        id: "gdodName"
    } as iStringTableColumn<cardatasType>,
    {
        accessorKey: "pluga",
        header: "פלוגה",
        type: "String",
        id: "pluga"
    } as iStringTableColumn<cardatasType>,
    {
        accessorKey: "svzk",
        header: "שבצק",
        type: "String",
        id: "svzk"
    } as iStringTableColumn<cardatasType>,
    {
        accessorKey: "mikum_bimh",
        header: "מיקום בימח",
        type: "String",
        id: "mikum_bimh"
    } as iStringTableColumn<cardatasType>,
    {
        accessorKey: "stand",
        header: "מעמד הכלי",
        type: "String",
        id: "stand"
    } as iStringTableColumn<cardatasType>,
    {
        accessorKey: "status",
        header: "סטטוס הכלי",
        type: "String",
        id: "status"
    } as iStringTableColumn<cardatasType>,
    {
        accessorKey: "zminot",
        header: "זמינות",
        type: "String",
        id: "zminot"
    } as iStringTableColumn<cardatasType>,
    {
        accessorKey: "kshirot",
        header: "כשירות למלחמה",
        type: "String",
        id: "kshirot"
    } as iStringTableColumn<cardatasType>,
    // needs to be a function
    {
        accessorKey: "daysOff",
        header: "ימי שהייה",
        type: "String",
        id: "daysOff"
    } as iStringTableColumn<cardatasType>,
    {
        accessorKey: "mikum",
        header: "מיקום",
        type: "String",
        id: "mikum"
    } as iStringTableColumn<cardatasType>,
    {
        accessorKey: "lastCalibrationDate",
        header: "מועד כיול אחרון",
        type: "String",
        id: "lastCalibrationDate"
    },
    {
        accessorKey: "tags",
        id: "tags",
        header: "קבוצות",
        type: "Custom",
        parser: (objects: string[] | undefined) => objects?.filter(Boolean) ?? [],
        cell: (items: string[] | undefined) => items?.map(item => <Typography>{item}</Typography>),
        filterFn: (cellValue: string[], valueFromFilter: string[]) => {
            return valueFromFilter.some(filterValue => cellValue.some(itemInCell => filterValue === itemInCell));
        },
        sortFn: (items: string[]) => items.length
    } as iCustomTableColumn<cardatasType>,
    {
        accessorKey: "tipuls",
        id: "tipuls",
        header: "סיבות אי זמינות",
        type: "Custom",
        parser: (objects: tipultype[]) => objects.map(object => object.tipul_key).filter(Boolean),
        cell: (items: string[]) => items?.map(item => <Typography>{item}</Typography>),
        filterFn: (cellValue: string[], valueFromFilter: string[]) => {
            return valueFromFilter.some(filterValue => cellValue.some(itemInCell => filterValue === itemInCell));
        },
        sortFn: (items: string[]) => items.length


    } as iCustomTableColumn<cardatasType>,
    {
        accessorKey: "updatedAt",
        header: "תאריך עדכון אחרון",
        type: "Date",
        id: "updatedAt" 
    } as iDateTableColumn<cardatasType>,
    {
        accessorKey: "systems",
        id: "systems",
        header: "מערכות על גבי פלטפורמה",
        type: "Custom",
        parser: (objects: System[]) => objects.map(object => {
            if (!object.name)
                return null;

            const name = object.name;
            const kashir = object.kashir ? "כשיר" : "לא כשיר"
            return `${name}${spaceSeperator}${kashir}`
        }).filter(Boolean),
        cell: (items: string[]) => items.map(item => {
            const [name, kshirot] = item.split(spaceSeperator);
            if (!(name && kshirot)){
                return null;
            }
            return (
                <Typography>
                    {name} {" "}
                    <span style={{color: kshirot === "כשיר"? "green" : "red"}}>({kshirot})</span>
                </Typography>
            )
        }).filter(Boolean),
        filterFn: (cellValue: string[], valueFromFilter: string) => {
            // currently we only filter by if system exists or not
            return cellValue && cellValue.length > 0;
        },
        sortFn: (items: string[]) => items.length
    } as iCustomTableColumn<cardatasType>,
    // a field to contain all hh_stands in system
    {
        id: "hh_stands",
        type: "Meta",
        accessorFn: row => {
            const hasHHStands = row.tipuls?.some(tipul => tipul.hh_stands);
            return hasHHStands ? "עומד על חח" : null;
        },
        filterFn: (cellValue: string, valueFromFilter: string) => {
            return cellValue === "עומד על חח";
        }

    } as iMetaTableColumn<cardatasType>
];


export default COLUMNS;