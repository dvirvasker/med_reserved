import { gdodValues, groupOptions, hativaValues, kshirotOptions, magadValues, magadalValues, makatValues, mkabazValues, ogdaValues, pikodValues, tipulOptions, zminotOptions } from "../../assets/Functions/mock/mockCardatas";
import { iMultiSelectFilter, iDateFilter, iToggleFilter } from "../../interfaces"
import  { metaField, onTableDateFilterChange, onTableMultiSelectFilterChange, onTableToggleFilterChange } from "../../hooks/useTanstackTable";
import { Table } from "@tanstack/react-table";

const FILTERS = (table: Table<any>) => [
    {
        title: "זמינות",
        id: "zminot",
        options: zminotOptions,
        type: "TOGGLE",
        onClick: (newFilterState => onTableToggleFilterChange({id: "zminot", value: newFilterState}, table)),
        width: 1,
    } as iToggleFilter,
    {
        title: "כשירות",
        id: "kshirot",
        type: "TOGGLE",
        options: kshirotOptions,
        onClick: (newFilterState => onTableToggleFilterChange({id: "kshirot", value: newFilterState}, table)),
        width: 1,
    } as iToggleFilter,
    {
        title: "מערכות",
        id: "systems",
        type: "TOGGLE",
        options: [{id: "exists", value: "קיים"}],
        onClick: (newFilterState => onTableToggleFilterChange({id: "systems", value: newFilterState}, table)),
        width: 1,
    } as iToggleFilter,
    {
        title: "סיבת אי זמינות",
        id: "tipuls",
        type: "TOGGLE",
        options: tipulOptions,
        onClick: (newFilterState => onTableToggleFilterChange({id: "tipuls", value: newFilterState}, table)),
        width: 2,
    } as iToggleFilter,
    {
        title: "עומד על חח",
        id: "hh_stands",
        type: "TOGGLE",
        options: [{id: "exists", value: "קיים"}],
        onClick: (newFilterState => onTableToggleFilterChange({id: metaField + "hh_stands", value: newFilterState}, table)),
        width: 1,
    } as iToggleFilter,
    {
        title: "קבוצות",
        id: "tags",
        type: "MULTISELECT",
        options: groupOptions,
        onChange: data => onTableMultiSelectFilterChange(data, table),
        width: 6

    } as iMultiSelectFilter,
    {
        title: "פיקוד",
        id: "pikodName",
        options: pikodValues,
        type: "MULTISELECT",
        onChange: (data) => onTableMultiSelectFilterChange(data, table),
        width: 3,
    } as iMultiSelectFilter,
    {
        title: "אוגדה",
        id: "ogdaName",
        options: ogdaValues,
        type: "MULTISELECT",
        dependsOn: "pikodName",
        width: 3,
        onChange: (data) => onTableMultiSelectFilterChange(data, table)
    } as iMultiSelectFilter,
    {
        title: "חטיבה",
        id: "hativaName",
        options: hativaValues,
        type: "MULTISELECT",
        enabledWhen: ["ogdaName"],
        width: 3,
        onChange: (data) => onTableMultiSelectFilterChange(data, table),
      } as iMultiSelectFilter,
      {
        title: "גדוד",
        id: "gdodName",
        options: gdodValues,
        enabledWhen: ["hativaName"],
        type: "MULTISELECT",
        width: 3,
        onChange: (data) => onTableMultiSelectFilterChange(data, table),
    } as iMultiSelectFilter,
    {
        title: "מאגד על",
        id: "magadalName",
        options: magadalValues,
        type: "MULTISELECT",
        width: 3,
        onChange: (data) => onTableMultiSelectFilterChange(data, table),
    } as iMultiSelectFilter,
    {
        title: "מאגד",
        id: "magadName",
        enabledWhen: ["magadalName"],
        options: magadValues,
        type: "MULTISELECT",
        width: 3,
        onChange: (data) => onTableMultiSelectFilterChange(data, table),
    } as iMultiSelectFilter,
    {
        title: "מקבץ",
        id: "mkabazName",
        options: mkabazValues,
        enabledWhen: ["magadName"],
        type: "MULTISELECT",
        width: 3,
        onChange: (data) => onTableMultiSelectFilterChange(data, table),
    } as iMultiSelectFilter,
    {
        title: "מקט",
        id: "makatName",
        enabledWhen: ["mkabazName"],
        options: makatValues,
        type: "MULTISELECT",
        width: 3,
        onChange: (data) => onTableMultiSelectFilterChange(data, table),
    } as iMultiSelectFilter,
    {
        title: "תאריך עדכון גדול מ",
        id: "createdAtBiggerThan",
        type: "DATE",
        width: 6,
        onChange: ((selectedDate: Date) => onTableDateFilterChange({id: "updatedAt", dateData: {date: selectedDate, type: "BIGGER_THAN", includingSelf: true}}, table))
    } as iDateFilter,
    {
        title: "תאריך עדכון קטן מ",
        id: "createdAtSmallerThan",
        type: "DATE",
        width: 6,
        onChange: ((selectedDate: Date) => onTableDateFilterChange({id: "updatedAt", dateData: {date: selectedDate, type: "LESS_THAN", includingSelf: true}}, table))
    } as iDateFilter,

];

export default FILTERS;