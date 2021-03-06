import React, {useState} from 'react'
//import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import './LoginPage.css'

function LoginPage(props) {

    const dispatch = useDispatch();

    const [ID, setID] = useState("")
    const [Password, setPassword] = useState("")

    const onIDHandler = (event) => {
        setID(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); //refresh되는 것을 막아줌

        let body = {
            ID: ID,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/')
                } else {
                    alert('Error˝')
                }
            })
    }

    return (
        <div className="App" style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
  
            <form style={{ fontSize:'80px', backgroundColor: '#AEC6CF', width:'100%'}}>todolist</form>
               
            <form className="top" style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>ID</label>
                <input type="ID" value={ID} onChange={onIDHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} /><br />
                <button type="submit">Login</button><br />
                <button><Link to ='/register'>회원가입</Link></button>
            </form>
            
        </div>
    )
}

export default withRouter(LoginPage)
