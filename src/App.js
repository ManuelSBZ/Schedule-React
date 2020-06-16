import React, { useState, useEffect} from 'react';
import './App.css';
import { Taskrow } from './components/Taskrow';
import { Taskheader } from './components/Taskheader.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Taskform } from './components/Taskform';
import { Table } from './components/Table';
import { Visibility} from "./components/Visibility";

export default function App(){

  /*ESTADOS*/

  const [userName, setUserName] = useState("manuel")

  const [taskItems, setsTaskItems] = useState([
    { name: 'Task One', done: false },
    { name: 'Task Two', done: false },
    { name: 'Task Three', done: true },
    { name: 'Task Four', done: false }
  ])
  const [showdone, setshowdone] = useState()


  //RECUPERANDO VARIABLES DE ESTADO DEL COMPONENTE APP con lo almacenado en localstorage 
  // (DEBE IR ANTES QUE EL SETEO DEL LOCALSTORAGE ya que la funcion de seteo se activa cada ves que se altera TaskItems
  // por lo que haria un llamado recursivo a esa funcion useEffect)
  useEffect(() => {
    let data= localStorage.getItem("tasks")
    if (data != null){
      setsTaskItems(JSON.parse(data))
      }
    else{

      setUserName("new user")

      setsTaskItems([
        { name: 'Task One', done: false },
        { name: 'Task Two', done: false },
        { name: 'Task Three', done: true },
        { name: 'Task Four', done: false }
        ])  
      }

      setshowdone(true)
    
  },[])

    //SETEANDO TASKS EN LOCAL STORAGE CON LA VARIABLE DE ESTADO 
  useEffect(() => {localStorage.setItem("tasks",JSON.stringify(taskItems))}, [taskItems])


  // const DoneUpdate = (boolean) =>{
  //   setshowdone(boolean)
  // }

  const showtaskdone = () => {
    setshowdone(!showdone)

  }


  const addtask = (stringtTitle) => {
    if (!taskItems.find(t => t.name === stringtTitle) && !(stringtTitle === '')) {
      setsTaskItems([...taskItems, { name: stringtTitle, done: false }])
    }
  }
/**/
  const deletetask = (name) =>{
    if (taskItems.find(task => task.name===name)){
      setsTaskItems(taskItems.filter(task => task.name != name))
    }
  }
  // permite cambiar el estado del check ,es usado por componente TaskRow en un handler
  const toggletask = (task) => {
    setsTaskItems(taskItems.map(e => task.name === e.name ? { ...e, done: !e.done } : e))
  }

  /* funcion que pinta las filas de la tabla task usada en App.js*/
  const Tasktablerow = (flag) => {
    console.log(flag)
    return (
      flag !== undefined

        ? taskItems
          .filter(a => a.done!==flag )
          .map(e => <Taskrow task={e}
            key={e.name}
            toggletask={toggletask}
            deletetask={deletetask} 
            />
          )

        : taskItems.map(e => <Taskrow task={e}
          key={e.name}
          toggletask={toggletask}
          deletetask={deletetask} 
          />
        )
    )
  }

  return (
    <div>
      {/* encabezado */}
      <Taskheader tasks={taskItems} username={userName} />

      {/* input para tareas nuevas */}
      <Taskform create={addtask} />
        
      {/* tabla de tareas pendientes */}
      <Table listItems={Tasktablerow(true)} theadrows={["Tasks","Done"]} tableclass="table table-striped table-bordered"/>
      
      {/* input para mostrar ó esconder tabla de tareas completadas */}
      <div className="bg-secundary text-center">
      <Visibility checked={showdone} showtaskdone={showtaskdone} label="completed tasks"/>
      </div>
      {/* tabla de tareas completadas */}
      {
        /* sentencia relacionada con el control de vista del a tabla de tareas completadas*/
        showdone && (
          <Table listItems={Tasktablerow(false)} 
            theadrows={["Tasks","Done"]} 
            tableclass="table table-striped table-bordered" 
            />
        )
      }

    </div >
  );
}
;
