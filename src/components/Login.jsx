import React, {useEffect, useState} from 'react';
import axios from "axios"
import Header from "./Header";

const Login = (props) => {

    let [username, setUsername] = useState(null)
    let [password, setPassword] = useState(null)
    let [token, setToken] = useState(null)

    const login =  async () => {
        console.log("Logi inn")
        await axios.post("http://localhost:8000/api/login",
            {
                body: {
                    username : username,
                    password: password
                }
            })
            .then(response => {
                console.log('Response : ' , response)
                if (response.data.error) {
                    alert(JSON.stringify(response.data))
                }else if(response.data.token){
                    localStorage.setItem("Token", response.data.token)
                    document.location = "/"
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
            <Header text={"Login"}/>
            <div className={"login-form"}>
                <center>
                    <input type={"text"} placeholder={"Username"}
                           onChange={e =>
                               setUsername(e.target.value)}/>
                    <input type={"password"} placeholder={"password"}
                           onChange={e =>
                               setPassword(e.target.value)}/>

                </center>
                <center>
                    <button
                        type="submit"
                        className="loginbtn"
                        disabled={!username || !password}
                        value="submit"
                        onClick={login}
                    >
                        Login
                    </button>
                </center>
            </div>

        </div>
    </div>
}

export default Login;