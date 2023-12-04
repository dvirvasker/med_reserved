/* eslint-disable import/no-unresolved */
/* eslint-disable no-lonely-if */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-use-before-define */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable consistent-return */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

// TODO check mult-files
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import Popup from "reactjs-popup";
import Dropzone from "react-dropzone-uploader";
import NativeSelect from "@mui/material/NativeSelect";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { Upload } from "antd-upload";
// import { multipleFilesUpload } from "../../data/api";

import {
  // Button,
  Card,
  CardHeader,
  Container,
  CardBody,
  FormGroup,
  Form,
  FormText,
  InputGroupAddon,
  Input,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Label,
} from "reactstrap";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { ToastContainer, toast, Icons } from "react-toastify";
import { useDropzone } from "react-dropzone";
import "react-toastify/dist/ReactToastify.css";

// Material Dashboard 2 React Components
import MDAlert from "components/MDAlert";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Select,
} from "@mui/material";
import { DropzoneArea } from "react-mui-dropzone";
import { DropzoneAreaBase } from "material-ui-dropzone";

// for file upload from Data
import { singleFileUpload } from "Data/api";
import * as XLSX from "xlsx";

// user and auth import
import { signin, authenticate, isAuthenticated } from "auth/index";
import excelHeaderFileCheckList from "constValue/excelHeaderFileCheckList";
import excelANAExample from "../../assets/images/excelANAExample.png";
// import { merge2Fiels } from "merageJasonExcelFiels";
const { user } = isAuthenticated();

// console.log("Hozla Print Request Form");
// console.log(user);

export default function HozlaPrintRequestForm() {
  const currentDate = new Date();
  // const newDataFile = {};
  // const dbDataFile = {};
  console.log(currentDate);
  let dateString = "";
  let minDateString = "";
  if (currentDate.getMonth() + 1 >= 10) {
    if (currentDate.getDate() >= 10) {
      dateString = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`;
    } else {
      dateString = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-0${currentDate.getDate()}`;
    }
  } else {
    if (currentDate.getDate() >= 10) {
      dateString = `${currentDate.getFullYear()}-0${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`;
    } else {
      dateString = `${currentDate.getFullYear()}-0${
        currentDate.getMonth() + 1
      }-0${currentDate.getDate()}`;
    }
  }
  if (currentDate.getMonth() + 1 >= 10) {
    if (currentDate.getDate() + 1 >= 10) {
      minDateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${
        currentDate.getDate() + 1
      }`;
    } else {
      minDateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-0${
        currentDate.getDate() + 1
      }`;
    }
  } else {
    if (currentDate.getDate() + 1 >= 10) {
      minDateString = `${currentDate.getFullYear()}-0${currentDate.getMonth() + 1}-${
        currentDate.getDate() + 1
      }`;
    } else {
      minDateString = `${currentDate.getFullYear()}-0${currentDate.getMonth() + 1}-0${
        currentDate.getDate() + 1
      }`;
    }
  }
  // const [items, setItems] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [file, setFile] = useState([]);
  const [data, setData] = useState({
    work_id: "",
    unit: "",
    anaf: "",
    mador: "",
    phoneNumber: "",

    workName: "",
    workClearance: "1",
    bindingType: "0",
    bindingTypeOther: "",
    copyType: "b&w2",
    numOfCopyies: 1,

    fullNameAsker: "",
    fullNameTakein: "",
    workGivenDate: dateString,

    fullNameReciver: "",
    workRecivedDate: minDateString,

    personalnumber: user.personalnumber,
    id_files: "",
    // role: "",
    rangeOfDates: "",
    dataFile: "",

    files_id: "",

    pageType: "A4",

    ordernum: "",
    clientNote: "",
    fileName: "",

    errortype: "",
    // propPrint: {
    //   nameFile: "",
    //   props: {
    //     propPageType: "A4",
    //     propCopyType: "b&w2",
    //   },
    // },
    error: false,
    errorFile: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });
  const [propPrint, setPropPrint] = useState([]); // {
  // nameFile: ``,
  // props: {
  // propPageType: "A4",
  // propCopyType: "b&w2",
  // },
  // },
  // const [textArea, setTextArea] = useState("");
  const [files, setFiles] = useState([]);
  const [open, setOpen] = React.useState(false);
  const { getRootProps, getInputProps } = useDropzone({});
  const [getDataMergeFiles, setGetDataMergeFiles] = useState();
  const inputRef = React.useRef(null);

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
    "שם מזמין העבודה",
    "תאריך העלאת קובץ",
    "שם מקבל העבודה",
    "קובץ להדפסה",
    "סוג דף",
    "תאריך נדרש לקבלת העבודה",
    "שם אוסף העבודה",
    "היסטוריית אירועים",
  ];
  useEffect(() => {
    // Update the document title using the browser API
    console.log(`You upload ${files.length} files`);
  });
  const calDate = (value) => {
    const [dateValues, timeValues] = value?.split(" ") || "  " || "   " || ` ` || [];
    const [day, month, year] = dateValues.split("/");
    const [hours, minutes, seconds] = timeValues.split(":");
    // console.log("date");
    // console.log(day, month, year);
    // console.log(hours, minutes, seconds);
    const date = new Date(+year, month - 1, +day, +hours, +minutes, +seconds);
    // console.log(date[Symbol.toPrimitive]("number"));
    return date[Symbol.toPrimitive]("number");
  };

  const handleUploadFiles = (uploadFiles) => {
    const uploaded = [...files];
    let flag = true;
    const ErrorReason = [];
    let limitExceeded = false;
    if (uploaded.length < 1) {
      uploadFiles.some((filePush, index) => {
        if (uploaded.findIndex((f) => f.name === filePush.name) === -1) {
          if (
            filePush.type === "application/vnd.ms-excel" ||
            filePush.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          ) {
            uploaded.push(filePush);
            // console.log(filePush.name);
            // setData({ ...data, fileName: "filePush.name" });
            // const newfield = {
            //   nameFile: `${filePush.name}`,
            //   propCopyType: "b&w2",
            //   propPageType: "A4",
            // };

            // setPropPrint([...propPrint, newfield]);
            // setPropPrint([
            //   {
            //     ...propPrint[index],
            //     nameFile: `${filePush.name}`,
            //     propCopyType: "b&w2",
            //     propPageType: "A4",
            //   },
            // ]);
            console.log(propPrint);
          } else {
            flag = false;

            ErrorReason.push(`לא תקין ${filePush.name} קובץ`);
            if (flag !== true) {
              ErrorReason.forEach((reason) => {
                toast.error(reason);
                return false;
                // setData({ ...data, loading: false, successmsg: false, error: true });
              });
            } else {
              return true;
              // setData({ ...data, loading: false, successmsg: true, error: false });
            }
          }

          // console.log("file name: " + data.propPrint.nameFile);
          // setPropPrint({ ...propPrint, nameFile: filePush.name });
          // setTextArea({ ...textArea, nameFiletxt: filePush.name });

          // if (uploaded.length === MAX_COUNT) setFileLimit(true);
        } else if (uploaded.length < 0) {
          // alert(`You can only add a maximum of ${MAX_COUNT} files`);
          // setFileLimit(false);
          limitExceeded = false;
          return false;
        }
        return setFiles(uploaded);
      });
    } else {
      limitExceeded = false;
    }

    if (!limitExceeded) setFiles(uploaded);
  };

  const setRangeOfDates = (fileData) => {
    // const ErrorReason = [];
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(fileData);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const dataFile = XLSX.utils.sheet_to_json(ws);

        console.log(dataFile);
        resolve(dataFile);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      // if (d[0]["היסטוריית אירועים"]) {
      console.log("excelHeaderFileCheckList");
      console.log(excelHeaderFileCheckList);
      if (
        d[1].__EMPTY !== undefined &&
        d[1].__EMPTY === excelHeaderFileCheckList.__EMPTY &&
        d[1].__EMPTY_1 !== undefined &&
        d[1].__EMPTY_1 === excelHeaderFileCheckList.__EMPTY_1 &&
        d[1].__EMPTY_2 !== undefined &&
        d[1].__EMPTY_2 === excelHeaderFileCheckList.__EMPTY_2 &&
        d[1].__EMPTY_3 !== undefined &&
        d[1].__EMPTY_3 === excelHeaderFileCheckList.__EMPTY_3 &&
        d[1].__EMPTY_4 !== undefined &&
        d[1].__EMPTY_4 === excelHeaderFileCheckList.__EMPTY_4 &&
        d[1].__EMPTY_5 !== undefined &&
        d[1].__EMPTY_5 === excelHeaderFileCheckList.__EMPTY_5 &&
        d[1].__EMPTY_6 !== undefined &&
        d[1].__EMPTY_6 === excelHeaderFileCheckList.__EMPTY_6 &&
        d[1].__EMPTY_7 !== undefined &&
        d[1].__EMPTY_7 === excelHeaderFileCheckList.__EMPTY_7 &&
        d[1].__EMPTY_8 !== undefined &&
        d[1].__EMPTY_8 === excelHeaderFileCheckList.__EMPTY_8 &&
        d[1].__EMPTY_9 !== undefined &&
        d[1].__EMPTY_9 === excelHeaderFileCheckList.__EMPTY_9 &&
        d[1].__EMPTY_10 !== undefined &&
        d[1].__EMPTY_10 === excelHeaderFileCheckList.__EMPTY_10 &&
        d[1].__EMPTY_11 !== undefined &&
        d[1].__EMPTY_11 === excelHeaderFileCheckList.__EMPTY_11 &&
        d[1].__EMPTY_12 !== undefined &&
        d[1].__EMPTY_12 === excelHeaderFileCheckList.__EMPTY_12
      ) {
        console.log("success");
        console.log(d[0]["היסטוריית אירועים"]);
        setData({ ...data, rangeOfDates: d[0]["היסטוריית אירועים"], dataFile: d.slice(2) });
      } else {
        let flag = true;
        const ErrorReason = [];

        // if (files.length === 0) {
        flag = false;
        ErrorReason.push("קובץ לא תקין");
        // toast.error(ErrorReason);
        // }
        if (flag !== true) {
          ErrorReason.forEach((reason) => {
            toast.error(reason);
            return false;
          });
        } else {
          return true;
        }
        // ErrorReason.forEach((reason) => {
        //   toast.error(reason);
        //   return false;
        //   // setData({ ...data, loading: false, successmsg: false, error: true });
        // });
        setFiles([]);
      }
    });
    console.log(data.rangeOfDates);
  };

  const handleFileEvent = (e) => {
    e.preventDefault();
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
    setRangeOfDates(e.target.files[0]);
    console.log(files);
  };
  const deleteFile1 = (i) => {
    const index = files.indexOf(i);

    const x = files.splice(index, 1);
    setFiles(files);
    console.log(x);
  };
  const handleRemove = (e) => {
    const array = [...files]; // make a separate copy of the array
    const index = array.indexOf(e.target.value);
    if (index !== -1) {
      array.splice(index, 1);
      setFiles(array);
      console.log(`remove file: ${files}`);
    }
    // const newFiles = files.filter((file) => file !== deleteFile);
    // setFiles(newFiles);
  };
  function handleChange(evt) {
    const { value } = evt.target;
    setData({ ...data, [evt.target.name]: value });
  }
  function handleChangePropPrintFile(evt) {
    const { value } = evt.target;
    setData({ ...propPrint, [evt.target.name]: value });
  }
  function handleChangeTxtAera(evt) {
    const { value } = evt.target;
    setData({ ...data, [evt.target.name]: value });
  }
  const handleChangeNumPrintTH = (index) => (evt) => {
    // const { name } = evt.target;
    // setToraHeilitVolume({ ...toraHeilitVolume, [evt.target.name]: value });
    const newPropPrint = [...propPrint]; // copying the old datas array
    // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.
    newPropPrint[index].propPageType = evt.target.value; // replace e.target.value with whatever you want to change it to

    setPropPrint(newPropPrint);
    console.log(newPropPrint);
  };
  const handleChangeCopyPrintTH = (index) => (evt) => {
    // const { name } = evt.target;
    // setToraHeilitVolume({ ...toraHeilitVolume, [evt.target.name]: value });
    const newPropPrint = [...propPrint]; // copying the old datas array
    // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.
    newPropPrint[index].propCopyType = evt.target.value; // replace e.target.value with whatever you want to change it to

    setPropPrint(newPropPrint);
    console.log(newPropPrint);
  };
  // const UploadFile = async (filenameindb) => {
  //   const formData = new FormData();
  //   formData.append("files", multipleFiles);
  //   await singleFileUpload(formData, "assessment", filenameindb);
  // };

  // const onFilesChange = (event) => {
  // const onFilesChange = (e) => {
  //   const { value } = e.target.files[0];

  //   if (e.target.files && e.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setFiles(e.target.result);
  //       multipleFilesUpload(e.target.files);
  //       // setData({ ...data, [data.files]: e.target.result });
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  //   e.preventDefault();
  //   // if (e.target.files && e.target.files[0]) {
  //   // setFiles(e.target.files[0]);
  //   handleFile(e.target.files);
  //   // }
  //   // // setData({ ...data, files: value });
  //   console.log(files);
  // };
  // const fileRemove = (el) => {
  //   const updateList = [...files, newFlie];
  //   updateList.splice(files.indexOf(el), 1);
  //   setFiles(updateList);
  //   handleFileEvent(updateList);
  // };

  const onSubmit = (event) => {
    event.preventDefault();
    if (CheckSignUpForm(event)) {
      SendFormData(event);
    }
  };
  // const CheckFile = () => {
  //   let flag = true;
  //   const ErrorReason = [];

  //   // if (files.length === 0) {
  //   //   flag = false;
  //     ErrorReason.push("קובץ לא תקין");
  //     // toast.error(ErrorReason);
  //   // }
  //   if (flag !== true) {
  //     ErrorReason.forEach((reason) => {
  //       toast.error(reason);
  //       return false;
  //     });
  //   } else {
  //     return true;
  //   }
  // }
  const CheckSignUpForm = (event) => {
    event.preventDefault();
    let flag = true;
    const ErrorReason = [];

    if (files.length === 0) {
      flag = false;
      ErrorReason.push("קובץ לא הועלה");
      // toast.error(ErrorReason);
    }
    if (flag !== true) {
      ErrorReason.forEach((reason) => {
        toast.error(reason);
        return false;
      });
    } else {
      return true;
    }
  };

  const SendFormData = (event) => {
    // CreateAssessmentData();
    event.preventDefault();
    setData({
      ...data,
      loading: true,
      successmsg: false,
      error: false,
      errorFile: false,
      NavigateToReferrer: false,
    });
    console.log(`files: ${files}`);
    //* Sending only the files to the DB
    //! the separating code lines from singlefile to multifiles
    const formFilesData = new FormData();
    Object.keys(files).forEach((key) => {
      formFilesData.append("files", files[key]);
    });
    console.log(files[0].name);
    // for (const key of Object.keys(files)) {
    //   formFilesData.append("files", files[key]);
    // }
    // axios.post("http://localhost:5000/api/multipleFiles", formFilesData, {}).then((res) => {
    //   console.log("from the file axios");
    //   console.log(res.data);

    //   const excelData = {
    //     // numPages: 1,
    //     personalnumber: data.personalnumber,
    //     excelDataMerage: data.dataFile,
    //   };
    //   // const personalnumber = {
    //   //   personalnumber: data.personalnumber,
    //   // };
    //   const newDataFile = data.dataFile;
    //   // console.log("newDataFile");
    //   console.log(newDataFile);

    //   axios
    //     .get(`http://localhost:5000/NgCar/MerageAnaExcelData/getDataMergeFiles`)
    //     .then((responsePN) => {
    //       console.log(responsePN.data);
    //       if (responsePN.data.length === 0) {
    //         axios
    //           .post(`http://localhost:5000/NgCar/MerageAnaExcelData/add`, excelData)
    //           .then((responseData) => {
    //             setData({
    //               ...data,
    //               // work_id: res.data,
    //               fileName: files[0].name,
    //               loading: false,
    //               error: false,
    //               errorFile: false,
    //               successmsg: true,
    //               NavigateToReferrer: false,
    //             });
    //             console.log(responsePN.data);
    //           })
    //           .catch((error) => {
    //             // console.log(error);
    //             setData({
    //               ...data,
    //               errortype: error.response,
    //               loading: false,
    //               error: true,
    //               errorFile: false,
    //               NavigateToReferrer: false,
    //             });
    //           });
    //       } else {
    //         // setGetDataMergeFiles({
    //         //   ...data.dataFile,
    //         //   ...JSON.stringify(responsePN.data[0].excelDataMerage),
    //         // });
    //         // console.log(responsePN.data[0].excelDataMerage);
    //         // if()
    //         const dbDataFile = responsePN.data[0].excelDataMerage;
    //         const updateDataFile = newDataFile.concat(dbDataFile);
    //         const uniqueData = Array.from(new Set(updateDataFile.map(JSON.stringify))).map(
    //           JSON.parse
    //         );
    //         /* eslint no-underscore-dangle: 0 */
    //         uniqueData.sort((el1, el2) => calDate(el1.__EMPTY_7) - calDate(el2.__EMPTY_7));

    //         console.log("updateDataFile");
    //         console.log(updateDataFile);
    //         const excelDataMerage = {
    //           // numPages: 1,
    //           personalnumber: data.personalnumber,
    //           // merge
    //           // excelDataMerage: uniqueData,
    //           excelDataMerage: dbDataFile,
    //         };
    //         axios
    //           .post(`http://localhost:5000/NgCar/MerageAnaExcelData/updateMerage`, excelDataMerage)
    //           .then((responseData) => {
    //             setData({
    //               ...data,
    //               // work_id: res.data,
    //               fileName: files[0].name,
    //               loading: false,
    //               error: false,
    //               errorFile: false,
    //               successmsg: true,
    //               NavigateToReferrer: false,
    //             });

    //             // console.log(responseData);
    //           })
    //           .catch((error) => {
    //             // console.log(error);
    //             setData({
    //               ...data,
    //               errortype: error.response,
    //               loading: false,
    //               error: true,
    //               errorFile: false,
    //               NavigateToReferrer: false,
    //             });
    //           });
    //       }
    //     });
    //   const requestData = {
    //     numOfCopyies: data.numOfCopyies,
    //     workGivenDate: data.workGivenDate,
    //     fileName: files[0].name,

    //     workRecivedDate: data.workRecivedDate,

    //     personalnumber: data.personalnumber,
    //     dataFile: data.dataFile,
    //     rangeOfDates: data.rangeOfDates,
    //     files_id: res.data,
    //   };
    //   // .catch((error) => {
    //   //   // console.log(error);
    //   //   setData({
    //   //     ...data,
    //   //     errortype: error.response,
    //   //     loading: false,
    //   //     error: true,
    //   //     errorFile: false,
    //   //     NavigateToReferrer: false,
    //   //   });
    //   // });

    //   console.log(requestData);
    //   axios
    //     .post(`http://localhost:5000/NgCar/requsest/add`, requestData)
    //     .then((response) => {
    //       setData({
    //         ...data,
    //         work_id: res.data,
    //         fileName: files[0].name,
    //         loading: false,
    //         error: false,
    //         errorFile: false,
    //         successmsg: true,
    //         NavigateToReferrer: false,
    //       });
    //       // toast.success(`הטופס נשלח בהצלחה`);
    //       // history.push(`/signin`);
    //       console.log(response.data);
    //     })
    //     .catch((error) => {
    //       // console.log(error);
    //       setData({
    //         ...data,
    //         errortype: error.response,
    //         loading: false,
    //         error: true,
    //         errorFile: false,
    //         NavigateToReferrer: false,
    //       });
    //     });
    // });
  };

  const dataFiles = files.map(
    (el, i) => (
      // {
      //   return
      <Draggable key={el.id} draggableId={el.name} index={i}>
        {
          (provided) => (
            // {
            //   return
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <FormGroup>
                <MDAlert color="mekatnar">
                  <MDButton
                    dir="ltr"
                    iconOnly
                    variant="text"
                    // onClick={deleteFile1(el.id)}
                    onClick={() => {
                      if (i > -1) {
                        setFiles((currentFile) =>
                          files.filter((oneFile, oneIndex) => oneIndex !== i)
                        );
                        setPropPrint((currentProp) =>
                          propPrint.filter((oneProp, onePIndex) => onePIndex !== i)
                        );
                      }
                    }}
                    // onClick={handleDelete}
                    // onClick={handleRemove}

                    // onClick={() => fileRemove(el)}
                  >
                    <Icon fontSize="small">delete</Icon>&nbsp;
                  </MDButton>
                  <MDBox>
                    <MDTypography variant="h6" color="white">
                      {el.name}
                    </MDTypography>
                    <MDTypography variant="body2" color="white">
                      {el.size} MB
                    </MDTypography>
                  </MDBox>
                </MDAlert>
                {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                      <Label for="copyType">{textPlaceHolderInputs[7]}</Label>
                      <Input
                        // placeholder={textPlaceHolderInputs[7]}
                        name="copyType"
                        type="select"
                        value={propPrint[i].propCopyType}
                        onChange={handleChangeCopyPrintTH(i)}
                      >
                        <option defult value="b&w2">
                          שחור לבן דו צדדי
                        </option>
                        <option value="color1">צבעוני יחיד</option>
                        <option value="color2">צבעוני דו צדדי</option>
                        <option value="b&w1">שחור לבן יחיד</option>
                      </Input>
                    </Grid>
                    <Grid item xs={6}>
                      <Label for="pageType">{textPlaceHolderInputs[13]}</Label>
                      <Input
                        name="pageType"
                        type="select"
                        value={propPrint[i].propPageType}
                        onChange={handleChangeNumPrintTH(i)}
                      >
                        <option value="A0">A0</option>
                        <option value="A3">A3</option>
                        <option defult value="A4">
                          A4
                        </option>
                        <option value="A5">A5</option>
                        <option value="A6">A6</option>
                        <option value="A4b">A4 בריסטול</option>
                        <option value="A3b">A3 בריסטול</option>
                      </Input>
                    </Grid>
                  </Grid> */}
                {/* </MDBox> */}
              </FormGroup>
            </div>
          )

          // }
        }
      </Draggable>
    )
    // }
  );
  // useEffect(() => {
  //   console.log(`You clicked ${dataFiles} times`);
  // }, [dataFiles]);

  const handleCloseSuccsecModal = () => {
    setData({
      ...data,
      loading: false,
      errorFile: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: true,
    });
  };
  const handleCloseLoadingModal = () => {
    setData({ ...data, loading: false });
  };
  const handleCloseErrorModal = () => {
    setData({
      ...data,
      loading: false,
      error: false,
      errorFile: false,
      successmsg: false,
      NavigateToReferrer: false,
    });
  };
  const handleCloseErrorFileModal = () => {
    setData({
      ...data,
      loading: false,
      error: false,
      errorFile: false,
      successmsg: false,
      NavigateToReferrer: false,
    });
  };
  const NavigateUser = () => {
    if (data.NavigateToReferrer) {
      return <Navigate to="/userRequestsTable" />;
    }
  };

  const showSuccess = () => (
    <Dialog
      open={data.successmsg}
      onClose={handleCloseSuccsecModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        coloredShadow="mekatnar"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          הקובץ הועלה
        </MDTypography>

        <DialogContent>
          <MDTypography
            onMouseMove={(e) => window.location.reload()}
            variant="h4"
            fontWeight="medium"
            color="white"
            mt={1}
          >
            {data.fileName}
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const showErrorFile = () => (
    <Dialog
      open={data.errorFile}
      onClose={handleCloseErrorFileModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="error"
        coloredShadow="error"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          קובץ לא תקין
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            אנא נסה קובץ תקין ממערכת ענ"א
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const showError = () => (
    <Dialog
      open={data.error}
      onClose={handleCloseErrorModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="error"
        coloredShadow="error"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          שגיאה בהעלאת קבצים
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            אנא נסה שנית מאוחר יותר
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const showLoading = () => (
    <Dialog
      open={data.loading}
      onClose={handleCloseLoadingModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        coloredShadow="mekatnar"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        px={5}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          בטעינה
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            העלאת הקובץ תיקח מספר רגעים...
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  // ! try DND
  // const [items, setItems] = useState(files);

  // const dataMap = files.map((el, i) => {
  //   return (
  //     <Draggable key={el.id} draggableId={el.id.toString()} index={i} >
  //       {(provided) => {
  //         return (
  //           <div
  //             {...provided.draggableProps}
  //             {...provided.dragHandleProps}
  //             ref={provided.innerRef}
  //           >
  //             <MDAlert color="mekatnar">
  //               {el.name}
  //             </MDAlert>
  //           </div>
  //         )
  //       }}
  //     </Draggable >
  //   )
  // })
  const handleOnDragEnd = (res) => {
    if (!res.destination) return;
    // const filesCopy = [...files];
    const filesCopy = Array.from(files);
    const propPrintCopy = [...propPrint];

    const [reorderedItem] = filesCopy.splice(res.source.index, 1);
    const [reorderedItemProp] = propPrintCopy.splice(res.source.index, 1);

    filesCopy.splice(res.destination.index, 0, reorderedItem);
    propPrintCopy.splice(res.destination.index, 0, reorderedItemProp);

    setFiles(filesCopy);
    setPropPrint(propPrintCopy);
  };
  const handleClickOpen = (evt) => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  const handleAdd = () => {
    setFiles([...files]);
  };
  const handleDelete = (deleted) => {
    setFiles(files.filter((f) => f !== deleted));
  };

  // const InputFiles = ({ accept, onFiles, files, getFilesFromEvent }) => {
  //   const text = files.length > 0 ? "Add more files" : "Choose files";

  //   return (
  //     <label
  //       style={{
  //         backgroundColor: "#007bff",
  //         color: "#fff",
  //         cursor: "pointer",
  //         padding: 15,
  //         borderRadius: 3,
  //       }}
  //     >
  //       {text}
  //       <input
  //         style={{ display: "none" }}
  //         type="file"
  //         accept={accept}
  //         multiple
  //         onChange={(e) => {
  //           getFilesFromEvent(e).then((chosenFiles) => {
  //             onFiles(chosenFiles);
  //           });
  //         }}
  //       />
  //     </label>
  //   );
  // };

  // const handleChangeStatus = ({ meta }, status) => {
  //   console.log(status, meta)
  // }

  // const handleSubmit = (files, allFiles) => {
  //   console.log(files.map(f => f.meta))
  //   allFiles.forEach(f => f.remove())
  // }

  // ! try DND

  const hozlaPrintRequestForm = () => (
    <Container className="" dir="rtl">
      <Row className="justify-content-center">
        <Col lg="12" md="12">
          <Card className="shadow border-0">
            <CardBody className="px-lg-8 py-lg-10">
              <MDBox
                variant="gradient"
                bgColor="mekatnar"
                borderRadius="lg"
                coloredShadow="mekatnar"
                mx={7}
                mt={-3}
                p={3}
                mb={4}
                textAlign="center"
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  טופס איש מילואים{" "}
                </MDTypography>
              </MDBox>
              <Form style={{ textAlign: "right" }} role="form" onSubmit={onSubmit}>
                {/* </Popup> */}
                <FormGroup row>
                  {/* <FormGroup>
                  <h5 style={{ fontWeight: "bold" ,  marginBottom: "1%"}}>שם</h5>
										<Input
											placeholder="שם"
											type="string"
											name="name"
											value={cardata.name}
											onChange={handleChange}
										/>
                  </FormGroup> */}

                  <MDTypography variant="h6" color="mekatnar">
                    נבחרו {files.length} קבצים
                  </MDTypography>
                  {files.length === 0 ? (
                    <FormText color="muted">ניתן להעלאות קבצי xlsx .xls</FormText>
                  ) : (
                    <Container>
                      <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="files">
                          {
                            (provided) => (
                              // {
                              //   return
                              <div {...provided.droppableProps} ref={provided.innerRef}>
                                {dataFiles}
                                {provided.placeholder}
                              </div>
                            )
                            // }
                          }
                        </Droppable>
                      </DragDropContext>
                      <FormGroup>
                        {/* <FormText color="muted">ניתן לגרור את הקבצים לפי הסדר</FormText> */}
                      </FormGroup>

                      <FormGroup>
                        <MDButton
                          dir="ltr"
                          color="mekatnar"
                          // iconOnly
                          variant="text"
                          // onClick={handleDelete}
                          // onClick={handleRemove}
                          onClick={() => {
                            setFiles([]);
                            setPropPrint([]);
                          }}
                          // onClick={() => fileRemove(el)}
                        >
                          מחק הכל
                        </MDButton>
                      </FormGroup>
                    </Container>
                  )}
                </FormGroup>

                <div className="text-center">
                  <MDButton
                    color="mekatnar"
                    size="large"
                    // onClick={clickSubmit}
                    className="btn-new-blue"
                    type="submit"
                  >
                    שלח בקשה
                    <Icon fontSize="small">upload</Icon>&nbsp;
                  </MDButton>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  return (
    <>
      {showError()}
      {showErrorFile()}
      {showSuccess()}
      {showLoading()}
      {NavigateUser()}
      {hozlaPrintRequestForm()}
    </>
  );
}
