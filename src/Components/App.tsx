import '../CSS/App.css'
import SelectBarsMaterialMap from './MaterialGradeSelectBars.tsx'
import DisplayChosenMaterialGrades from '../Components/DisplayInfoMaterialGrade.tsx'
import SwitchButton from './SwitchButton.tsx'


export default function App() : JSX.Element 
{
    return (
        <>
            <SelectBarsMaterialMap/>
            <DisplayChosenMaterialGrades/>
            <SwitchButton/>
        </>
    );
}
