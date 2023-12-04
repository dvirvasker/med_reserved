/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
// import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import { signin, authenticate, isAuthenticated } from "auth/index";
import { useEffect, useState } from "react";
import axios from "axios";
import MDButton from "components/MDButton";
import { Link, useParams } from "react-router-dom";
import { ConstructionOutlined } from "@mui/icons-material";

export default function data() {
  const params = useParams();
  const [isError, setIsError] = useState(false);
  const [requestDB, setRequestDB] = useState([]);
  const [originaldata, setOriginaldata] = useState([]);
  const [unit, setUnit] = useState([]);
  const [job, setJob] = useState([]);
  const [subject, setSubject] = useState([]);
  const [errorDB, setErrorDB] = useState(false);
  const [formData, setFormData] = useState({});
  const [error404, setError404] = useState(false);
  const [isInfoPressed, setIsInfoPressed] = useState(false);
  const [iscardataformopen, setIscardataformopen] = useState(false);
  const [pressedID, setpressedID] = useState("");
  const { user } = isAuthenticated();
  const textPlaceHolderInputs = [
    "יחידה",
    "ענף",
    "מדור",
    "נייד",
    "שם העבודה",
    "סיווג העבודה",
    "שיטת כריכה",
    "שיטת  צילום",
    "כמות עותקים",
    "שם מוסר העבודה",
    "תאריך מסירת העבודה",
    "שם מקבל העבודה",
    "קובץ להדפסה",
    "סוג דף",
    "תאריך קבלת העבודה",
  ];
  const clearanceOptions = ['בלמ"ס', "שמור", "סודי", "סודי ביותר"];
  // const bindingTypes = ["הידוק", "ספירלה", "חירור", "אחר"];
  // const copyTypes = ["שחור לבן דו צדדי", "צבעוני יחיד", "צבעוני דו צדדי", "שחור לבן יחיד"];
  // const pageTypes = { A4: "A4", A3: "A3", A4b: "A4 בריסטול", A3b: "A3 בריסטול" };
  const MINUTE_MS = 100000;

  async function CalculateDataArr() {
    await axios
      .get(`http://localhost:8000/api/reservevisits`)
      .then((response) => {
        console.log(user);
        if (user.role === "0") {
          setRequestDB(response.data);
          setOriginaldata(response.data);
        } else if (user.role === "2") {
          axios
            .get(`http://localhost:8000/api/unitsByRegion/${user.region}`)
            .then((res) => {
              console.log(res.data);
              console.log(response.data);

              const arrayres = [];
              for (let j = 0; j < response.data.length; j += 1) {
                for (let i = 0; i < res.data.length; i += 1) {
                  console.log(res.data[i]._id);
                  console.log(response.data[j].unit);

                  if (res.data[i]._id === response.data[j].unit) {
                    arrayres.push(response.data[j]);
                  }
                }
              }
              // for(let i=0;i<=response.data.length;i++){
              // 	for(let j=0;j<=res.data.length;j++){
              // 		if(res.data[j]._id==response.data[i].unit){
              // 			array.push(response.data[i]);
              // 		}
              // 	}
              // }
              console.log(arrayres);
              setRequestDB(arrayres);
              setOriginaldata(arrayres);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setRequestDB(response.data.filter((item) => item.unit === user.unit));
          setOriginaldata(response.data.filter((item) => item.unit === user.unit));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getUnit = async () => {
    let typeUser = "";
    let url = "units";
    if (user.role === "0") {
      typeUser = "";
    } else if (user.role === "1") {
      typeUser = user.unit;
    } else if (user.role === "2") {
      url = "unitsByRegion";
      typeUser = user.region;
    }
    // let arrayunit = [];
    await axios
      .get(`http://localhost:8000/api/${url}/${typeUser}`)
      .then((res) => {
        // if(user.role == "0" || user.role == "2"){
        // setUnit(res.data);
        // } else if(user.role == "1"){
        // arrayunit.push(res.data);
        setUnit(res.data);
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getJob = async () => {
    await axios
      .get("http://localhost:8000/api/job")
      .then((response) => {
        setJob(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSubject = async () => {
    await axios
      .get("http://localhost:8000/api/subject")
      .then((response) => {
        setSubject(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDaysDiff = (dateToCheck) => {
    const day = new Date().getDate();
    const mounth = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const currentDate = Date.parse(`${year}-${mounth}-${day}`);

    // console.log(dateToCheck);
    // console.log(`${year}-${mounth}-${day}`);
    // console.log(currentDate);
    // console.log(Date.parse(dateToCheck));
    const diff = Math.abs(currentDate - Date.parse(dateToCheck)) / (1000 * 3600 * 24);
    // console.log(diff);
    return diff;
  };

  const getname = (idnum, arr) => {
    console.log(idnum);
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i]._id === idnum) return arr[i].name;
    }
    return null;
  };

  function init() {
    CalculateDataArr();
  }

  useEffect(() => {
    if (!iscardataformopen) {
      CalculateDataArr();
    }
  }, [iscardataformopen]);

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  const getWorkStuts = (value) => {
    let stutus = "נשלח";
    let color = "error";
    if (value === 25) {
      stutus = "בקשה נשלחה";
      color = "error";
    } else if (value === 50) {
      stutus = "התקבל במערכת";
      color = "mekatnar";
    } else if (value === 75) {
      stutus = "בהדפסה";
      color = "mekatnar";
    } else if (value === 100) {
      stutus = "מוכן לאיסוף";
      color = "success";
    } else if (value === 125) {
      stutus = "נאסף";
      color = "success";
    } else if (value === 150) {
      stutus = "העבודה נדחתה";
      color = "error";
    }
    return [stutus, color];
  };
  const setTypeRequest = (type) => {
    let typeName = "";
    let color = "mekatnar";
    if (type === true) {
      typeName = "כן";
      color = "success";
    } else if (type === false) {
      typeName = "לא";
      color = "error";
    }
    return [typeName, color];
  };

  const dbRows = requestDB.map((hozla, index) => ({
    // project: <Project image={LogoAsana} name="Asana" />,
    name: hozla.name,
    family: hozla.family,
    // typeRequest: (
    //   <>
    //     <MDBadge
    //       badgeContent={setTypeRequest(hozla.typeRequest)[0]}
    //       color={setTypeRequest(hozla.typeRequest)[1]}
    //       size="sm"
    //       container
    //     />
    //   </>
    // ),
    civilianNumber: hozla.civilian_number,
    personalNumber: hozla.personal_number,
    present: (
      <>
        <MDBadge
          badgeContent={setTypeRequest(hozla.present)[0]}
          color={setTypeRequest(hozla.present)[1]}
          size="sm"
          container
        />
      </>
    ),
    todayPresent: (
      <>
        <MDBadge
          badgeContent={setTypeRequest(hozla.todayPresent)[0]}
          color={setTypeRequest(hozla.todayPresent)[1]}
          size="sm"
          container
        />
      </>
    ),
    dailSent: (
      <>
        <MDBadge
          badgeContent={setTypeRequest(hozla.dailSent)[0]}
          color={setTypeRequest(hozla.dailSent)[1]}
          size="sm"
          container
        />
      </>
    ),
    shamapOpen: (
      <>
        <MDBadge
          badgeContent={setTypeRequest(hozla.shamapOpen)[0]}
          color={setTypeRequest(hozla.shamapOpen)[1]}
          size="sm"
          container
        />
      </>
    ),
    subject: getname(hozla.subject, subject),
    job: getname(hozla.job, job),
    ta: hozla.ta,
    details: hozla.details,
    unit: getname(hozla.unit, unit),
    status: (
      <>
        <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
          {getWorkStuts(hozla.status)[0]}
        </MDTypography>
        <Progress
          variant="gradient"
          color={getWorkStuts(hozla.status)[1]}
          value={hozla.status >= 125 ? 100 : hozla.status}
        />
      </>
    ),
    NameRequester: hozla.fullNameAsker,
    // diliveryDate: hozla.workRecivedDate.split("T")[0],
    update: (
      <Link to={`/${setTypeRequest(hozla.typeRequest)[2]}/${hozla._id}`} key={hozla._id}>
        <MDButton
          variant="gradient"
          color="info"
          // onClick={() => {
          //   // setIsInfoPressed(true);
          //   // setpressedID(hozla._id);
          // }}
          circular="true"
          iconOnly="true"
          size="medium"
        >
          <Icon>edit</Icon>
        </MDButton>
      </Link>
    ),
    delete: (
      <Link to={`/adminFeild/${hozla._id}`} key={hozla._id}>
        <MDButton
          variant="gradient"
          color="secondary"
          // onClick={() => {
          //   // setIsInfoPressed(true);
          //   // setpressedID(hozla._id);
          // }}
          circular="true"
          iconOnly="true"
          size="medium"
        >
          <Icon>delete</Icon>
        </MDButton>
      </Link>
    ),
  }));

  useEffect(() => {
    getUnit();
    init();
    getJob();

    // -------- באמרי להוריד מהערה -------
    getSubject();
    // --------------------------------
  }, []);

  console.log(`isError ${isError}`);
  return {
    //* the tables headers
    columns: [
      { Header: "שם", accessor: "name", align: "center" },
      { Header: "שם משפחה", accessor: "family", align: "center" },
      { Header: "תעודת זהות", accessor: "civilianNumber", align: "center" },
      { Header: "מספר אישי", accessor: "personalNumber", align: "center" },
      { Header: "התייצב", accessor: "present", align: "center" },
      { Header: "התייצב היום", accessor: "todayPresent", align: "center" },
      { Header: "נשלח חייגן", accessor: "dailSent", align: "center" },
      { Header: "נפצח שמ``מ", accessor: "shamapOpen", align: "center" },
      { Header: "מקצוע", accessor: "subject", align: "center" },
      { Header: "תפקיד", accessor: "job", align: "center" },
      { Header: "יחידה", accessor: "unit", align: "center" },
      { Header: "תא", accessor: "ta", align: "center" },
      { Header: "הערות", accessor: "details", align: "center" },
      { Header: "עדכן", accessor: "update", align: "center" },
      { Header: "מחק", accessor: "delete", align: "center" },
    ],

    rows: dbRows,
    dbError: isError,
    setDBerror: setIsError,
  };
}
