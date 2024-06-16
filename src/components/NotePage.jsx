import React, {useEffect, useState} from 'react';
import axios from "axios";
import {json, Link, useParams} from "react-router-dom";
import Header from "./Header";

const NotePage = ({ match }) =>{
    let params = useParams()

    let noteid = params.id;
    let [note, setNote] = useState(null)
    let [updated, setUpated] = useState(false);
    let [header, setHeader] = useState('Note details')

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

   const updateHeader = () => {
       setHeader("Note details - updated")
       setTimeout(() => {
           setHeader("Note details")
       }, 2000)
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
                updateHeader()
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
        <Header text={header}/>
        <div className={"note"}>
            <div className={"note-header"}>
                <p onClick={handleSubmit}>back</p>
            </div>
            <textarea defaultValue={note?.body}
                      onChange={e =>
                      {
                          setNote({...note, 'body': e.target.value})
                          setUpated(true)
                      }}>

            </textarea>
            <center>
                <button
                    type="submit"
                    className="floating-button"
                    disabled={!updated}
                    value="submit"
                    onClick={updateNote}
                >
                    Update
                </button>
            </center>
        </div>
    </>)

};
export default NotePage;