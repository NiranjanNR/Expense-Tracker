import { useState } from 'react';
function App() {

  const [Tasks, setTasks] = useState([{}]);
  const [Total, setTotal] = useState(0);
  const [val1,setVal1] = useState(0);
  const [val2,setVal2] = useState(0);
  const [flag,setFlag] = useState(0);
  var T=0;

  const handleAttributeChange = (e,index) =>{
    const { name, value } = e.target;
    const list = [...Tasks];
    list[index][name] = value;
    setTasks(list);
    handleCalculate();
    if(name === "Tasks"){
      setVal1(1);
    }
    if(name === "Exp"){
      setVal2(1);
    }
    setFlag(0);
  }

  const handleAddField = (e) => {
    if(val1!==0 && val2!==0){
      setTasks([...Tasks, {Tasks:"",Exp:""}]);
      setVal1(0);
      setVal2(0);
      setFlag(0);
    }
  }

  const handleDeleteField = (index) => {
    const sm = [...Tasks];
    sm.splice(index,1);
    setTasks(sm);
    handleCalculate();
    setFlag(0);
  }

  const handleCalculate = () =>{
    if(val1!==0 && val2!==0){
      Tasks.map(it=>{
        T=T+parseFloat(it.Exp)
        setTotal(T);
        setFlag(1);
      });
      T=0;
    }
  }

  return (
    <div style={{ backgroundColor: '#E1B382', color: '#12343B' }} className="drop-shadow-2xl m-3 p-4 mx-10 xl:mx-72 text-2xl flex justify-center font-medium	">
      <div className="p-2">
        <div className="text-7xl pb-5 text-center">Track your expenses</div>
        <div className="">
          {Tasks.map((iterate, index) => 
          <div className="flex">
            <div className="py-3">
              <div className="md:flex"><p className="p-1 pb-3">Enter on what you spent your money on:</p><input value={iterate.Tasks} name="Tasks" type="text" className="mt-1 mb-2 md:ml-16 ml-3 px-3" placeholder="Enter task" onChange={(e) => handleAttributeChange(e, index)} /></div>
              <div className="md:flex"><p className="p-1">How much money did you spend on it (in Rs):</p><input value={iterate.Exp} name ="Exp" type="number" className="mt-1 ml-3 px-3" placeholder="Enter amount"  onChange={(e) => handleAttributeChange(e, index)}/></div>
            </div>
            <button className="butt-on px-4 py-1 my-10 ml-4 " onClick={()=>handleDeleteField(index)}>Delete</button>
          </div>
          )}
        </div>
        <div className="flex justify-center mr-10 mt-4">
          <button className="butt-on px-4 p-1 mx-3" onClick={()=>{handleCalculate()}}>Calculate</button>
          <button className="butt-on px-4 p-1" onClick={(e)=>handleAddField()}>Add Field</button>
        </div>
        <div>
          <div>{flag ? <div className="text-center mt-4 text-3xl">Total = {Total}</div> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
