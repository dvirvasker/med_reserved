import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import {
	Button,
	Card,
	CardHeader,
	Container,
	CardBody,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Row,
	Col,
} from "reactstrap";
import axios from "axios";
import history from "history.js";
import { toast } from "react-toastify";
import AnimatedSelect from "components/general/Select/AnimatedSelect";
import Select from "react-select";

export default function SignUpForm() {
	const [data, setData] = useState({
		personalnumber: "",
		role: "",
		unit: "",
		region:"",
		errortype: "",
		error: false,
		successmsg: false,
		loading: false,
		redirectToReferrer: false,
		//
		site_permission: "צפייה ועריכה",
	});
	const [units, setUnits] = useState([]);
	const [regions, setRegions] = useState([]);

	const options = [
		{ value: '1', label: 'משתמש יחידה' },
		{ value: '2', label: 'משתמש מרחב' }
	  ]

	  const optionsRegion = [
		{ value: "1", label: 'מרחב צפון' },
		{ value: '2', label: 'מרחב מרכז' },
		{ value: '3', label: 'מרחב דרום' }
	  ]
	  
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

	const passport = (event) => {
		axios
			.get(`http://localhost:8000/auth/passportauth`)
			.then((response) => {
				console.log(response.data);
				setData({ ...data, personalnumber: response.data.stam._json.cn });
			})
			.catch((error) => {
				console.log(error);
				history.push(`/signup`);
			});
	};

	function handleChange(evt) {
		const value = evt.target.value;
		setData({ ...data, [evt.target.name]: value });
	}

	function handleChange2(selectedOption, name) {
		console.log(selectedOption.value);
		console.log(name);
		 if (!(selectedOption.value == "בחר"))
			setData({ ...data, [name]: selectedOption.value });
		else {
			setData({ ...data, [name]: "" });
		}
	}

	function handleChange3(selectedOption, name) {
		console.log(selectedOption.value);
		console.log(name.name);
		//  if (!(selectedOption.value == "בחר"))
			setData({ ...data, [name.name]: selectedOption.value });
		// else {
		// 	setData({ ...data, [name]: "" });
		// }
	}

	const clickSubmit = (event) => {
		CheckSignUpForm(event);
	};

	const CheckSignUpForm = (event) => {
		console.log(data);
		event.preventDefault();
		var flag = true;
		var ErrorReason = "";
		if (data.name == "") {
			flag = false;
			ErrorReason += "שם ריק \n";
		}
		if (data.unit == "") {
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
		} else {
			if (data.role === "0") {
			}
		}
		if (data.region == "") {
			flag = false;
			ErrorReason += "סוג מרחב ריק\n";
		}
		let c = data.personalnumber.charAt(0);
		if (c >= "0" && c <= "9") {
			// it is a number
			let temppersonalnumber = data.personalnumber;
			temppersonalnumber = "s" + temppersonalnumber;
			data.personalnumber = temppersonalnumber;
		} else {
			// it isn't
			if (c == c.toUpperCase()) {
				//UpperCase Letter -Make Lowercase
				let tempc = c.toLowerCase();
				let temppersonalnumber = data.personalnumber;
				temppersonalnumber = temppersonalnumber.substring(1);
				temppersonalnumber = tempc + temppersonalnumber;
				data.personalnumber = temppersonalnumber;
			}
			if (c == c.toLowerCase()) {
				//LowerCase Letter - All Good
			}
		}

		SignUp(event);
	};

	const SignUp = (event) => {
		event.preventDefault();
		setData({ ...data, loading: true, successmsg: false, error: false });
		const user = {
			role: data.role,
			personalnumber: data.personalnumber,
			unit: data.unit,
			region: data.region,

			site_permission: data.site_permission,
		};
		console.log(user);
		axios
			.post(`http://localhost:8000/api/signup`, user)
			.then((res) => {
				setData({ ...data, loading: false, error: false, successmsg: true });
				toast.success(`הרשמתך נקלטה בהצלחה`);
				history.push(`/signin`);
				// console.log(res.data);
			})
			.catch((error) => {
				// console.log(error);
				setData({
					...data,
					errortype: error.response.data.error,
					loading: false,
					error: true,
				});
			});
	};

	const redirectUser = () => {
		if (data.redirectToReferrer) {
			return <Redirect to="/signin" />;
		}
	};

	const showSuccess = () => (
		<div
			className="alert alert-info "
			style={{ textAlign: "right", display: data.successmsg ? "" : "none" }}
		>
			<h2>הבקשה נשלחה למנהל המערכת</h2>
			<Link to="/signin">להתחברות</Link>
		</div>
	);
	const showError = () => (
		<div
			className="alert alert-danger"
			style={{ textAlign: "right", display: data.error ? "" : "none" }}
		>
			<h2>שגיאה בשליחת הטופס</h2>
		</div>
	);
	const showLoading = () => (
		<div
			className="alert alert-success"
			style={{ textAlign: "right", display: data.loading ? "" : "none" }}
		>
			<h2>{"בטעינה"}</h2>
		</div>
	);

	useEffect(() => {
		// passport();
		getUnits();
		getRegions();
	}, []);

	const signUpForm = () => (
		<>
			<Container className="" dir="rtl">
				<Row className="justify-content-center">
					<Col lg="5" md="7">
						<Card className="shadow border-0">
							<CardBody className="px-lg-5 py-lg-5">
								<div className="text-center text-muted mb-4">
									<small>הרשמה</small>
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

									<>
										<div style={{ textAlign: "right", paddingTop: "10px" }}>
											בחר סוג משתמש
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
												onChange={handleChange3}
												name={"role"}
												options={options}
											/>
											
										</FormGroup>
									</>
										{data.role==="2"? <>
										<div style={{ textAlign: "right", paddingTop: "10px" }}>
											 בחר מרחב
										</div>
										<FormGroup
											dir="rtl"
											style={{
												justifyContent: "right",
												alignContent: "right",
												textAlign: "right",
											}}
										>
											<AnimatedSelect
												data={regions}
												handleChange2={handleChange2}
												name={"region"}
											/>
										</FormGroup>
									</>:data.role === "1"?
									<>
										<div style={{ textAlign: "right", paddingTop: "10px" }}>
											משתמש יחידה
										</div>
										<FormGroup
											dir="rtl"
											style={{
												justifyContent: "right",
												alignContent: "right",
												textAlign: "right",
											}}
										>
											<AnimatedSelect
												data={units}
												handleChange2={handleChange2}
												name={"unit"}
											/>
										</FormGroup>
									</>: null}


									{/* {data.role != "" && data.role != "0" && data.role != "5" ? (
										<>
											<div style={{ textAlign: "right", paddingTop: "10px" }}>
												הרשאת עריכה
											</div>
											<FormGroup dir="rtl">
												<Input
													type="select"
													name="site_permission"
													value={data.site_permission}
													onChange={handleChange}
												>
													<option value={"צפייה ועריכה"}>צפייה ועריכה</option>
													<option value={"צפייה"}>צפייה</option>
												</Input>
											</FormGroup>
										</>
									) : null} */}
									<div className="text-center">
										<button onClick={clickSubmit} className="btn-new-blue">
											הרשם
										</button>
									</div>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);

	return (
		<>
			<Container className="mt--8 pb-5">
				<Row className="justify-content-center">
					<Col>
						{showLoading()}
						{showSuccess()}
						{showError()}
						{signUpForm()}
						{redirectUser()}
					</Col>
				</Row>
			</Container>
		</>
	);
}
