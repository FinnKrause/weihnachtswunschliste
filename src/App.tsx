import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Liste from "./List";
import "./css/App.css";
import "./css/PersonButtons.css";

interface Props {

}

interface Artikel {
  name: string, 
  link: string, 
  rating?: string,
  bild?: string
}

interface RequestData {
  "finn": Artikel[];
  "martin": Artikel[];
  "ines": Artikel[];
  "janni": Artikel[];
}

const App:React.FC<Props> = (Props):JSX.Element => {

  const StandardObject = {
    finn: [{"name": "", "link": ""}], 
    ines: [{"name": "", "link": ""}], 
    martin: [{"name": "", "link": ""}],
    janni: [{"name": "", "link": ""}]
  }

  const [DownSide, setDownside] = useState<JSX.Element>(<div></div>)
  const [data, setdata] = useState<RequestData>(StandardObject)

  useEffect(() => {
    axios.get("http://localhost:5000/getData").then((response: any) => {
      setdata(response.data)
      console.log(response.data)
    }).catch(err => console.log(err))
  }, [])

  const handleAddItem = (name: "finn" | "janni" | "martin" | "ines", newItem: Artikel) => {
    const tempData = {...data};
    tempData[name].push(newItem);
    setdata(tempData);
  }

  const handleDeleteItem = (name: "finn" | "janni" | "martin" | "ines", index: number) => {
    const tempData = {...data};
    tempData[name].splice(index);
    setdata(tempData);
  }

  return (
    <div className="Wrapper">
      <h1 className="Überschrift">Weihnachten bei Fam. Krause</h1>
      
      <div className="selectPersonView">
        
        <div className="PSBWrapper" onClick={() => {
          setDownside(<Liste name="ines" data={data} handleAddItem={handleAddItem} handleDeleteItem={handleDeleteItem}></Liste>)
          }}>
          <div id="red" className="ColoredSide"></div>
          <h3 className="PSB Ines">Ines</h3>
          <div className="Flex100"></div>
        </div>
        
        <div className="PSBWrapper" onClick={() => {setDownside(<Liste name="martin" data={data} handleAddItem={handleAddItem} handleDeleteItem={handleDeleteItem}></Liste>)}}>
          <div id="green" className="ColoredSide"></div>
          <h3 className="PSB Martin">Martin</h3>
          <div className="Flex100"></div>
        </div>
        
        <div className="PSBWrapper" onClick={() => {setDownside(<Liste name="janni" data={data} handleAddItem={handleAddItem} handleDeleteItem={handleDeleteItem}></Liste>)}}>
          <div id="purple" className="ColoredSide"></div>
          <h3 className="PSB Janni">Janni</h3>
          <div className="Flex100"></div>
        </div>
        
        <div className="PSBWrapper" onClick={() => {setDownside(<Liste name="finn" data={data} handleAddItem={handleAddItem} handleDeleteItem={handleDeleteItem}></Liste>)}}>
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
export type {Artikel, RequestData};
