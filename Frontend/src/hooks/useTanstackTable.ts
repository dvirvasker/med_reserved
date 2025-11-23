import { ColumnDef, Table, VisibilityState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { useMemo } from "preact/hooks";
import { CacheHook, ColumnsType, iCustomTableColumn, iDateChangeProps, iDateTableColumn, iMetaTableColumn, iSelectable, iStringTableColumn } from "../interfaces";

// an inner seperator used by tanstack table to split arrays into strings
const seperator = "__S__P__E__R__A__T__O__R__";
// a seperator to mock space function when transforming objects into displayable items
export const spaceSeperator = "_SSSSPPPPAAAACCCCEEEE_";
// indicates that a field is meta and not to be displayed
export const metaField = "META_";

export const dateStringToDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('.');
  // Convert to a valid date format (mm/dd/yyyy)
  const formattedDateString = `${month}/${day}/${year}`;
  // Create a Date object
  return new Date(formattedDateString);
}

// returns an empty array if no items were found after seperation, else returns the items
const clearAfterSeperating = (items: string[]) => {
  if (!items || items.length === 0)
    return [];
  if (items[0] === "")
    return [];
  return items;
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


export const onTableMultiSelectFilterChange = (data: { id: string, value: iSelectable[] }, table: Table<any>) => {
  const existingFilters = table.getState().columnFilters;
  const newFilters = existingFilters.filter(filter => filter.id !== data.id);
  if (data.value.length > 0) {
    newFilters.push({ id: data.id, value: data.value.map(value => value.value) })
  }
  table.setColumnFilters(newFilters)

}

export const onTableToggleFilterChange = (data: { id: string, value: iSelectable[] }, table: Table<any>) => {
  const existingFilters = table.getState().columnFilters;
  const newFilters = existingFilters.filter(filter => filter.id !== data.id);
  if (data.value.length > 0) {
    newFilters.push({ id: data.id, value: data.value.map(selectable => selectable.value) })
  }
  table.setColumnFilters(newFilters);
}


export const onTableDateFilterChange = ({ id, dateData }: { id: string; dateData: iDateChangeProps }, table: Table<any>) => {
  const existingFilters = table.getState().columnFilters;
  const dateFilterIndex = existingFilters.findIndex((item) => item.id === id);

  if (dateFilterIndex === -1) {
    // No existing filter with the same id, add a new one
    const newDateFilter = {
      id,
      value: [{
        date: dateData.date,
        type: dateData.type,
        includingSelf: dateData.includingSelf
      }]
    };

    table.setColumnFilters([...existingFilters, newDateFilter]);
  } else {
    // Filter with the same id exists
    const existingDateFilter = existingFilters[dateFilterIndex];
    const existingDateTypes = existingDateFilter.value as iDateChangeProps[];

    const typeIndex = existingDateTypes.findIndex((item) => item.type === dateData.type);

    if (typeIndex !== -1) {
      // Filter of the same type exists, replace it
      existingDateTypes[typeIndex] = {
        date: dateData.date,
        type: dateData.type,
        includingSelf: dateData.includingSelf
      };
    } else {
      // Filter of the same type doesn't exist, add the new filter
      existingDateTypes.push({
        date: dateData.date,
        type: dateData.type,
        includingSelf: dateData.includingSelf
      });
    }

    // Update the existing filter in the array
    existingFilters[dateFilterIndex] = {
      id,
      value: existingDateTypes
    };

    table.setColumnFilters([...existingFilters]);
  }
};

const onColumn = (column: ColumnsType<any>) => {
  if (column.type === "Date") {
    const dateColumn = column as iDateTableColumn<any>;
    return {
      accessorFn: row => (row[dateColumn.accessorKey as keyof any] as Date).toLocaleDateString("he-IL", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
      }),
      id: dateColumn.id,
      header: dateColumn.header,
      filterFn: (row, coulmnId, valueReceived: iDateChangeProps[]): boolean => {
        const date = dateStringToDate(row.getValue(coulmnId));

        if (!date || valueReceived.length === 0) {
          // If the date is not valid or no filter conditions are provided, return true (no filtering)
          return true;
        }

        return valueReceived.every(({ date: filterDate, type, includingSelf }) => {
          if (!filterDate || typeof type !== 'string') {
            // Invalid filter condition, return true (no filtering)
            return true;
          }

          if (type === "BIGGER_THAN") {
            return includingSelf ? date >= filterDate : date > filterDate;
          } else if (type === "LESS_THAN") {
            return includingSelf ? date <= filterDate : date < filterDate;
          } else {
            // Invalid filter type, return true (no filtering)
            return true;
          }
        })
      },
      sortingFn: (rowA, rowB, columnId) => {
        const dateA = dateStringToDate(rowA.getValue(columnId));
        const dateB = dateStringToDate(rowB.getValue(columnId));
        return dateA > dateB ? 1 : -1;

      },
    } as ColumnDef<any>;
  }
  if (column.type === "Custom") {
    const customColumn = column as iCustomTableColumn<any>;
    return {
      id: customColumn.id,
      header: customColumn.header,
      accessorFn: row => customColumn.parser(row[customColumn.accessorKey as keyof any]).join(seperator),
      cell: cellData => customColumn.cell((cellData.getValue() as string).split(seperator)),
      filterFn: (row, columnId, valueRecieved) => customColumn.filterFn && customColumn.filterFn(clearAfterSeperating((row.getValue(columnId) as string).split(seperator)), valueRecieved),
      sortingFn: (rowA, rowB, columnId) => {
        const itemA = (rowA.getValue(columnId) as string).split(seperator) as string[];
        const itemB = (rowB.getValue(columnId) as string).split(seperator) as string[];
        const resA = customColumn.sortFn(clearAfterSeperating(itemA));
        const resB = customColumn.sortFn(clearAfterSeperating(itemB));
        return resA - resB;
      }

    } as ColumnDef<any>;

  }
  if (column.type === "String" || column.type === "Function") {
    const stringColumn = column as iStringTableColumn<any>;
    return {
      ...column,
      filterFn: stringColumn.filterFn ? stringColumn.filterFn : (row, coulmnId, valueRecieved) => {
        const columnValue = row.getValue(coulmnId);
        if (Array.isArray(valueRecieved))
          return (valueRecieved as string[]).some(item => columnValue === item)
        else {
          return (valueRecieved as string) === columnValue;
        }
      }
    } as ColumnDef<any>
  }
  if (column.type === "Meta") {
    const metaColumn = column as iMetaTableColumn<any>;
    return {
      id: metaField + column.id,
      enableColumnFilter: true,
      enableSorting: false,
      enableGlobalFilter: false,
      enableHiding: true,
      accessorFn: metaColumn.accessorFn,
      filterFn: (row, columnId, valueRecieved) => {
        const cellValue = row.getValue(columnId) as string;
        return metaColumn.filterFn(cellValue, valueRecieved);
      }
    } as ColumnDef<any>
  }
}

const setUnvisibleMeta = (columns: ColumnDef<any>[]): VisibilityState => {
  const filteredColumns = columns.filter(column => column.id?.startsWith(metaField));
  const columnObject = Object.fromEntries(filteredColumns.map(column => [column.id, false]));
  return columnObject;
};

const useTanstackTable = <T>(data: T[], columns: ColumnsType<T>[], visibleColumns: { [key: string]: boolean }, defaultRows?: number, debug?: boolean) => {
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
        pageSize: defaultRows ? defaultRows : 10,
      },
      columnVisibility: { ...visibleColumns, ...setUnvisibleMeta(newCoulmns) }
    },
    enableFilters: true,
    enableSorting: true,
    debugAll: debug
  });

  return table;

}

export default useTanstackTable;
