import './App.css';
import {useEffect, useState} from "react";
import Kanban from "./Kanban/Kanban";

import { RiDeleteBin7Line } from 'react-icons/ri';

const kanban = new Kanban()
const handleLoadData=()=>{
    const random = Math.floor(Math.random() * kanban.store.length);
    kanban.createNewPartition("backlog")
    kanban.createNewPartition("dev")
    kanban.createNewPartition("test")
    kanban.createNewPartition("done")
    kanban.createNewPartition("blocked")
    kanban.store[0].createNewData("First Issue")
    kanban.store[0].createNewData("Second Issue")
    kanban.store[0].createNewData("Third Issue")
    kanban.store[1].createNewData("Bug Issue")
    kanban.store[1].createNewData("Feature Issue")
    kanban.store[1].createNewData("Error Issue")
    kanban.store[2].createNewData("Test")
    kanban.store[3].createNewData("Initial Project")
    kanban.store[4].createNewData("Block Issue")

}
handleLoadData()

const Issue=({data})=>{
    const {name,description,issueType,priority,_id} = data
    return(
        <div key={data.id} style={{border: "1px solid black",backgroundColor:"#eee0a8"}}>
            <h2>{name}</h2>
        </div>
    )
}
const Settings =({data,partition,update})=>{
    const [key, setKey] = useState(Date.now())

    return(
        <div key={data.id} style={{backgroundColor:"#d0cece",display:"flex",justifyContent:"space-between",padding:1,marginBottom:5}}>
            <button onClick={() => {
                console.log("asd")
                partition.removeData(data.getId())
                update()
            }}>
             <RiDeleteBin7Line />
            </button>
            <select value={partition.name} onChange={(e)=> {
                partition.removeData(data.getId())
                kanban.moveData(e.target.value,data)
                update()
            }}>
            {  kanban.store.map((part,key)=>{
                return(
                    <option
                        key={key}
                        value={part.name}>
                        {part.name}
                    </option>
                )
            })}
            </select>

        </div>
    )
}
function App() {

  const [key, setKey] = useState(Date.now())


    const update =()=>{
      setKey(Date.now())
    }

    if(!kanban){
        return <>....</>
    }
  return (
    <div className="App">
        <div style={{display: "flex",padding:2}}>
          {kanban.store.map((partition,key) =>
              <div key={key} style={{border: "1px solid black", padding: 16,width:"100%",marginBottom:5}}>
              <h2>{partition.name.toUpperCase()}</h2>
                  {partition.data.map((data,key) =>

                  <div>
                      <Issue data={data}/>
                      <Settings data={data} partition={partition} update={update}/>
                  </div>

              )}
          </div>)}
        </div>
    </div>
  );
}

export default App;
