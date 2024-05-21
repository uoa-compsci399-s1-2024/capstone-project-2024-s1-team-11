import {useEffect, useState} from 'react';
import './styles.css'
import API from "../../../api.js";
import DOMAIN_NAME from "../../../domain-name.js"
import {useNavigate, useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import authorization from "../../utils/auth.jsx";


export default function EditRock() {
    const navigate = useNavigate();
    const { rock_id } = useParams();
    const [rock, setRock] = useState(null);
    const [topicsList, setTopicsList] = useState(null);

    const [selectedTopicId, setSelectedTopicId] = useState(null);
    const [newRockName, setNewRockName] = useState("");
    const [newProductKey, setNewProductKey] = useState("");
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

    useEffect(()=>{
        const fetchRock = async () => {
            const response = await fetch(API + `/rocks/${rock_id}`);
            const rock = await response.json();
            setRock(rock);
            setNewRockName(rock.rock_name);
            setNewProductKey(rock.product_key);
            setSelectedTopicId(rock.topic_id);
        }
        const fetchTopics = async () => {
            const response = await fetch(API + "/topics");
            const topics = await response.json();
            const topics_list = Object.keys(topics).map((key)=>topics[key]);
            setTopicsList(topics_list);
        }
        fetchRock();
        fetchTopics();
    }, [])

    const handleImageUpload = (e) => {
        setImageFile(e.target.files[0])
    }

    async function handleSubmit(){
        const formData = new FormData();
        formData.append("user_id", user_id);
        formData.append("username", username);
        formData.append("signature", signature);
        formData.append("rock_id", rock.rock_id)
        formData.append("newTopicId", selectedTopicId);
        formData.append("newRockName", newRockName);
        formData.append("newProductKey", newProductKey);
        formData.append("rock_image", imageFile);
        const response = await fetch(API + "/manageRocks/editRock", {
            method: "POST",
            body: formData
        })
        const next_link = (await response.json()).next;
        navigate(next_link);
    }

    return (
        <>{(rock !== null && topicsList !== null && isAuthorized) &&
            <>
                <div className="cms-topic">
                <h2>Edit Rock Details</h2>
                <form>
                    <label name="topic">Change Associated Topic
                        <select defaultValue={rock.topic_id}
                                onChange={(e) => setSelectedTopicId(e.target.value)}>
                            <option key={-1} value={null}>No Associated Topic</option>
                            {topicsList.map((topic) => (
                                <option key={topic.topic_id} value={topic.topic_id}>{topic.title}</option>
                            ))}
                        </select>
                    </label>
                    <label name="rname">Change Rock Name
                        <input type="text" name="rname" id='rname' value={newRockName}
                               onChange={(e) => setNewRockName(e.target.value)}
                        />
                    </label>
                    <label name="product_key">Change Product Key</label>
                    <input type="text" name="product_key" id="product_key" value={newProductKey}
                           onChange={(e) => setNewProductKey(e.target.value)}
                    />
                    <div className='cms-image'><img src={API + `/images/rocks/${rock.imageUri}`}/></div>
                    <label name="rock_image">Change the rock image
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
