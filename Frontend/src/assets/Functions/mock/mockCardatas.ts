import { System, cardatasType } from "../../../interfaces";

// Define static values as arrays of objects
export const pikodValues = [
  { id: 'Pikod123', value: 'שם פיקוד' },
  { id: 'Pikod456', value: 'שם פיקוד 2' },
  { id: 'Pikod789', value: 'שם פיקוד 3' },
  { id: 'Pikod101', value: 'שם פיקוד 4' },
  { id: 'Pikod112', value: 'שם פיקוד 5' },
  { id: 'Pikod113', value: 'שם פיקוד 6' },
];

export const ogdaValues = [
  { id: 'Ogda456', value: 'שם אוגדה' },
  { id: 'Ogda789', value: 'שם אוגדה 2' },
  { id: 'Ogda101', value: 'שם אוגדה 3' },
  { id: 'Ogda112', value: 'שם אוגדה 4' },
  { id: 'Ogda113', value: 'שם אוגדה 5' },
  { id: 'Ogda114', value: 'שם אוגדה 6' },
];

export const hativaValues = [
  { id: 'Hativa789', value: 'שם חטיבה' },
  { id: 'Hativa101', value: 'שם חטיבה 2' },
  { id: 'Hativa112', value: 'שם חטיבה 3' },
  { id: 'Hativa113', value: 'שם חטיבה 4' },
  { id: 'Hativa114', value: 'שם חטיבה 5' },
  { id: 'Hativa115', value: 'שם חטיבה 6' },
];

export const gdodValues = [
  { id: 'Gdod321', value: 'תיאור גדוד' },
  { id: 'Gdod456', value: 'תיאור גדוד 2' },
  { id: 'Gdod789', value: 'תיאור גדוד 3' },
  { id: 'Gdod101', value: 'תיאור גדוד 4' },
  { id: 'Gdod112', value: 'תיאור גדוד 5' },
  { id: 'Gdod113', value: 'תיאור גדוד 6' },
];

export const magadalValues = [
  { id: 'Magadal654', value: 'שם מאגד על' },
  { id: 'Magadal789', value: 'שם מאגד על 2' },
  { id: 'Magadal101', value: 'שם מאגד על 3' },
  { id: 'Magadal112', value: 'שם מאגד על 4' },
  { id: 'Magadal113', value: 'שם מאגד על 5' },
  { id: 'Magadal114', value: 'שם מאגד על 6' },
];

export const magadValues = [
  { id: 'Magad987', value: 'שם מאגד' },
  { id: 'Magad789', value: 'שם מאגד 2' },
  { id: 'Magad101', value: 'שם מאגד 3' },
  { id: 'Magad112', value: 'שם מאגד 4' },
  { id: 'Magad113', value: 'שם מאגד 5' },
  { id: 'Magad114', value: 'שם מאגד 6' },
];

export const mkabazValues = [
  { id: 'Mkabaz123', value: 'שם מקבץ' },
  { id: 'Mkabaz789', value: 'שם מקבץ 2' },
  { id: 'Mkabaz101', value: 'שם מקבץ 3' },
  { id: 'Mkabaz112', value: 'שם מקבץ 4' },
  { id: 'Mkabaz113', value: 'שם מקבץ 5' },
  { id: 'Mkabaz114', value: 'שם מקבץ 6' },
];

export const makatValues = [
  { id: 'Makat456', value: 'תיאור מקט' },
  { id: 'Makat789', value: 'תיאור מקט 2' },
  { id: 'Makat101', value: 'תיאור מקט 3' },
  { id: 'Makat112', value: 'תיאור מקט 4' },
  { id: 'Makat113', value: 'תיאור מקט 5' },
  { id: 'Makat114', value: 'תיאור מקט 6' },
];

export const zminotOptions = [
  { id: 'zamin', value: 'זמין' },
  { id: 'not_zamin', value: 'לא זמין' },
];

export const kshirotOptions = [
  { id: 'kashir', value: 'כשיר' },
  { id: 'not_kashir', value: 'לא כשיר' },
];


// ... (add more items to each array)

// Function to get a random element from an array
const getRandomElement = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

function generateRandomSystems(count: number): System[] {
  const randomItemCount = Math.floor(Math.random() * (count + 1)); // Generate a random count within the range [0, count]
  const randomSystems: System[] = [];
  const availableNames = ["System A", "System B", "System C", "System D", "System E"]; // Replace with your name generation logic

  for (let i = 0; i < randomItemCount; i++) {
    const randomSystem: System = {
      name: availableNames[Math.floor(Math.random() * availableNames.length)], // Random name from the array
      systemType: { _id: "your_system_type_id" }, // Replace with your actual system type ID logic
      kashir: Math.random() < 0.5, // Random boolean value
      _id: "generated_id_" + i, // You might want to replace this with a better ID generation logic
    };

    randomSystems.push(randomSystem);
  }

  return randomSystems;
}


// Function to generate random cardatas
export const generateRandomCardatasList = (count: number): cardatasType[] => {
  const randomCardatasList: cardatasType[] = [];

  for (let i = 0; i < count; i++) {
    const randomPikod = getRandomElement(pikodValues);
    const randomOgda = getRandomElement(ogdaValues);
    const randomHativa = getRandomElement(hativaValues);
    const randomGdod = getRandomElement(gdodValues);
    const randomMagadal = getRandomElement(magadalValues);
    const randomMagad = getRandomElement(magadValues);
    const randomMkabaz = getRandomElement(mkabazValues);
    const randomMakat = getRandomElement(makatValues);
    const randomZminot = getRandomElement(zminotOptions);
    const randomKshirot = getRandomElement(kshirotOptions);
    const systems: System[] = generateRandomSystems(20)

    const randomCardatas: cardatasType = {
      _id: Math.random().toString(36).substring(7),
      carnumber: Math.random().toString(36).substring(7),
      makat: randomMakat.id,
      gdod: randomGdod.id,
      stand: Math.random().toString(36).substring(7),
      updatedBy: Math.random().toString(36).substring(7),
      createdAt: new Date(),
      updatedAt: new Date(),
      expected_repair: Math.random().toString(36).substring(7),
      status: Math.random().toString(36).substring(7),
      takala_info: Math.random().toString(36).substring(7),
      zminot: randomZminot.value,
      kshirot: randomKshirot.value,
      mikum: Math.random().toString(36).substring(7),
      // ... other fields set to undefined
      systems: systems,

      // Set static values along with their names
      pikod: randomPikod.id,
      ogda: randomOgda.id,
      hativa: randomHativa.id,
      gdodName: randomGdod.value,
      magadal: randomMagadal.id,
      magad: randomMagad.id,
      mkabaz: randomMkabaz.id,
      pikodName: randomPikod.value,
      ogdaName: randomOgda.value,
      hativaName: randomHativa.value,
      magadalName: randomMagadal.value,
      magadName: randomMagad.value,
      mkabazName: randomMkabaz.value,
      makatName: randomMakat.value,
      // ... other static values
    };

    randomCardatasList.push(randomCardatas);
  }

  return randomCardatasList;
};

