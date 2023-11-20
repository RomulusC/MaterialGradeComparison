import Select from "react-select"
import { useState } from 'react';

export interface SelectOptionType { label: string, value: string }

export function RSelectMenu(props:{keyNameMap: Record<string, string>, filterKeywords? :string[]}) : JSX.Element 
{
    const valueLabelPairArr:SelectOptionType[] = [];
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

function RPopulateMenu(valueLabelPairArr:SelectOptionType[]) : JSX.Element 
{
    const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);

    const handleSelectionOnClick = (selectionVal: SelectOptionType| null) : void => 
    {
      setSelectedOption(selectionVal);
      console.log(`Option selected:`, selectionVal? selectionVal.value : "");
    };
 
    return(
        <>
            <div className="container">
                <div className="SelectBox">
                    <Select options={valueLabelPairArr} onChange={handleSelectionOnClick} autoFocus={true} />
                    <div className="mt-4">
                        {selectedOption && <>You&#39;ve have selected {selectedOption.value}</>}
                    </div>
                </div>
            </div>
        </>
    );
}