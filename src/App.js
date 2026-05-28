import './App.css';
import NoteList from "./components/NoteList";
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import NotePage from "./components/NotePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {useEffect} from "react";

function AppContent() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("Token")) {
            const path = window.location.pathname;
            if (path !== '/login' && path !== '/signup') {
                navigate("/login");
            }
        }
    }, [navigate]);
    return (
        <Routes>
            <Route path={"/"} exact Component={NoteList}/>
            <Route path={"/login"} exact Component={Login}/>
            <Route path={"/signup"} exact Component={Signup}/>
            <Route path={"/note/:id"} Component={NotePage}/>
        </Routes>
    );
}

function App() {
    return (
        <Router>
            <div className={"container dark"}>
                <div className={"app"}>
                    <AppContent/>
                </div>
            </div>
        </Router>
    );
}

export default App;
