import './App.css';
import NoteList from "./components/NoteList";
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import NotePage from "./components/NotePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {useEffect} from "react";

/**
 * Inner component that handles authentication redirect and renders routes.
 * Redirects unauthenticated users to /login unless already on /login or /signup.
 */
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

/**
 * Root application component. Wraps the app in a BrowserRouter with dark-themed container.
 */
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
