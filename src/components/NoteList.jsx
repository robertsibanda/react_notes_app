import React, {useEffect, useState} from 'react';
import axios from "axios";
import ListItem from "./ListItem";
import Header from "./Header";
import API_URL from "../api";

const NoteList = () => {
    let [notes, setNotes]  = useState([])

    const getNotes = async () => {
        try {
            const response = await axios.get(`${API_URL}`, {
                headers: {
                    'Authorization' : `Token ${localStorage.getItem("Token")}`
                }
            })
            setNotes(response.data)
        } catch (error) {
            console.error("Error fetching notes:", error)
        }
    }

     useEffect(() => {
        getNotes()
    }, []);

     const DeleteNote = async (deleted) => {
         await axios.delete(`${API_URL}/delete/${deleted}`, {
            headers: {
                'Authorization' : `Token ${localStorage.getItem("Token")}`
            }
        }).then((response) => {
            console.log("Delete response : ", response)
            setNotes(notes => notes.filter(item => item.id !== deleted));
        })
    }

    return (
        <>
            <Header text={"Notes List"}/>
            <div className={"notes"}>
                <div className={"note-header"}>
                    <h1 className={"notes title"}>&#9782; Notes</h1>
                    <p className={"notes-count"}>{notes.length}</p>
                </div>
                <div className={"notes-list"}>
                    {notes.map((note,index)=> (
                        <ListItem key={index} note={note} handleDelete={DeleteNote}/>
                    ))}
                </div>
            </div>
        </>

    )
}

export default NoteList;
