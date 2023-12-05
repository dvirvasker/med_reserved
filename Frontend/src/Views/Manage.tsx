import { useMemo } from "preact/compat";
import Card from "../Components/Card";
import DataGridTable from "../Components/DataGridTable";
import createTanstackTable, { onTableMultiSelectFilterChange } from "../assets/Functions/tableHandlers";
import { ColumnsType, iFilter, iMultiSelectFilter } from "../interfaces";
import { DataGridFooter } from "../Components/Footer";
import { Box } from "@mui/material";
import { DataGridNavbar } from "../Components/Navbar";
import useCache from "../hooks/useCache";
import { generateRandomMilitaryUsers, hativaList, ogdaList, pikudList } from "../assets/Functions/mock/mockUser";
import { iUser } from "../assets/Functions/mock/mockUser";

const ManageView = () => {
  const data: iUser[] = useMemo(() => generateRandomMilitaryUsers(3000), []);
  const visibleColumnsKey = "manage_table_visible_columns";
  const cache = useCache(visibleColumnsKey, () => ({}));

  const tableColumns: ColumnsType<iUser>[] = useMemo(() => [
      {
        accessorKey: 'pikudId',
        id: 'pikudId',
        header: 'מזהה פיקוד',
      },
      {
        accessorKey: 'pikudName',
        id: 'pikudName',
        header: 'שם פיקוד',
      },
      {
        accessorKey: 'ogdaId',
        id: 'ogdaId',
        header: 'מזהה אוגדה',
      },
      {
        accessorKey: 'ogdaName',
        id: 'ogdaName',
        header: 'שם אוגדה',
      },
      {
        accessorKey: 'hativaId',
        id: 'hativaId',
        header: 'מזהה חטיבה',
      },
      {
        accessorKey: 'hativaName',
        id: 'hativaName',
        header: 'שם חטיבה',
      },
      {
        accessorKey: 'generationDate',
        id: 'generationDate',
        type: "Date",
        filterFn: (date: Date, valueRecieved: Date) => {
          return date > valueRecieved;
        },
        header: 'תאריך יצירה',
      },
    ], []);

  const table = createTanstackTable<iUser>(data, tableColumns, cache.cacheValue);

  const columnsFilter = useMemo(() => {
    return [
      {
        title: "מזהה פיקוד",
        id: "pikudId",
        type: "MULTISELECT",
        options: pikudList,
        onChange: (data) => onTableMultiSelectFilterChange(data, table)
      } as iMultiSelectFilter,
      {
        title: "מזהה חטיבה",
        id: "hativaId",
        type: "MULTISELECT",
        options: hativaList,
        onChange: (data) => onTableMultiSelectFilterChange(data, table)

      } as iMultiSelectFilter,
      {
        title: "מזהה אוגדה",
        id: "ogdaId",
        type: "MULTISELECT",
        options: ogdaList,
        onChange: (data) => onTableMultiSelectFilterChange(data, table)

      }

    ] as iFilter[]
  }, [])
  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
      <DataGridNavbar table={table} title="טבלת ניהול משתמשים" cache={cache} filterColumns={columnsFilter}/>
      {/* <Card>
        <Filter filterFields={columnsFilter} />
      </Card> */}
      <Card>
        <DataGridTable table={table} />
      </Card>
      <DataGridFooter />
    </Box>

    )
};

export default ManageView;