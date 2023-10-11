import React, { useMemo, useState, useEffect } from "react";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	useFilters,
	usePagination,
} from "react-table";
import { withRouter, Redirect, Link } from "react-router-dom";
import { COLUMNS } from "./coulmns";
import { GlobalFilter } from "./GlobalFilter";
import axios from "axios";
import { signin, authenticate, isAuthenticated } from "auth/index";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Row, Col } from "reactstrap";
import CarDataFormModal from "views/general/miluimpage/CarDataFormModal";
import CarDataFormModalDelete from "views/general/miluimpage/CarDataFormModalDelete";
import styles from "./SortingTable.module.css";
//redux

const SortingTable = (props) => {
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
	//redux

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

	function init() {
	}

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


	//window
	const [windowSize, setWindowSize] = useState(getWindowSize());

	function getWindowSize() {
		const { innerWidth, innerHeight } = window;
		return { innerWidth, innerHeight };
	}

	// useEffect(() => {
	// 	function handleWindowResize() {
	// 		setWindowSize(getWindowSize());
	// 	}
	// 	window.addEventListener("resize", handleWindowResize);
	// 	return () => {
	// 		window.removeEventListener("resize", handleWindowResize);
	// 	};
	// }, []);

	return  (
		<>
		        <button className="btn-new-blue" value={undefined} onClick={Toggle} style={{ marginRight: '5px' }}>הוסף איש מילואים</button>
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

				<table {...getTableProps()} id="table-to-xls">
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
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
								                <th>עדכן</th>
                <th>מחק</th>
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
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
export default withRouter(SortingTable);
