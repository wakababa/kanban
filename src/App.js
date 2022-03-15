import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {
  const [backLog,setBackLog]=useState([])
  const [inProgress,setInProgress]=useState([])
  const [peerReview,setPeerReview]=useState([])
  const [inTest,setInTest]=useState([])
  const [done,setDone]=useState([])
  const [blocked,setBlocked]=useState([])

  const [issue,setIssue] = useState([])
  return (
    <div className="App">


    </div>
  );
}

export default App;
