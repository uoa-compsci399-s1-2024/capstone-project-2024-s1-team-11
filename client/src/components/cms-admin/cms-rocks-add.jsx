import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import API from "../../../api.js";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import authorization from "../../utils/auth.jsx";


export default function AddRock() {
    const navigate = useNavigate();

    const [rockName, setRockName] = useState("");
    const [productKey, setProductKey] = useState("");
    const [topicId, setTopicId] = useState(null);
    const [topicsList, setTopicsList] = useState(null);
    const [imageFile, setImageFile] = useState(null);

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

    useEffect(() => {
        const fetchTopics = async () => {
            const response = await fetch(API + "/topics");
            const topics = await response.json();
            const topics_list = Object.keys(topics).map((key) => topics[key]);
            setTopicsList(topics_list);
        }
        fetchTopics();
    }, [])

    const handleImageUpload = (e) => {
        setImageFile(e.target.files[0])
    }

    async function handleSubmit() {
        const formData = new FormData();
        formData.append("user_id", user_id);
        formData.append("username", username);
        formData.append("signature", signature);

        formData.append("rockName", rockName);
        formData.append("productKey", productKey);
        formData.append("topicId", topicId);
        formData.append("rock_image", imageFile);
        const res = await fetch(API + "/manageRocks/addRock", {
            method: "POST",
            body: formData
        })
        const next_link = (await res.json()).next;
        navigate(next_link);
    }

    return (
        <>
            {topicsList !== null && isAuthorized &&
                <>
                    <div className="cms-topic">
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
                        <label name="rname">Add a Rock Name
                            <input type="text" name="rname" id='rname' value={rockName}
                                   onChange={(e) => setRockName(e.target.value)}
                            />
                        </label>
                        <label name="product_key">Add a Product Key</label>
                        <input type="text" name="product_key" id="product_key" value={productKey}
                               onChange={(e) => setProductKey(e.target.value)}
                        />
                        <label name="rock_image">Rock image
                            <input type="file" id="rock_image" name="rock_image" onChange={handleImageUpload}/>
                        </label>
                        <button type='button' className='btn' onClick={handleSubmit}>Submit</button>
                        <Link to={`/cms`}><button className='btn blue' >Cancel</button></Link>
                    </form>
                    </div>
                </>
            }
            </>
    )
    }