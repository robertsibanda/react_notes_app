import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Header from "./Header";
import API_URL from "../api";

const NotePage = () => {
    let params = useParams()
    let noteid = params.id;
    let [note, setNote] = useState(null)
    let [updated, setUpated] = useState(false);
    let [header, setHeader] = useState('Note details')

    useEffect(() => {
        const getNote = async () => {
            try {
                const response = await axios.get(`${API_URL}/note/${noteid}`, {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem("Token")}`
                    }
                })
                setNote(response.data)
            } catch (error) {
                console.error("Error fetching note:", error)
            }
        }
        getNote()
    }, [noteid])

   const updateHeader = () => {
       setHeader("Note details - updated")
       setTimeout(() => {
           setHeader("Note details")
       }, 2000)
   }

   const updateNote = async () => {
       await axios.put(`${API_URL}/update/${noteid}`,
           { body: note.body },
           {
               headers: {
                    'Authorization' : `Token ${localStorage.getItem("Token")}`
                }
           })
           .then((response) => {
                console.log(response)
                updateHeader()
            })
           .catch(error => {
               console.log(error.message)
           })
   }

    return (
    <>
        <Header text={header}/>
        <div className={"note"}>
            <div className={"note-header"}>
            <Link to={`/`}>
                <p>back</p>
            </Link>
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
