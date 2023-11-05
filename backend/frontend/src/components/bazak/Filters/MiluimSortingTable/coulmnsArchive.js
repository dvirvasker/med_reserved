import { ColumnFilter } from "./ColumnFilter";

export const COLUMNS = [
	{
		Header: "תאריך דיווח",
		accessor: "updatedAt",
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
