import './App.css';
import axios from 'axios'
import Header from "./components/Header";
import NoteList from "./components/NoteList";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NotePage from "./components/NotePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  return (
      <Router>
          <div className={"container dark"}>
              <div className={"app"}>
                  <Routes>
                      <Route path={"/"} exact Component={NoteList}/>
                      <Route path={"/login"} exact Component={Login}/>
                      <Route path={"/signup"} exact Component={Signup}/>
                      <Route path={"/note/:id"} Component={NotePage}/>
                 </Routes>
              </div>
          </div>

      </Router>

  );
}

export default App;
