import React, {useState} from 'react';
import axios from "axios"
import Header from "./Header";
import {useNavigate} from "react-router-dom";
import API_URL from "../api";

const Signup = () => {
    const navigate = useNavigate();
    let [username, setUsername] = useState(null)
    let [password, setPassword] = useState(null)
    let [email, setEmail] = useState(null)

    const signup = async () => {
        await axios.post(`${API_URL}/signup`,
            {
                username: username,
                password: password,
                email: email
            })
            .then(response => {
                console.log('Response : ', response)
                if (response.data.error) {
                    alert(JSON.stringify(response.data))
                } else if (response.data.token) {
                    localStorage.setItem("Token", response.data.token)
                    navigate("/")
                }
            })
            .catch(error => {
                if (error.response.status === 404) {
                    alert("User not found")
                }
            })
    }

    return <div className={"container dark"}>
        <div className={"app"}>
            <Header text={"Signup"}/>
            <div className={"login-form"}>
                <center>
                    <input type={"text"} placeholder={"Username"}
                           onChange={e =>
                               setUsername(e.target.value)}/>
                    <input type={"email"} placeholder={"user@email.com"}
                           onChange={e =>
                               setEmail(e.target.value)}/>
                    <input type={"password"} placeholder={"password"}
                           onChange={e =>
                               setPassword(e.target.value)}/>
                </center>
                <center>
                    <button
                        type="submit"
                        className="loginbtn"
                        disabled={!username || !password || !email}
                        value="submit"
                        onClick={signup}
                    >
                        Create Account
                    </button>
                </center>
            </div>
        </div>
    </div>
}

export default Signup;
