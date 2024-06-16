import React, {useEffect, useState} from 'react';
import axios from "axios";
import {json, Link, useParams} from "react-router-dom";
import Header from "./Header";

const NotePage = ({ match }) =>{
    let params = useParams()

   let noteid = params.id;
    let [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
    }, []);

   const getNote = async () => {
       await axios.get(`http://localhost:8000/api/note/${noteid}`, {
           headers: {
                'Authorization' : `Token ${localStorage.getItem("Token")}`
            }
        }).then((response) => {
            let note_data = response.data
            console.log(note_data)
            setNote(note_data)
        })
   }

   const updateNote = async () => {
       await axios.put(`http://localhost:8000/api/update/${noteid}`, {
           headers: {
                'Authorization' : `Token ${localStorage.getItem("Token")}`
            },
           body: note.body
        })
           .then((response) => {
            console.log(response)
            })
           .catch(error => {
               console.log(error.message)
           })
   }

   const handleSubmit = () => {
       updateNote().then(() => {
            document.location = "/"
       })
   }

    return (
    <>
        <Header />
        <div className={"note"}>
            <div className={"note-header"}>
                    <p onClick={handleSubmit}>back</p>
            </div>
            <textarea defaultValue={note?.body}
                      onChange={e =>
                          setNote({...note, 'body':e.target.value})}></textarea>
        </div>
    </>)

};
export default NotePage;