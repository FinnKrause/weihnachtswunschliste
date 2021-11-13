import React from "react";
import {Artikel} from "./App";
import "./css/Item.css";

interface Props {
    ArtikelData: Artikel
}

const Item:React.FC<Props> = (Props):JSX.Element => {
    return (
        <div className="ItemWrapper">
            <div className="VorschauBildWrapper">
                {Props.ArtikelData.bild && <img src={Props.ArtikelData.bild} alt={Props.ArtikelData.bild.toString()} className="Vorschaubild"/>}
            </div>
            <div className="ItemDatenWrapper">
                <a className="ItemName" href={Props.ArtikelData.link} target="_blank" rel="noreferrer">{Props.ArtikelData.name}</a>
                <p>{Props.ArtikelData.rating}</p>
            </div>
        </div>
    );
}

export default Item;