/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */

export const merge2Fiels = (file1, file2) => {
  let returnFile = [];

  file1.sort((a, b) => {
    const date1 = new Date(a.calendarDate);
    const date2 = new Date(b.calendarDate);

    // (YYYY-MM-DD)
    if (date1.getTime() < date2.getTime()) {
      // date1 is lesser than date2
      return -1;
    }
    if (date1.getTime() > date2.getTime()) {
      // date1 is greater than date2
      return 1;
    }
    return 0;
  });
  // console.groupCollapsed("file 1 sorted");
  // console.log("The result file 1:");
  // console.log(file1);
  // console.groupEnd();

  file2.sort((a, b) => {
    const date1 = new Date(a.calendarDate);
    const date2 = new Date(b.calendarDate);

    // (YYYY-MM-DD)
    if (date1.getTime() < date2.getTime()) {
      // date1 is lesser than date2
      return -1;
    }
    if (date1.getTime() > date2.getTime()) {
      // date1 is greater than date2
      return 1;
    }
    return 0;
  });

  // console.groupCollapsed("file 2 sorted");
  // console.log("The result file 2:");
  // console.log(file2);
  // console.groupEnd();

  returnFile.push(...file2);
  returnFile.push(...file1);

  returnFile.sort((a, b) => {
    const date1 = new Date(a.calendarDate);
    const date2 = new Date(b.calendarDate);

    // (YYYY-MM-DD)
    if (date1.getTime() < date2.getTime()) {
      // date1 is lesser than date2
      return -1;
    }
    if (date1.getTime() > date2.getTime()) {
      // date1 is greater than date2
      return 1;
    }
    return 0;
  });
  returnFile = returnFile.filter((obj, index) => {
    return index === returnFile.findIndex((o) => obj.calendarDate === o.calendarDate);
  });
  // console.groupCollapsed("Merged files and sorted");
  // console.log("The result:");
  // console.log(returnFile);
  // console.groupEnd();

  return returnFile;
};
export const pormola = (jasonData1, jasonData2, divider) => {
  const returnJasonValue = {
    calendarDate: "",
    distanceInKM: "",
    minHeartRateInBeatsPerMinute: "",
    maxHeartRateInBeatsPerMinute: "",
    averageHeartRateInBeatsPerMinute: "",
    sleepDurationInHours: "",
    deepSleepDurationInHours: "",
    lightSleepDurationInHours: "",
    remSleepInHours: "",
  };
  if (jasonData2 === null && divider !== -1) {
    returnJasonValue.calendarDate = jasonData1.calendarDate;

    returnJasonValue.distanceInKM = (
      parseFloat(jasonData1.distanceInKM, 10) / parseFloat(divider)
    ).toString();

    returnJasonValue.minHeartRateInBeatsPerMinute = (
      parseFloat(jasonData1.minHeartRateInBeatsPerMinute, 10) / parseFloat(divider)
    ).toString();
    returnJasonValue.maxHeartRateInBeatsPerMinute = (
      parseFloat(jasonData1.maxHeartRateInBeatsPerMinute, 10) / parseFloat(divider)
    ).toString();
    returnJasonValue.averageHeartRateInBeatsPerMinute = (
      parseFloat(jasonData1.averageHeartRateInBeatsPerMinute, 10) / parseFloat(divider)
    ).toString();

    returnJasonValue.sleepDurationInHours = (
      parseFloat(jasonData1.sleepDurationInHours, 10) / parseFloat(divider)
    ).toString();
    returnJasonValue.deepSleepDurationInHours = (
      parseFloat(jasonData1.deepSleepDurationInHours, 10) / parseFloat(divider)
    ).toString();
    returnJasonValue.lightSleepDurationInHours = (
      parseFloat(jasonData1.lightSleepDurationInHours, 10) / parseFloat(divider)
    ).toString();
    returnJasonValue.remSleepInHours = (
      parseFloat(jasonData1.remSleepInHours, 10) / parseFloat(divider)
    ).toString();
  } else if (jasonData2 !== null && divider === -1) {
    returnJasonValue.calendarDate = jasonData1.calendarDate;

    returnJasonValue.distanceInKM = (
      parseFloat(jasonData1.distanceInKM, 10) + parseFloat(jasonData2.distanceInKM, 10)
    ).toString();

    returnJasonValue.minHeartRateInBeatsPerMinute = (
      parseFloat(jasonData1.minHeartRateInBeatsPerMinute, 10) +
      parseFloat(jasonData2.minHeartRateInBeatsPerMinute, 10)
    ).toString();
    returnJasonValue.maxHeartRateInBeatsPerMinute = (
      parseFloat(jasonData1.maxHeartRateInBeatsPerMinute, 10) +
      parseFloat(jasonData2.maxHeartRateInBeatsPerMinute, 10)
    ).toString();
    returnJasonValue.averageHeartRateInBeatsPerMinute = (
      parseFloat(jasonData1.averageHeartRateInBeatsPerMinute, 10) +
      parseFloat(jasonData2.averageHeartRateInBeatsPerMinute, 10)
    ).toString();

    returnJasonValue.sleepDurationInHours = (
      parseFloat(jasonData1.sleepDurationInHours, 10) +
      parseFloat(jasonData2.sleepDurationInHours, 10)
    ).toString();
    returnJasonValue.deepSleepDurationInHours = (
      parseFloat(jasonData1.deepSleepDurationInHours, 10) +
      parseFloat(jasonData2.deepSleepDurationInHours, 10)
    ).toString();
    returnJasonValue.lightSleepDurationInHours = (
      parseFloat(jasonData1.lightSleepDurationInHours, 10) +
      parseFloat(jasonData2.lightSleepDurationInHours, 10)
    ).toString();
    returnJasonValue.remSleepInHours = (
      parseFloat(jasonData1.remSleepInHours, 10) + parseFloat(jasonData2.remSleepInHours, 10)
    ).toString();
  } else if (jasonData2 !== null && divider !== -1) {
    console.log("===========");
    returnJasonValue.calendarDate = jasonData1.calendarDate;

    returnJasonValue.distanceInKM = (
      (parseFloat(jasonData1.distanceInKM, 10) + parseFloat(jasonData2.distanceInKM, 10)) /
      parseFloat(divider)
    ).toString();

    returnJasonValue.minHeartRateInBeatsPerMinute = (
      (parseFloat(jasonData1.minHeartRateInBeatsPerMinute, 10) +
        parseFloat(jasonData2.minHeartRateInBeatsPerMinute, 10)) /
      parseFloat(divider)
    ).toString();
    returnJasonValue.maxHeartRateInBeatsPerMinute = (
      (parseFloat(jasonData1.maxHeartRateInBeatsPerMinute, 10) +
        parseFloat(jasonData2.maxHeartRateInBeatsPerMinute, 10)) /
      parseFloat(divider)
    ).toString();
    returnJasonValue.averageHeartRateInBeatsPerMinute = (
      (parseFloat(jasonData1.averageHeartRateInBeatsPerMinute, 10) +
        parseFloat(jasonData2.averageHeartRateInBeatsPerMinute, 10)) /
      parseFloat(divider)
    ).toString();

    returnJasonValue.sleepDurationInHours = (
      (parseFloat(jasonData1.sleepDurationInHours, 10) +
        parseFloat(jasonData2.sleepDurationInHours, 10)) /
      parseFloat(divider)
    ).toString();
    returnJasonValue.deepSleepDurationInHours = (
      (parseFloat(jasonData1.deepSleepDurationInHours, 10) +
        parseFloat(jasonData2.deepSleepDurationInHours, 10)) /
      parseFloat(divider)
    ).toString();
    returnJasonValue.lightSleepDurationInHours = (
      (parseFloat(jasonData1.lightSleepDurationInHours, 10) +
        parseFloat(jasonData2.lightSleepDurationInHours, 10)) /
      parseFloat(divider)
    ).toString();
    returnJasonValue.remSleepInHours = (
      (parseFloat(jasonData1.remSleepInHours, 10) + parseFloat(jasonData2.remSleepInHours, 10)) /
      parseFloat(divider)
    ).toString();
  }
  return returnJasonValue;
};
export const creatMahlakaJasonFile = (AllMahlakaFiles) => {
  if (AllMahlakaFiles.length === 0) {
    return null;
  }
  if (AllMahlakaFiles.length === 1) {
    return AllMahlakaFiles[0].fileJason;
  }
  return merge2Fiels(AllMahlakaFiles[0].fileJason, creatMahlakaJasonFile(AllMahlakaFiles.slice(1)));
};

export const creatPloagJasonFile = (AllMahlakotOfPlogaFiles) => {
  const arrayMahlakot = [];
  const ploga = [];
  let temp = {};
  let j = 0;
  for (let index = 0; index < AllMahlakotOfPlogaFiles.length; index++) {
    arrayMahlakot.push(...AllMahlakotOfPlogaFiles[index]);
  }
  arrayMahlakot.sort((a, b) => {
    const date1 = new Date(a.calendarDate);
    const date2 = new Date(b.calendarDate);

    // (YYYY-MM-DD)
    if (date1.getTime() < date2.getTime()) {
      // date1 is lesser than date2
      return -1;
    }
    if (date1.getTime() > date2.getTime()) {
      // date1 is greater than date2
      return 1;
    }
    return 0;
  });
  console.log(arrayMahlakot);

  for (let index = 0; index < arrayMahlakot.length - 2; index += 2) {
    if (arrayMahlakot[index].calendarDate === arrayMahlakot[index + 1].calendarDate) {
      // console.groupCollapsed("calendarDate");
      // console.log(`arrayMahlakot[index].calendarDate = ${arrayMahlakot[index].calendarDate}`);
      // console.log(
      //   `arrayMahlakot[index + 1].calendarDate = ${arrayMahlakot[index + 1].calendarDate}`
      // );
      // console.log(
      //   `arrayMahlakot[index + 2].calendarDate = ${arrayMahlakot[index + 2].calendarDate}`
      // );

      temp = pormola(arrayMahlakot[index], arrayMahlakot[index + 1], -1);
      // console.groupCollapsed("inner if else if");

      if (ploga.length === 0 || ploga[j] === undefined) {
        // console.log(`in the if (ploga.length === 0 || ploga[j] === undefined)`);
        ploga.push(temp);
      }
      if (arrayMahlakot[index].calendarDate === arrayMahlakot[index + 2].calendarDate) {
        // console.log(
        //   `in the else if (arrayMahlakot[index].calendarDate !== arrayMahlakot[index + 2].calendarDate)`
        // );
        ploga[j] = pormola(ploga[j], arrayMahlakot[index + 2], -1);
      } else if (arrayMahlakot[index].calendarDate !== arrayMahlakot[index + 2].calendarDate) {
        // console.log(
        //   `in the else if (arrayMahlakot[index].calendarDate !== arrayMahlakot[index + 2].calendarDate)`
        // );
        ploga[j] = pormola(ploga[j], null, AllMahlakotOfPlogaFiles.length);
        j++;
      }
      // console.groupEnd();
    } else {
      j++;
      ploga.push(pormola(arrayMahlakot[index], null, AllMahlakotOfPlogaFiles.length));
    }
    console.log(index);
  }
  // console.groupEnd();
  return ploga;
};

export const mainExample = () => {
  console.groupCollapsed("mainExample");

  const allf = [
    {
      _id: "63c523ac4a8a5e2ec1c78c99",
      fileName: "קובץ 12 טוני גולני",
      fileJason: [
        {
          calendarDate: "2022-09-04",
          distanceInKM: "0.116",
          distanceInKM_1: "0.782487805",
          minHeartRateInBeatsPerMinute: "60",
          minHeartRateInBeatsPerMinute_1: "56.85365854",
          maxHeartRateInBeatsPerMinute: "125",
          maxHeartRateInBeatsPerMinute_1: "107.7317073",
          averageHeartRateInBeatsPerMinute: "77",
          averageHeartRateInBeatsPerMinute_1: "77.85365854",
          sleepDurationInHours: "5.917",
          sleepDurationInHours_1: "5.917",
          deepSleepDurationInHours: "2.333",
          deepSleepDurationInHours_1: "2.333",
          lightSleepDurationInHours: "3.783",
          lightSleepDurationInHours_1: "3.783",
          remSleepInHours: "1",
          remSleepInHours_1: "1",
        },
        {
          calendarDate: "2022-09-05",
          distanceInKM: "9.4735",
          distanceInKM_1: "8.036112903",
          minHeartRateInBeatsPerMinute: "65",
          minHeartRateInBeatsPerMinute_1: "64.80645161",
          maxHeartRateInBeatsPerMinute: "129.5",
          maxHeartRateInBeatsPerMinute_1: "124.5806452",
          averageHeartRateInBeatsPerMinute: "83",
          averageHeartRateInBeatsPerMinute_1: "84",
          sleepDurationInHours: "6.8",
          sleepDurationInHours_1: "8.094333333",
          deepSleepDurationInHours: "6.167",
          deepSleepDurationInHours_1: "6.028",
          lightSleepDurationInHours: "0.8",
          lightSleepDurationInHours_1: "2.027666667",
          remSleepInHours: "1",
          remSleepInHours_1: "2",
        },
        {
          calendarDate: "2022-09-06",
          distanceInKM: "11.613",
          distanceInKM_1: "10.97168085",
          minHeartRateInBeatsPerMinute: "48",
          minHeartRateInBeatsPerMinute_1: "51.25531915",
          maxHeartRateInBeatsPerMinute: "133",
          maxHeartRateInBeatsPerMinute_1: "132.4042553",
          averageHeartRateInBeatsPerMinute: "82",
          averageHeartRateInBeatsPerMinute_1: "81.82978723",
          sleepDurationInHours: "5.825",
          sleepDurationInHours_1: "5.744",
          deepSleepDurationInHours: "2.55",
          deepSleepDurationInHours_1: "2.658333333",
          lightSleepDurationInHours: "3.6665",
          lightSleepDurationInHours_1: "3.582444444",
          remSleepInHours: "1",
          remSleepInHours_1: "1.138888889",
        },
        {
          calendarDate: "2022-09-07",
          distanceInKM: "10.581",
          distanceInKM_1: "10.26243478",
          minHeartRateInBeatsPerMinute: "46",
          minHeartRateInBeatsPerMinute_1: "48.36956522",
          maxHeartRateInBeatsPerMinute: "134",
          maxHeartRateInBeatsPerMinute_1: "133.4130435",
          averageHeartRateInBeatsPerMinute: "77",
          averageHeartRateInBeatsPerMinute_1: "79.13043478",
          sleepDurationInHours: "5.883",
          sleepDurationInHours_1: "5.73434375",
          deepSleepDurationInHours: "2.4835",
          deepSleepDurationInHours_1: "2.42965625",
          lightSleepDurationInHours: "3.7915",
          lightSleepDurationInHours_1: "3.82709375",
          remSleepInHours: "1",
          remSleepInHours_1: "1.0625",
        },
        {
          calendarDate: "2022-09-08",
          distanceInKM: "13.4045",
          distanceInKM_1: "12.09497826",
          minHeartRateInBeatsPerMinute: "47",
          minHeartRateInBeatsPerMinute_1: "51.80434783",
          maxHeartRateInBeatsPerMinute: "140",
          maxHeartRateInBeatsPerMinute_1: "137.3913043",
          averageHeartRateInBeatsPerMinute: "84",
          averageHeartRateInBeatsPerMinute_1: "81.30434783",
          sleepDurationInHours: "5.9915",
          sleepDurationInHours_1: "5.83",
          deepSleepDurationInHours: "2.575",
          deepSleepDurationInHours_1: "2.682166667",
          lightSleepDurationInHours: "4.025",
          lightSleepDurationInHours_1: "3.7161",
          remSleepInHours: "1",
          remSleepInHours_1: "1.066666667",
        },
        {
          calendarDate: "2022-09-09",
          distanceInKM: "1.5615",
          distanceInKM_1: "4.049795455",
          minHeartRateInBeatsPerMinute: "46",
          minHeartRateInBeatsPerMinute_1: "50.11363636",
          maxHeartRateInBeatsPerMinute: "125",
          maxHeartRateInBeatsPerMinute_1: "115.8409091",
          averageHeartRateInBeatsPerMinute: "77",
          averageHeartRateInBeatsPerMinute_1: "75",
          sleepDurationInHours: "5.7915",
          sleepDurationInHours_1: "5.438833333",
          deepSleepDurationInHours: "2.325",
          deepSleepDurationInHours_1: "2.429166667",
          lightSleepDurationInHours: "3.6585",
          lightSleepDurationInHours_1: "3.309583333",
          remSleepInHours: "1",
          remSleepInHours_1: "1",
        },
      ],
    },
  ];
  const allf2 = [
    {
      _id: "63c523ac4a8a5e2ec1c78c99",
      fileName: "קובץ 12 טוני גולני",
      fileJason: [
        {
          calendarDate: "2022-09-04",
          distanceInKM: "0.116",
          distanceInKM_1: "0.782487805",
          minHeartRateInBeatsPerMinute: "60",
          minHeartRateInBeatsPerMinute_1: "56.85365854",
          maxHeartRateInBeatsPerMinute: "125",
          maxHeartRateInBeatsPerMinute_1: "107.7317073",
          averageHeartRateInBeatsPerMinute: "77",
          averageHeartRateInBeatsPerMinute_1: "77.85365854",
          sleepDurationInHours: "5.917",
          sleepDurationInHours_1: "5.917",
          deepSleepDurationInHours: "2.333",
          deepSleepDurationInHours_1: "2.333",
          lightSleepDurationInHours: "3.783",
          lightSleepDurationInHours_1: "3.783",
          remSleepInHours: "1",
          remSleepInHours_1: "1",
        },
        {
          calendarDate: "2022-09-05",
          distanceInKM: "9.4735",
          distanceInKM_1: "8.036112903",
          minHeartRateInBeatsPerMinute: "65",
          minHeartRateInBeatsPerMinute_1: "64.80645161",
          maxHeartRateInBeatsPerMinute: "129.5",
          maxHeartRateInBeatsPerMinute_1: "124.5806452",
          averageHeartRateInBeatsPerMinute: "83",
          averageHeartRateInBeatsPerMinute_1: "84",
          sleepDurationInHours: "6.8",
          sleepDurationInHours_1: "8.094333333",
          deepSleepDurationInHours: "6.167",
          deepSleepDurationInHours_1: "6.028",
          lightSleepDurationInHours: "0.8",
          lightSleepDurationInHours_1: "2.027666667",
          remSleepInHours: "1",
          remSleepInHours_1: "2",
        },
        {
          calendarDate: "2022-09-06",
          distanceInKM: "11.613",
          distanceInKM_1: "10.97168085",
          minHeartRateInBeatsPerMinute: "48",
          minHeartRateInBeatsPerMinute_1: "51.25531915",
          maxHeartRateInBeatsPerMinute: "133",
          maxHeartRateInBeatsPerMinute_1: "132.4042553",
          averageHeartRateInBeatsPerMinute: "82",
          averageHeartRateInBeatsPerMinute_1: "81.82978723",
          sleepDurationInHours: "5.825",
          sleepDurationInHours_1: "5.744",
          deepSleepDurationInHours: "2.55",
          deepSleepDurationInHours_1: "2.658333333",
          lightSleepDurationInHours: "3.6665",
          lightSleepDurationInHours_1: "3.582444444",
          remSleepInHours: "1",
          remSleepInHours_1: "1.138888889",
        },
        {
          calendarDate: "2022-09-07",
          distanceInKM: "10.581",
          distanceInKM_1: "10.26243478",
          minHeartRateInBeatsPerMinute: "46",
          minHeartRateInBeatsPerMinute_1: "48.36956522",
          maxHeartRateInBeatsPerMinute: "134",
          maxHeartRateInBeatsPerMinute_1: "133.4130435",
          averageHeartRateInBeatsPerMinute: "77",
          averageHeartRateInBeatsPerMinute_1: "79.13043478",
          sleepDurationInHours: "5.883",
          sleepDurationInHours_1: "5.73434375",
          deepSleepDurationInHours: "2.4835",
          deepSleepDurationInHours_1: "2.42965625",
          lightSleepDurationInHours: "3.7915",
          lightSleepDurationInHours_1: "3.82709375",
          remSleepInHours: "1",
          remSleepInHours_1: "1.0625",
        },
        {
          calendarDate: "2022-09-08",
          distanceInKM: "13.4045",
          distanceInKM_1: "12.09497826",
          minHeartRateInBeatsPerMinute: "47",
          minHeartRateInBeatsPerMinute_1: "51.80434783",
          maxHeartRateInBeatsPerMinute: "140",
          maxHeartRateInBeatsPerMinute_1: "137.3913043",
          averageHeartRateInBeatsPerMinute: "84",
          averageHeartRateInBeatsPerMinute_1: "81.30434783",
          sleepDurationInHours: "5.9915",
          sleepDurationInHours_1: "5.83",
          deepSleepDurationInHours: "2.575",
          deepSleepDurationInHours_1: "2.682166667",
          lightSleepDurationInHours: "4.025",
          lightSleepDurationInHours_1: "3.7161",
          remSleepInHours: "1",
          remSleepInHours_1: "1.066666667",
        },
      ],
    },
  ];
  const allf3 = [
    {
      _id: "63c523ac4a8a5e2ec1c78c99",
      fileName: "קובץ 12 טוני גולני",
      fileJason: [
        {
          calendarDate: "2022-09-04",
          distanceInKM: "0.116",
          distanceInKM_1: "0.782487805",
          minHeartRateInBeatsPerMinute: "60",
          minHeartRateInBeatsPerMinute_1: "56.85365854",
          maxHeartRateInBeatsPerMinute: "125",
          maxHeartRateInBeatsPerMinute_1: "107.7317073",
          averageHeartRateInBeatsPerMinute: "77",
          averageHeartRateInBeatsPerMinute_1: "77.85365854",
          sleepDurationInHours: "5.917",
          sleepDurationInHours_1: "5.917",
          deepSleepDurationInHours: "2.333",
          deepSleepDurationInHours_1: "2.333",
          lightSleepDurationInHours: "3.783",
          lightSleepDurationInHours_1: "3.783",
          remSleepInHours: "1",
          remSleepInHours_1: "1",
        },
        {
          calendarDate: "2022-09-05",
          distanceInKM: "9.4735",
          distanceInKM_1: "8.036112903",
          minHeartRateInBeatsPerMinute: "65",
          minHeartRateInBeatsPerMinute_1: "64.80645161",
          maxHeartRateInBeatsPerMinute: "129.5",
          maxHeartRateInBeatsPerMinute_1: "124.5806452",
          averageHeartRateInBeatsPerMinute: "83",
          averageHeartRateInBeatsPerMinute_1: "84",
          sleepDurationInHours: "6.8",
          sleepDurationInHours_1: "8.094333333",
          deepSleepDurationInHours: "6.167",
          deepSleepDurationInHours_1: "6.028",
          lightSleepDurationInHours: "0.8",
          lightSleepDurationInHours_1: "2.027666667",
          remSleepInHours: "1",
          remSleepInHours_1: "2",
        },
        {
          calendarDate: "2022-09-06",
          distanceInKM: "11.613",
          distanceInKM_1: "10.97168085",
          minHeartRateInBeatsPerMinute: "48",
          minHeartRateInBeatsPerMinute_1: "51.25531915",
          maxHeartRateInBeatsPerMinute: "133",
          maxHeartRateInBeatsPerMinute_1: "132.4042553",
          averageHeartRateInBeatsPerMinute: "82",
          averageHeartRateInBeatsPerMinute_1: "81.82978723",
          sleepDurationInHours: "5.825",
          sleepDurationInHours_1: "5.744",
          deepSleepDurationInHours: "2.55",
          deepSleepDurationInHours_1: "2.658333333",
          lightSleepDurationInHours: "3.6665",
          lightSleepDurationInHours_1: "3.582444444",
          remSleepInHours: "1",
          remSleepInHours_1: "1.138888889",
        },
        {
          calendarDate: "2022-09-07",
          distanceInKM: "10.581",
          distanceInKM_1: "10.26243478",
          minHeartRateInBeatsPerMinute: "46",
          minHeartRateInBeatsPerMinute_1: "48.36956522",
          maxHeartRateInBeatsPerMinute: "134",
          maxHeartRateInBeatsPerMinute_1: "133.4130435",
          averageHeartRateInBeatsPerMinute: "77",
          averageHeartRateInBeatsPerMinute_1: "79.13043478",
          sleepDurationInHours: "5.883",
          sleepDurationInHours_1: "5.73434375",
          deepSleepDurationInHours: "2.4835",
          deepSleepDurationInHours_1: "2.42965625",
          lightSleepDurationInHours: "3.7915",
          lightSleepDurationInHours_1: "3.82709375",
          remSleepInHours: "1",
          remSleepInHours_1: "1.0625",
        },
        {
          calendarDate: "2022-09-08",
          distanceInKM: "13.4045",
          distanceInKM_1: "12.09497826",
          minHeartRateInBeatsPerMinute: "47",
          minHeartRateInBeatsPerMinute_1: "51.80434783",
          maxHeartRateInBeatsPerMinute: "140",
          maxHeartRateInBeatsPerMinute_1: "137.3913043",
          averageHeartRateInBeatsPerMinute: "84",
          averageHeartRateInBeatsPerMinute_1: "81.30434783",
          sleepDurationInHours: "5.9915",
          sleepDurationInHours_1: "5.83",
          deepSleepDurationInHours: "2.575",
          deepSleepDurationInHours_1: "2.682166667",
          lightSleepDurationInHours: "4.025",
          lightSleepDurationInHours_1: "3.7161",
          remSleepInHours: "1",
          remSleepInHours_1: "1.066666667",
        },
      ],
    },
  ];
  const mahlkot = [];
  mahlkot.push(creatMahlakaJasonFile(allf));
  mahlkot.push(creatMahlakaJasonFile(allf2));
  mahlkot.push(creatMahlakaJasonFile(allf3));
  console.log(creatPloagJasonFile(mahlkot));
  console.groupEnd();
};
