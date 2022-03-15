import './App.css';
import {useEffect, useState} from "react";
import Kanban from "./Kanban/Kanban";

import { RiDeleteBin7Line } from 'react-icons/ri';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BiCommentAdd } from 'react-icons/bi';


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
const Modal=({data,partition,onClose,update})=>{
    const {name,description,issueType,priority,_id} = data
    const [editName,setName] = useState(name)
    const [editDescription,setDescription] = useState(description)
    const [editIssueType,setIssueType] = useState(issueType)
    const [editPriority,setPriority] = useState(priority)

    return(
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#dedede",position:"absolute",width:"100%",height:"100%",top:0,left:0,opacity:0.8}}>
        <div style={{justifyContent:"center",padding:10,border:"1px solid black"}}>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                <AiFillCloseCircle  size={25} onClick={onClose}/>
            </div>
            <input  onChange={(e)=>setName(e.target.value)} type={"text"} value={editName}/>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
                <label style={{display:"flex",alignSelf:"flex-start",fontSize:16}}>Description</label>
                <textarea  onChange={(e)=>setDescription(e.target.value)} value={editDescription} placeholder={"Description"}>{description}</textarea>
            </div>
            <button onClick={()=>{
                const newData ={
                    ...data,
                    name:editName,
                    description:editDescription,
                    issueType:editIssueType,
                    priority:editPriority,
                }
                kanban.editData(partition.name,newData)
                update()
                onClose()

            }} style={{marginLeft:"auto"}}>SAVE</button>
        </div>
        </div>
    )
}
const Issue=({data,partition,update})=>{
    const [open,setOpen] = useState(false)
    const {name,description,issueType,priority,_id} = data
    const handleClose=()=>setOpen(false)
    return(
      <div>
          <button onClick={()=>setOpen(true)} key={data.id} style={{border: "1px solid black",backgroundColor:"#eee0a8",width:"100%"}}>
              <h2>{name}</h2>
          </button>
          {open && <Modal data={data} partition={partition} onClose={handleClose} update={update}/>}
      </div>
    )
}
const Settings =({data,partition,update})=>{
    const [key, setKey] = useState(Date.now())

    return(
        <div key={data.id} style={{backgroundColor:"#d0cece",display:"flex",justifyContent:"space-between",padding:1,marginBottom:5}}>
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
              <div key={key} style={{border: "1px solid black", padding: 5,width:"100%",marginBottom:5,height:"94vh"}}>
             <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                 <h2 style={{backgroundColor:"#e7e7e7",width:"100%"}}>{partition.name.toUpperCase()}</h2>
                  {/*<BiCommentAdd />*/}
             </div>
                  {partition.data.map((data,key) =>

                  <div>
                      <Issue data={data} partition={partition} update={update}/>
                      <Settings data={data} partition={partition} update={update}/>
                  </div>

              )}
          </div>
          )}
        </div>
    </div>
  );
}

export default App;
