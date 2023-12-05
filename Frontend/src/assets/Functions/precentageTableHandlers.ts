import { iMagadData } from "../../interfaces";

export function collectUniqueUnits(magadData: iMagadData): { [unitKey: string]: string } {
    const uniqueUnits: { [unitKey: string]: string } = {};
  
    for (const categoryKey in magadData) {
        if (magadData.hasOwnProperty(categoryKey)) {
            const category = magadData[categoryKey];
  
            for (const unitKey in category.items) {
                if (category.items.hasOwnProperty(unitKey)) {
                    const unit = category.items[unitKey];
                    uniqueUnits[unitKey] = unit.title;
                }
            }
        }
    }
  
    return uniqueUnits;
  }

export const getTotalCount = (magadData: iMagadData, unit: string) => {
    let totalTrueCount = 0;
    let totalFalseCount = 0;

    Object.keys(magadData).forEach((rowHeader) => {
        const carData = magadData[rowHeader].items[unit];
        if (carData) {
        totalTrueCount += carData.trueCount;
        totalFalseCount += carData.falseCount;
        }
    });

    return { title: "הכל", trueCount: totalTrueCount, falseCount: totalFalseCount };
};
export const sumForMagad = (magadData: iMagadData, magad: string) => {
    const foundMagad = magadData[magad];
    
    if (!foundMagad) {
      return { title: "", trueCount: 0, falseCount: 0 };
    }

    const gdodTotals = Object.keys(foundMagad.items).reduce((totals, gdod) => {
      const unitData = foundMagad.items[gdod];
      if (unitData) {
        totals.trueCount += unitData.trueCount;
        totals.falseCount += unitData.falseCount;
      }
      return totals;
    }, { title: "הכל", trueCount: 0, falseCount: 0 });
  
    return gdodTotals;
  };

export const rowTotals = (magadData: iMagadData) => Object.keys(magadData).reduce((totals, rowHeader) => {
    const magadalTotals = sumForMagad(magadData, rowHeader);
    totals.trueCount += magadalTotals.trueCount;
    totals.falseCount += magadalTotals.falseCount;
    return totals;
  }, { title: "הכל", trueCount: 0, falseCount: 0 });
