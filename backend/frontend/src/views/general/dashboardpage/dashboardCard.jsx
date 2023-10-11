import React, { useState, useEffect, useRef } from "react";

import { Link, withRouter, Redirect } from "react-router-dom";
import {
	buildStyles,
	CircularProgressbar,
	CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressProvider from "components/general/CircularProgressBarAnimation/ProgressProvider";

// reactstrap components
import {
	Button,
	ButtonGroup,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CardTitle,
	Row,
	Container,
	Col,
	Collapse,
	Progress,
} from "reactstrap";

function DashboardCard(props) {
	const [collapseOpen, setcollapseOpen] = useState(false);
	const [processedData, setProcessedData] = useState({
		TodayPresent: 0,
		DailSent: 0,
		ShamapOpen: 0,
		Present: 0,
	});

	const titles = useRef({
		TodayPresent: 0,
		DailSent: 0,
		ShamapOpen: 0,
		Present: 0,
	});

	function init() {
		let tmp_true = {
			Present: [],
			TodayPresent: [],
			DailSent: [],
			ShamapOpen: [],
		};
		let tmp_false = {
			Present: [],
			TodayPresent: [],
			DailSent: [],
			ShamapOpen: [],
		};
		let tmp = { TodayPresent: 0, DailSent: 0, ShamapOpen: 0, Present: 0 };
		function tmp_push(val, key) {
			if (val) {
				tmp_true[key].push(val);
			} else {
				tmp_false[key].push(val);
			}
		}
		props.data.map((dt) => {
			tmp_push(dt.Present, "Present");
			tmp_push(dt.TodayPresent, "TodayPresent");
			tmp_push(dt.DailSent, "DailSent");
			tmp_push(dt.ShamapOpen, "ShamapOpen");
		});
		Object.keys(tmp_true).map((key) => {
			tmp[key] = ~~((tmp_true[key].length / props.data.length) * 100);
			titles.current[key] = tmp_true[key].length;
		});
		// console.log(props.data);
		// console.log(tmp_true.TodayPresent);
		// console.log(tmp_false);
		// console.log(tmp);
		setProcessedData(tmp);
	}

	const toggleCollapse = (event) => {
		setcollapseOpen(!collapseOpen);
	};

	useEffect(() => {
		init();
	}, [props]);

	return (
		<Col xs={12} md={3}>
			<Card style={{ boxShadow: "rgb(123 123 123 / 20%) 0px 2px 5px 5px" }}>
				<CardBody
					style={{ textAlign: "center", margin: "auto", cursor: "pointer" }}
					onClick={(e) => toggleCollapse(e)}
				>
					<div
						style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}
					>
						<ProgressProvider
							valueStart={0}
							valueEnd={props.data != 0 ? processedData.TodayPresent : 0}
						>
							{(value) => (
								<CircularProgressbarWithChildren
									value={value}
									/*text={`${value}%`}*/ styles={{
										root: {},
										path: {
											stroke: `#ff2128`,
											strokeLinecap: "butt",
											transition: "stroke-dashoffset 0.5s ease 0s",
										},
										trail: {
											stroke: "rgb(141 141 141 / 30%)",
											strokeLinecap: "butt",
											transform: "rotate(0.25turn)",
											transformOrigin: "center center",
										},
										text: {
											fill: "#ff2128",
											fontSize: "18px",
										},
										background: {
											fill: "#3e98c7",
										},
									}}
								>
									<div>
										<h2 style={{ margin: "0px" }}>{`${value.toFixed(0)}%`}</h2>
									</div>
									<div style={{ fontSize: 12, marginTop: -2 }}>
										<h5 style={{ margin: "0px" }}>
											{titles.current.TodayPresent + "/" + props.data.length}
										</h5>
									</div>
								</CircularProgressbarWithChildren>
							)}
						</ProgressProvider>
					</div>
					{collapseOpen ? (
						<div
							style={{
								width: "80%",
								marginLeft: "auto",
								marginRight: "auto",
								paddingTop: "25px",
							}}
						>
							{/* //* חייגן   */}
							<h6>נשלח חייגן: {titles.current.DailSent} </h6>
							<Progress
								color="guyblue"
								value={processedData.DailSent ? processedData.DailSent : 0}
								style={{ height: "10px", marginBottom: "8px" }}
							>
								{processedData.DailSent ? processedData.DailSent : 0}%
							</Progress>
							{/* //* התייצבות   */}
							<h6> התייצבות: {titles.current.Present} </h6>
							<Progress
								color="guyblue"
								value={processedData.Present ? processedData.Present : 0}
								style={{ height: "10px", marginBottom: "8px" }}
							>
								{processedData.Present ? processedData.Present : 0}%
							</Progress>
							{/* //* שמפ   */}
							<h6>נפתח שמפ: {titles.current.ShamapOpen} </h6>
							<Progress
								color="guyblue"
								value={processedData.ShamapOpen ? processedData.ShamapOpen : 0}
								style={{ height: "10px", marginBottom: "8px" }}
							>
								{processedData.ShamapOpen ? processedData.ShamapOpen : 0}%
							</Progress>
						</div>
					) : null}
				</CardBody>
			</Card>
		</Col>
	);
}

export default withRouter(DashboardCard);
