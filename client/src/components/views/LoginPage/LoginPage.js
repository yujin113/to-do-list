import React, {useState} from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

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
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}>
                <form style={{ display: 'flex', flexDirection: 'column',backgroundColor : '#AEC6CF' }}>
                <label>TO-DO-LIST</label>
                </form>
                <label>ID</label>
                <input type="ID" value={ID} onChange={onIDHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">Login</button><br />
                <button type="register">회원가입</button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
