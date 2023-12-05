import { ColumnDef, Table, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { useMemo } from "preact/hooks";
import { CacheHook, ColumnsType, iSelectable } from "../../interfaces";

const dateStringToDate = (dateStr: string) : Date => {
    const [day, month, year] = dateStr.split('.');
    // Convert to a valid date format (mm/dd/yyyy)
    const formattedDateString = `${month}/${day}/${year}`;
    // Create a Date object
    return new Date(formattedDateString);
} 

export const setNewDisplayedColumns = (filter: iSelectable[], table: Table<any>, cache: CacheHook<any>) => {
    const columnsToHide = table.getAllColumns().reduce((acc, column) => {
      const columnId = column.columnDef.id as string;
      if (filter.some(innerField => innerField.id === columnId)) {
        return acc;
      } else {
        acc[columnId] = false;
        return acc;
      }
    }, {} as Record<string, boolean>);

    cache.updateCache(columnsToHide);
    table.setColumnVisibility(columnsToHide);
};


export const onTableMultiSelectFilterChange = (data: {id: string, value: iSelectable[]}, table: Table<any>) => {
    const existingFilters = table.getState().columnFilters;
    const newFilters = existingFilters.filter(filter => filter.id !== data.id);
    if (data.value.length > 0){
        newFilters.push({id: data.id, value: data.value.map(value => value.value)})
    }
    table.setColumnFilters(newFilters)

}

export const onTableToggleFilterChange = (data: {id: string, value: iSelectable[]}, table: Table<any>) => {
    const existingFilters = table.getState().columnFilters;
    // need to handle what to do with old filters
    const newFilters = existingFilters.filter(filter => filter.id !== data.id);

    if (data.value.length > 0){
        newFilters.push({id: data.id, value: data.value.map(selectable => selectable.value)})
    }

    table.setColumnFilters(newFilters);
}



const createTanstackTable = <T>(data: T[], columns: ColumnsType<T>[], visibleColumns: {[key: string]: boolean}, defaultRows?: number, debug: boolean = false) => {
    const onColumn = (column: ColumnsType<T>) => {
        if (column.type === "Date") {
            return {
                accessorFn: row => (row[column.accessorKey as keyof T] as Date).toLocaleDateString("he-IL", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric"
                }),
                id: column.accessorKey,
                header: column.header,
                filterFn: (row, coulmnId, valueRecieved) => {
                    const date = dateStringToDate(row.getValue(coulmnId));
                    return column.filterFn ? column.filterFn(date, valueRecieved) : true;
                },
                sortingFn: (rowA, rowB, columnId) => {
                    const dateA = dateStringToDate(rowA.getValue(columnId));
                    const dateB = dateStringToDate(rowB.getValue(columnId));
                    return dateA > dateB ? 1 : -1;
                    
                },
            } as ColumnDef<T>;
        }
        else {
            return {
                ...column,
                filterFn: column.filterFn ? column.filterFn : (row, coulmnId, valueRecieved) => {
                    const columnValue = row.getValue(coulmnId);
                    if (Array.isArray(valueRecieved))
                        return (valueRecieved as string[]).some(item => columnValue === item)
                }
            } as ColumnDef<T>
        }
    }


    const newCoulmns = useMemo(() => columns.map(onColumn), [columns]) as ColumnDef<T>[];

    const table = useReactTable<T>({
        data,
        columns: newCoulmns,
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: defaultRows ? defaultRows : 20,
            },
            columnVisibility: visibleColumns
        },
        enableFilters: true,
        enableSorting: true,
        debugAll: debug
    });

    return table;

}

export default createTanstackTable;
