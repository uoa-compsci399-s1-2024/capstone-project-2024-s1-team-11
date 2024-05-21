import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import API from "../../../api.js";
import Cookies from "js-cookie";
import authorization from "../../utils/auth.jsx";

export default function DeleteRock() {
    const { rock_id } = useParams();
    const [rock, setRock] = useState(null);
    const navigate = useNavigate();

    // Redirect unauthorized user to homepage.
    const [isAuthorized, setIsAuthorized] = useState(false);
    const user_id = Cookies.get("user_id");
    const username = Cookies.get("username");
    const signature = Cookies.get("signature");

    useEffect(() => {
        const authorize = async () => {
            if (! await authorization(user_id, username, signature)){
                navigate("/");
            } else{
                setIsAuthorized(true);
            }
        }
        authorize();
    }, []);

    useEffect(()=> {
        const fetchRock = async () => {
            const res = await fetch(API + `/rocks/${rock_id}`)
            const rock = await res.json();
            setRock(rock);
        }
        fetchRock();
    }, [])


    async function handleDelete() {
        const formData = new FormData();
        formData.append("user_id", user_id);
        formData.append("username", username);
        formData.append("signature", signature);
        formData.append("rock_id", rock_id)
        await fetch(API + `/manageRocks/deleteRock`, {
            method: "POST",
            body: formData
        })
        navigate("/cms");
    }

    return (
        <>
            { rock !== null && isAuthorized &&
                <>
                    <h2>Delete Rock &quot;{rock.rock_name}&quot;</h2>
                    <p>Are you sure you want to delete rock: &quot;{rock.rock_name}&quot; ? 🥹</p>
                    <button type='button' className='btn' onClick={handleDelete}>Delete</button>
                </>
            }
        </>
    )
}