import { getUserData } from "../api/spotify.jsx";
import { useState } from 'react';

export default function DisplayButton(){
    const [data, setData] = useState();

    function handleButtonClick(){
        setData(getUserData());
    }
    return (
        <>
            <p>{data}</p>
            <button onClick={handleButtonClick}/>
        </>
    )
}