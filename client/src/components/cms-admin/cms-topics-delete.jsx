import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import API from "../../../api.js";
import Cookies from "js-cookie";
import authorization from "../../utils/auth.jsx";

export default function DeleteTopic() {
    const { topic_id } = useParams();
    const [topic, setTopic] = useState(null);
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
        const fetchTopic = async () => {
            const res = await fetch(API + `/topics/${topic_id}`)
            const topic = await res.json();
            setTopic(topic);
        }
        fetchTopic();
    }, [])


    async function handleDelete() {
        const formData = new FormData();
        formData.append("user_id", user_id);
        formData.append("username", username);
        formData.append("signature", signature);
        formData.append("topic_id", topic_id)
        await fetch(API + `/manageTopics/deleteTopic`, {
            method: "POST",
            body: formData
        })
        navigate("/cms");
    }

    return (
        <>
            { topic !== null && isAuthorized &&
                <>
                    <h2>Delete Topic &quot;{topic.title}&quot;</h2>
                    <p>Are you sure you want to delete topic: &quot;{topic.title}&quot; ? 🥹</p>
                    <button type='button' className='btn' onClick={handleDelete}>Delete</button>
                </>
            }
        </>
    )
}