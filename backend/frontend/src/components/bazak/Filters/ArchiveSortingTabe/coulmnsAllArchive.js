import { ColumnFilter } from "../MiluimSortingTable/ColumnFilter";

export const COLUMNS = [
	{
		Header: "תאריך דיווח",
		accessor: "date",
		Filter: ColumnFilter,
	},
	{
		Header: "שם",
		accessor: "name",
		Filter: ColumnFilter,
	},
	{
		Header: "שם משפחה",
		accessor: "family",
		Filter: ColumnFilter,
	},
	{
		Header: "תעודת זהות",
		accessor: "civilian_number",
		Filter: ColumnFilter,
	},
	{
		Header: "מספר אישי",
		accessor: "personal_number",
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
	{
		Header: "נשלח חייגן",
		accessor: "dailSent",
		Filter: ColumnFilter,
	},
	{
		Header: 'נפתח שמ"פ',
		accessor: "shamapOpen",
		Filter: ColumnFilter,
	},
	{
		Header: "מקצוע",
		accessor: "subject",
		Filter: ColumnFilter,
	},
	{
		Header: "תפקיד",
		accessor: "job",
		Filter: ColumnFilter,
	},
	{
		Header: "יחידה",
		accessor: "unit",
		Filter: ColumnFilter,
	},
	{
		Header: "תא",
		accessor: "ta",
		Filter: ColumnFilter,
	},
];
