import { Cell } from "@tanstack/react-table";
import { ReactNode } from "preact/compat";
import { RegisterOptions } from "react-hook-form";

export interface iSelectable {
	id: string;
	value: string;
}

export interface iNavItem {
	text: string;
	to: string;
	Icon: any;
}

export interface iNavSection {
	text: string;
	items: iNavItem[];
}

export interface iMenuTreeItem {
	title: string;
	to: string;
	items?: iMenuTreeItem[];
}

export interface iUnitData {
	title: string;
	trueCount: number;
	falseCount: number;
}

// title will be display value, items.key will be the units
export interface iMagadData {
	[key: string]: {
		title: string;
		items: {
			[key: string]: iUnitData;
		};
	};
}
export type tDependancyArray = { key: string; value: string }[] | string[];
export type tConditionType = 'VISIBILITY' | 'ENABILITY';

export type fieldTypes =
	| "SELECT"
	| "TEXT_FIELD"
	| "DATE"
	| "MULTI_SELECT"
	| "BUTTON"
	| "TITLE"
	| "DYNAMIC_LIST"
	| "FILE";

interface iFieldButton {
	title: string,
	width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // must be between 1 to 12
	onAction: (fieldValue: any) => void
}
interface iBasicField {
	id: string;
	title: string;
	width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // must be between 1 to 12
	button?: iFieldButton,
	fieldType: fieldTypes;
	dependsOn?: string; // a key of which buttons have only one depedenecy
	registerOptions?: RegisterOptions;
	unvisibleWhen?: tDependancyArray,
	visibleWhen?: tDependancyArray,
	disabledWhen?: tDependancyArray,
	enabledWhen?: tDependancyArray,
}

export interface iTextField extends iBasicField {
	inputType: "number" | "text" | "date";
	defaultValue?: number | string | Date;
}

export interface iMultipleSelectField extends iBasicField {
	options: iSelectable[] | { [key: string]: iSelectable[] };
	defaultSelectedValues?: iSelectable[];
}

export interface iSelectField extends iBasicField {
	options: iSelectable[] | { [key: string]: iSelectable[] };
	defaultValue?: iSelectable;
}

export interface iDynamicListField extends iBasicField {
	fields: iField[];
}

export interface iFileField extends iBasicField { }

export type iField =
	| iTextField
	| iMultipleSelectField
	| iSelectField
	| iFileField;

interface iTableColumn<T> {
	header?: string;
	accessorKey?: string;
	id: string;
	type?: "Date" | "String" | "Custom" | "Meta" | "Function";
	cell?: (cell: Cell<T, unknown>) => ReactNode;
};

export interface iStringTableColumn<T> extends iTableColumn<T> {
	filterFn?: (cellValue: any, valueFromFilter: any) => boolean;
}

export interface iFunctionTableColumn<T> extends iTableColumn<T> {
	accessorFn: (row: T) => string
}

export interface iDateTableColumn<T> extends iTableColumn<T> {
	filterFn?: (cellValue: Date, valueFromFilter: Date) => boolean;
}

export interface iCustomTableColumn<T> extends iTableColumn<T> {
	parser: (objects: any[]) => string[], // transfers the object into a readable string for globalFilter
	cell: (items: string[]) => ReactNode[],
	filterFn?: (items: string[], valueFromFilter: any) => boolean,
	sortFn: (items: string[]) => number
}

// a column to always be hidden, to exist only when searching for values
export interface iMetaTableColumn<T> extends iTableColumn<T> {
	accessorFn: (row: T) => string,
	filterFn: (cellValue: string, valueFromFilter: string) => boolean,
}

export type ColumnsType<T> = iCustomTableColumn<T> | iDateTableColumn<T> | iStringTableColumn<T> | iMetaTableColumn<T> | iFunctionTableColumn<T>;

type tFlterField = "TOGGLE" | "MULTISELECT" | "DATE";

export interface iDateChangeProps {
	date: Date;
	type: "BIGGER_THAN" | "LESS_THAN";
	includingSelf: boolean
};

interface iBasicFilter {
	title: string;
	id: string;
	options: iSelectable[];
	type: tFlterField;
	width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
	enabledWhen?: tDependancyArray,
	disabledWhen?: tDependancyArray,
	visibleWhen?: tDependancyArray;
	unvisibleWhen?: tDependancyArray,
	defaultValues?: iSelectable[];
}

export interface iToggleFilter extends iBasicFilter {
	selectAll?: boolean;
	flexDirection?: "row" | "column";
	onClick: (newFilterState: iSelectable[]) => void;
}

export interface iMultiSelectFilter extends iBasicFilter {
	onChange: (newFilterState: { id: string; value: iSelectable[] }) => void;
}

export interface iDateFilter extends iBasicFilter {
	onChange: (selectedDate: Date) => void;
}

export type iFilter = iToggleFilter | iMultiSelectFilter | iDateFilter;

export type Gdod = {
	name: string;
	hativaId: string;
};

export type Hativa = {
	name: string;
	ogdaId: string;
	gdods: string[];
};

export type Ogda = {
	name: string;
	pikodId: string;
	hativas: string[];
};

export type Pikod = {
	name: string;
	ogdas: string[];
};

export type FinalItem = {
	ogdaId: string;
	ogdaName: string;
	ogdas: OgdaItem[];
};

export type HativaItem = {
	hativaId: string;
	hativaName: string;
	gdods: GdodItem[];
};
export type OgdaItem = {
	ogdaId: string;
	ogdaName: string;
	hativas: HativaItem[];
};

export type GdodItem = {
	_id: string;
	hativa: string;
	name: string;
	sadir: string;
};

export type SumItem = {
	[key: string]: string[];
};

export type TopItem = {
	[key: string]: string[];
};

export type Makat = {
	name: string;
	mkabazId: string;
};

export type Mkabaz = {
	name: string;
	magadId: string;
	makats: string[];
};

export type Magad = {
	name: string;
	magadalId: string;
	mkabazs: string[];
};

export type Magadal = {
	name: string;
	magads: Record<string, MagadItem>;
};

export type MagadItem = {
	magadId: string;
	magadName: string;
	mkabazs: MkabazItem[];
};

export type MkabazItem = {
	mkabazId: string;
	mkabazName: string;
	makats: string[];
};

export type MagadalItem = {
	magadalId: string;
	magadalName: string;
	magads: Record<string, MagadItem>;
};

type reverse = Map<string[], string>;

export type MagadalBank = {
	makats?: Record<string, Makat>;
	mkabazs?: Record<string, Mkabaz>;
	magads?: Record<string, Magad>;
	magadals?: Record<string, MagadalItem>;
	final?: Record<string, MagadalItem>;
	sum?: Record<string, SumItem>;
	Top?: TopItem;
	reverse?: reverse;
};

export type UnitBank = {
	gdods?: Record<string, Gdod>;
	hativas?: Record<string, Hativa>;
	ogdas?: Record<string, Ogda>;
	pikods?: Record<string, Pikod>;
	final?: Record<string, FinalItem>;
	sum?: Record<string, SumItem>;
	Top?: TopItem;
	reverse?: reverse;
};

export type Banks = {
	UnitBank: UnitBank;
	magadBank: MagadalBank;
};

type SystemType = {
	_id: string;
};

export type System = {
	name?: string;
	systemType: SystemType;
	kashir: boolean;
	_id: string
};

export type tipultype = {
	id: string;
	tipul_key: string,
	tipul_entry_date: Date;
	mikum_tipul?: string;
	hh_stands?: {
		amount: number,
		makatName: string
	}
};

export type reservevisits = {
	_id: string;
	name?: String;
	family?: String;
	personal_number: String;
	civilian_number?: Number;
	present: Boolean;
	todayPresent: Boolean;
	dailSent: Boolean;
	shamapOpen: Boolean;
	subject?: String;
	details?: String;
	unit?: String;
	job?: String;
	ta: String;
	__v?: number;
};


export type cardatasType = {
	_id: string;
	carnumber: string;
	makat: string;
	gdod?: string;
	stand: string;
	updatedBy: string;
	createdAt: Date,
	updatedAt: Date,
	__v?: number;
	expected_repair?: string;
	status: string;
	takala_info?: string;
	zminot: string;
	kshirot: string;
	tipuls?: tipultype[]; // You might want to specify the type of elements in the 'tipuls' array
	tags?: string[];
	mikum?: string;
	systems?: System[];
	magadalName?: string;
	magadName?: string;
	mkabazName?: string;
	makatName?: string;
	pikodName?: string;
	ogdaName?: string;
	hativaName?: string;
	gdodName?: string;
	mkabaz?: string;
	magad?: string;
	magadal?: string;
	hativa?: string;
	ogda?: string;
	pikod?: string;
};

export type User = {
	_id: string;
	role: string;
	validated: boolean;
	site_permission: string;
	name: string;
	lastname: string;
	personalnumber: string;
	gdodid?: string;
	hativaid?: string;
	ogdaid?: string;
	pikodid?: string;
	createdAt: Date;
	updatedAt: Date;
	__: number;
	mainscreenid?: string | null;
};
export type CacheHook<T> = {
	cacheValue: T;
	updateCache: (value: T) => void;
	invalidateCache: () => void;
};

export type FactoryFunction<T> = () => T;


export interface iHazana {
	pikod: string; // Command
	ogda: string; // Brigade
	gdod: string;
	hativa: string; // Division
	sdirot: string; // Battalion
	lastUpdateDate: Date; // Last Update Date
	tkinot: string; // Invalid
}