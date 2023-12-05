export interface iUser {
    pikudId: string;
    pikudName: string;
    ogdaId: string;
    ogdaName: string;
    hativaId: string;
    hativaName: string;
    generationDate: Date;
  }
  
export const ogdaList = [
{ id: "ogdaA", value: "אוגדה א" },
{ id: "ogdaB", value: "אוגדה ב" },
{ id: "ogdaC", value: "אוגדה ג" },
{ id: "ogdaD", value: "אוגדה ד" },
{ id: "ogdaE", value: "אוגדה ה" },
{ id: "ogdaF", value: "אוגדה ו" },
{ id: "ogdaG", value: "אוגדה ז" },
{ id: "ogdaH", value: "אוגדה ח" },
{ id: "ogdaI", value: "אוגדה ט" },
{ id: "ogdaJ", value: "אוגדה י" }
];

export const pikudList = [
{ id: "pikudA", value: "פיקוד א" },
{ id: "pikudB", value: "פיקוד ב" },
{ id: "pikudC", value: "פיקוד ג" },
{ id: "pikudD", value: "פיקוד ד" },
{ id: "pikudE", value: "פיקוד ה" }
];

export const hativaList = [
{ id: "hativa1", value: "חטיבה 1" },
{ id: "hativa2", value: "חטיבה 2" },
{ id: "hativa3", value: "חטיבה 3" },
{ id: "hativa4", value: "חטיבה 4" },
{ id: "hativa5", value: "חטיבה 5" }
];

export const generateRandomMilitaryUsers = (count: number) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    const pikud = pikudList[Math.floor(Math.random() * pikudList.length)];
    const ogda = ogdaList[Math.floor(Math.random() * ogdaList.length)];
    const hativa = hativaList[Math.floor(Math.random() * hativaList.length)];
    const date = new Date(
      2023,
      10, // Month is zero-based
      23 + Math.floor(Math.random() * 31), // Random day between 23 and 53
    );
    result.push({
      pikudId: pikud.id,
      pikudName: pikud.value,
      ogdaId: ogda.id,
      ogdaName: ogda.value,
      hativaId: hativa.id,
      hativaName: hativa.value,
      generationDate: date
    });
  }
  
  return result;
}
  
  