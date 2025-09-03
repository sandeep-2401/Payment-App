import Button from "../components/Button"
import Heading from "../components/Heading"
import InputField from "../components/InputField"
import PageBottom from "../components/PageBottom"
import SubHeading from "../components/SubHeading"
import { useState } from "react"
import {useNavigate } from "react-router-dom"
import axios from 'axios';

function Signup(){
    const [firstname,setFirstname]=useState("");
    const [lastname,setLastname]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-gray-500 min-h-screen flex items-center justify-center">
            <div className="flex flex-col bg-white p-8 gap-3 rounded-xl items-center w-100">
                <div className="m-auto text-3xl">
                    <Heading content={"Sign up"}/>
                </div>
                <div className=" pt-2 text-md px-6 text-center">
                    <SubHeading content={"Enter your information to create an account"}/>

                </div>
                <div className="min-w-85">
                    <InputField onChange={(e)=>{
                        setFirstname(e.target.value)
                    }} label={"First name"} display={"John"}/>
                    <InputField onChange={(e)=>{
                        setLastname(e.target.value)
                    }} label={"Last name"} display={"Doe"}/>
                    <InputField onChange={(e)=>{
                        setUsername(e.target.value)
                    }} label={"Email"} display={"johndoe@gmail.com"}/>
                    <InputField onChange={(e)=>{
                        setPassword(e.target.value)
                    }} label={"Password"} display={""}/>
                </div>
                <Button onClick={async ()=>{
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                        username,
                        firstname,
                        lastname,
                        password
                    });
                    localStorage.setItem("token",response.data.token)
                    navigate('/dashboard')
                }} content={"Sign Up"}/>
                <PageBottom content={"Already have an account?"} action={"Login"} toLink={"/signin"}/>

                
            </div>
        </div>
        
    )
}

export default Signup