import React from 'react';
import { Artikel, RequestData } from "./App";
import Item from "./Item";
import "./css/Liste.css";

interface Props {
    name: "finn" | "janni" | "martin" | "ines"; 
    data: RequestData;
    handleAddItem: (name: "finn" | "janni" | "martin" | "ines", ToAddObj: Artikel) => any;
    handleDeleteItem: (name: "finn" | "janni" | "martin" | "ines", index: number) => any;
}

const Liste:React.FC<Props> = (Props):JSX.Element => {
    return (
        <div className="Kasten">
            <h1 className="WunschlistenHeader">{Props.name[0].toUpperCase() + Props.name.substr(1) +"'s Wunschliste"}</h1>
            {Props.data[Props.name].map((i, idx) => {
                return <Item key={idx} ArtikelData={i} name={Props.name} fullData={Props.data} handleAddItem={Props.handleAddItem} handleDeleteItem={Props.handleDeleteItem} index={idx}></Item>
            })}
            <Item isAddItem={true} ArtikelData={{link:"", name:""}} name={Props.name} fullData={Props.data} handleAddItem={Props.handleAddItem} handleDeleteItem={Props.handleDeleteItem} index={1000}></Item>
        </div>
    );
}

export default Liste;