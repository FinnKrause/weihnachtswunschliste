import React, {useState, useEffect} from 'react';
import Liste from "./List";
import "./css/App.css";
import "./css/PersonButtons.css";

interface Props {

}

interface Artikel {
  name: string, 
  link: string, 
  rating?: number,
  bild?: string
}

const App:React.FC<Props> = (Props):JSX.Element => {

  const [DownSide, setDownside] = useState<JSX.Element>(<div></div>)

  const BeispielArtikel:Artikel = {
    name: "SSD", link: "https://finnkrause.com/", rating:8, bild:"https://m.media-amazon.com/images/I/91sCNobM0QL._AC_SX466_.jpg"
  }

  const ExampleArray = Array(10).fill(BeispielArtikel);

  return (
    <div className="Wrapper">
      <h1 className="Überschrift">Weihnachten bei Fam. Krause</h1>
      
      <div className="selectPersonView">
        
        <div className="PSBWrapper" onClick={() => {setDownside(<Liste name="Ines" data={ExampleArray}></Liste>)}}>
          <div id="red" className="ColoredSide"></div>
          <h3 className="PSB Ines">Ines</h3>
          <div className="Flex100"></div>
        </div>
        
        <div className="PSBWrapper" onClick={() => {setDownside(<Liste name="Martin" data={ExampleArray}></Liste>)}}>
          <div id="green" className="ColoredSide"></div>
          <h3 className="PSB Martin">Martin</h3>
          <div className="Flex100"></div>
        </div>
        
        <div className="PSBWrapper" onClick={() => {setDownside(<Liste name="Janni" data={ExampleArray}></Liste>)}}>
          <div id="purple" className="ColoredSide"></div>
          <h3 className="PSB Janni">Janni</h3>
          <div className="Flex100"></div>
        </div>
        
        <div className="PSBWrapper" onClick={() => {setDownside(<Liste name="Finn" data={ExampleArray}></Liste>)}}>
          <div id="blue" className="ColoredSide"></div>
          <h3 className="PSB Finn">Finn</h3>
          <div className="Flex100"></div>
        </div>
      
      </div>
      
      <div className="Downside">
        {DownSide}
      </div>
    
    </div>
  );
}

export default App;
export type {Artikel};
