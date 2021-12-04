import React, { useState } from "react";
import {Artikel, Personen} from "./App";
import ConfirmationPopup from "./ConfirmationPopup";
import "./css/Item.css";

interface Props {
    name: Personen; 
    isAddItem?: boolean;
    ArtikelData: Artikel;
    index: number,

    add: (name: Personen, ToAddObj: Artikel) => any;
    rem: (name: Personen, index: number) => any;

    haserr: boolean;
    seterr: (data: boolean) => void;
}

const Item:React.FC<Props> = (Props):JSX.Element => {
    const [confirm, setConfirm] = useState<boolean>(false);
    const STAR = <svg xmlns="http://www.w3.org/2000/svg" className="star fullstar" width="20" height="20" viewBox="0 0 24 24" stroke="red" fill="red"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
    let stars = 0;
    const HALFSTAR = <svg xmlns="http://www.w3.org/2000/svg" className="star halfstar" width="20" height="20" viewBox="0 0 24 24"  stroke="red" fill="none"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253z" /></svg>

    const getStars = ():Array<JSX.Element>|null => {
        if (!Props.ArtikelData.rating) return null;
        const rating:number = +Props.ArtikelData.rating;
        stars = rating / 20;
        
        const bigstars:number = +stars.toString().split(".")[0];
        let returnArray:Array<JSX.Element> = Array(bigstars).fill(STAR);
        if (rating%20 > 10) returnArray.push(HALFSTAR);
        
        return returnArray;
    }

    if (Props.isAddItem) {
        return (
            <div className={`ItemWrapper SpecialWrapper noSHADOW`}>
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
                        const link = document.getElementById("Link")! as HTMLInputElement;
                        const Rating = document.getElementById("Rating")! as HTMLInputElement;
                                    
                        if (name.value){ 
                            Props.add(Props.name, {bild: (BildLink.value) ? BildLink.value : "https://www.planet-wissen.de/weihnachten-258~_v-gseagaleriexl.jpg", name: name.value, rating: Rating.value, link: link.value}); 
                            Props.seterr(false)
                        }
                        else Props.seterr(true);
                    }}><span>Submit</span></button>
                </div>
            </div>
        );
    }
    else return (
        <div className="ItemWrapper">
            {confirm && <ConfirmationPopup Frage="Willst du diesen Wunsch wirklich löschen?" onDecline={() => setConfirm(false)} onOk={() => {Props.rem(Props.name, Props.index); setConfirm(false)}}></ConfirmationPopup>}
            <div className={`VorschauBildWrapper${(confirm) ? " hidden" : ""}`}>
                {Props.ArtikelData.bild && <img src={Props.ArtikelData.bild} alt={Props.ArtikelData.bild.toString()} className="Vorschaubild"/>}
            </div>
            <div className={`ItemDatenWrapper${(confirm) ? " hidden" : ""}`}>
                <button className={`ItemName ${(Props.ArtikelData.link) ? "hasLink" : ""}`} onClick={() => {if (Props.ArtikelData.link) window.open(Props.ArtikelData.link)}}>{Props.ArtikelData.name}</button>
                {Props.ArtikelData.rating && <div className="Starholder">
                    {getStars()}
                </div>}
            </div>
            <svg className={`DeleteButton${(confirm) ? " hidden" : ""}`} onClick={() => {
                // Props.rem(Props.name, Props.index)
                setConfirm(!confirm);
            }} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff0000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="4" y1="7" x2="20" y2="7" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
        </div>
    );
}

export default Item;