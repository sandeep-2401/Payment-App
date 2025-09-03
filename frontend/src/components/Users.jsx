import InputField from './InputField'
import { useEffect, useState } from 'react'
import Button from './Button'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Users(){
    const [users,setUsers] = useState([])
    const [filter,setFilter]=useState('')

    useEffect(()=>{ 
        axios.get('http://localhost:3000/api/v1/user/bulk?filter='+ filter)
        .then((res)=> {
            setUsers(res.data.Users)
        })
    },[filter])

    return (
        <div className='p-4 text-xl font-bold'>
            Users
            <InputField onChange={(e)=>{
                setFilter(e.target.value)
            }} display={"Search users..."}/>
            <div>
                {users.map(user => <User user={user}/>)}
            </div>
        </div>
    )
}

function User({user}){
    const navigate = useNavigate()
    return (
        <div className='flex gap-1 justify-between items-center'>
            <div className='flex gap-1 m-2'>
                <div className='bg-gray-200 w-8 h-8 rounded-full flex justify-center '>
                    {user.firstname[0]}
                </div>
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <Button onClick={()=>{
                    navigate('/send?id=' + user._id + '&name=' + user.firstname)
                }} content={"send money"} className='w-30 h-10 text-sm bg-gray-600'/>
            </div>
        </div>
    )
}

export default Users