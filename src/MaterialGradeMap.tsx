import React, { useState } from 'react'
import ExcelJS from 'exceljs'
import {RPopulateMenu, ExtractOptions, SelectOptionType} from './Lib/RSelectMenu.tsx'

const url = "https://docs.google.com/spreadsheets/d/1uCKHsgeu1TUDqvVJQ2T89dLbTLlLwSxB/export?format=xlsx";

export type Label = Record<string,string>; 

let m_gradeMap: Record<string,Grade> = {};

class Grade
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

export function RequestDataExcelSheet(SetSelectOptions: React.Dispatch<React.SetStateAction<SelectOptionType[]>>): void
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

			const map: Record<string,Grade> = {};

			for(let i = 5; i < workSheet.rowCount; i++ )
			{
				const blockSizeSplit: string[] = rows[i].getCell("L").toString().split("x");

				const grade: Grade = 
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
				if(rows[i].getCell("A").toString() != "")
				{
					map[rows[i].getCell("A").toString()] = grade;
				}
			}
			m_gradeMap = map;


			const valueLabelPairArr:SelectOptionType[] = [];
    		for (const [key, name] of Object.entries(GetMaterialKeyNamePairs()))
    		{
      				const obj: SelectOptionType =
      			{
        			label: name,
        			value: key
      			};

      			valueLabelPairArr.push(obj);
    		} 
			SetSelectOptions(ExtractOptions(GetMaterialKeyNamePairs()));
		}

		catch(error)
		{
			console.log(error);
		}
	};

	req.send();
}

export const GradeMapContext = React.createContext<SelectOptionType[] | undefined>(undefined);

export function SelectBarsMaterialMap() : JSX.Element 
{

	const [selectOptions, SetSelectOptions] = useState<SelectOptionType[]>(ExtractOptions(GetMaterialKeyNamePairs())); //TODO: Read Local Save first

	RequestDataExcelSheet(SetSelectOptions);

	return(
		<GradeMapContext.Provider value={selectOptions}>
			<RPopulateMenu/>
			<RPopulateMenu/>
		</GradeMapContext.Provider>
	); 
}

export function GetMaterialGradeData(i_key: string) : Grade | null
{
	for (const [key, val] of Object.entries(GetMaterialGradeMap())) 
	{
		if(i_key === key)
		{
			return val;
		}
	}
	return(null)
} 

function GetMaterialKeyNamePairs() : Record<string,string>
{
	const options : Record<string,string> = {};
	for (const [key, val] of Object.entries(GetMaterialGradeMap())) 
	{
	  if(key != "")
	  {
		// insert
		options[key] = val.name ?? "";
	  }
	}
	return(options);
}

function GetMaterialGradeMap() : Record<string,Grade>
{
	return(m_gradeMap);
}          