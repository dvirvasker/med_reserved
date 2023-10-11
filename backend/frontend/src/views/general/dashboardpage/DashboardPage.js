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
	async function init() {
		setIsdataloaded(false);
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
		// if (reduxcardata.length > 0) {
		// 	init();
		// }
	}, [match]);

	useEffect(() => {
		//! placeholder
		setIsdataloaded(true);
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
					<DashboardCard data={reservevisits[key]} />
				))}
			</Row>
		</>
	);
}

export default withRouter(DashboardPage);
