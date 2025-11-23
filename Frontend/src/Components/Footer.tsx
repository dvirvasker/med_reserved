import { Box, Button, TablePagination, Typography, styled, useTheme } from "@mui/material";
import Card from "./Card";
import { downloadPrecentageTable, downloadTanstackTable } from "../assets/Functions/downloadTable";
import { Table } from "@tanstack/react-table";
import { iMagadData } from "../interfaces";
const StyledCard = styled(Card)(({ theme }) => ({
    height: 70,
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper
}));


export const PrecentageTableFooter = ({ magadData, excelFileName, onToTable }: { magadData: iMagadData, excelFileName: string, onToTable: () => void }) => {
    return (
        <StyledCard>
            <Typography variant="h5" fontWeight="bold">
                תאריך עדכון אחרון: 19.11.23
            </Typography>
            <Box style={{ marginRight: "auto", display: "flex", gap: 8 }}>
                <Button onClick={() => downloadPrecentageTable(magadData, excelFileName)}>הורד כאקסל</Button>
                <Button onClick={onToTable} variant="outlined">מעבר לטבלת זמינות</Button>
            </Box>
        </StyledCard>
    )
}

// , download as excel, last updated
export const DataGridFooter = ({ table, excelFileName, pageSizeOptions = [10, 20, 30, 40, 50] }: { table: Table<any>, excelFileName: string, pageSizeOptions?: number[] }) => {
    const theme = useTheme();
    return (
        <StyledCard>
            <TablePagination
                component="div"
                count={table.getPrePaginationRowModel().rows.length}
                rowsPerPageOptions={pageSizeOptions}
                page={table.getState().pagination.pageIndex}
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} מתוך ${count !== -1 ? count : `${to}`}`
                }
                labelRowsPerPage="שורות לעמוד:"
                onPageChange={(_, data) => table.setPageIndex(data)}
                rowsPerPage={table.getState().pagination.pageSize}
                onRowsPerPageChange={(eventOfRows) => table.setPageSize(parseInt((eventOfRows.target as HTMLInputElement).value))}
            />
            <Button variant="outlined" style={{ marginRight: "auto", color: theme.palette.primary.dark, borderBlockColor: theme.palette.primary.dark, borderInlineColor: theme.palette.primary.dark }} onClick={() => downloadTanstackTable(table, excelFileName)}>הורדה כטבלה</Button>
        </StyledCard>
    )
};

// last updated, to table
export const DashboardFooter = () => {
    const theme = useTheme();
    return (
        <StyledCard>
            <Typography variant="h5" fontWeight="bold">
                תאריך עדכון אחרון: 19.11.23
            </Typography>

            <Box style={{ marginRight: "auto", display: "flex", gap: 15 }}>
                <Button variant="contained">תצוגת טבלה</Button>
                <Button style={{ color: theme.palette.primary.dark }}>מעבר לשעוני יחידות</Button>
            </Box>
        </StyledCard>
    );

};

