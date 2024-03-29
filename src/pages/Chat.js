import { useState, useRef, useEffect } from 'react';
import {useNavigate } from "react-router-dom";
import styled from 'styled-components';
import {Section, Form, Header} from './Signin';
import Cookies from 'universal-cookie';
import io from "socket.io-client";
const bg = '#322e3e'


export default function Chat() {
const socket = io.connect('/');
    
const cookies = new Cookies();
const user = cookies.get('user');
const navigate = useNavigate();
     const [conversations, setConversations] = useState([]);

    const [message, setMessage] = useState('');

    const checkHistory = () => {
        const chatHistory = cookies.get('conversations');
        console.log('chats', chatHistory)
        if(chatHistory){
            setConversations(chatHistory);
           // return chatHistory;
        };
    }
    const getUser = () => {
        let user = cookies.get('user');
        return user
    }

    useEffect(()=>{
        checkHistory()
    });
    useEffect(()=>{
        let user = getUser();
        socket.on("message", (data) => {
            const newMessage = {sender:user, message: message}
            setConversations(conversations => [...conversations,newMessage])
          });
    }, [socket]);

    const lstMsg = useRef(null);

    const scrollToBottom = () => {
        lstMsg.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [conversations]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMessage = {sender:user, message: message};
        socket.emit("chat", newMessage);
        setConversations(conversations => [...conversations,newMessage])
        cookies.set('conversation', conversations);
        setMessage('')
    }

    console.log(conversations, "convo");
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
                    ref={index===conversations.length-1? {lstMsg} : null}
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
border-color:${bg};
padding:1em;
border-radius:5px;
`

const Button = styled.button`
background:white;
border:1px solid white;
border-color:${bg};
border-radius:5px;
&:hover{
    cursor:pointer;
    transform:scale(1.02);
    color:white;
    border-color:white;
    background:${bg};
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
    border-color:${bg};
    width:fit-content;
    padding:.5em;
    margin:0;
    justify-self:flex-end;

    :hover{
        background:${bg};
    }
}
`



const ChatBox = styled.div`
height:65vh;
width:75%;
min-width:300px;
min-height:400px;
max-height:800px;
background:${bg};
padding:2em 1em;
margin:1em 0 0;
position:relative;
display:flex;
flex-direction:column;
gap:1em;
overflow-y:auto;
`
const InputContainer = styled(Form)`
background:${bg};
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

