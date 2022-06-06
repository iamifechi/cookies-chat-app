import { useState, /*useRef */} from 'react';
import styled from 'styled-components';
import {Section, Form, Header} from './Signin';

export default function Chat() {
    const [conversations, setConversations] = useState([
        {sender:'Me', message: 'Hi'},
        {sender:'Friend', message: 'Hello', receiver:true}]);
    const [message, setMessage] = useState('');
    // const lstmsg = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMessage = {sender:'Me', message: message}
        setConversations(conversations => [...conversations,newMessage])
        setMessage('')
    }

    // const scroll = (offset) => {
    //     lstmsg.current.scrollTop += offset
    // }

  return (
    <Wrapper>
        <Header>Welcome to ZuriChat</Header>
        <ChatBox>
            {conversations.map((msg,index)=>{
                return(
                    <Message key={`${index}`} 
                    right={msg.receiver ? true: false}
                    ref={index===conversations.length-1? {lstmsg} : null}
                    >
                        <h4>{msg.sender}</h4>
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
padding:3em 5em;
flex-direction:column;
justify-content:flex-start;
`

const Input = styled.input`
border:1px solid black;
padding:1em;
border-radius:5px;
`

const Button = styled.button`
background:white;
border:1px solid black;
border-radius:5px;
&:hover{
    cursor:pointer;
    transform:scale(1.02);
    color:white;
    background:black;
}
`

const ChatBox = styled.div`
height:50vh;
width:75%;
min-width:370px;
min-height:500px;
max-height:700px;
background:white;
padding:2em 1em;
margin:1em 0 0;
position:relative;
display:flex;
flex-direction:column;
gap:1em;
overflow-y:scroll;
`
const InputContainer = styled(Form)`
background:white;
width:70%;
min-width:360px;
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

& p{
 
    }
`

