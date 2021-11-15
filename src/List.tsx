import React, {useState} from 'react';
import { Artikel, Personen } from "./App";
import Item from "./Item";
import "./css/Liste.css";

interface Props {
    name: Personen; 
    data: Artikel[];
    handleAddItem: (name: Personen, ToAddObj: Artikel) => any;
    handleDeleteItem: (name: Personen, index: number) => any;

    haserr: boolean;
    seterr: (data:boolean) => void;

    isLoggenIn: boolean;
    setLogin: (data: boolean) => void;
}

const doNothing = () => {

}

const List:React.FC<Props> = (Props):JSX.Element => {

    const [rick, setRick] = useState(true);

    if (Props.isLoggenIn) return (
        <div className="Kasten">
            <h1 className="WunschlistenHeader">{Props.name[0].toUpperCase() + Props.name.substr(1) +"'s Wunschliste"}</h1>
            {(Props.data.length < 1 && rick) && (
                <Item ArtikelData={{link:"https://www.youtube.com/watch?v=dQw4w9WgXcQ", name:"Noch keine Wünsche hier! Trag welche ein!", bild:"https://i.ytimg.com/vi/Liugu2ZL3wI/maxresdefault.jpg"}} name={Props.name} add={doNothing} rem={() => {setRick(false)}} index={1000} haserr={false} seterr={doNothing}></Item>
            )}
            {Props.data && Props.data.map((i, idx) => {
                return <Item key={idx} ArtikelData={i} name={Props.name} add={Props.handleAddItem} rem={Props.handleDeleteItem} index={idx} haserr={Props.haserr} seterr={Props.seterr}></Item>
            })}
            <Item isAddItem={true} ArtikelData={{link:"", name:""}} name={Props.name} add={Props.handleAddItem} rem={Props.handleDeleteItem} index={1000} haserr={Props.haserr} seterr={Props.seterr}></Item>
        </div>
    );
    else return (
        <div className="Kasten">
            <h1 className="WunschlistenHeader">Bitte bestätige dich mit dem Passwort!</h1>
            <input type="password" onChange={(e:React.ChangeEvent<HTMLInputElement>) => {if (e.target.value.toLowerCase() === "krause") {Props.setLogin(true); localStorage.setItem("login", "true")}}}></input>
        </div>
    );
}

export default List;