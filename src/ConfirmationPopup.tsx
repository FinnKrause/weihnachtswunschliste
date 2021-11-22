import React, {useState} from "react";
import "./css/ConfirmationPopup.css";

interface Props {
    Frage: string, 
    onOk: () => void;
    onDecline: () => void;
}

const ConfirmationPopup:React.FC<Props> =(Props):JSX.Element => {
    const [clicked, setClicked] = useState<number>(0);

    return (
        <div className="ConfirmWrapper">
            <h1>{Props.Frage}</h1>
            <div className="ConfirmButtons">
                <button onClick={Props.onDecline}><span>Nein</span></button>
                <button onClick={() => {
                    if (clicked <= 4) setClicked(clicked+1);
                    else Props.onOk();
                }}><span>Ja {(clicked >= 1) ? ((clicked !== 5) ? `(${clicked})` : "DELETE") :  ""}</span></button>
            </div>
        </div>
    );
}

export default ConfirmationPopup