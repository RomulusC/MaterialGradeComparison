import Select from "react-select"
import { useState, useContext } from 'react'
import {GradeMapContext} from '../MaterialGradeMap.tsx'

export interface SelectOptionType { label: string, value: string }

export function ExtractOptions(keyNameMap: Record<string, string>, /*filterKeywords? :string[]*/) : SelectOptionType[]
{
    const valueLabelPairArr:SelectOptionType[] = [];
    for (const [key, name] of Object.entries(keyNameMap)) 
    {
      const obj: SelectOptionType =
      {
        label: name,
        value: key
      };
      valueLabelPairArr.push(obj);
    } 
    return valueLabelPairArr;
}


export function RPopulateMenu() : JSX.Element 
{
    const selectOptions: SelectOptionType[] | undefined = useContext(GradeMapContext);

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
                    <Select options={selectOptions} onChange={handleSelectionOnClick} autoFocus={true} />
                    <div className="mt-4">
                        {selectedOption && <>You&#39;ve have selected {selectedOption.value} - Live-Reload Enabled</>}
                    </div>
                </div>
            </div>
        </>
    );
}