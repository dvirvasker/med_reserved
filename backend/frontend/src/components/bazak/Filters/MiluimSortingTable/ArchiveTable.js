import React, { useMemo, useState, useEffect, useRef } from "react";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	useFilters,
	usePagination,
} from "react-table";
import { withRouter, Redirect, Link } from "react-router-dom";
import { COLUMNS } from "./coulmnsArchive";
import { GlobalFilter } from "./GlobalFilter";
import axios from "axios";
import { signin, authenticate, isAuthenticated } from "auth/index";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Button, Row, Col, Input, Collapse, Card } from "reactstrap";
import Select from "react-select";
import CarDataFormModal from "views/general/miluimpage/CarDataFormModal";
import CarDataFormModalDelete from "views/general/miluimpage/CarDataFormModalDelete";
import MiluimTableFilter from "components/bazak/Filters/MiluimSortingTable/MiluimTableFilter";
import MultiSelect from 'components/general/Select/AnimatedMultiSelect';
import styles from "./SortingTable.module.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

//redux

const ArchiveTable = (props) => {
	//user
	const { user } = isAuthenticated();
	//table
	const columns = useMemo(() => COLUMNS, []);
	//data
	const [data, setData] = useState([]);
	const [originaldata, setOriginaldata] = useState([]);
	// sysytems //! might cange the way we save this kind of data later depends if we want to fillter with the main fillter
	const [systemsonZ, setSystemonsonZ] = useState({});
	const [systems, setSystems] = useState([]);
	//filter
	const [filter, setFilter] = useState([]);
	//cardata form modal
	const [iscardataformopen, setIscardataformopen] = useState(false);
	const [cardataidformodal, setCardataidformodal] = useState(undefined);
	//cardata form modal delete
	const [iscardataformdeleteopen, setIscardataformdeleteopen] = useState(false);
	const [cardataidfordeletemodal, setCardataidfordeletemodal] =
		useState(undefined);
	//spinner
	const [isdataloaded, setIsdataloaded] = useState(false);
	//excel download
	const XLSX = require("xlsx");
	const [tyevent, setTyevent] = useState([]);
	const [dataunit, setDataunit] = useState([]);
	const [datasubject, setDataSubject] = useState([]);
	// unit
	const [unit, setUnit] = useState([]);
	const [job, setJob] = useState([]);
	const [subject, setSubject] = useState([]);
	const [ta, setTa] = useState([]);
	const [collapseOpen, setcollapseOpen] = React.useState(false);

	async function CalculateDataArr() {
		let personalnumber = props.match.params.personalnumber;
		await axios
			.get(`http://localhost:8000/api/archivedata/`)
			.then((response) => {
				console.log(response.data)
				// if(user.role == 0){
				// 	setData(response.data)
				// 	setOriginaldata(response.data);
				// } else{
					setData(response.data.filter((item) => item.personal_number == personalnumber));
					setOriginaldata(response.data.filter((item) => item.personal_number == personalnumber));
				// }
				// user.role == 0
				// 	? 
						
				// 	: 
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const getUnit = async () => {
		await axios
			.get("http://localhost:8000/api/units")
			.then((response) => {
				setUnit(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
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

	// ---------------------------- בארמי להוריד מהערה לוקח מידע מהקולקשיין של מקצועות -----------------------
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
	const unitDataId = unit.map((unitid) =>(
		{value: unitid._id, label: unitid.name})
	)
	const subjectDataId = subject.map((subjectid) =>(
		{value: subjectid._id, label: subjectid.name})
	)
	const optionsTa = [
		{ value: 'הפעלה', label: 'הפעלה' },
		{ value: 'רפואה', label: 'רפואה' },
		{ value: 'שליטה', label: 'שליטה' },
		{ value: 'רישום ודיווח', label: 'רישום ודיווח' },
		{ value: 'פרט ומשפחות', label: 'פרט ומשפחות' },
		{ value: 'מפקד', label: 'מפקד' },
		{ value: 'ללא', label: 'ללא' },
	]
	const toggleCollapse = () => {
		setcollapseOpen(!collapseOpen);
		console.log(unitDataId);
	};
	function Toggle(evt) {
		if (evt.currentTarget.value == "") {
			setCardataidformodal(undefined);
		} else {
			setCardataidformodal(evt.currentTarget.value);
		}
		setIscardataformopen(!iscardataformopen);
	}

	function ToggleForModal(evt) {
		setIscardataformopen(!iscardataformopen);
	}

	function ToggleDelete(evt) {
		if (evt.currentTarget.value == "") {
			setCardataidfordeletemodal(undefined);
		} else {
			setCardataidfordeletemodal(evt.currentTarget.value);
		}
		setIscardataformdeleteopen(!iscardataformdeleteopen);
	}

	function ToggleForModalDelete(evt) {
		setIscardataformdeleteopen(!iscardataformdeleteopen);
	}

	function handleChange1(evt) {
		let tempvalues = [];
		for (let i = 0; i < evt.length; i++) {
			tempvalues.push(evt[i].value);
		}
		setTyevent({ ...tyevent, unit: tempvalues });
		setDataunit(tempvalues)
	}

	function handleChange2(evt) {
		let tempvalues = [];
		for (let i = 0; i < evt.length; i++) {
			tempvalues.push(evt[i].value);
			console.log(evt[i].value);
		}
		setTyevent({ ...tyevent, ta: tempvalues });
		setTa(tempvalues)
	}

	function handleChange3(evt) {
		let tempvalues = [];
		for (let i = 0; i < evt.length; i++) {
			tempvalues.push(evt[i].value);
		}
		setTyevent({ ...tyevent, subject: tempvalues });
		setDataSubject(tempvalues)

	}

	const filteruse=()=>{
		console.log("filteruse");
		console.log(tyevent);
		let beforfilter=originaldata;

		let filter1=[]; //unit filter
		if(tyevent.unit){
			if(tyevent.unit.length === 0 || tyevent.unit === undefined){
		  		filter1=beforfilter;
		}else{
			for(let i=0;i<tyevent.unit.length;i++){
				for(let j=0;j<beforfilter.length;j++){
					if(beforfilter[j].unit === tyevent.unit[i]){
						filter1.push(beforfilter[j]);
				}
				}}
		}
		  }
		  else{
			filter1=beforfilter;
		}
		

		let filter2=[]; //subject filter
		if(tyevent.subject){
			if(tyevent.subject.length === 0 || tyevent.subject === undefined){
				filter2=filter1;
			  }else{
				for(let i=0;i<tyevent.subject.length;i++){
					for(let j=0;j<filter1.length;j++){
						if(filter1[j].subject === tyevent.subject[i]){
						filter2.push(filter1[j]);
					}
					}
				}
			  }
		}
		else{
			filter2=filter1;
		}
		
		let filter3=[]; //ta filter
		if(tyevent.ta){
			if(tyevent.ta.length == 0 || tyevent.ta == undefined){
				filter3=filter2;
			  }else{
				for(let i=0;i<tyevent.ta.length;i++){
					for(let j=0;j<filter2.length;j++){
						if(filter2[j].ta === tyevent.ta[i]){
							filter3.push(filter2[j]);
					}
					}
				}
			  }
		}
		else{
			filter3=filter2;
		}

		// let filter2=[]; //ta filter
		// if(tyevent.ta == "בחר" || tyevent.ta == undefined){
		//   filter2=filter1;
		// }else{
		// 	filter2=filter1.filter((el)=>el.ta === tyevent.ta);
		// }

		// let filter3=[]; //subject filter
		// if(tyevent.subject == "בחר" || tyevent.subject == undefined){
		//   filter3=filter2;
		// }else{
		// 	filter3=filter2.filter((el)=>el.subject === tyevent.subject);
		// }

		setData(filter3);
		console.log(data);
	};
	// ------------- בארמי לבדוק שהשדות בקולקשיין באותו השם כמו בפונקציה הנ"ל!! -----------
	function getname(idnum, arr) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i]._id == idnum) return arr[i].name;
		}
	}

	
	// ---------------------------------------------------------------------------------------------

	function init() {
		CalculateDataArr();
	}
	function handleChange8(selectedOption, name) {
		if (!(selectedOption.value == "בחר")) {
		  let tempvalues = [];
		  for (let i = 0; i < selectedOption.length; i++) {
			tempvalues.push(selectedOption[i].value);
		  }
		  setFilter({ ...filter, [name]: tempvalues });
		}
		else {
		  let tempfilter = { ...filter };
		  delete tempfilter[name];
		  setFilter(tempfilter);
		}
	  }
	//   const setfilterfunction = (evt) => {
	// 	if (evt.currentTarget.name == 'role') {
	// 	  if (filter.rolefilter) {
	// 		let temprolefilter = [...filter.rolefilter]
	// 		const index = temprolefilter.indexOf(evt.currentTarget.value);
	// 		if (index > -1) {
	// 		  temprolefilter.splice(index, 1);
	// 		}
	// 		else {
	// 		  temprolefilter.push(evt.currentTarget.value)
	// 		}
	// 		setFilter({ ...filter, rolefilter: temprolefilter })
	// 	  }
	// 	  else {
	// 		setFilter({ ...filter, rolefilter: [evt.currentTarget.value] })
	// 	  }
	// 	}
	//   }

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		footerGroups,
		page,
		prepareRow,
		allColumns,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize, globalFilter, hiddenColumns },
		setGlobalFilter,
	} = useTable(
		{
			columns,
			data,
			initialState: {
				pageIndex: 0,
			},
		},
		useGlobalFilter,
		useFilters,
		useSortBy,
		usePagination
	);

	// ------------------ excel function -----------------------------------------------
	function FixDataAndExportToExcel() {
		let tempdata_to_excel = [];
		for (let i = 0; i < data.length; i++) {
			tempdata_to_excel.push({ ...data[i] });
		}

		for (let i = 0; i < tempdata_to_excel.length; i++) {
			tempdata_to_excel[i].name
				? (tempdata_to_excel[i].name_m = tempdata_to_excel[i].name)
				: (tempdata_to_excel[i].name_m = " ");
			tempdata_to_excel[i].family
				? (tempdata_to_excel[i].lastname = tempdata_to_excel[i].family)
				: (tempdata_to_excel[i].lastname = " ");
			tempdata_to_excel[i].personal_number
				? (tempdata_to_excel[i].personalnumber =
						tempdata_to_excel[i].personal_number)
				: (tempdata_to_excel[i].personalnumber = " ");

			tempdata_to_excel[i].civilian_number
				? (tempdata_to_excel[i].civiliannumber =
						tempdata_to_excel[i].civilian_number)
				: (tempdata_to_excel[i].civiliannumber = " ");

			tempdata_to_excel[i].updatedAt
				? (tempdata_to_excel[i].updated =
						tempdata_to_excel[i].updatedAt.split("T")[0].split("-").reverse().join("/"))
				: (tempdata_to_excel[i].updated = " ");

			tempdata_to_excel[i].present
				? (tempdata_to_excel[i].present_m = "כן")
				: (tempdata_to_excel[i].present_m = "לא");
			tempdata_to_excel[i].todayPresent
				? (tempdata_to_excel[i].todayPresent_m = "כן")
				: (tempdata_to_excel[i].todayPresent_m = "לא");

			// ------------------------ בארמי במקום השורה הזאת ----------------------------------------
			// tempdata_to_excel[i].subject
			// 	? (tempdata_to_excel[i].subject_m = tempdata_to_excel[i].subject)
			// 	: (tempdata_to_excel[i].subject_m = " ");
			//   ----------------------- לעשות את השורה הזאת ----------------------------------
			//   tempdata_to_excel[i].subject ? tempdata_to_excel[i].subject_m = getname(tempdata_to_excel[i].subject, subject) : tempdata_to_excel[i].subject_m = " ";
			// -----------------------------------------------------------------------------------------
		}

		//export to excel -fix
		for (let i = 0; i < tempdata_to_excel.length; i++) {
			//delete unwanted fields
			
			delete tempdata_to_excel[i]._id;
			delete tempdata_to_excel[i].present;
			delete tempdata_to_excel[i].todayPresent;
			delete tempdata_to_excel[i].dailSent;
			delete tempdata_to_excel[i].shamapOpen;
			delete tempdata_to_excel[i].name;
			delete tempdata_to_excel[i].family;
			delete tempdata_to_excel[i].unit;
			delete tempdata_to_excel[i].subject;
			delete tempdata_to_excel[i].personal_number;
			delete tempdata_to_excel[i].details;
			delete tempdata_to_excel[i].__v;
			delete tempdata_to_excel[i].civilian_number;
			delete tempdata_to_excel[i].TodayPresent;
			delete tempdata_to_excel[i].createdAt;
			delete tempdata_to_excel[i].updatedAt;
			delete tempdata_to_excel[i].date;
			delete tempdata_to_excel[i].ta;
			delete tempdata_to_excel[i].job;

			//add non-existing fields - 8
			if (!tempdata_to_excel[i].name_m) {
				tempdata_to_excel[i].name_m = " ";
			}
			if (!tempdata_to_excel[i].lastname) {
				tempdata_to_excel[i].lastname = " ";
			}
			if (!tempdata_to_excel[i].personalnumber) {
				tempdata_to_excel[i].personalnumber = " ";
			}
			if (!tempdata_to_excel[i].updatedAt) {
				tempdata_to_excel[i].updatedAt = " ";
			}
			if (!tempdata_to_excel[i].civilian_number) {
				tempdata_to_excel[i].civilian_number = " ";
			}

		}

		console.log(tempdata_to_excel);

		const currentDate = new Date();
		const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
		const day = currentDate.getDate().toString().padStart(2, "0");

		let EXCEL_EXTENSION = ".xlsx";
		let worksheet = XLSX.WorkSheet;
		let sheetName = "היסטוריית דיוחים של ";

		const headers = {
			updated: "תאריך",
			name_m: "שם",
			lastname: "שם משפחה",
			personalnumber: "מספר אישי",
			civiliannumber: "תעודת זהות",
			present_m: "התייצב",
			todayPresent_m: "התייצב היום",
			// dailSent_m: "נשלח חייגן",
			// shamapOpen_m: 'נפתח שמ"פ',
			// unit_m: "יחידה",
			// subject_m: "מקצוע",
			// job_m: "תפקיד",
			// ta_m: "תא",
		};
		tempdata_to_excel.unshift(headers); // if custom header, then make sure first row of data is custom header

		worksheet = XLSX.utils.json_to_sheet(tempdata_to_excel, {
			skipHeader: true,
		});

		const workbook = XLSX.utils.book_new();
		const fileName = "היסטוריית דיווחים של " + data[0].name + " " + data[0].family + day + "." + month + EXCEL_EXTENSION;
		XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
		XLSX.writeFile(workbook, fileName);

		window.location.reload();
	}
	
	//window
	const [windowSize, setWindowSize] = useState(getWindowSize());

	function getWindowSize() {
		const { innerWidth, innerHeight } = window;
		return { innerWidth, innerHeight };
	}

	useEffect(() => {
		init();
		getUnit();
		getJob();

		// -------- באמרי להוריד מהערה -------
		getSubject();
		// --------------------------------
	}, []);

	useEffect(() => {
		if (!iscardataformopen) {
			CalculateDataArr();
		}
	}, [iscardataformopen]);

	useEffect(() => {
		// loadReports();
		filteruse();
			}, [datasubject, ta, dataunit, tyevent]);

	return (
		<>
			<div style={{ float: "right", paddingBottom: "5px", marginBottom: "1%" }}>
				<button className="btn-green" onClick={FixDataAndExportToExcel}>
					הורד כקובץ אקסל
				</button>
			</div>
			{data.length > 0 ? <Card style={{outline: "#5FD0CA solid 3px" }}>
							<Row style={{ margin: "0px" }}>
								<Col
									xs={12}
									md={8}
									style={{ textAlign: "right" }}
								>
									<h3 style={{marginBottom: "0.5%"}}>היסטוריית דיווחים</h3>
									<h4 style={{marginBottom: "0.5%"}}>שם: {data[0].name}</h4>
									<h4 style={{marginBottom: "0.5%"}}>שם משפחה: {data[0].family}</h4>
									<h4 style={{marginBottom: "0.5%"}}>מספר אישי: {data[0].personal_number}</h4>
								</Col>
							</Row>
				</Card> :
				<Card style={{outline: "#5FD0CA solid 3px" }}>
				<Row style={{ margin: "0px" }}>
					<Col
						xs={12}
						md={8}
						style={{ textAlign: "right" }}
					>
						<h3 style={{marginBottom: "0.5%"}}>אין היסטוריית דיווחים</h3>
						</Col>
				</Row>
	</Card>
				}
				
			<div style={{ textAlign: "right", marginTop: "1%" }}>
				<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
			</div>
			
			
			{/* <MiluimTableFilter originaldata={originaldata} filter={filter} unittype={'admin'} handleChange8={handleChange8} /> */}
			
			{/*modals */}
			<CarDataFormModal
				isOpen={iscardataformopen}
				cardataid={cardataidformodal}
				Toggle={Toggle}
				ToggleForModal={ToggleForModal}
				unittype={props.unittype}
				unitid={props.unitid}
			/>
			<CarDataFormModalDelete
				isOpen={iscardataformdeleteopen}
				cardataid={cardataidfordeletemodal}
				Toggle={ToggleDelete}
				ToggleForModal={ToggleForModalDelete}
				unittype={props.unittype}
				unitid={props.unitid}
			/>

			<div
				className="table-responsive"
				style={{ overflow: "auto", height: windowSize.innerHeight * 0.9 }}
			>
				{/*filter */}

				<table id="table-to-xls-MiluimSortingTable" {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr className={styles.tr} {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th style={{ position: "sticky", top: "-2px" }}>
										<div
											{...column.getHeaderProps(column.getSortByToggleProps())}
										>
											{" "}
											{column.render("Header")}{" "}
										</div>
										<div>
											{column.canFilter ? column.render("Filter") : null}
										</div>
										<div>
											{column.isSorted
												? column.isSortedDesc
													? "🔽"
													: "⬆️"
												: ""}
										</div>
									</th>
								))}
								
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{page.map((row) => {
							prepareRow(row);
							return (
								<tr className="">
									
									{row.cells.map((cell) => {
										if (cell.column.id == "updatedAt") {
											return (
												<td>
													<div
														style={{
															width: "100%",
															height: "40px",
															margin: "0",
															padding: "0",
															overflow: "auto",
														}}
													>
														{cell.value.split("T")[0].split("-").reverse().join("/")}
													</div>
												</td>
											);
										}
										if (cell.column.id == "name") {
											return (
												<td>
													<div
														style={{
															width: "100%",
															height: "40px",
															margin: "0",
															padding: "0",
															overflow: "auto",
														}}
													>
														{cell.value}
													</div>
												</td>
											);
										}
										if (cell.column.id == "family") {
											return (
												<td>
													<div
														style={{
															width: "100%",
															height: "40px",
															margin: "0",
															padding: "0",
															overflow: "auto",
														}}
													>
														{cell.value}
													</div>
												</td>
											);
										}
										if (cell.column.id == "personal_number") {
											return (
												<td>
													<div
														style={{
															width: "100%",
															height: "40px",
															margin: "0",
															padding: "0",
															overflow: "auto",
														}}
													>
														{cell.value}
													</div>
												</td>
											);
										}
										if (cell.column.id == "civilian_number") {
											return (
												<td>
													<div
														style={{
															width: "100%",
															height: "40px",
															margin: "0",
															padding: "0",
															overflow: "auto",
														}}
													>
														{cell.value}
													</div>
												</td>
											);
										}
										if (cell.column.id == "present") {
											if (row.original.present === true) {
												return <td>כן</td>;
											} else {
												return <td>לא</td>;
											}
										}
										if (cell.column.id == "todayPresent") {
											if (row.original.todayPresent === true) {
												return <td>כן</td>;
											} else {
												return <td>לא</td>;
											}
										}
										//------------------ באמרי במקום הif הזה -------------------------------------------------
										{
											/* if (cell.column.id == "subject") {
											return (
												<td>
													<div
														style={{
															width: "100%",
															height: "40px",
															margin: "0",
															padding: "0",
															overflow: "auto",
														}}
													>
														{cell.value}
													</div>
												</td>
											);
										} */
										}
										//------------------ צריך לעשות את זה ------------------------------------------------------
									})}
									
								</tr>
							);
						})}
					</tbody>
				</table>
				<div className="pagination">
					<button onClick={() => previousPage()} disabled={!canPreviousPage}>
						{"<"}
					</button>{" "}
					<button onClick={() => nextPage()} disabled={!canNextPage}>
						{">"}
					</button>{" "}
					<span>
						עמוד{" "}
						<strong>
							{pageIndex + 1} מתוך {pageOptions.length}
						</strong>{" "}
					</span>
					<span>
						| חפש עמוד:{" "}
						<input
							type="number"
							defaultValue={pageIndex + 1}
							onChange={(e) => {
								const page = e.target.value ? Number(e.target.value) - 1 : 0;
								gotoPage(page);
							}}
							style={{ width: "100px", borderRadius: "10px" }}
						/>
					</span>{" "}
					<select
						style={{ borderRadius: "10px" }}
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
						}}
					>
						{[5, 10, 15, 20, 25].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								הראה {pageSize}
							</option>
						))}
						<option key={data.length} value={data.length}>
							הראה הכל
						</option>
					</select>
				</div>
			</div>
		</>
	);
};
export default withRouter(ArchiveTable);
