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

function DashboardPage({ match, theme }) {
	//user
	const { user } = isAuthenticated();
	//spinner
	const [isdataloaded, setIsdataloaded] = useState(false);
	const [units, setUnits] = useState([]);
	const [reservevisits, setReservevisits] = useState({});
	//redux

	function getUnits() {
		axios
			.get(`http://localhost:8000/api/units`)
			.then((res) => {
				console.log(res.data);
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
				setReservevisits(groupedEntries);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		//! placeholder
		setIsdataloaded(true);
		getUnits();
		getReservevisits();
	}, []);

	return !isdataloaded ? (
		<div style={{ width: "50%", marginTop: "30%" }}>
			<PropagateLoader color={"#ff4650"} loading={true} size={25} />
		</div>
	) : (
		<>
			<Row>
				{Object.keys(reservevisits).map((key) => (
					<DashboardCard data={reservevisits[key]} unit={units[key]} />
				))}
			</Row>
		</>
	);
}

export default withRouter(DashboardPage);
