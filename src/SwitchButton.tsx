
export default function SwitchButton() : JSX.Element 
{
    const clickFnHandle = () => {
        console.log("LOG");
        return{};
    }
    
    return(
        <>
            <button className="switch-grades-button"  onClick={() => clickFnHandle()}>
                <img className="image" src="./src/assets/SwitchArrows.png"/>
            </button>
        </>
    );
}