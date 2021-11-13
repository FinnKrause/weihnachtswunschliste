import React from "react";
import {Artikel} from "./App";
import "./css/Item.css";

interface Props {
    name: "finn" | "janni" | "martin" | "ines"; 
    isAddItem?: boolean;
    ArtikelData: Artikel;
    index: number,

    add: (name: "finn" | "janni" | "martin" | "ines", ToAddObj: Artikel) => any;
    rem: (name: "finn" | "janni" | "martin" | "ines", index: number) => any;

    haserr: boolean;
    seterr: (data: boolean) => void;
}

const Item:React.FC<Props> = (Props):JSX.Element => {
    if (Props.isAddItem) {
        return (
            <div className="ItemWrapper SpecialWrapper">
                <div className="NeuerWunschHeaderWrapper">
                    <h1 className="NeuerWunschHeader">Neuen Wunsch hinzufügen!</h1>
                </div>
                {Props.haserr && <p className="ALERT">!Bitte gib dem neuen Eintrag einen Namen!</p>}
                <div className="SpecialDownWrapper">
                    <div className="Inputs">
                        <div className="InputWrapper">
                            <p>Wunsch: </p>
                            <input id="Name" type="text" className="NewItemInputText" placeholder="Artikel-Name/Wunsch"/>
                        </div>
                        <div className="InputWrapper">
                            <p>Link zum Artikel: </p>
                            <input id="Link" type="text" className="NewItemInputText" placeholder="Link zum Artikel"/>
                        </div>
                        <div className="InputWrapper">
                            <p>Vorschaubild-Link: </p>
                            <input id="BildLink" type="text" className="NewItemInputText" placeholder=" (optional)"/>
                        </div>
                        <div className="InputWrapper">
                            <p>Wie wichtig? </p>
                            <input id="Rating" type="range"/>
                        </div>
                    </div>
                    <button className="SubmitRequest" onClick={() => {
                        const name = document.getElementById("Name")! as HTMLInputElement;
                        const BildLink = document.getElementById("BildLink")! as HTMLInputElement;
                        const link = document.getElementById("BildLink")! as HTMLInputElement;
                        const Rating = document.getElementById("Rating")! as HTMLInputElement;
                                    
                        if (name.value){ 
                            Props.add(Props.name, {bild: (BildLink.value) ? BildLink.value : "https://www.planet-wissen.de/weihnachten-258~_v-gseagaleriexl.jpg", name: name.value, rating: Rating.value, link: link.value}); 
                            Props.seterr(false)
                        }
                        else Props.seterr(true);
                    }}>Submit</button>
                </div>
            </div>
        );
    }
    else return (
        <div className="ItemWrapper">
            <div className="VorschauBildWrapper">
                {Props.ArtikelData.bild && <img src={Props.ArtikelData.bild} alt={Props.ArtikelData.bild.toString()} className="Vorschaubild"/>}
            </div>
            <div className="ItemDatenWrapper">
                <button className="ItemName" onClick={() => window.open(Props.ArtikelData.link)}>{Props.ArtikelData.name}</button>
                {Props.ArtikelData.rating && <p>Rating: {Props.ArtikelData.rating}</p>}
            </div>
            <svg className="DeleteButton" onClick={() => {
                Props.rem(Props.name, Props.index)
            }} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff0000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="4" y1="7" x2="20" y2="7" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
        </div>
    );
}

export default Item;