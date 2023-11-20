import './App.css'
import { SelectBarMaterialMap } from './MaterialGradeMap.tsx'
import SwitchButton from './SwitchButton.tsx'


export default function App() : JSX.Element 
{
    return (
        <>
            <SelectBarMaterialMap/>
            <SelectBarMaterialMap/>
            <SwitchButton/>
        </>
    );
}
