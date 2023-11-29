import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";

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
} from "reactstrap";
import { produce } from "immer";
import { generate } from "shortid";
import axios from "axios";
import history from "history.js";
import { toast } from "react-toastify";
import Select from "components/general/Select/AnimatedSelect";

const EditUserForm = ({ match }) => {
	const [data, setData] = useState({
		personalnumber: "",
		role: "",
		unit: "",
		region: "",
		//
		errortype: "",
		error: false,
		successmsg: false,
		loading: false,
		redirectToReferrer: false,
		//
		site_permission: "",
	});
	const [units, setUnits] = useState([]);
	const [regions, setRegions] = useState([]);

	function handleChange(evt) {
		const value = evt.target.value;
		setData({ ...data, [evt.target.name]: value });
	}

	function handleChange2(selectedOption, name) {
		if (!(selectedOption.value == "בחר"))
			setData({ ...data, [name]: selectedOption.value });
		else {
			setData({ ...data, [name]: "" });
		}
	}

	function getUnits() {
		axios
			.get(`http://localhost:8000/api/units`)
			.then((res) => {
				setUnits(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function getRegions() {
		axios
			.get(`http://localhost:8000/api/region`)
			.then((res) => {
				setRegions(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	const clickSubmit = (event) => {
		CheckSignUpForm(event);
	};

	const CheckSignUpForm = (event) => {
		event.preventDefault();
		var flag = true;
		var ErrorReason = "";
		if (data.name == "") {
			flag = false;
			ErrorReason += "שם ריק \n";
		}
		if (data.lastname == "") {
			flag = false;
			ErrorReason += "שם משפחה ריק \n";
		}
		if (data.personalnumber == "") {
			flag = false;
			ErrorReason += "מס אישי ריק \n";
		}
		if (data.role == "") {
			flag = false;
			ErrorReason += "הרשאה ריקה \n";
		}
		if (flag == true) {
			FixUser(event);
		} else {
			toast.error(ErrorReason);
		}
	};

	const FixUser = (event) => {
		event.preventDefault();
		if (data.role === "0") {
			data.unit = "";
			data.region = "";
		}
		if (data.role === "5") {
			data.site_permission = "צפייה";
			delete data.gdodid;
			delete data.hativaid;
			delete data.ogdaid;
			delete data.pikodid;
		}
		if (data.role === "1") {
			data.region = "";
		}
		if (data.role === "2") {
			data.unit = "";
		}
		if (data.role === "3") {
			delete data.gdodid;
			delete data.hativaid;
			delete data.pikodid;
		}
		if (data.role === "4") {
			delete data.gdodid;
			delete data.hativaid;
			delete data.ogdaid;
		}
		UpdateUser(event);
	};

	const UpdateUser = () => {
		var userid = match.params.userid;
		const user = {
			name: data.name,
			lastname: data.lastname,
			unit: data.unit,
			region: data.region,
			role: data.role,
			validated: data.validated,
			personalnumber: data.personalnumber,

			site_permission: data.site_permission,
		};

		axios
			.put(`http://localhost:8000/api/user/update/${userid}`, user)
			.then((response) => {
				toast.success(`המשתמש עודכן בהצלחה`);
				history.push(`/manageusers`);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const init = () => {
		var userid = match.params.userid;
		axios
			.post("http://localhost:8000/api/getuserbyid", { userid })
			.then((response) => {
				let tempuser = { ...response.data };
				setData(tempuser);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		init();
		getUnits();
		getRegions();
	}, []);

	return (
		<div className="">
			<Container className="" dir="rtl">
				<Row className="justify-content-center">
					<Col lg="5" md="7">
						<Card className="shadow border-0">
							<CardBody className="px-lg-5 py-lg-5">
								<div className="text-center text-muted mb-4">
									<small>עריכת משתמש</small>
								</div>
								<Form role="form">
									<FormGroup className="mb-3">
										<Input
											placeholder="מספר אישי"
											name="personalnumber"
											type="string"
											value={data.personalnumber}
											onChange={handleChange}
										/>
									</FormGroup>

									<div style={{ textAlign: "right", paddingTop: "10px" }}>
										הרשאה
									</div>
									<FormGroup dir="rtl">
										<Input
											type="select"
											name="role"
											value={data.role}
											onChange={handleChange}
										>
											<option value="">הרשאה</option>
											<option value="0">מנהל מערכת</option>
											<option value="1">הרשאת יחידה</option>
											<option value="2">הרשאת מרחב</option>
										</Input>
									</FormGroup>

									{data.role === "0" ? (
										<div style={{ textAlign: "right", paddingTop: "10px" }}>
											מנהל מערכת
										</div>
									) : data.role === "2" ? (
										<>
											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												מרחב
											</div>
											<FormGroup
												dir="rtl"
												style={{
													justifyContent: "right",
													alignContent: "right",
													textAlign: "right",
												}}
											>
												<Select
													data={regions}
													handleChange2={handleChange2}
													name={"region"}
													val={data.region ? data.region : undefined}
												/>
											</FormGroup>
										</>
									) : data.role === "1" ? (
										<>
											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												יחידה
											</div>
											<FormGroup
												dir="rtl"
												style={{
													justifyContent: "right",
													alignContent: "right",
													textAlign: "right",
												}}
											>
												<Select
													data={units}
													handleChange2={handleChange2}
													name={"unit"}
													val={data.unit ? data.unit : undefined}
												/>
											</FormGroup>
										</>
									) : null}

									<div style={{ textAlign: "right", paddingTop: "10px" }}>
										מאושר/לא מאושר מערכת
									</div>
									<FormGroup>
										<Input
											type="select"
											name="validated"
											value={data.validated}
											onChange={handleChange}
										>
											<option value={true}>מאושר</option>
											<option value={false}>לא מאושר</option>
										</Input>
									</FormGroup>

									<div className="text-center">
										<button onClick={clickSubmit} className="btn-new-blue">
											עדכן
										</button>
									</div>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
export default withRouter(EditUserForm);
