export interface SelectOptionType { label: string, value: string }

export function RecordToSelectOptionTypeArr(keyNameMap: Record<string, string>, /*filterKeywords? :string[]*/) : SelectOptionType[]
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