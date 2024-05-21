import TextEditor from "./text-editor.jsx";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import API from "../../../api.js";
import Cookies from "js-cookie";
import authorization from "../../utils/auth.jsx";

export default function EditPage() {
    const { page_name } = useParams();
    const [text, setText] = useState('');
    const [page, setPage] = useState(null);
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

    useEffect(() => {
        const fetchPage = async () => {
            const response = await fetch(API + `/pages/${page_name}`);
            const page = await response.json();
            setPage(page);
            setText(page.content);
        }
        fetchPage();
    },[])

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("user_id", user_id);
        formData.append("username", username);
        formData.append("signature", signature);

        formData.append("page_name", page.page_name)
        formData.append("title", page.title);
        formData.append("content", text);
        const res = await fetch(API + "/managePages/editPage", {
            method: "POST",
            body: formData
        })
        if (res.status === 201){
            navigate(`/${page_name}`);
        }
    }
    return (
        <>
            {isAuthorized &&
            <>
            {page &&
            <div className="cms-topic">
                <h2>Edit {page.title} Page </h2>
                <form>
                    <label name="texteditor">Update the page text</label>
                    <TextEditor setText={setText} desc={page.content}/>
                    <button type='button' className='btn' onClick={handleSubmit}>Submit</button>
                    <Link to={`/cms`}>
                        <button className='btn blue'>Cancel</button>
                    </Link>
                </form>
            </div>
            }
            {page == null &&
                <div>
                    This page cannot be edited.
                </div>
            }
            </>
            }
        </>
    )
}