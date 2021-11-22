import React, {useState, useEffect} from 'react';
import axios from 'axios';
import List from "./List";
import "./css/App.css";
import "./css/Scrollbar.css";

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

type Personen = "finn" | "janni" | "martin" | "ines";
const emptyObj:RequestData = {finn: [], ines: [], martin: [], janni: []};

const App:React.FC<Props> = (Props):JSX.Element => {

  const [name, setname] = useState<"finn" | "janni" | "martin" | "ines">("ines");
  const [isLogin, setLogin] = useState<boolean>((localStorage.getItem("login") === "true") ? true : false);
  const [data, setdata] = useState<RequestData>(emptyObj)
  const [haserror, setError] = useState<boolean>(false);

  useEffect(() => {
    axios.get("http://localhost:2445/getData/").then((response: any) => { //https://api.mykrause.org/getData/
      if (JSON.stringify(response.data) !== "{}") setdata(response.data)
    }).catch(err => console.log(err))
  }, [])

  const sendDataToServer = (person: Personen) => {
     axios.post("http://localhost:2445/setData/"+person, data[person]).then(response => { //https://api.mykrause.org/setData/
      console.log(response.data)
    })
  }

  const handleAddItem = (name: Personen, newItem: Artikel) => {
    const tempData = {...data};
    
    tempData[name] === undefined && (tempData[name] = []);
    tempData[name].push(newItem);

    sendDataToServer(name);
    setdata(tempData)
  }

  const handleDeleteItem = (name: Personen, index: number) => {
    const tempData = {...data}
    tempData[name].splice(index, 1);
    sendDataToServer(name);
    setdata(tempData)
  }

  return (
    <div className={`Wrapper`}>
      <h1 className="Überschrift">Weihnachten bei Fam. Krause</h1>
      
      <div className="selectPersonView">
        
        <div className="PSBWrapper" onClick={() => setname("ines")}>
          <div id="red" className="ColoredSide"></div>
          <h3 className="PSB Ines">Ines</h3>
          <div className="Flex100"></div>
        </div>
        
        <div className="PSBWrapper" onClick={() => setname("martin")}>
          <div id="green" className="ColoredSide"></div>
          <h3 className="PSB Martin">Martin</h3>
          <div className="Flex100"></div>
        </div>
        
        <div className="PSBWrapper" onClick={() => setname("janni")}>
          <div id="purple" className="ColoredSide"></div>
          <h3 className="PSB Janni">Janni</h3>
          <div className="Flex100"></div>
        </div>
        
        <div className="PSBWrapper" onClick={() => setname("finn")}>
          <div id="blue" className="ColoredSide"></div>
          <h3 className="PSB Finn">Finn</h3>
          <div className="Flex100"></div>
        </div>
      
      </div>
      
      <div className={`Downside${(!isLogin) ? " DownLogin" : ""}`}> 
        <List 
          name={name} 
          data={data[name]} 
          handleAddItem={handleAddItem} 
          handleDeleteItem={handleDeleteItem} 
          haserr={haserror} seterr={setError} 
          isLoggenIn={isLogin} 
          setLogin={setLogin}>
        </List>
      </div>    
    </div>
  );
}

export default App;
export type {Artikel, RequestData, Personen};
