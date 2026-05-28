import React from 'react';

/**
 * Header component that displays a title in the app header bar.
 *
 * @param {{ text: string }} props
 * @param {string} props.text - The title text to display
 */
const Header = ({text}) => {
    return <div className={"app-header"}>
        <h1>{text}</h1>
    </div>
}

export default Header;