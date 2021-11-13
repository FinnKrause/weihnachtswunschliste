import React from 'react';
import {Artikel} from "./App";
import Item from "./Item";
import "./css/Liste.css";

interface Props {
    name: string, 
    data: Artikel[]
}

const Liste:React.FC<Props> = (Props):JSX.Element => {
    return (
        <div className="Kasten">
            <h1 className="WunschlistenHeader">{Props.name+"'s Wunschliste"}</h1>
            {Props.data.map((i, idx) => {
                return <Item key={idx} ArtikelData={i}></Item>
            })}
        </div>
    );
}

export default Liste;