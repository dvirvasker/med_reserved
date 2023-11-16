import React, { useState, useEffect, useRef } from "react";

import { useParams, Link, withRouter, Redirect } from "react-router-dom";

// reactstrap components
import {
	Button,
	ButtonGroup,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Row,
	Container,
	Col,
	Collapse,
} from "reactstrap";
import axios from "axios";
import { signin, authenticate, isAuthenticated } from "auth/index";
import PropagateLoader from "react-spinners/PropagateLoader";

//redux
import { useSelector, useDispatch } from "react-redux";
import DashboardCard from "./dashboardCard";
import history from "../../../history";

function DashboardPage({ match, theme }) {
	//user
	const { user } = isAuthenticated();
	//spinner
	const [isdataloaded, setIsdataloaded] = useState(false);
	const [units, setUnits] = useState([]);
	const [reservevisits, setReservevisits] = useState({});
	//redux

	function getUnits() {
		if(user.role == "2"){
			axios
			.get(`http://localhost:8000/api/unitsByRegion/${user.region}`)
			.then((res) => {
				let tmp = {};
				res.data.map((unit) => {
					tmp[unit._id] = unit.name;
				});
				console.log(tmp)
				setUnits(tmp);
			})
			.catch((err) => {
				console.log(err);
			});
		} else  {
			axios
			.get(`http://localhost:8000/api/units`)
			.then((res) => {
				// console.log(res.data);
				let tmp = {};
				res.data.map((unit) => {
					tmp[unit._id] = unit.name;
				});
				setUnits(tmp);
			})
			.catch((err) => {
				console.log(err);
			});
		}
		
	}

	function getReservevisits() {
		axios
			.get("http://localhost:8000/api/reservevisits")
			.then((res) => {
				const groupedEntries = res.data.reduce((result, entry) => {
					const { unit } = entry;
					if (!result[unit]) {
						result[unit] = [];
					}
					result[unit].push(entry);
					return result;
				}, {});
				// console.log(groupedEntries);
				if (user.role == 0) {
					setReservevisits(groupedEntries);
				} else if (user.role == 1) {
					// console.log(groupedEntries[user.unit]);
					setReservevisits(groupedEntries[user.unit]);
				} else if(user.role == "2") {
					console.log(groupedEntries)
					setReservevisits(groupedEntries);
					
				} else{
					history.push("/signin");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		//! placeholder
		// setIsdataloaded(true);
		getUnits();
		getReservevisits();
	}, []);

	useEffect(() => {
		if (user.role == "0") {
			if (Object.keys(reservevisits).length > 0) {
				setIsdataloaded(true);
			}
		} else {
			if (user.role == "1") {
				if (Array.isArray(reservevisits) && reservevisits.length > 0) {
					setIsdataloaded(true);
				} else {
					getReservevisits();
				}
			}
			else if (user.role == "2") {
				if (Object.keys(reservevisits).length > 0) {
					setIsdataloaded(true);
				}
			} else {
				history.push("/signin");
			}
		}
		console.log(units)

	}, [reservevisits]);

	return !isdataloaded ? (
		<div style={{ width: "50%", marginTop: "30%" }}>
			<PropagateLoader color={"#ff4650"} loading={true} size={25} />
		</div>
	) : (
		<>
			<Row>
				{user.role == "0" ? (
					Object.keys(reservevisits).map((key) => (
						<DashboardCard data={reservevisits[key]} unit={units[key]} />
					))
				) : user.role == "1" ? (
					<DashboardCard data={reservevisits} unit={units[user.unit]} />
				) : user.role == "2" ? (
					Object.keys(reservevisits).filter((el)=> {
						let foundIndex = Object.keys(units).indexOf(el);
						if(foundIndex !== -1){
							return true;
						} else{
							return false;
						}
					}).map((key) => (
						<DashboardCard data={reservevisits[key]} unit={units[key]} />
					))
				) : null}
			</Row>
		</>
	);
}

export default withRouter(DashboardPage);
