import Popup from "./Pcomponents/Popup";
import { useState, useEffect } from "react";

function Papp() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [timedPopup, setTimedPopup] = useState(false);

  useEffect(
    setTimeout(() => {
      setTimedPopup(true);
    }, 3000),
    []
  );

  return (
    <div className="App">
      <main>
        <h1>React Popups</h1>
        <br />
        <br />
        <button onClick={() => setButtonPopup(true)}>Open Popups</button>
      </main>

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h3>My popup</h3>
        <p>This is my button triggered popup</p>
      </Popup>

      <Popup trigger={timedPopup} setTrigger={setTimedPopup}>
        <h3>My Timedpopup</h3>
        <p>This is my timed popup</p>
      </Popup>
    </div>
  );
}

export default Papp;
