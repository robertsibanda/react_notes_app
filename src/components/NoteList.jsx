import React, {useEffect, useState} from 'react';
import axios from "axios";
import ListItem from "./ListItem";
import Header from "./Header";

const NoteList = (props) => {

    let [notes, setNotes]  = useState([])

    const getNotes = async () => {
        await axios.get("http://localhost:8000/api", {
            headers: {
                'Authorization' : `Token ${localStorage.getItem("Token")}`
            }
        }).then((response) => {
            notes = response.data
            console.log(notes)
            setNotes(notes)
        })

    }

     useEffect(() => {
        getNotes()
            .then(() => {
                console.log('Notes : ', notes)
            })
    }, []);

     const DeleteNote = async (deleted) => {
         await axios.delete(`http://localhost:8000/api/delete/${deleted}`, {
            headers: {
                'Authorization' : `Token ${localStorage.getItem("Token")}`
            }
        }).then((response) => {
            console.log("Delete response : ", response)
             notes.filter(note => {
                 return note.id !== deleted
             })
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