import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const Maths = () => {
    const { id } = useParams();
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    useEffect(() => {
        fetch(`/maths/${id}`).then(res => 
            { 
                return res.json()
            }).then(data => 
            {
                console.log(data)
                setTitle(data.title)
                setContent(data.content)
            })
            }, []
    );

    return (
        <div>
            <h1>{title}</h1>
            <p>{content}</p>
        </div>
    );
}

export default Maths;