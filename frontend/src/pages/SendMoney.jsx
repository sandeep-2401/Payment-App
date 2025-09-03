import Button from '../components/Button'
import Heading from '../components/Heading'
import InputField from '../components/InputField'
import ProfileBar from '../components/ProfileBar'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function SendMoney(){
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const [amount,setAmount] = useState(0)

    return (
        <div className="flex justify-center items-center min-h-screen mt-auto bg-amber-100">
            <div className=' flex flex-col items-center bg-white w-100 p-5'>
                <div className='text-2xl mb-5'>
                    <Heading content={"Send Money"}/>
                </div>
                <div className='flex flex-col mt-7 gap-0.5 '>
                    <ProfileBar name={name}/>
                    <div className='pl-1'>
                        <InputField onChange={(e)=>{
                            setAmount(e.target.value)
                        }} label={"Amount (in Rs)"} 
                           display={"Enter amount"}/>
                    </div>
                    <div className=''>
                        <Button onClick={async ()=>{
                            await axios.post('http://localhost:3000/api/v1/account/transfer',{
                                to : id,
                                amount
                            },{
                                headers:{
                                    Authorization : "Bearer " + localStorage.getItem('token')
                                }
                            })
                        }} content={"Initiate Transfer"}/>
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default SendMoney