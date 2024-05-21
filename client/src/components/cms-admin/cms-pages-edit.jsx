import TextEditor from "./text-editor.jsx";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import API from "../../../api.js";

export default function EditPage() {
    const { page_name } = useParams();
    const [text, setText] = useState();
    const [page, setPage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPage = async () => {
            const response = await fetch(API + `/pages/${page_name}`);
            const page = await response.json();
            setPage(page);
        }
        fetchPage();
    },[])

    const handleSubmit = async () => {
        const formData = new FormData();
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
    )
}