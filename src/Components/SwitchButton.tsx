import switchImg from '../assets/SwitchArrows.png';
import { OnSwitchButtonSelected } from '../Lib/GradeMapManager.tsx'

export default function SwitchButton() : JSX.Element 
{
    const clickFnHandle = (): void =>  
    {
        OnSwitchButtonSelected();
        return;
    }
    
    return(
        <>
            <button className="Switch-Grades-Button"  onClick={() => { clickFnHandle(); }}>
                <img src={switchImg}/>
            </button>
        </>
    );
}