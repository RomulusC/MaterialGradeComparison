import React from 'react'
import ExcelJS from 'exceljs'
import { SelectOptionType } from './SelectLabelUtils.tsx';
import { RecordToSelectOptionTypeArr } from './SelectLabelUtils.tsx'

export class MaterialGrade
{
	name?: string					 = "";
	density?: number				 = 0;
	compressiveStrength?: number	 = 0;
	tensileStrength?: number		 = 0;
	shearStrength?: number			 = 0;
	thermoformingTemp?: number		 = 0;
	elongationAtBreak?: number		 = 0;
	maxCuringTemperature?: number	 = 0;
	colorRef?: [j:number, k:number]	 = [0,0];
	blockSize?: [x:number, y:number, z:number] = [0,0,0];
	estBlockJuice?: number			 = 0;
	skinny?: number					 = 0;
	superskinny?:number				 = 0;
	qA?:number						 = 0;
	description?: string			 = "";
}

export function RequestXlsxAndApplyGradeMap(): void
{
	const req = new XMLHttpRequest();
	req.open("GET", url, true);
	req.responseType = "arraybuffer";

	req.onload = async function() : Promise<void>
	{
		try
		{
			const arrayBuffer :ArrayBuffer = this.response as ArrayBuffer;
  
			const workbook: ExcelJS.Workbook = new ExcelJS.Workbook();
			await workbook.xlsx.load(arrayBuffer);

			const workSheet: ExcelJS.Worksheet | undefined = workbook.getWorksheet();
			const rows: ExcelJS.Row[] | undefined = workSheet?.getRows(0,workSheet.rowCount);

			if(rows == undefined || workSheet == undefined)
			{
				console.log("Excel File returned null on rows!");
				return;
			}

			const titleRow: string[] = [];
			rows[3].eachCell( (cell: ExcelJS.Cell, /*colNumber: number*/) =>
			{
				titleRow.push(cell.toString());
			});

			const map: Record<string,MaterialGrade> = {};

			for(let i = 5; i < workSheet.rowCount; i++ )
			{
				const blockSizeSplit: string[] = rows[i].getCell("L").toString().split("x");

				const grade: MaterialGrade = 
				{
					name : rows[i].getCell("B").toString(),
					density : parseFloat(rows[i].getCell("C").toString()),
					compressiveStrength : parseFloat(rows[i].getCell("D").toString()),
					tensileStrength: parseFloat(rows[i].getCell("E").toString()),
					shearStrength: parseFloat(rows[i].getCell("F").toString()),
					thermoformingTemp: parseFloat(rows[i].getCell("G").toString()),
					elongationAtBreak: parseFloat(rows[i].getCell("H").toString()),
					maxCuringTemperature: parseFloat(rows[i].getCell("I").toString()),
					colorRef:  [parseInt(rows[i].getCell("J").col), parseInt(rows[i].getCell("K").col)],
					blockSize: [blockSizeSplit[0]? parseInt(blockSizeSplit[0]) : 0, blockSizeSplit[1]? parseInt(blockSizeSplit[1]) : 0, blockSizeSplit[2]? parseInt(blockSizeSplit[2]) : 0],
					estBlockJuice: parseFloat(rows[i].getCell("M").toString()),
					skinny: parseFloat(rows[i].getCell("N").toString()),
					superskinny: parseFloat(rows[i].getCell("O").toString()),
					qA: parseFloat(rows[i].getCell("P").toString()),
					description: rows[i].getCell("Q").toString(),
				};

				// Insert Key-Grade Pair 
				if(rows[i].getCell("A").toString() != "")
				{
					map[rows[i].getCell("A").toString()] = grade;
				}
			}

			m_gradeMap = map;

			OnGradeMapChanged();
		}

		catch(error)
		{
			console.log(error);
		}
	};

	req.send();
}

export function NotifySelectedOptionsToGradeMapManager( selectedOptionsArr:(SelectOptionType | null) []) : void
{
	m_selectedOptionsArrCache = selectedOptionsArr;
	NotifyGetMaterialOnSelect();
}

export function RegisterCallbackOnGradeMapChanged(SetSelectOptionsArrCallback: React.Dispatch<React.SetStateAction<SelectOptionType[]>>) : void
{
	m_onGradeMapChanged.push(SetSelectOptionsArrCallback);
}

export function RegisterCallbackSetSelectedOptionsArr(callback:React.Dispatch<React.SetStateAction<(SelectOptionType | null)[]>>) : void
{
	m_notifySelectBarsOnSwitchButton = callback;
}

export function RegisterGetMaterialOnSelect(callback:React.Dispatch<React.SetStateAction<MaterialGrade[]>>) : void
{
	m_notifyGetMaterialOnSelect.push(callback);
}

export function OnSwitchButtonSelected() : void
{
	// swap contents of m_selectedOptionsArrCache
	let lastIndex = m_selectedOptionsArrCache.length-1;
	if(m_selectedOptionsArrCache[lastIndex]?.value == null)
	{
		lastIndex = m_selectedOptionsArrCache.length-2;
	}

	for(let i = 0; i < Math.ceil(lastIndex / 2); i++)
	{
		const tmp = m_selectedOptionsArrCache[i];
		m_selectedOptionsArrCache[i] = m_selectedOptionsArrCache[lastIndex-i];
		m_selectedOptionsArrCache[lastIndex-i] = tmp;
	}

	m_notifySelectBarsOnSwitchButton([...m_selectedOptionsArrCache]);
	NotifyGetMaterialOnSelect();
}

function NotifyGetMaterialOnSelect() : void
{
	for(const it of m_notifyGetMaterialOnSelect)
	{
		it(GetSelectedMaterialGrades());
	}
}

function GetSelectedMaterialGrades() : MaterialGrade[]
{
	const outArr: MaterialGrade[] = [];
	m_selectedOptionsArrCache.forEach( (value: SelectOptionType | null) : void =>
	{
		if(value?.value != null)
		{
			const out = GetMaterialGradeFromKey(value.value);
			out && outArr.push(out);
		}
	});
	return outArr;
}

function OnGradeMapChanged() : void
{
	const keyNameMap: Record<string,string> = GetMaterialKeyNamePairs(m_gradeMap);
	const selectedOptions: SelectOptionType[] = RecordToSelectOptionTypeArr(keyNameMap);
	
	for(const callback of m_onGradeMapChanged)
	{
		callback(selectedOptions);
	}
}

function GetMaterialKeyNamePairs(i_MaterialGradeMap: Record<string,MaterialGrade>) : Record<string,string>
{
	const options : Record<string,string> = {};
	for (const [key, val] of Object.entries(i_MaterialGradeMap)) 
	{
	  if(key != "")
	  {
		// insert
		options[key] = val.name ?? "";
	  }
	}
	return(options);
}

function GetMaterialGradeMap() : Record<string,MaterialGrade>
{
	return(m_gradeMap);
}

function GetMaterialGradeFromKey(i_key: string| null) : MaterialGrade | null
{
	if(i_key == null)
	{
		return(null);
	}

	for (const [key, val] of Object.entries(GetMaterialGradeMap())) 
	{
		if(i_key === key)
		{
			return val;
		}
	}
	return(null)
}

const url = "https://docs.google.com/spreadsheets/d/1uCKHsgeu1TUDqvVJQ2T89dLbTLlLwSxB/export?format=xlsx";

const m_onGradeMapChanged: React.Dispatch<React.SetStateAction<SelectOptionType[]>>[] = [];

let m_gradeMap: Record<string,MaterialGrade> = {};

let m_selectedOptionsArrCache: (SelectOptionType | null) [] = [];
let m_notifySelectBarsOnSwitchButton: React.Dispatch<React.SetStateAction<(SelectOptionType | null)[]>>;
const m_notifyGetMaterialOnSelect: React.Dispatch<React.SetStateAction<MaterialGrade[]>>[] = [];