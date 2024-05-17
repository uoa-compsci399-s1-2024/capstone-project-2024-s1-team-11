import {useEffect, useState} from 'react';
import './styles.css'
import API from '../../../api.js'
import {useNavigate} from "react-router-dom";

export default function CmsTopicsMain() {
  const [topicsList, setTopicsList] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      const response = await fetch(API + "/topics");
      const topics = await response.json();
      const topics_list = Object.keys(topics).map((key)=>topics[key])
      setTopicsList(topics_list);
    }
    fetchTopics();
  }, [])


  return (
    <>
      <h2>Maths topics</h2>
      <button className='btn' onClick={() => {
        navigate("/cms/add-topic")
      }}>Add new topic +</button>
      <table>
        <tbody>
        <tr>
          <th>Topic ID</th>
          <th>Title</th>
          <th></th>
        </tr>
        {topicsList !== null && topicsList.map((topic) => (
            <tr key={topic.topic_id}>
              <td>{topic.topic_id}</td>
              <td>{topic.title}</td>
                <td>
                    <button className='btn' onClick={() => navigate(`/cms/edit-topic/${topic.topic_id}`)}>View/Edit</button>
                    <button className='btn' onClick={() => navigate(`/cms/delete-topic/${topic.topic_id}`)}>Delete</button>
                </td>
            </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}