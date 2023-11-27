import Select from "react-select"
import { useState, useEffect } from 'react'
import { SelectOptionType } from '../Lib/SelectLabelUtils.tsx'
import { RequestXlsxAndApplyGradeMap, RegisterCallbackOnGradeMapChanged, 
    NotifySelectedOptionsToGradeMapManager, RegisterCallbackSetSelectedOptionsArr } from '../Lib/GradeMapManager.tsx'

export default function MaterialGradeSelectBars() : JSX.Element  
{
    
    const [selectOptionsArr, SetSelectOptionsArrCallback] = useState<SelectOptionType[]>([]); // TODO: Have a backend cache and serve Excel file  
    const [selectedOptionsArr, SetSelectedOptionsArr] = useState<(SelectOptionType | null) []>([null]);

    // Component life cycle:
    // Init
    useEffect( () => 
    {
        RegisterCallbackOnGradeMapChanged(SetSelectOptionsArrCallback);  // add callback before requesting
        RegisterCallbackSetSelectedOptionsArr(SetSelectedOptionsArr);
        RequestXlsxAndApplyGradeMap();
    }, []);

    // On Dependancy Update
    useEffect( () => 
    {
        SetSelectedOptionsArr([null]);
    }, [selectOptionsArr]);

    // On Dependancy Update
    useEffect( () => 
    {
       NotifySelectedOptionsToGradeMapManager(selectedOptionsArr);
    }, [selectedOptionsArr]);

	return(
        <>
            {
                selectedOptionsArr.map( (_value: SelectOptionType | null, index:number) =>
                <>
                    <GradeSelect i_index={index} 
                    i_optionsListAndSelectedOption={selectedOptionsArr}
                    i_SetOptionsListAndSelectedOption={SetSelectedOptionsArr} 
                    i_selectOptionsMaster={selectOptionsArr}/>
                </>)
            }
        </>
	); 
}

function GradeSelect(props:{i_index: number,
    i_SetOptionsListAndSelectedOption :React.Dispatch<React.SetStateAction<(SelectOptionType | null) []>>, 
    i_optionsListAndSelectedOption: (SelectOptionType | null) [],
    i_selectOptionsMaster: SelectOptionType[] }) : JSX.Element 
{

    const handleSelectionOnClickCallback = (selectionVal: SelectOptionType| null) : void => 
    {
        props.i_optionsListAndSelectedOption[props.i_index] = selectionVal;

        if(selectionVal == null) // if cleared
        {
            props.i_optionsListAndSelectedOption.splice(props.i_index, 1);
        }
        else
        {
            let append: boolean = true;
            for(let i:number = props.i_optionsListAndSelectedOption.length - 1; i >= 0; i--)
            {
                const element = props.i_optionsListAndSelectedOption[i];
                if(element == null && i != props.i_index)
                {
                    // Dont append, as there is an empty select bar
                    append = false;
                    break;
                }
            
            }
            if(append && props.i_optionsListAndSelectedOption.length < props.i_selectOptionsMaster.length)
            {
                props.i_SetOptionsListAndSelectedOption([...props.i_optionsListAndSelectedOption, null]);
                return;
            }
        }
        props.i_SetOptionsListAndSelectedOption([...props.i_optionsListAndSelectedOption]);

    };

    const isOptionDisabledCallback = ( option: { label: string; value: string; }) => 
    {
        for(const it of props.i_optionsListAndSelectedOption)
        {
            if(it?.value == option.value )
            {
                return true;
            }
        }
        return false;
    };

    const availableOptions = props.i_selectOptionsMaster;
    const selectedOption = props.i_optionsListAndSelectedOption[props.i_index];

    return(
        <>
            <div className="SelectBoxContainer">
                <div className="SelectBox">
                    <Select options={availableOptions} value={selectedOption} isOptionDisabled={isOptionDisabledCallback} 
                    onChange={handleSelectionOnClickCallback}  isClearable={true} autoFocus={false} hideSelectedOptions={false}  
                    blurInputOnSelect={true} backspaceRemovesValue={false} />
                    <div className="SelectBoxTxt">
                        {selectedOption && <>You&#39;ve have selected {selectedOption.value}</>}
                    </div>
                </div>
            </div>
        </>
    );
}