import { Grid } from "@mui/material";
import { iMultiSelectFilter, iToggleFilter, iFilter } from "../../interfaces";
import { memo, lazy, Suspense } from "preact/compat";
import FilterToggle from "./FilterToggle";
const FilterMultiSelect = lazy(() => import("./FilterMultiSelect"));

interface iFilterComponent {
  filterFields: iFilter[],
}

const Filter: React.FC<iFilterComponent> = ({filterFields}) => {

  const Field = ({field} : {field: iFilter}) => {
    switch (field.type) {
        case "MULTISELECT": return (
          <Suspense fallback="טוען שדה בחירה מרובה...">
              <FilterMultiSelect field={field as iMultiSelectFilter}/>
          </Suspense>
      );
        case "TOGGLE": return <FilterToggle field={field as iToggleFilter} />;
        default: return null;
    }
  };
  return (
    <Grid container columnSpacing={1.5} rowSpacing={2} >
      {filterFields.map(field => (
        <Grid item xs={field.width ? field.width : 12} key={field.id}>
          <Field field={field} />
        </Grid>
      ))}
    </Grid>
  )

};


export default memo(Filter);
