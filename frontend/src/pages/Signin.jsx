import Button from "../components/Button"
import Heading from "../components/Heading"
import InputField from "../components/InputField"
import PageBottom from "../components/PageBottom"
import SubHeading from "../components/SubHeading"
import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function Signin(){
    const [username,setUsername]=useState("")
    const [password, setPassword]=useState("")
    const navigate = useNavigate()
    return (
        <div className="bg-gray-500 min-h-screen flex items-center justify-center">
            <div className="flex flex-col bg-white p-8 gap-3 rounded-xl items-center w-100">
                <div className="m-auto text-3xl">
                    <Heading content={"Sign In"}/>
                </div>
                <div className=" pt-2 text-md px-6 text-center">
                    <SubHeading content={"Enter your information to access your account"}/>

                </div>
                <div className="min-w-85">
                    <InputField onChange={(e)=>{
                        setUsername(e.target.value)
                    }} label={"Email"} display={"johndoe@gmail.com"} />
                    <InputField onChange={(e)=>{
                        setPassword(e.target.value)
                    }} label={"Password"} display={"password"}/>
                </div>
                <PageBottom content={"Don't have an account?"} toLink={"/signup"} action={"Sign Up"}/>
                <Button onClick={async()=>{
                    const response = await axios.post('http://localhost:3000/api/v1/user/signin',{
                        username,
                        password
                    })
                    localStorage.setItem("token",response.data.token)
                    navigate('/dashboard')
                }} content={"Sign In"}/>
                
            </div>
        </div>
        
    )
}

export default Signin