import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../services/firebaseConfig"
import { Link } from "react-router-dom"

export default function SignUp(){
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    async function handleSubmit(e){
        e.preventDefault()

        await createUserWithEmailAndPassword(auth,email,password)
        .then(()=>{
            
            setEmail('')
            setPassword('')
        })
        .catch(error=>{
            if(error.code === 'auth/weak-password'){
                alert('Senha muito fraca')
            }else if(error.code === 'auth/email-already-in-use'){
                alert('Este email já está em uso')
            }
        })
    }

    return(
        <div className="container">
            <h1>Cadastre-se</h1>
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

                <button type="submit">Cadastrar</button>
                <Link to='/'>Já possui uma conta?Faça login</Link>
    
            </form>
        </div>
    )
}