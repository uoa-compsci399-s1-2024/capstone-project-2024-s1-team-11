import {useEffect, useState} from 'react';
import './styles.css'
import API from "../../../api.js";
import DOMAIN_NAME from "../../../domain-name.js"
import {useNavigate} from "react-router-dom";


export default function CmsRocksMain() {
  const [rocksList, setRocksList] = useState(null);
  const [topicsMap, setTopicsMap] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchRocks = async () => {
      const response = await fetch(API + "/rocks");
      const rocks = await response.json();
      const rocks_list = Object.keys(rocks).map((key) => rocks[key])
      setRocksList(rocks_list)
    }

    const fetchTopics = async () => {
      const response = await fetch(API + "/topics");
      const topics = await response.json();
      setTopicsMap(topics);
    }

    fetchRocks();
    fetchTopics();
  }, [])

  return (
    <>
      <h2>Rocks</h2>
      <p>This table shows all rocks that have been loaded to the database.</p>
      <button className='btn' onClick={() => navigate(`/cms/add-rock`)}>Add new rock +</button>
      <table>
        <tbody>
        <tr>
          <th>Rock id</th>
          <th>Associated Topic</th>
          <th>Rock name</th>
          <th>QR code url</th>
          <th></th>
        </tr>
        {rocksList !== null && rocksList.map((rock) => (
        <tr key={rock.rock_id}>
          <td>{rock.rock_id}</td>
          <td>{topicsMap !== null && topicsMap[rock.topic_id] !== undefined ? topicsMap[rock.topic_id].title: "No associated topic."}</td>
          <td>{rock.rock_name}</td>
          <td><a href={DOMAIN_NAME + `/rocks/${rock.rock_id}?product_key=${rock.product_key}`} target='_blank'>{DOMAIN_NAME + `/rocks/${rock.rock_id}?product_key=${rock.product_key}`}</a></td>
          <td>
            <button className='btn' onClick={() => {navigate(`/cms/edit-rock/${rock.rock_id}`)}}>Edit</button>
            <button className='btn' onClick={() => {navigate(`/cms/delete-rock/${rock.rock_id}`)}}>Delete</button>
          </td>
        </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}