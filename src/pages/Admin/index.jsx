import { useEffect, useState } from "react"
import { auth } from "../../services/firebaseConfig"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { db } from "../../services/firebaseConfig"
import { addDoc, collection, onSnapshot,query,where,deleteDoc, doc,updateDoc } from "firebase/firestore"

export default function Admin(){
    const[tarefa,setTarefa]=useState('')
    const navigate = useNavigate()
    const [user,setUser]=useState({})
    const [taskList,setTaskList]=useState([])
    const [editTask,setEditTask]=useState({})

    useEffect(()=>{
        async function loadTarefas(){
        const userData = localStorage.getItem('@userDetail')
        setUser(JSON.parse(userData))

        if(userData){
            const data = JSON.parse(userData)

            const q = query(collection(db,'tarefas'),where('id','==',data?.id))
            const unsub =  onSnapshot(q,(snapshot)=>{
            let list = []
            snapshot.forEach(doc=>{
                list.push({
                    id:doc.id,
                    tarefa:doc.data().tarefa,
                    uid:doc.data().id
                })
            })
            setTaskList(list)

           })
        }
        }

        loadTarefas()
    },[])

    

    async function logout(){
       await signOut(auth)
       navigate('/')
    }

    async function addTarefa(e){
        e.preventDefault()

        if(!tarefa){
            alert('Digite uma tarefa')
            return
        }

        if(editTask.id){
            handleUpdateTask()
            return
        }

        await addDoc(collection(db,'tarefas'),{
            tarefa:tarefa,
            data:new Date(),
            id:user?.id
        })
        .then(()=>{
            alert('tarefa adicionada com sucesso')
            setTarefa("")
        })
        .catch((error)=>{
            alert('houve um erro'+error)
        })
    }

    

    async function deleteTask(id){
        const postRef = doc(db,'tarefas',id)
        deleteDoc(postRef)
        .then(()=>{
            alert('post deletado com sucesso')
        })
        .catch(error=>{
            alert('nao foi possivel deletar'+error)
        })
    }

    function updateTask(task){
        setTarefa(task.tarefa)
        setEditTask(task)
    }

    async function handleUpdateTask(){
        const docRef = doc(db,'tarefas',editTask?.id)
        await updateDoc((docRef),{
            tarefa:tarefa
        })
        .then(()=>{
            alert( 'tarefa atualizada')
            setTarefa('')
            setEditTask({})
        })
        .catch(error=>{
            alert('houve um erro ao atualizar a tarefa'+error)
        })
    }

    
    return(
        <div className="container">
            <h1>Minhas tarefas</h1>
            <form onSubmit={addTarefa} >
                <textarea 
                placeholder="Digite a sua tarefa"
                value={tarefa} 
                onChange={e=>setTarefa(e.target.value)}
                />
                {Object.keys(editTask).length > 0 ?(
                    <button type="submit">Atualizar tarefa</button>
                ):(
                    <button type="submit">Adicionar tarefa</button>  
                )}
                
            </form>
            <div >
                <ul>
                    {taskList.map(task=>{
                        return(
                            <li key={task.id}>
                                {task.tarefa}
                                <button onClick={()=>deleteTask(task.id)}>excluir</button>
                                <button onClick={()=>updateTask(task)}>editar</button>
                            </li>
                        )
                        
                    })}
                </ul>
            </div>
            <button className="button_logout" onClick={logout}>sair</button>         
        </div>
    )
}