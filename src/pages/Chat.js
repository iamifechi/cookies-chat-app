import { useState, /*useRef,*/ useEffect } from 'react';
import {useNavigate } from "react-router-dom";
import styled from 'styled-components';
import {Section, Form, Header} from './Signin';
import Cookies from 'universal-cookie';

export default function Chat() {
    
const cookies = new Cookies();
const user = cookies.get('user');
const navigate = useNavigate();
    // const [conversations, setConversations] = useState([
    //     {sender:user, message: 'Hi'},
    //     {sender:'Friend', message: 'Hello', receiver:true}]);
    const [conversations, setConversations] = useState([]);

    const [message, setMessage] = useState('');
    //const lstmsg = useRef(null)
    const handleSubmit = (e) => {
        e.preventDefault();
        const newMessage = {sender:user, message: message}
        setConversations(conversations => [...conversations,newMessage])
        cookies.set('conversation', conversations);
        setMessage('')
    }

    // const scroll = (offset) => {
    //     lstmsg.current.scrollTop += offset
    // }

    useEffect(()=>{
        const chatHistory = cookies.get('conversations');
        if(chatHistory){
            setConversations(chatHistory)
        }
    })
  return (
    <Wrapper>
        <Container>
            <Header>Welcome <b>{user}</b></Header>
            <Button id='log-out' 
            onClick={()=> {
                cookies.remove('user');
                cookies.remove('conversations');
                navigate("/");
            }}>Log out</Button>
        </Container>
        <ChatBox>
            {conversations.map((msg,index)=>{
                return(
                    <Message key={`${index}`} 
                    right={msg.sender === user ? false : true}
                    /*ref={index===conversations.length-1? {lstmsg} : null}*/
                    >
                        <h4>{msg.sender === user ? 'Me': msg.sender}</h4>
                        <p>{msg.message}</p>
                    </Message>
                )
            })}
        </ChatBox>
        <InputContainer onSubmit={handleSubmit}>
        <Input type='text' required autoComplete='off' name='message'
         onChange={(e)=>setMessage(e.target.value)}
          value={message}/>
        <Button id='button' type='submit'>send</Button>
        </InputContainer>
    </Wrapper>
  )
}

const Wrapper = styled(Section)`
padding:2em 5em;
flex-direction:column;
justify-content:flex-start;
align-items:center;
gap:0;
`
const Input = styled.input`
border:1px solid black;
padding:1em;
border-radius:5px;
`

const Button = styled.button`
background:white;
border:1px solid white;
border-radius:5px;
&:hover{
    cursor:pointer;
    transform:scale(1.02);
    color:white;
    background:black;
}
`
const Container = styled.div`
display:grid;
grid-template-columns:3fr 1fr;
justify-content:space-between;
width:75%;
min-width:300px;
margin:0;
padding:0;

& ${Button}{
    border:1px solid black;
    width:fit-content;
    padding:.5em;
    margin:0;
}
`



const ChatBox = styled.div`
height:60vh;
width:75%;
min-width:300px;
min-height:400px;
max-height:700px;
background:black;
padding:2em 1em;
margin:1em 0 0;
position:relative;
display:flex;
flex-direction:column;
gap:1em;
overflow-y:auto;
`
const InputContainer = styled(Form)`
background:black;
width:75%;
min-width:300px;
display:grid;
grid-template-columns:4fr 1fr;
padding:0.5em 1em;
z-index:999px;
`

const Message = styled.div`
display:flex;
flex-direction:column;
flex-wrap:wrap;
width:80%;
max-width:350px;
position:relative;
word-wrap:break-word;
background:#fafafa;
padding:1em .5em;
align-self:${props => props.right ? 'flex-end' : 'flex-start'};
border-radius:15px;
border-top-left-radius:${props => props.right ? "15px" : "0px"};
border-top-right-radius:${props => props.right ? "0px" : "15px"};
gap:.5em;


& h4,p{
    margin:0;
    padding:0;
    font-size:16px;
    width:100%;
}
`

