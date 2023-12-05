import { Row, Table } from "@tanstack/react-table";
import { iMagadData, iUnitData } from "../../interfaces";
import { collectUniqueUnits, getTotalCount, rowTotals, sumForMagad } from "./precentageTableHandlers";


export const downloadPrecentageTable = async (magadData: iMagadData, filename: string) => {

    const writeXlsxFile = (await import('write-excel-file')).default;
    const uniqueUnits = collectUniqueUnits(magadData);
    const rows = Object.keys(uniqueUnits).map(unitId => {
        const cells = Object.keys(magadData).map(rowHeader => magadData[rowHeader].items[unitId]);
        cells.push(getTotalCount(magadData, unitId));
        return cells;
    });

    const summedMagadRow = Object.keys(magadData).map(rowHeader => sumForMagad(magadData, rowHeader));
    summedMagadRow.push(rowTotals(magadData)); // pushing all and all
    rows.push(summedMagadRow);

    const schema: any[] = [{
        column: "",
        type: String,
        value: (row: iUnitData[]) => row.find(item => item)!.title,
        fontWeight: "bold",
    }];

    Object.keys(magadData).forEach((rowHeader, index) => {
        schema.push({
            column: magadData[rowHeader].title,
            type: String,
            value: (row: iUnitData[]) => row[index] ? JSON.stringify(row[index]) : "",
        })
    });

    schema.push({
        column: "הכל",
        type: String,
        value: (row: iUnitData[]) => JSON.stringify(row[row.length - 1]) 
    })

    await writeXlsxFile(rows, {
        schema,
        fileName: filename + '.xlsx',
        stickyRowsCount: 1,
        stickyColumnsCount: 1

    })

    
};

export const downloadTanstackTable = async <T>(table: Table<T>, filename: string) => {
    const writeXlsxFile = (await import('write-excel-file')).default;
    const rows = table.getPrePaginationRowModel().rows;
    const columns = table.getVisibleFlatColumns();
    
    const schema = columns.map(column => ({
        column: column.columnDef.header?.toString(),
        type: String,
        value: (row: Row<T>) => (row as any).getValue(column.columnDef.id)
    }))
    
    await writeXlsxFile<Row<T>>(rows, {
        schema,
        fileName: filename + '.xlsx',
        stickyRowsCount: 1

    })


};