import axios from "axios";
import React from "react";
import {Artikel, RequestData} from "./App";
import "./css/Item.css";

interface Props {
    name: "finn" | "janni" | "martin" | "ines"; 
    isAddItem?: boolean;
    fullData: RequestData;
    ArtikelData: Artikel;
    index: number,

    handleAddItem: (name: "finn" | "janni" | "martin" | "ines", ToAddObj: Artikel) => any;
    handleDeleteItem: (name: "finn" | "janni" | "martin" | "ines", index: number) => any;
}

const Item:React.FC<Props> = (Props):JSX.Element => {
    if (Props.isAddItem) {
        return (
            <div className="ItemWrapper SpecialWrapper">
                <input id="Name" type="text" className="NewItemInputText" placeholder="Artikel-Name/Wunsch"/>
                <input id="Link" type="text" className="NewItemInputText" placeholder="Link zum Artikel"/>
                <input id="BildLink" type="text" className="NewItemInputText" placeholder="Bild-Link"/>
                <input id="Rating" type="range"/>
                <button className="SubmitRequest" onClick={() => {
                    const name = document.getElementById("Name")! as HTMLInputElement;
                    const BildLink = document.getElementById("BildLink")! as HTMLInputElement;
                    const link = document.getElementById("BildLink")! as HTMLInputElement;
                    const Rating = document.getElementById("Rating")! as HTMLInputElement;
                                        
                    Props.handleAddItem(Props.name, {bild: (BildLink.value) ? BildLink.value : "https://unsplash.it/300/200", name: name.value, rating: Rating.value, link: link.value})
                    
                }}>Submit</button>
            </div>
        );
    }
    else return (
        <div className="ItemWrapper">
            <div className="VorschauBildWrapper">
                {Props.ArtikelData.bild && <img src={Props.ArtikelData.bild} alt={Props.ArtikelData.bild.toString()} className="Vorschaubild"/>}
            </div>
            <div className="ItemDatenWrapper">
                <a className="ItemName" href={Props.ArtikelData.link} target="_blank" rel="noreferrer">{Props.ArtikelData.name}</a>
                <p>{Props.ArtikelData.rating}</p>
            </div>
            <svg className="DeleteButton" onClick={() => {
                Props.handleDeleteItem(Props.name, Props.index)
            }} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff0000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="4" y1="7" x2="20" y2="7" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
        </div>
    );
}

export default Item;