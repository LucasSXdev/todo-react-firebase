import { useEffect, useState } from "react";
import { auth } from "../services/firebaseConfig";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";


export default function Private({children}){
    const[signed,setSigned]= useState(null)


    useEffect(()=>{
        async function checkLogin(){
             onAuthStateChanged(auth,(user)=>{
                if(user){
                    const userData = {
                        id:user.uid,
                        email:user.email
                    }

                    localStorage.setItem("@userDetail",JSON.stringify(userData))

                    setSigned(true)
                }else{
                    setSigned(false)
                }
            })
        }

        checkLogin()
    },[])

    if(signed === null){
        return <div>Carregando...</div>
    }

    if(signed === false){
        return <Navigate to='/'/>
    }

    

    return children  
}