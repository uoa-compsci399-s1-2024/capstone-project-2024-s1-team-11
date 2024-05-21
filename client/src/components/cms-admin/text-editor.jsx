import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({setText}) => {

    //state to handle the changes in text editor
    const [content, setContent] = useState('<p>This needs to be content from the DB</>')
    console.log(content)


    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    return (
        <div>
            <ReactQuill
                theme='snow'
                formats={['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video']}
                placeholder="Write something amazing..."
                modules={modules}
                value={content}
                onChange={(text) => {setContent(text); setText(text)}}
            />

        </div>
    );
};

export default TextEditor;