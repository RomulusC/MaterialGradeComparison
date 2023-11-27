import Select from "react-select"
import { useState, useEffect } from 'react'
import { SelectOptionType } from '../Lib/SelectLabelUtils.tsx'
import { RequestXlsxAndApplyGradeMap, AddCallbackOnGradeMapChanged } from '../Lib/GradeMapManager.tsx'

export default function MaterialGradeSelectBars() : JSX.Element  
{
    
    const [selectOptionsArrMaster, SetSelectOptionsArrCallback] = useState<SelectOptionType[]>([]); // TODO: Have a backend cache and serve Excel file  
    const [optionsListAndSelectedOption, SetOptionsListAndSelectedOption] = useState<{availableOptions: SelectOptionType[], selectedOption: SelectOptionType | null }[]>([]);

    // Component life cycle:
    // Init
    useEffect( () => 
    {
        SetOptionsListAndSelectedOption([{availableOptions: selectOptionsArrMaster, selectedOption: null}]);
        AddCallbackOnGradeMapChanged(SetSelectOptionsArrCallback);  // add callback before requesting, incase request finishes before callback added
        RequestXlsxAndApplyGradeMap();
    }, []);

    // On Dependancy Update
    useEffect( () => 
    {
        SetOptionsListAndSelectedOption([{availableOptions: selectOptionsArrMaster, selectedOption: null}]);
    }, [selectOptionsArrMaster]);

    // On Dependancy Update
    useEffect( () => 
    {
        // remove chosen options 
        //tmp_optionsListAndSelectedOption= optionsListAndSelectedOption - chosen;
        //pass tmp_optionsListAndSelectedOption to return();
    }, [optionsListAndSelectedOption]);


	return(
        <>
            {
                optionsListAndSelectedOption.map( (_value:{availableOptions: SelectOptionType[], selectedOption: SelectOptionType | null}, index:number) =>
                <>
                    <GradeSelect i_index={index} 
                    i_optionsListAndSelectedOption={optionsListAndSelectedOption}
                    i_SetOptionsListAndSelectedOption={SetOptionsListAndSelectedOption} 
                    i_selectOptionsMaster={selectOptionsArrMaster}/>
                </>)
            }
        </>
	); 
}

function GradeSelect(props:{i_index: number,
    i_SetOptionsListAndSelectedOption :React.Dispatch<React.SetStateAction<{availableOptions: SelectOptionType[], selectedOption: SelectOptionType | null }[]>>, 
    i_optionsListAndSelectedOption: {availableOptions: SelectOptionType[], selectedOption: SelectOptionType | null }[],
    i_selectOptionsMaster: SelectOptionType[] }) : JSX.Element 
{

    const handleSelectionOnClickCallback = (selectionVal: SelectOptionType| null) : void => 
    {
        props.i_optionsListAndSelectedOption[props.i_index].selectedOption = selectionVal;

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
                if(element.selectedOption == null && i != props.i_index)
                {
                    // Dont append, as there is an empty select bar
                    append = false;
                    break;
                }
            
            }
            if(append) // if bottom entry is not empty, append
            {
                props.i_SetOptionsListAndSelectedOption([...props.i_optionsListAndSelectedOption, {availableOptions:props.i_selectOptionsMaster, selectedOption:null }]);
                return;
            }
        }
        props.i_SetOptionsListAndSelectedOption([...props.i_optionsListAndSelectedOption]);

    };

    // TODO: Pass an array of currently selected values, the same option cannot be selected    
    const availableOptions = props.i_optionsListAndSelectedOption[props.i_index].availableOptions;
    const selectedOption = props.i_optionsListAndSelectedOption[props.i_index].selectedOption

    return(
        <>
            <div className="SelectBoxContainer">
                <div className="SelectBox">
                    <Select options={availableOptions} value={selectedOption} onChange={handleSelectionOnClickCallback}  isClearable={true} autoFocus={false} hideSelectedOptions={true}  blurInputOnSelect={true}/>
                    <div className="SelectBoxTxt">
                        {selectedOption && <>You&#39;ve have selected {selectedOption.value}</>}
                    </div>
                </div>
            </div>
        </>
    );
}