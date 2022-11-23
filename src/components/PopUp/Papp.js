import Popup from './Pcomponents/Popup';

function Papp(){
    return(
        <div className= "App">
            <main>
                <h1>React Popups</h1>
                <button>Open Popups</button>
                <Popup trigger={false}>
                    <h3>My popup</h3>
                </Popup>
            </main>
        </div>
    )
}

export default Papp;
