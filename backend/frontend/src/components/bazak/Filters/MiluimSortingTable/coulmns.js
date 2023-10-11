import { ColumnFilter } from './ColumnFilter'

export const COLUMNS = [
    {
        Header: 'שם',
        accessor: 'name',
        Filter: ColumnFilter
    },
    {
        Header: 'התייצב',
        accessor: 'present',
        Filter: ColumnFilter
    },
    {
        Header: 'התייצב היום',
        accessor: 'todayPresent',
        Filter: ColumnFilter
    },
    {
        Header: 'נשלח חייגן',
        accessor: 'dailSent',
        Filter: ColumnFilter
    },
    {
        Header: 'נפתח שמ"פ',
        accessor: 'shamapOpen',
        Filter: ColumnFilter
    },
	{
        Header: 'מקצוע',
        accessor: 'subject',
        Filter: ColumnFilter
    },
	{
        Header: 'הערות',
        accessor: 'details',
        Filter: ColumnFilter
    },


]