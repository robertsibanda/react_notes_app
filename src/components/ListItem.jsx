import React from 'react';
import {Link} from "react-router-dom";
import image from "../images/delete.png"

const ListItem = ({note, handleDelete}) => {

    const handleDeleteNote = () => {
        console.log('Deleting note : ', note.id)
        handleDelete(note.id)
    }

    return (
        <div className={"notes-list-item"} >
            <Link to={`/note/${note.id}`}>
            <h3>{note.body}</h3>
            </Link>
            <p onClick={handleDeleteNote}>
                <img src={image}
                     width={"20px"}
                     height={"25px"} alt={"delete"}/>
            </p>
        </div>)
};

export default ListItem;
