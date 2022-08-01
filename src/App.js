import { useState,useEffect } from 'react';
import { db } from './firebase-config';
import { collection,getDocs,addDoc,deleteDoc,updateDoc,doc } from 'firebase/firestore';
import { calculateNewValue } from '@testing-library/user-event/dist/utils';

var fc=0,valType=0;
var Percent=0.0;
function App() {

  //Database
  const listCollectionRef = collection(db , "List");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState(0.0);

  const updateUser = async (id, Para) => {
    const userDoc = doc(db, "List", id);
    
    if(valType){
     
      const newFields = { Exp: Para };
      await updateDoc(userDoc, newFields);
    }
    else{
      const newFields2 = { Tasks: Para };
      await updateDoc(userDoc, newFields2);
      
    }
    
  };
  const createTask = async () => {
    await addDoc(listCollectionRef, { Tasks:value1 ,Exp:value2})
  }

  const deleteTask = async (index,id) =>{
   
    const userDoc =doc(db, "List", id);
    await deleteDoc(userDoc);
  }

  const getList = async () =>{
   
    const dat = await getDocs(listCollectionRef);
    setTasks(dat.docs.map((doc)=>({...doc.data(),id:doc.id})));
    
  }
  useEffect(() =>{
    const getList = async () =>{
      const dat = await getDocs(listCollectionRef);
      setTasks(dat.docs.map((doc)=>({...doc.data(),id:doc.id})));
      
    }
    getList();
  },[])
  
  const [flagTable, setFlagTable] = useState(0);
  const [Tasks, setTasks] = useState([{}]);
  const [Total, setTotal] = useState(0.0);
  const [flag, setFlag] = useState(0);
  var T = 0;
  var m=Tasks.length;

  const handleAttributeChange = (e, index,id) => {
    const { name, value } = e.target;
    const list = [...Tasks];
    list[index][name] = value;
    if(name==="Tasks"){
      setValue1(value);
      valType=0;
        }
    else{
      setValue2(value);
      valType=1;
    }
    setTasks(list);
    setFlag(0);
    setFlagTable(0);
    updateUser(id,value);
  }

  const handleAddField = (e) => {
    
    if (Tasks.length === 0) {
      setTasks([...Tasks, { Tasks: "", Exp: "" }]);
      setFlag(0);
      if(fc===0){
        if(value1!=="" && value2!==""){
          createTask();
        }
      }
      else{
        fc=0;
      }
    }
    if (Tasks[m-1].Tasks!=="" && Tasks[m-1].Exp!=="") {
      setTasks([...Tasks, { Tasks: "", Exp: "" }]);
      setFlag(0);
      if(fc===0){
        if(value1!=="" && value2!==""){
          createTask();
        }
      }
      else{
        fc=0;
      }
    }
  }

  const handleDeleteField = (index,id) => {
    const sm = [...Tasks];
    sm.splice(index, 1);
    setTasks(sm);
    setFlag(0);
    setFlagTable(0);
    deleteTask(index,id)
  }

  const handleCalculate = () => {
    if (Tasks[m-1].Tasks!=="" && Tasks[m-1].Exp!=="") {
      Tasks.map(it => {
        T = T + parseFloat(it.Exp)
        setTotal(T);
        setFlag(1);
      });
      T = 0;
      if(value1!=="" && value2!==""){
        createTask();
      }
      fc=1;
    }
    getList();
    setValue1("");
    setValue2("");
  }

  const handleShowStats = () => {
    if(flag){
      flagTable ? setFlagTable(0) : setFlagTable(1);
    }
  }

  const calcPercent = (Exp) => {
    Percent=(parseFloat(Exp)*100)/parseFloat(Total);
  }

  return (
    <div style={{}} className="m-3 mb-6 bathao mt-2 brightness-105 bg-slate-400/25 rounded-3xl backdrop-blur-lg drop-shadow-2xl p-10 mx-10 xl:mx-64 text-xl flex justify-center font-medium	">
      <div className="p-2">
        <div className="text-7xl pb-5 text-center"><h1>Track your expenses</h1></div>
        <div className="">
          {Tasks.map((iterate, index) =>
            <div className="flex">
              <div className="py-3">
                <div className="md:flex"><p className="p-1 pb-3">Enter on what you spent your money on:</p><input value={iterate.Tasks} name="Tasks" type="text" className="bg-slate-400/50 placeholder:text-slate-600 rounded-lg mt-1 mb-2 md:ml-16 ml-3 px-3" placeholder="Enter task" onChange={(e) => handleAttributeChange(e, index,iterate.id)} /></div>
                <div className="md:flex"><p className="p-1">How much money did you spend on it (in Rs):</p><input value={iterate.Exp} name="Exp" type="number" className="bg-slate-400/50 placeholder:text-slate-600 rounded-lg mt-1 ml-3 px-3" placeholder="Enter amount" onChange={(e) => handleAttributeChange(e, index,iterate.id)} /></div>
              </div>
              <button className="font-normal text-xl rounded-3xl backdrop-blur-lg hover:backdrop-blur-lg bg-slate-400/75 hover:bg-slate-500/50 px-4 py-1 my-8 ml-4 " onClick={() => handleDeleteField(index,iterate.id)}>Delete</button>
            </div>
          )}
        </div>
        <div className="flex justify-center mr-10 mt-4">
          <button className="font-normal text-xl rounded-3xl backdrop-blur-lg hover:backdrop-blur-lg bg-slate-400/75 hover:bg-slate-500/50 px-4 p-1 mx-3" onClick={() => { handleCalculate() }}>Calculate</button>
          <button className="font-normal text-xl rounded-3xl backdrop-blur-lg hover:backdrop-blur-lg bg-slate-400/75 hover:bg-slate-500/50 px-4 p-1" onClick={(e) => handleAddField()}>Add Field</button>
        </div>
        <div>
          <div>{flag ? <div className="text-center mt-4 mr-7 text-3xl">Total = {Total}</div> : <></>}
            <div className="flex mt-6 mr-7 justify-center">
              {flagTable && flag ? <button className="font-normal text-xl rounded-3xl backdrop-blur-lg hover:backdrop-blur-lg bg-sky-400/75 hover:bg-sky-600/75 px-4 p-1" onClick={() => { handleShowStats() }}>Hide Stats</button>
                :
                <button className="font-normal text-xl rounded-3xl backdrop-blur-lg hover:backdrop-blur-lg bg-sky-400/75 hover:bg-sky-600/75 px-4 p-1" onClick={() => { handleShowStats() }}>Show Stats</button>}
            </div>
            <div className="flex justify-center mt-5 mr-7">
              {
                flagTable && flag ?
                  <div>
                      <table class="table-auto border-separate border-spacing-2 font-normal text-center">
                        <thead>
                          <tr>
                            <th className="font-normal px-2 rounded-lg bg-slate-400">Sl No.</th>
                            <th className="font-normal px-24 rounded-lg bg-slate-400">Activity</th>
                            <th className="font-normal px-3 rounded-lg bg-slate-400">Rupees</th>
                            <th className="font-normal px-3 rounded-lg bg-slate-400">Percent Expense</th>
                          </tr>
                        </thead>
                        {Tasks.map((iterate, index) => 
                        <tbody>
                          <tr>
                            <td className="rounded-lg bg-slate-400/50">{index+1}</td>
                            <td className="rounded-lg bg-slate-400/50">{iterate.Tasks}</td>
                            <td className="rounded-lg bg-slate-400/50">{iterate.Exp} ₹</td>
                            <td className="rounded-lg bg-slate-400/50">{calcPercent(iterate.Exp)}{Percent}%</td>
                          </tr>
                        </tbody>)}
                      </table>
                  </div>
                  :
                  <></>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
