import { UseFormGetValues, UseFormReturn, useWatch } from "react-hook-form";
import { iField, tConditionType } from "../../interfaces";

export const getFullDependantId = (field: iField, parent?: string) => field.dependsOn ? parent ? `${parent}.${field.dependsOn}` : field.dependsOn : undefined;
export const getFullFieldId = (field: iField, parent?: string) => parent ? `${parent}.${field.id}` : field.id;

const getFullPath = (originalPath: string, parent?: string) => parent? `${parent}.${originalPath}` : originalPath;
export const getDynamicIds = (field: iField, key: string, parent?: string) => {
    const dynamicProperty = field[key as keyof iField] as any[] || undefined;
    if (!dynamicProperty || dynamicProperty.length === 0) {
      return [];
    }
  
    return dynamicProperty.map(item => {
      if (typeof item === 'object' && item.key) {
        return parent ? `${parent}.${item.key}` : item.key;
      } else if (typeof item === 'string') {
        return parent ? `${parent}.${item}` : item;
      }
  
      // Handle unexpected types (if any)
      return '';
    });
  };

export const checkValue = (field: { key: string; value: string } | string, getValues: UseFormGetValues<any>, parent?: string) => {
    if (typeof field === "string"){
        return getValues(getFullPath(field, parent)); 
    }
    else {
        return getValues(getFullPath(field.key, parent)) === field.value
    }
};

export const isFieldConditionMet = (type: tConditionType, field: iField, getValues: UseFormGetValues<any>, parent?: string) => {
    if (type === "VISIBILITY") {
        if (!(field.unvisibleWhen || field.visibleWhen)){
            // if field has no dependencies than we can just always display it
            return true;
        }
        if (field.visibleWhen){
            // if at least one is true - than the object is to be displayed
            return field.visibleWhen.some(field => checkValue(field, getValues, parent))
        }
        else {
            // we need at least one condition to be false and then we dont display it
            return !field.visibleWhen!.some(field => checkValue(field, getValues, parent))
        }
    }
    else {
        if (!(field.enabledWhen || field.disabledWhen)){
            // if field has no dependencied it will always be enabled
            return true;
        }
        if (field.enabledWhen){
            return field.enabledWhen.some(field => checkValue(field, getValues, parent))
        }
        else {
            return !field.disabledWhen!.some(field => checkValue(field, getValues, parent))
        }
    }
};

export const registerDependencies = (field: iField, form: UseFormReturn, parent?: string,) => {
    const dependencies = ["visibleWhen", "unvisibleWhen", "enabledWhen", "disabledWhen"];
    let dependencyList = dependencies.map(fieldKey => {
        if (!field[fieldKey as keyof iField])
            return [];
        return getDynamicIds(field, fieldKey, parent)
    }).flat();

    if (field.dependsOn)
        dependencyList.push(getFullDependantId(field, parent) as string);

    if (dependencyList.length > 0){
        dependencyList = Array.from(new Set(dependencyList));
        return useWatch({
            name: dependencyList,
            control: form.control,
            exact: true
        })
    }
    
}

export const calculateWidth = (field: iField): number => {
    const fieldWidth = field.width || 12;
    const buttonWidth = field.button?.width || 12;
  
    return fieldWidth + (field.button ? buttonWidth : 0);
  };