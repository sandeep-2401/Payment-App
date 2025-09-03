import { useEffect, useState } from "react"
import TopBarDash from "../components/TopBarDash"
import Users from "../components/Users"
import axios from 'axios'

function Dashboard(){
    const [balance,setBalance]=useState(0)
    const token = localStorage.getItem("token")

    useEffect(()=>{
        axios.get('http://localhost:3000/api/v1/account/balance',{
            headers :{
                Authorization : `Bearer ${token}`
            }
        })
        .then(res=> setBalance(res.data.balance))
    },[])


    return (
        <div>
            <div>
                <TopBarDash name={"Sandeep"} balance={balance.toFixed(2)}/>
            </div>
            <div>
                <Users/>
            </div>
        </div>
    )
    
}

export default Dashboard