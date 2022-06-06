import styled from 'styled-components'
import {useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';


export default function Signin() {
    const cookies = new Cookies();
    
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        cookies.set('user', name, { path: '/' });
        navigate("/chat");
    }

    useEffect(()=>{
        console.log('user', cookies.get('user'))
    })

  return (
    <Section>
        <Header>Welcome to ZuriChat, <br/> 
            <span>Please login to continue</span>
        </Header>
        <Form onSubmit={handleSubmit}>
        <Input type='text' name='username' onChange={(e)=>setName(e.target.value)} value={name} placeholder='username'/>
        <Button id='button' type='submit'>Login</Button>
        </Form>
    </Section>
  )
}

export const Section = styled.section`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
height:100vh;
gap:5em;
`

export const Form = styled.form`
width:70vw;
min-width:250px;
height:fit-content;
display:flex;
flex-direction:column;
gap:1em;
`
export const Header = styled.p`
font-size:18px;
line-height:1.2;
width:70%;

& span{
    font-size:12px;
    font-style:italic;
    opacity:0.8;
}
`
export const Input = styled.input`
display:block;
width:100%;
padding:1em 0.5em;
font-size:16px;
border:none;
border-bottom:1px solid black;
`

const Button = styled.button`
padding:.5em 2em;
font-size:16px;
border:1px solid rebeccapurple;
background:transparent;
width:fit-content;
display:flex;
margin-top:2em;

&:hover{
    cursor:pointer;
    transform:scale(1.02);
    color:white;
    background:rebeccapurple;
}
`