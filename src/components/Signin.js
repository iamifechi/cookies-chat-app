import styled from 'styled-components'
import {useNavigate } from "react-router-dom";
import { useState } from 'react';

export default function Signin() {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/chat");
    }
  return (
    <Section>
        <Form onSubmit={handleSubmit}>
        <Header>Welcome to ZuriChat, <br/> 
            <span>Please sign in</span></Header>
        <Input type='text' name='username' onChange={(e)=>setName(e.target.value)} value={name} placeholder='username'/>
        <Button id='button' type='submit'>Login</Button>
        </Form>
    </Section>
  )
}

export const Section = styled.section`
display:flex;
justify-content:center;
align-items:center;
height:100vh;
`

export const Form = styled.form`
width:360px;
height:fit-content;
display:flex;
flex-direction:column;
gap:1em;
`
export const Header = styled.p`
font-size:18px;
line-height:1.2;

& span{
    font-size:14px;
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