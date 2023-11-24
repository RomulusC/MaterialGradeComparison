import Select from "react-select"
import React, { useState, useContext } from 'react'
import { SelectOptionType } from '../Lib/SelectLabelUtils.tsx'
import { RequestXlsxAndApplyGradeMap, SetSelectedGradeOption } from '../Lib/GradeMapManager.tsx'

const m_gradeMapUpdatedContext = React.createContext<SelectOptionType[] | undefined>(undefined);

export default function MaterialGradeSelectBars() : JSX.Element  
{
	const [selectOptionsArr, SetSelectOptionsArrCallback] = useState<SelectOptionType[]>([]); // TODO: Have a backend cache and serve Excel file
	RequestXlsxAndApplyGradeMap(SetSelectOptionsArrCallback);

	return(
		<m_gradeMapUpdatedContext.Provider value={selectOptionsArr}>
			<GradeSelect isFirst={true}/>
			<GradeSelect isFirst={false}/>
		</m_gradeMapUpdatedContext.Provider>
	); 
}

function GradeSelect(props:{isFirst: boolean}) : JSX.Element 
{
    const selectOptionsArr: SelectOptionType[] | undefined = useContext(m_gradeMapUpdatedContext);

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
                    <Select options={selectOptionsArr} onChange={handleSelectionOnClickCallback} autoFocus={true} />
                    <div className="SelectBoxTxt">
                        {selectedOption && <>You&#39;ve have selected {selectedOption.value}</>}
                    </div>
                </div>
            </div>
        </>
    );
}