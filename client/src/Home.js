import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Home() {
    const [user, setName] = useState('')
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8081')
        .then( res => {
            if(res.data.valid) {
                setName(res.data.name);
            } else {
                navigate('/login')
            }
        })
        .catch(err => console.log(err))
    }, [])
    return (
        <div><h1>Wellcome {user}</h1></div>  
    )
}
export default Home