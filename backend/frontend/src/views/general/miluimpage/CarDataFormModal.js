import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Container,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Row,
	Alert,
	Spinner,
	Label,
	Col,
	Modal,
	ModalBody,
	ButtonGroup,
} from "reactstrap";
import axios from "axios";
import history from "history.js";
import { signin, authenticate, isAuthenticated } from "auth/index";
import { produce } from "immer";
import { generate } from "shortid";
import { toast } from "react-toastify";
import Select from "components/general/Select/AnimatedSelect";
import { DtPicker } from "react-calendar-datetime-picker";
import "react-calendar-datetime-picker/dist/style.css";
import "views/general/miluimpage/datePicker.css";
import Archive from "assets/img/Archive_white.png";


const CarDataFormModal = (props) => {
	const { user } = isAuthenticated();
	//cardata
	const [cardata, setCarData] = useState({});
	const [archiveDate, setArchiveDate] = useState({});
	const [units, setUnits] = useState([]);
	const [jobs, setJobs] = useState([]);
	const [subject, setSubject] = useState([]);
	const [newDate, setNewDate] = useState([]);
	const [newDateFormat, setNewDateFormat] = useState([]);

	const [date, setDate] = useState([])
	const [collapseOpen, setcollapseOpen] = React.useState(false);

	// התייצב
	const [isChecked1, setIsChecked1] = useState(false);
	// התייצב היום
	const [isChecked2, setIsChecked2] = useState(false);
	// חייגן
	const [isChecked3, setIsChecked3] = useState(false);
	// שמפ
	const [isChecked4, setIsChecked4] = useState(false);
	const currDate  = new Date();

	const dateFormat = {
		"year": currDate.getFullYear(),
		"month": currDate.getMonth()+1,
  		"day": currDate.getDate()-1,
	}
	const loadcardata = async () => {
		setcollapseOpen(false);
		await axios
			.get(`http://localhost:8000/api/reservevisits/${props.cardataid}`)
			.then(async (response) => {
				let tempcardata = response.data[0];
				Object.keys(tempcardata).map((key) => {
					switch (key) {
						case "dailSent":
							setIsChecked3(tempcardata[key]);
							break;
						case "present":
							setIsChecked1(tempcardata[key]);
							break;
						case "shamapOpen":
							setIsChecked4(tempcardata[key]);
							break;
						case "todayPresent":
							setIsChecked2(tempcardata[key]);
							break;

						default:
							break;
					}
				});
				setCarData(tempcardata);
				await axios
					.get(`http://localhost:8000/api/archivedatafindbyPN/${tempcardata.personal_number}`)
					.then((res) => {
						setArchiveDate(res.data.map(archObj => { 
							return archObj.date.split("T")[0]
						}));
						setNewDateFormat(res.data.map(archObj => { 
							return {
								year: Number(archObj.date.split("T")[0].split("-")[0]),
		  						month: Number(archObj.date.split("T")[0].split("-")[1]),
		  						day: Number(archObj.date.split("T")[0].split("-")[2]),
							}
						}));
					})
					.catch((err) => {
						console.log(err);
					});
				})
				.catch((error) => {
					console.log(error);
				});
	
	};

	const toggleCollapse = () => {
		setcollapseOpen(!collapseOpen);
		if(!collapseOpen){
			toast.dark('כל הפרטים שבטופס ידווחו בתאריכים שבחרתם');
		}
	};
	
	function handleChange(evt) {
		const value = evt.target.value;
		setCarData({ ...cardata, [evt.target.name]: value });
	}

	function getUnits() {
		let typeUser = "";
		let url = "units"
		if(user.role == "0"){
			typeUser = "";
		} else if(user.role == "1"){
			typeUser = user.unit;
		} else if(user.role == "2"){
			url="unitsByRegion";
			typeUser=user.region;
		}
		let arrayunit = [];
		axios
			.get(`http://localhost:8000/api/${url}/${typeUser}`)
			.then((res) => {
				if(user.role == "0" || user.role == "2"){
					setUnits(res.data);
				} else if(user.role == "1"){
					arrayunit.push(res.data);
					setUnits(arrayunit);
				}
				
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function getJobs() {
		axios
			.get(`http://localhost:8000/api/job`)
			.then((res) => {
				setJobs(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	function getSubject() {
		axios
			.get(`http://localhost:8000/api/subject`)
			.then((res) => {
				setSubject(res.data);
				console.log(subject);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function handleChange2(selectedOption, name) {
		if (!(selectedOption.value == "בחר"))
			setCarData({ ...cardata, [name]: selectedOption.value });
		else {
			setCarData({ ...cardata, [name]: "" });
		}
	}

	function handleChange10(selectedOption, name) {
		if (!(selectedOption.value == "בחר"))
			setCarData({ ...cardata, [name]: selectedOption.value });
		else {
			setCarData({ ...cardata, [name]: "" });
		}
	}

	function handleChange3() {
		setIsChecked1(!isChecked1);
	}
	function handleChange4() {
		setIsChecked2(!isChecked2);
	}
	function handleChange5() {
		setIsChecked3(!isChecked3);
	}
	function handleChange6() {
		setIsChecked4(!isChecked4);
	}

	const clickSubmit = (event) => {
		CheckFormData();
	};

	const viewArchive = () => {
		return <Redirect to="/MiluimArchivepage" />;
	};

	const CheckFormData = () => {
		//check for stuff isnt empty
		var flag = true;
		var ErrorReason = "";

		if (cardata.name == "") {
			flag = false;
			ErrorReason += " שם ריק \n";
		}
		if (cardata.family == "") {
			flag = false;
			ErrorReason += " שם משפחה ריק \n";
		}
		if (cardata.personal_number == "") {
			flag = false;
			ErrorReason += "  מספר אישי ריק \n";
		}
		if (
			document.getElementById("selta").options[
				document.getElementById("selta").selectedIndex
			].value == "בחר"
		) {
			flag = false;
			ErrorReason += " סוג תא ריק \n";
		}

		try {
			let c = cardata.personal_number.charAt(0);
			if (c >= "0" && c <= "9") {
				// it is a number
				let temppersonalnumber = cardata.personal_number;
				temppersonalnumber = "s" + temppersonalnumber;
				cardata.personal_number = temppersonalnumber;
			} else {
				// it isn't
				if (c == c.toUpperCase()) {
					//UpperCase Letter -Make Lowercase
					let tempc = c.toLowerCase();
					let temppersonalnumber = cardata.personal_number;
					temppersonalnumber = temppersonalnumber.substring(1);
					temppersonalnumber = tempc + temppersonalnumber;
					cardata.personal_number = temppersonalnumber;
				}
				if (c == c.toLowerCase()) {
					//LowerCase Letter - All Good
				}
			}
		} catch (error) {
			console.log(error);
			flag = false;
			ErrorReason += "  מספר אישי פגום \n";
		}

		console.log(typeof isChecked2);
		console.log(isChecked2);

		cardata.present = isChecked1;
		cardata.todayPresent = isChecked2;
		cardata.dailSent = isChecked3;
		cardata.shamapOpen = isChecked4;

		if (isChecked1) {
			setCarData({ ...cardata, present: cardata.present });
		} else {
			setCarData({ ...cardata, present: cardata.present });
		}
		if (isChecked2) {
			setCarData({ ...cardata, todayPresent: cardata.todayPresent });
		} else {
			setCarData({ ...cardata, todayPresent: cardata.todayPresent });
		}
		if (isChecked3) {
			setCarData({ ...cardata, dailSent: cardata.dailSent });
		} else {
			setCarData({ ...cardata, dailSent: cardata.dailSent });
		}
		if (isChecked4) {
			setCarData({ ...cardata, shamapOpen: cardata.shamapOpen });
		} else {
			setCarData({ ...cardata, shamapOpen: cardata.shamapOpen });
		}
		

		if (flag == true) {
			if (props.cardataid != undefined) {
				if (isChecked2) {
					Createarchive();
				}
				Update();
			} else {
				if (isChecked2) {
					// Createarchive();
						Createarchive();
				}
				Create();
			}
			if(date !== undefined && props.cardataid != undefined){
				addArrayArchive();
			}
		} else {
			toast.error(ErrorReason);
		}
	};

	async function Create() {
		let tempramam = { ...cardata };
		tempramam.unitid = props.unitid;
		tempramam.userid = user._id;
		let result = await axios.post(
			`http://localhost:8000/api/reservevisits`,
			tempramam
		);
		toast.success(`איש מילואים נוסף בהצלחה`);
		props.ToggleForModal();
	}

	async function Update() {
		//update ramam
		var tempramamid = props.cardataid;
		let tempramam = { ...cardata };
		let result = await axios.put(
			`http://localhost:8000/api/reservevisits/${tempramamid}`,
			tempramam
		);
		toast.success(`איש מילואים עודכן בהצלחה`);
		props.ToggleForModal();
	}

	async function Createarchive() {
		//update ramam
		const currentDate = new Date();
		let tempramam = { ...cardata, date: `${currentDate.toLocaleDateString('he-IL', 
		{timeZone:'Asia/Jerusalem'}).split(".").reverse().join("-")}T${currentDate.toTimeString().split(" ")[0]}.000Z` };
		let checKEqual = false;
		delete tempramam._id;
		
		for(let i=0;i<archiveDate.length;i++){
			if(archiveDate[i] === currentDate.toLocaleDateString('he-IL', 
			{timeZone:'Asia/Jerusalem'}).split(".").reverse().join("-")){
				checKEqual = true;
			}
		}
		if(checKEqual === false){
			let result = await axios.post(
				`http://localhost:8000/api/archivedata`,
					tempramam
				);
			toast.success(`איש מילואים עודכן בארכיון התייצבות`);
		}else{
			toast.warning(`איש מילואים עודכן כבר בארכיון התייצבות`)
		}
		
		props.ToggleForModal();
	}

	async function addArrayArchive() {
		const arraydate =[];
		let checkdate="";
		date.map((dateid, index) => {
			archiveDate.map((dateFormatid, index1) =>{
				checkdate = new Date(dateid.year, dateid.month-1, dateid.day+1).toJSON().split("T")[0];
				console.log(checkdate)
				if(checkdate !== dateFormatid){
					if(currDate.toJSON().split("T")[0] <= checkdate){
						delete date[index];
					}
				}else{
					delete date[index];
				}
			})
			if(currDate.toJSON().split("T")[0] <= new Date(dateid.year, dateid.month-1, dateid.day+1).toJSON().split("T")[0]){
				delete date[index];
			}
		})
		arraydate.push(date.filter((_, index) => date.hasOwnProperty(index)));
		let tempramam = { ...cardata, date: arraydate[0]};
		let result = await axios.post(
			`http://localhost:8000/api/addArrayArchive`,
				tempramam
			);
		
		toast.success(`איש מילואים עודכן בארכיון התייצבות`);
	}

	function init() {
		if (props.cardataid != undefined) {
			loadcardata();
		}
	}

	useEffect(() => {
		if (props.isOpen == true) {
			getSubject();
			getJobs();
			getUnits();
			init();
		} else {
			setCarData({});
			setIsChecked1(false);
			setIsChecked2(false);
			setIsChecked3(false);
			setIsChecked4(false);
		}
	}, [props.isOpen]);

	return (
		<>
			<Modal
				style={{
					minHeight: "100%",
					maxHeight: "100%",
					minWidth: "80%",
					maxWidth: "80%",
					justifyContent: "center",
					alignSelf: "center",
					marginTop: "auto",
					direction: "rtl",
				}}
				isOpen={props.isOpen}
				centered
				fullscreen
				scrollable
				size=""
				toggle={props.Toggle}
			>
				<ModalBody>
					<Card>
						<CardHeader style={{ direction: "rtl" }}>
							<CardTitle
								tag="h4"
								style={{
									direction: "rtl",
									textAlign: "center",
									fontWeight: "bold",
									fontSize: "1.5em",
								}}
							>
								טופס איש מילואים
							</CardTitle>
							{/*headline*/}
						</CardHeader>
						<CardBody style={{ direction: "rtl" }}>
							<Container>
							{props.cardataid !== undefined ?
							<div style={{textAlign: "center"}}>
							<Button
								onClick={toggleCollapse}
								style={{}}
							>
								דיווח תאריכי עבר
							</Button>
							</div> : null}	
							
							{props.cardataid != undefined && collapseOpen ?
								//  <div/ style={{ textAlign: "center", paddingBottom: "20px", marginLeft: "25%",marginRight: "25%" }}>
									<Row
									style={{
										textAlign: "center",
										paddingRight: "25%",
										marginBottom: "2%"
									}}
									>
									<Col
										style={{
											justifyContent: "center",
											alignContent: "center",
											textAlign: "right",
										}}
									>
										<h6 style={{}}>דיווח תאריכי התייצבות</h6>
									<DtPicker
										headerClass="custom-header"
										daysClass="custom-days"
										inputClass="custom-input"
										clearBtnClass="custom-clearBtnClass"
										onChange={setDate}
										maxDate={dateFormat}
										disabledDates={newDateFormat}
										type='multi'
										yearListStyle='list'
										clearBtn
      									todayBtn
									/>
									</Col>
									<Col
										style={{
											justifyContent: "center",
											alignContent: "center",
											textAlign: "right",
										}}
									>
									<div style={{ textAlign: "right", paddingTop: "20px" }}>
										<button className="" style={{ fontWeight: "600", backgroundColor: "limegreen", color:"white", border: "none", padding: "6px 8px", fontsize: "14px", borderRadius: "6px"}} onClick={clickSubmit}>
										שמור
											<img src={Archive} style={{ height: "30px", padding:"6%" }}></img>
										</button>
									</div>
									</Col>
									
								</Row> : null}
								<Row>
									<Col
										style={{
											justifyContent: "right",
											alignContent: "right",
											textAlign: "right",
										}}
									>
										<h5 style={{ fontWeight: "bold" ,  marginBottom: "1%"}}>שם</h5>
										<Input
											placeholder="שם"
											type="string"
											name="name"
											value={cardata.name}
											onChange={handleChange}
										/>
									</Col>
									<Col
										style={{
											justifyContent: "right",
											alignContent: "right",
											textAlign: "right",
										}}
									>
										<h5 style={{ fontWeight: "bold" ,  marginBottom: "1%"}}>שם משפחה</h5>
										<Input
											placeholder="שם משפחה"
											type="string"
											name="family"
											value={cardata.family}
											onChange={handleChange}
										/>
									</Col>
									<Col
										style={{
											justifyContent: "right",
											alignContent: "right",
											textAlign: "right",
										}}
									>
										<h5 style={{ fontWeight: "bold" ,  marginBottom: "1%"}}>יחידה</h5>

										<Select
											data={units}
											handleChange2={handleChange2}
											name="unit"
											val={cardata.unit}
										/>
									</Col>
								</Row>
								<Row style={{marginTop: "1%",}} >
									<Col
										style={{
											justifyContent: "right",
											alignContent: "right",
											textAlign: "right",
										}}
									>
										<Input
											placeholder="התייצב"
											type="checkbox"
											name="present"
											value={cardata.present}
											onChange={handleChange3}
											checked={isChecked1}
										/>
										<div style={{ paddingRight: "20px" }}>התייצב</div>
									</Col>
									<Col
										style={{
											justifyContent: "right",
											alignContent: "right",
											textAlign: "right",
										}}
									>
										<Input
											placeholder="התייצב היום"
											type="checkbox"
											name="todayPresent"
											value={cardata.todayPresent}
											onChange={handleChange4}
											checked={isChecked2}
										/>
										<div style={{ paddingRight: "20px" }}>התייצב היום</div>
									</Col>
									<Col
										style={{
											justifyContent: "right",
											alignContent: "right",
											textAlign: "right",
										}}
									>
										<Input
											placeholder="נשלח חייגן"
											type="checkbox"
											name="dailSent"
											value={cardata.dailSent}
											onChange={handleChange5}
											checked={isChecked3}
										/>
										<div style={{ paddingRight: "20px" }}>נשלח חייגן</div>
									</Col>
									<Col
										style={{
											justifyContent: "right",
											alignContent: "right",
											textAlign: "right",
										}}
									>
										<Input
											placeholder='נפתח שמ"פ'
											type="checkbox"
											name="shamapOpen"
											value={cardata.shamapOpen}
											onChange={handleChange6}
											checked={isChecked4}
										/>
										<div style={{ paddingRight: "20px" }}>נפתח שמ"פ</div>
									</Col>
								</Row>
								<Row>
									<Col
										style={{
											justifyContent: "right",
											alignContent: "right",
											textAlign: "right",
										}}
									>
										<h5 style={{ fontWeight: "bold" ,  marginBottom: "1%"}}>מקצוע</h5>
										<Select
											data={subject}
											handleChange2={handleChange10}
											name="subject"
											val={cardata.subject}
										/>
									</Col>
									<Col
										style={{
											justifyContent: "right",
											alignContent: "right",
											textAlign: "right",
										}}
									>
										<h5 style={{ fontWeight: "bold" ,  marginBottom: "1%"}}>תפקיד</h5>

										<Select
											data={jobs}
											handleChange2={handleChange10}
											name="job"
											val={cardata.job}
										/>
									</Col>
								</Row>
								<Row>
									<Col
										style={{
											justifyContent: "right",
											alignContent: "right",
											textAlign: "right",
										}}
									>
										<h5 style={{ fontWeight: "bold" ,  marginBottom: "1%"}}>תא</h5>
										<Input
											placeholder="שם"
											type="select"
											name="ta"
											value={cardata.ta}
											onChange={handleChange}
											id="selta"
										>
											<option value={"בחר"}>{"בחר"}</option>
											<option value={"הפעלה"}>{"הפעלה"}</option>
											<option value={"רפואה"}>{"רפואה"}</option>
											<option value={"שליטה"}>{"שליטה"}</option>
											<option value={"רישום ודיווח"}>{"רישום ודיווח"}</option>
											<option value={"פרט ומשפחות"}>{"פרט ומשפחות"}</option>
											<option value={"מפקד"}>{"מפקד"}</option>
											<option value={"ללא"}>{"ללא"}</option>
										</Input>
									</Col>

									<Col
										style={{
											justifyContent: "right",
											alignContent: "right",
											textAlign: "right",
										}}
									>
										<h5 style={{ fontWeight: "bold" ,  marginBottom: "1%"}}>הערות</h5>
										<Input
											placeholder="הערות"
											type="string"
											name="details"
											value={cardata.details}
											onChange={handleChange}
										/>
									</Col>
								</Row>
								<Row style={{ marginTop: "1%" }}>
									<Col
										style={{
											justifyContent: "right",
											alignContent: "right",
											textAlign: "right",
										}}
									>
										<h5 style={{ fontWeight: "bold" ,  marginBottom: "1%"}}>מספר אישי</h5>
										<Input
											placeholder="מספר אישי"
											type="string"
											name="personal_number"
											value={cardata.personal_number}
											onChange={handleChange}
										/>
									</Col>
									<Col
										style={{
											justifyContent: "right",
											alignContent: "right",
											textAlign: "right",
										}}
									>
										<h5 style={{ fontWeight: "bold" ,  marginBottom: "1%"}}>תעודת זהות</h5>
										<Input
											placeholder="תעודת זהות"
											type="number"
											name="civilian_number"
											value={cardata.civilian_number}
											onChange={handleChange}
										/>
									</Col>
								</Row>
								{props.cardataid != undefined ?
								<div style={{ textAlign: "center", paddingTop: "20px" }}>
									<button className="btn" onClick={clickSubmit}>
										עדכן
									</button>
								</div> :
								<div style={{ textAlign: "center", paddingTop: "20px" }}>
								<button className="btn" onClick={clickSubmit}>
									הוסף
								</button>
							</div> 
								}
								{props.cardataid != undefined && archiveDate.length > 0  ?
								 <div style={{ textAlign: "center", paddingTop: "10px" }}>
									<div style={{ textAlign: "center", paddingTop: "20px" }}>
										<Link to={`/MiluimArchivepage/${cardata.personal_number}`}>צפייה בהיסטוריית דיווחים</Link>
									</div>
								</div> : null
								}
							</Container>
						</CardBody>
					</Card>
				</ModalBody>
			</Modal>
		</>
	);
};
export default withRouter(CarDataFormModal);
