import axios from 'axios';
import  { useEffect ,useState} from 'react'

const Todos = () => {
    const [todos,setTodos]=useState([]);
    const [total,setTotal]=useState(0);
    const [ntodos,setNTodos]=useState("");
    const [page,setPage]=useState(1);
    const saveinfo=()=>
    {
       axios.post("http://localhost:8888/todos",
       {
        // headers:{
        //   "content-type":"application/json"
        // },
        // body:JSON.stringify({
          value:ntodos,
          isCompleted: false
        // })
       }
       ).then((r)=>{
        setTodos([...todos,r.data])
        setNTodos("");
      })
    }
 useEffect(()=>
 {
    axios.get(`http://localhost:8888/todos?_page=${page}&_limit=5`)
    .then((r)=>
    {
      setTodos(r.data)
      setTotal(r.headers["x-total-count"]);
    })
 },[page])
  return (
      <>
          <div>Todos</div>
          <input type="text" value={ntodos} onChange={({target})=>setNTodos(target.value)} />
          <button onClick={saveinfo}>+</button>
          {
              todos.map((el)=>
              (
                  <div key={el.id}>{el.value}</div>
              ))
          }
          <button disabled={page<=1} onClick={()=> setPage(page-1)}>{'<'}</button>
          <button disabled={total<page*5} onClick={()=>setPage(page+1)}>{'>'}</button>
      </>

  )
}

export default Todos