import { ColumnFilter } from "../MiluimSortingTable/ColumnFilter";

export const COLUMNS = [
	{
		Header: "תאריך דיווח",
		accessor: "date",
		Filter: ColumnFilter,
	},
	{
		Header: "התייצב",
		accessor: "present",
		Filter: ColumnFilter,
	},
	{
		Header: "התייצב היום",
		accessor: "todayPresent",
		Filter: ColumnFilter,
	},
];
