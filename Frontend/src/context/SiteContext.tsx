import { createContext } from "preact";
import { GlobalAxios } from "../assets/Functions/globalaxios";
import { useCallback, useReducer } from "preact/hooks";
import {
	MagadalBank,
	System,
	UnitBank,
	User,
	cardatasType,
} from "../interfaces";

type initState = {
	cardatas: cardatasType[] | any[];
	unitBank: UnitBank | {};
	magadBank: MagadalBank | {};
	user: User | {};
	isCachingSupported: boolean;
	isInDarkMode: boolean,
};

let initialState: initState = {
	cardatas: [],
	unitBank: {},
	magadBank: {},
	user: {},
	isInDarkMode: localStorage.getItem("isInDarkMode") === "1" ? true : false,
	isCachingSupported: "caches" in window,

};

interface act {
	type: string;
	value: cardatasType[] | UnitBank | MagadalBank;
}

const reducer = (
	state: any,
	action: act
) => {
	switch (action.type) {
		case "SET_UNIT_BANK": {
			const value = action.value as UnitBank;
			if (!value.sum)
				return state;

			const tmp_map = new Map();
			let tmp = {};

			Object.keys(value.sum).map((el: string) => {
				tmp_map.set(value.sum![el], el);
			});
			tmp = { ...action.value, reverse: tmp_map };
			return {
				...state,
				unitBank: tmp,
			};
		}
		case "SET_MAGAD_BANK": {
			const value = action.value as MagadalBank;
			if (!value.sum)
				return state;

			const tmp_map = new Map();
			let tmp = {};
			Object.keys(value.sum).map((el: string) => {
				tmp_map.set(value.sum![el], el);
			});
			tmp = { ...action.value, reverse: tmp_map };
			return {
				...state,
				magadBank: tmp,
			};
		}
		case "SET_CARDATA": {
			return {
				...state,
				cardatas: action.value,
			};
		}
		case "SET_USER": {
			return {
				...state,
				user: action.value,
			};
		}
		case "TOGGLE_DARK_MODE": {
			return {
				...state,
				isInDarkMode: !state.isInDarkMode
			};
		}
	}
};

type tmp_user_object = { unittype: string; unitid: string | undefined };

function convertRoleToName(user: User) {
	let tmp: tmp_user_object = { unittype: "", unitid: "" };
	switch (user.role) {
		case "0":
			tmp.unittype = "admin";
			tmp.unitid = "0";
			break;
		case "1":
			tmp.unittype = "gdod";
			tmp.unitid = user.gdodid;
			break;
		case "2":
			tmp.unittype = "hativa";
			tmp.unitid = user.hativaid;
			break;
		case "3":
			tmp.unittype = "ogda";
			tmp.unitid = user.ogdaid;
			break;
		case "4":
			tmp.unittype = "pikod";
			tmp.unitid = user.pikodid;
			break;
		case "5":
			tmp.unittype = "general";
			tmp.unitid = "5";
			break;
		default: {
			console.error("you have entered an invalid user/role");
		}
	}
	return tmp;
}

export const SiteContext = createContext({
	...initialState,
	toggleDarkmode: async () => { },
	fetchCardatas: async (user: User) => [],
	getAll: () => [],
	toggleDarkMode: () => undefined,
});

const SiteContextProvider = ({ children }: any) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const fetchCardatas = async () => {
		const start = performance.now();
		// let unittype;
		// let unitid;
		const local_user = await GlobalAxios("get", "session/user");
		console.log(local_user);

		let { unittype, unitid } = convertRoleToName(local_user.data);
		local_user.data.unittype = unittype;

		const [response1, response2, response3] = await Promise.all([
			GlobalAxios(
				"get",
				`cardata/cardatabyunittypeandunitid/${unittype}/${unitid}/true`
			),
			GlobalAxios("get", "get_banks"),
			GlobalAxios("get", "system"),
		]);
		const end = performance.now();
		console.log(
			`time to get user + banks + cardatas ${~~(end - start) / 1000} s`
		);

		const cardatas = response1.data;
		const gmt = response2.data.Magadal_bank;
		const gut = response2.data.Unit_bank;
		const systems = response3.data;
		cardatas.forEach((cardata: cardatasType) => {
			if (cardata.systems && cardata.systems.length > 0) {
				cardata.systems.forEach((systemObj) => {
					const fittingSystem = systems.find(
						(fullSystemData: System) =>
							fullSystemData._id === systemObj.systemType
					);
					systemObj.name = fittingSystem.name;
				});
			}
			return;
		});
		dispatch({ type: "SET_CARDATA", value: cardatas });
		dispatch({ type: "SET_USER", value: local_user.data });
		dispatch({ type: "SET_UNIT_BANK", value: gut });
		dispatch({ type: "SET_MAGAD_BANK", value: gmt });
	};


	const getAll = useCallback(
		(key: string) => {
			if (
				Object.keys(state.magadBank).length === 0 ||
				Object.keys(state.unitBank).length === 0 ||
				state.cardatas.length === 0
			)
				return [];

			switch (key) {
				case "magadals": {
					return Object.keys(state.magadBank.magadals).map((magadalId) => ({
						_id: magadalId,
						name: state.magadBank.magadals[magadalId].name,
					}));
				}
				case "magads": {
					const allMagadalsIds = Object.keys(state.magadBank.magadals);
					const allMagadsIds = allMagadalsIds
						.map((magadalId) => state.magadBank.magadals[magadalId].magads)
						.flat();
					return allMagadsIds.map((magadId) => ({
						_id: magadId,
						name: state.magadBank.magads[magadId].name,
					}));
				}
				case "mkabazs": {
					const allMagadalsIds = Object.keys(state.magadBank.magadals);
					const allMagadsIds = allMagadalsIds
						.map((magadalId) => state.magadBank.magadals[magadalId].magads)
						.flat();
					const allMkabazsIds = allMagadsIds
						.map((magadId) => state.magadBank.magads[magadId].mkabazs)
						.flat();
					return allMkabazsIds.map((mkabazId) => ({
						_id: mkabazId,
						name: state.magadBank.mkabazs[mkabazId].name,
					}));
				}
				case "makats": {
					const allMagadalsIds = Object.keys(state.magadBank.magadals);
					const allMagadsIds = allMagadalsIds
						.map((magadalId) => state.magadBank.magadals[magadalId].magads)
						.flat();
					const allMkabazsIds = allMagadsIds
						.map((magadId) => state.magadBank.magads[magadId].mkabazs)
						.flat();
					const allMakatsIds = allMkabazsIds
						.map((mkabazId) => state.magadBank.mkabazs[mkabazId].makats)
						.flat();
					return allMakatsIds.map((makatId) => ({
						_id: makatId,
						name: state.magadBank.makats[makatId].name,
					}));
				}

				case "pikods": {
					return Object.keys(state.unitBank.pikods).map((pikodId) => ({
						_id: pikodId,
						name: state.unitBank.pikods[pikodId].name,
					}));
				}
				case "ogdas": {
					const allPikodIds = Object.keys(state.unitBank.pikods);
					const allOgdasIds = allPikodIds
						.map((pikodId) => state.unitBank.pikods[pikodId].ogdas)
						.flat();
					return allOgdasIds.map((ogdaId) => ({
						_id: ogdaId,
						name: state.unitBank.ogdas[ogdaId].name,
					}));
				}

				case "hativas": {
					const allPikodIds = Object.keys(state.unitBank.pikods);
					const allOgdasIds = allPikodIds
						.map((pikodId) => state.unitBank.pikods[pikodId].ogdas)
						.flat();
					const allHativasIds = allOgdasIds
						.map((ogdaId) => state.unitBank.ogdas[ogdaId].hativas)
						.flat();
					return allHativasIds.map((hativaId) => ({
						_id: hativaId,
						name: state.unitBank.hativas[hativaId].name,
					}));
				}

				case "gdods": {
					const allPikodIds = Object.keys(state.unitBank.pikods);
					const allOgdasIds = allPikodIds
						.map((pikodId) => state.unitBank.pikods[pikodId].ogdas)
						.flat();
					const allHativasIds = allOgdasIds
						.map((ogdaId) => state.unitBank.ogdas[ogdaId].hativas)
						.flat();
					const allGdodsIds = allHativasIds
						.map((hativaId) => state.unitBank.hativas[hativaId].gdods)
						.flat();
					return allGdodsIds.map((gdodId) => ({
						_id: gdodId,
						name: state.unitBank.gdods[gdodId].name,
					}));
				}
			}
		},
		[state.cardata, state.unitBank, state.magadBank]
	);

	const toggleDarkMode = () => {
		// !state.isInDarkMode because we want to change the value
		localStorage.setItem("isInDarkMode", !state.isInDarkMode ? '1' : '0');
		dispatch({ type: "TOGGLE_DARK_MODE", value: {} });
	};
	return (
		<SiteContext.Provider
			value={{
				...state,
				fetchCardatas,
				getAll,
				toggleDarkMode
			}}
		>
			{children}
		</SiteContext.Provider>
	);
};

export default SiteContextProvider;
