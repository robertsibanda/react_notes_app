import React, {useEffect, useState} from 'react';
import axios from "axios"
import {Link} from "react-router-dom";
import image from "../images/delete.png"

const ListItem = ({note, handleDelete}) => {

    let [noteid, setNoteid] = useState(null)

    useEffect(() => {
        setNoteid(note.id)
    }, []);

    console.log('Note id set : ', noteid)

    const handleDeleteNote = (note) => {
        console.log('Deleteing note : ',noteid)
        handleDelete(noteid)
    }

    return (
        <div className={"notes-list-item"} >
            <Link to={`/note/${note.id}`}>
            <h3>{note.body}</h3>
            </Link>
            <p onClick={handleDeleteNote}>
                <img src={image}
                     width={"20px"}
                     height={"25px"} alt={"delete image"}/>
            </p>
        </div>)
};

export default ListItem;