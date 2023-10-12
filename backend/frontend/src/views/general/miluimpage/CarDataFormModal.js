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

const CarDataFormModal = (props) => {
	const { user } = isAuthenticated();
	//cardata
	const [cardata, setCarData] = useState({});
	const [units, setUnits] = useState([]);
	// התייצב
	const [isChecked1, setIsChecked1] = useState(false);
	// התייצב היום
	const [isChecked2, setIsChecked2] = useState(false);
	// חייגן
	const [isChecked3, setIsChecked3] = useState(false);
	// שמפ
	const [isChecked4, setIsChecked4] = useState(false);

	const loadcardata = async () => {
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
			})
			.catch((error) => {
				console.log(error);
			});
	};

	function handleChange(evt) {
		const value = evt.target.value;
		setCarData({ ...cardata, [evt.target.name]: value });
	}

	function getUnits() {
		axios
			.get(`http://localhost:8000/api/units/${user.unit}`)
			.then((res) => {
				setUnits(res.data);
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

	const CheckFormData = () => {
		//check for stuff isnt empty
		var flag = true;
		var ErrorReason = "";

		if (cardata.name == "") {
			flag = false;
			ErrorReason += " שם ריק \n";
		}
		if (
			document.getElementById("seltype").options[
				document.getElementById("seltype").selectedIndex
			].value == "בחר"
		) {
			flag = false;
			ErrorReason += " סוג אירוע ריק \n";
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
				Update();
			} else {
				Create();
			}
		} else {
			toast.error(ErrorReason);
		}
	};

	async function Create() {
		//create ramam
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

	function init() {
		if (props.cardataid != undefined) {
			loadcardata();
		}
	}

	useEffect(() => {
		if (props.isOpen == true) {
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
								}}
							>
								טופס איש מילואים
							</CardTitle>
							{/*headline*/}
						</CardHeader>
						<CardBody style={{ direction: "rtl" }}>
							<Container>
								<Row>
									<Col
										style={{
											justifyContent: "right",
											alignContent: "right",
											textAlign: "right",
										}}
									>
										<h6 style={{}}>שם</h6>
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
										<h6 style={{}}>יחידה</h6>

										<Select
											data={units}
											handleChange2={handleChange2}
											name="unit"
											val={cardata.unit}
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
										<h6 style={{}}>מקצוע</h6>
										<Input
											placeholder="שם"
											type="select"
											name="subject"
											value={cardata.subject}
											onChange={handleChange}
											id="seltype"
										>
											<option value={"בחר"}>{"בחר"}</option>
											<option value={"מקצוע"}>{"מקצוע"}</option>
										</Input>
									</Col>
									<Col
										style={{
											justifyContent: "right",
											alignContent: "right",
											textAlign: "right",
										}}
									>
										<h6 style={{}}>הערות</h6>
										<Input
											placeholder="הערות"
											type="string"
											name="details"
											value={cardata.details}
											onChange={handleChange}
										/>
									</Col>
								</Row>
								<div style={{ textAlign: "center", paddingTop: "20px" }}>
									<button className="btn" onClick={clickSubmit}>
										עדכן
									</button>
								</div>
							</Container>
						</CardBody>
					</Card>
				</ModalBody>
			</Modal>
		</>
	);
};
export default withRouter(CarDataFormModal);
