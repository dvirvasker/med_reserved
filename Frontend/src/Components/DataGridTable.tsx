// will recieve as a prop tanstack table
// will take care of pagination and rendering
// wont control how we sort, search or filter (that will be controlled by header)

import { Table, TableBody, TableCell, TableHead, TableRow, TableRowProps, TableSortLabel, styled } from "@mui/material";
import { Header, Row, Table as TanstackTable, flexRender } from "@tanstack/react-table";

interface iTable<T> {
    table: TanstackTable<T>,
    tableRowProps?: (row: Row<T>) => TableRowProps,
    pageSizeOptions?: number[],
    currentPageSize?: number,
}

const ColoredTableHead = styled(TableHead)(({ theme }) => ({
    "& .MuiTableCell-head": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        fontSize: "1.12rem",
        fontWeight: "bold",
        textAlign: "center",
    }
}));

const CustomTableCell = styled(TableCell)(({ theme }) => ({
    fontSize: "1rem",
    paddingInline: 0,
    textAlign: "center",
    borderRight: `1px solid ${theme.palette.primary.dark}`,
}))

const DataGridTable: React.FC<iTable<any>> = ({ table, tableRowProps }) => {

    const HeaderRenderer = (header: Header<any, unknown>) => {
        const isSorted = header.column.getIsSorted();
        const nextStateFunc = () => isSorted === "desc" ? header.column.toggleSorting(false) : isSorted === "asc" ? header.column.clearSorting() : header.column.toggleSorting(true);
        return (
            <TableCell key={header.id} onClick={nextStateFunc}>
                <TableSortLabel style={{ color: "black" }} hideSortIcon active={isSorted !== false} direction={isSorted === "asc" ? "asc" : "desc"}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                </TableSortLabel>
            </TableCell>
        )
    }


    return (
        <Table stickyHeader>
            <ColoredTableHead>
                {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            HeaderRenderer(header)
                        ))}
                    </TableRow>
                ))}
            </ColoredTableHead>
            <TableBody>
                {table.getRowModel().rows.map(row => (
                    <TableRow key={row.id} {...tableRowProps && tableRowProps(row)}>
                        {row.getVisibleCells().map(cell => (
                            <CustomTableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</CustomTableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default DataGridTable;