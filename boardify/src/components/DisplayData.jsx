import { getUserData } from "../api/spotify.jsx";

export default function DisplayButton(){
    const [data, setData] = useState({});

    return (
        <>
            <p>{data}</p>
            <button onClick={getUserData}/>
        </>
    )
}