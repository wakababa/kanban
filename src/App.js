import './App.css';
import {useEffect, useState} from "react";
import Kanban from "./Kanban/Kanban";
const kanban = new Kanban()
const handleLoadData=()=>{
    const random = Math.floor(Math.random() * kanban.store.length);
    kanban.createNewPartition("backlog")
    kanban.createNewPartition("selected development")
    kanban.createNewPartition("done")
    kanban.store[0].createNewData("First Issue")
    kanban.store[0].createNewData("Second Issue")
    kanban.store[0].createNewData("Third Issue")
    kanban.store[1].createNewData("Bug Issue")
    kanban.store[1].createNewData("Feature Issue")
    kanban.store[1].createNewData("Error Issue")
    kanban.store[2].createNewData("Initial Project")
}
handleLoadData()
function App() {

  const [key, setKey] = useState(Date.now())

    if(!kanban){
        return <>....</>
    }
  return (
    <div className="App">
        <div style={{display: "flex"}}>
          {kanban.store.map((partition,key) => <div key={key} style={{border: "1px solid black", padding: 16}}>
              {partition.name}
              {partition.data.map((data,key) => <div key={key} style={{border: "1px solid black"}}>
                  {data.name}
                  <pre>{JSON.stringify(data, null, "\t")}</pre>
                  <button onClick={() => {
                      partition.removeData(data.getId())
                      setKey(Date.now())
                  }}>Sil</button>
                  {  kanban.store.map((part,key)=>{
                      if(part.name !== partition.name){
                          return(
                              <button
                                  key={key}
                                  onClick={(e)=>{
                                      partition.removeData(data.getId())
                                      kanban.moveData(part.name,data)
                                      setKey(Date.now())
                                  }}
                                  value={part.data}>
                                  {part.name}</button>
                          )
                      }

                  })}
              </div>)}
          </div>)}
        </div>
    </div>
  );
}

export default App;
