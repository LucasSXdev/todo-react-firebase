import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../services/firebaseConfig"
import { Link, useNavigate } from "react-router-dom"
import './index.css'

export default function SignIn(){
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()

        await signInWithEmailAndPassword(auth,email,password)
        .then(()=>{
            navigate('/Admin')
            setEmail('')
            setPassword('')
        })
        .catch(()=>{
            alert('Usuário não encontrado!')
        })
    }


    return(
        <div className="container">
            <h1>Lista de tarefas</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input 
                type="email"
                placeholder="Digite o seu email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                 />

                <label >Senha</label>
                <input 
                type="password"
                placeholder="Digite a sua senha"
                value={password}
                onChange={e=>setPassword(e.target.value)} />

                <button type="submit">Entrar</button>
                <Link to= 'signup'>Não pussui uma conta?clique aqui para se cadastrar</Link>
            </form>
        </div>
    )
}