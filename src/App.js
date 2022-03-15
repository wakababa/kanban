import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import Kanban from "./Kanban/Kanban";

function App() {
  const [kanban,setKanban]=useState(null)

  const [key, setKey] = useState(Date.now())

  useEffect(() => {
    const kanban = new Kanban()
    setKanban(kanban)
  }, [])

    if(!kanban) return <>....</>
  return (
    <div className="App">
        <div style={{display: "flex"}}>
          {kanban.store.map(partition => <div style={{border: "1px solid black", padding: 16}}>
              {partition.name}
              {partition.data.map(data => <div style={{border: "1px solid black"}}>
                  {data.name}
                  <pre>{JSON.stringify(data, null, "\t")}</pre>
                  <button onClick={() => {
                      partition.removeData(data.getId())
                      setKey(Date.now())
                  }}>Sil</button>
              </div>)}
          </div>)}
        </div>
      <div>
        <button onClick={() => {
          kanban.createNewPartition(Date.now() + "")
          setKey(Date.now())
        }}>Partition ekle</button>
          <button onClick={() => {
              if(!kanban.store.length) return;
              const random = Math.floor(Math.random() * kanban.store.length);
              kanban.store[random].createNewData("İşimiz bu")
              setKey(Date.now())
          }}>Data ekle</button>
      </div>
    </div>
  );
}

export default App;
