import Select from "react-select"
import { useState } from 'react';

export type SelectOptionType = { label: string, value: string };

export function RSelectMenu(props:{keyNameMap: {[id: string]: string}, filterKeywords? :Array<any>}) : JSX.Element 
{
    let valueLabelPairArr:Array<SelectOptionType> = new Array<SelectOptionType>();
    for (const [key, name] of Object.entries(props.keyNameMap)) 
    {
      const obj: SelectOptionType =
      {
        label: name,
        value: key
      };
      valueLabelPairArr.push(obj);
    } 
    return(RPopulateMenu(valueLabelPairArr));
}

function RPopulateMenu(valueLabelPairArr:Array<SelectOptionType>) : JSX.Element 
{
    const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);

    const handleSelectionOnClick = (selectionVal: SelectOptionType| null) => 
    {
      setSelectedOption(selectionVal);
      console.log(`Option selected:`, selectionVal?.value!);
    };
 
    return(
        <>
            <div className="container">
                <div className="SelectBox">
                    <Select options={valueLabelPairArr} onChange={handleSelectionOnClick} autoFocus={true} />
                    <div className="mt-4">
                        {selectedOption && <>You've selected {selectedOption.value}</>}
                    </div>
                </div>
            </div>
        </>
    );
}