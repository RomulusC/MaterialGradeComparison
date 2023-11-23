import './App.css'
import { SelectBarsMaterialMap } from './MaterialGradeMap.tsx'
import SwitchButton from './SwitchButton.tsx'

export default function App() : JSX.Element 
{
    return (
        <>
            <SelectBarsMaterialMap/>
            <SwitchButton/>
        </>
    );
}
