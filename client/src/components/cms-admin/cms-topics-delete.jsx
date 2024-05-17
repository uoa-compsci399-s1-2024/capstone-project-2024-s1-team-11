import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import API from "../../../api.js";

export default function DeleteTopic() {
    const { topic_id } = useParams();
    const [topic, setTopic] = useState(null);
    const navigate = useNavigate();

    useEffect(()=> {
        const fetchTopic = async () => {
            const res = await fetch(API + `/topics/${topic_id}`)
            const topic = await res.json();
            setTopic(topic);
            console.log(topic);
        }
        fetchTopic();
    }, [])


    async function handleDelete() {
        const formData = new FormData();
        formData.append("topic_id", topic_id)
        await fetch(API + `/manageTopics/deleteTopic`, {
            method: "POST",
            body: formData
        })
        navigate("/cms");
    }

    return (
        <>
            { topic !== null &&
                <>
                    <h2>Delete Topic &quot;{topic.title}&quot;</h2>
                    <p>Are you sure you want to delete topic: &quot;{topic.title}&quot; ? 🥹</p>
                    <button type='button' className='btn' onClick={handleDelete}>Delete</button>
                </>
            }
        </>
    )
}