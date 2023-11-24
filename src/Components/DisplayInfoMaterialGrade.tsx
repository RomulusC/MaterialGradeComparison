import { useState } from 'react'
import { AddCallbackOnSelectedMaterialOptions, MaterialGrade } from "../Lib/GradeMapManager.tsx";

export default function DisplayChosenMaterialGrades() : JSX.Element
{   
    const [materialGradePairs, SetMaterialGradePairsCallback] = useState<[MaterialGrade | null, MaterialGrade| null]>([null,null]); // TODO: Have a backend cache and serve Excel file
	AddCallbackOnSelectedMaterialOptions(SetMaterialGradePairsCallback);

    const outPut1Arr: string[] = materialGradePairs[0] ? GetDebugMaterialGradeDataAsStringArr(materialGradePairs[0]) : [];
    const outPut2Arr: string[] = materialGradePairs[1] ? GetDebugMaterialGradeDataAsStringArr(materialGradePairs[1]) : [];

    return(
        <>
            <div className="SelectBoxContainer">
                {materialGradePairs[0] && <> {outPut1Arr} </>}
            </div>
            <div className="SelectBoxContainer">
                {materialGradePairs[1] &&<> {outPut2Arr} </>}
            </div>
        </>
    );
}

function GetDebugMaterialGradeDataAsStringArr(materialGrade: MaterialGrade) : string[] 
{
    const str:string[] = [];

    str.push("Grade Name: ");
    str.push(materialGrade.name ?   (materialGrade.name + '\n') : "");
    str.push("Density (kg/m3): ");
    str.push(materialGrade.density  ? (materialGrade.density.toString() + '\n') : "");
    str.push("Compressive Strength (PSI): ");
    str.push(materialGrade.compressiveStrength  ? (materialGrade.compressiveStrength.toString() + '\n') : "");
    str.push("Tensile Strength (PSI): ");
    str.push(materialGrade.tensileStrength  ? (materialGrade.tensileStrength.toString() + '\n') : "");
    str.push("Shear Strength (PSI): ");
    str.push(materialGrade.shearStrength  ? (materialGrade.shearStrength.toString() + '\n') : "");
    str.push("Thermoforming Temp °C: ");
    str.push(materialGrade.thermoformingTemp  ? (materialGrade.thermoformingTemp.toString() + '\n') : "");
    str.push("Elongation at Break %: ");
    str.push(materialGrade.elongationAtBreak  ? (materialGrade.elongationAtBreak.toString() + '\n') : "");
    str.push("Max Curing Temp °C: ");
    str.push(materialGrade.maxCuringTemperature  ? (materialGrade.maxCuringTemperature.toString() + '\n') : "");
    str.push("Colour Ref: ");
    str.push(materialGrade.colorRef  ? (materialGrade.colorRef.toString() + '\n') : "");
    str.push("Block Size (mm): ");
    str.push(materialGrade.blockSize  ? (materialGrade.blockSize.toString() + '\n') : "");
    str.push("Est Block Juice (mm): ");
    str.push(materialGrade.estBlockJuice  ? (materialGrade.estBlockJuice.toString() + '\n') : "");
    str.push("Skinny (mm): ");
    str.push(materialGrade.skinny  ? (materialGrade.skinny.toString() + '\n') : "");
    str.push("Super Skinny (mm): ");
    str.push(materialGrade.superskinny  ? (materialGrade.superskinny.toString() + '\n') : "");
    str.push("QA (mm): ");
    str.push(materialGrade.qA  ? (materialGrade.qA.toString() + '\n') : "");
    str.push("Description: ");
    str.push(materialGrade.description  ? (materialGrade.description.toString() + '\n') : "");

    return str;
}