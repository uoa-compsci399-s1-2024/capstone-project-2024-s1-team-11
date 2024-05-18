import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import API from "../../../api.js";


export default function AddRock() {
    const navigate = useNavigate();

    const [rockName, setRockName] = useState("");
    const [productKey, setProductKey] = useState("");
    const [topicId, setTopicId] = useState(null);

    const [topicsList, setTopicsList] = useState(null);

    useEffect(() => {
        const fetchTopics = async () => {
            const response = await fetch(API + "/topics");
            const topics = await response.json();
            const topics_list = Object.keys(topics).map((key) => topics[key]);
            setTopicsList(topics_list);
        }
        fetchTopics();
    }, [])

    async function handleSubmit() {
        const formData = new FormData();
        formData.append("rockName", rockName);
        formData.append("productKey", productKey);
        formData.append("topicId", topicId);
        const res = await fetch(API + "/manageRocks/addRock", {
            method: "POST",
            body: formData
        })
        const next_link = (await res.json()).next;
        navigate(next_link);
    }

    return (
        <>
            {topicsList !== null &&
                <>
                    <h2>Add a new rock</h2>
                    <form>
                        <label name="topic">Select an Associated Topic page
                            <select defaultValue={null}
                                    onChange={(e) => setTopicId(e.target.value)}>
                                <option key={-1} value={null}>No Associated Topic</option>
                                {topicsList.map((topic) => (
                                    <option key={topic.topic_id} value={topic.topic_id}>{topic.title}</option>
                                ))}
                            </select>
                        </label>
                        <label name="rname">Change Rock Name
                            <input type="text" name="rname" id='rname' value={rockName}
                                   onChange={(e) => setRockName(e.target.value)}
                            />
                        </label>
                        <label name="product_key">Change Product Key</label>
                        <input type="text" name="product_key" id="product_key" value={productKey}
                               onChange={(e) => setProductKey(e.target.value)}
                        />
                        <label name="filename">Rock image
                            <input type="file" id="myFile" name="filename"/>
                        </label>
                        <button type='button' className='btn' onClick={handleSubmit}>Submit</button>
                    </form>
                </>
            }
            </>
    )
    }