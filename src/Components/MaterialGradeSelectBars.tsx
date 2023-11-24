import Select from "react-select"
import { useState } from 'react'
import { SelectOptionType } from '../Lib/SelectLabelUtils.tsx'
import { RequestXlsxAndApplyGradeMap, SetSelectedGradeOption, AddCallbackOnGradeMapChanged } from '../Lib/GradeMapManager.tsx'

export default function MaterialGradeSelectBars() : JSX.Element  
{
	RequestXlsxAndApplyGradeMap();

	const [selectOptionsArr, SetSelectOptionsArrCallback] = useState<SelectOptionType[]>([]); // TODO: Have a backend cache and serve Excel file
    AddCallbackOnGradeMapChanged(SetSelectOptionsArrCallback);

	return(
        <>
			<GradeSelect selectOptionsArr={selectOptionsArr} isFirst={true}/>
			<GradeSelect  selectOptionsArr={selectOptionsArr} isFirst={false}/>
        </>
	); 
}

function GradeSelect(props:{selectOptionsArr: SelectOptionType[], isFirst: boolean}) : JSX.Element 
{

    const [selectedOption, SetSelectedOption] = useState<SelectOptionType | null>(null);

    const handleSelectionOnClickCallback = (selectionVal: SelectOptionType| null) : void => 
    {
        if(selectionVal!=null)
        {
            SetSelectedOption(selectionVal);
            SetSelectedGradeOption(selectionVal.value, props.isFirst);
        }
    };
 
    return(
        <>
            <div className="SelectBoxContainer">
                <div className="SelectBox">
                    <Select options={props.selectOptionsArr} onChange={handleSelectionOnClickCallback} autoFocus={true} />
                    <div className="SelectBoxTxt">
                        {selectedOption && <>You&#39;ve have selected {selectedOption.value}</>}
                    </div>
                </div>
            </div>
        </>
    );
}