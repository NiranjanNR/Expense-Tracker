import { useState } from 'react';
var Percent=0.0;
function App() {
  const [flagTable, setFlagTable] = useState(0);
  const [Tasks, setTasks] = useState([{}]);
  const [Total, setTotal] = useState(0.0);
  const [val1, setVal1] = useState(0);
  const [val2, setVal2] = useState(0);
  const [flag, setFlag] = useState(0);
  var T = 0;


  const handleAttributeChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...Tasks];
    list[index][name] = value;
    setTasks(list);
    handleCalculate();
    if (name === "Tasks") {
      setVal1(1);
    }
    if (name === "Exp") {
      setVal2(1);
    }
    setFlag(0);
    setFlagTable(0);
  }

  const handleAddField = (e) => {
    if (val1 !== 0 && val2 !== 0) {
      setTasks([...Tasks, { Tasks: "", Exp: "" }]);
      setVal1(0);
      setVal2(0);
      setFlag(0);
    }
    if (Tasks.length === 0) {
      setTasks([...Tasks, { Tasks: "", Exp: "" }]);
      setVal1(0);
      setVal2(0);
      setFlag(0);
    }
  }

  const handleDeleteField = (index) => {
    const sm = [...Tasks];
    sm.splice(index, 1);
    setTasks(sm);
    handleCalculate();
    setFlag(0);
    setFlagTable(0);
  }

  const handleCalculate = () => {
    if (val1 !== 0 && val2 !== 0) {
      Tasks.map(it => {
        T = T + parseFloat(it.Exp)
        setTotal(T);
        setFlag(1);
      });
      T = 0;
    }
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
    <div style={{}} className="mt-10 shaa brightness-105 bg-slate-100/25 rounded-3xl backdrop-blur-lg drop-shadow-2xl m-3 p-10 mx-10 xl:mx-64 text-xl flex justify-center font-medium	">
      <div className="p-2">
        <div className="text-7xl pb-5 text-center">Track your expenses</div>
        <div className="">
          {Tasks.map((iterate, index) =>
            <div className="flex">
              <div className="py-3">
                <div className="md:flex"><p className="p-1 pb-3">Enter on what you spent your money on:</p><input value={iterate.Tasks} name="Tasks" type="text" className="bg-slate-400/50 placeholder:text-slate-600 rounded-lg mt-1 mb-2 md:ml-16 ml-3 px-3" placeholder="Enter task" onChange={(e) => handleAttributeChange(e, index)} /></div>
                <div className="md:flex"><p className="p-1">How much money did you spend on it (in Rs):</p><input value={iterate.Exp} name="Exp" type="number" className="bg-slate-400/50 placeholder:text-slate-600 rounded-lg mt-1 ml-3 px-3" placeholder="Enter amount" onChange={(e) => handleAttributeChange(e, index)} /></div>
              </div>
              <button className="font-normal text-xl rounded-3xl backdrop-blur-lg hover:backdrop-blur-lg bg-slate-400/75 hover:bg-slate-500/50 px-4 py-1 my-8 ml-4 " onClick={() => handleDeleteField(index)}>Delete</button>
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
                            <th className="font-normal border border-slate-700 px-2 rounded-lg bg-slate-400/75">Sl No.</th>
                            <th className="font-normal border border-slate-700 px-24 rounded-lg bg-slate-400/75">Activity</th>
                            <th className="font-normal border border-slate-700 px-3 rounded-lg bg-slate-400/75">Rupees</th>
                            <th className="font-normal border border-slate-700 px-3 rounded-lg bg-slate-400/75">Percent Expense</th>
                          </tr>
                        </thead>
                        {Tasks.map((iterate, index) => 
                        <tbody>
                          <tr>
                            <td className="border border-slate-700 rounded-lg">{index+1}</td>
                            <td className="border border-slate-700 rounded-lg">{iterate.Tasks}</td>
                            <td className="border border-slate-700 rounded-lg">{iterate.Exp}</td>
                            <td className="border border-slate-700 rounded-lg">{calcPercent(iterate.Exp)}{Percent}%</td>
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
