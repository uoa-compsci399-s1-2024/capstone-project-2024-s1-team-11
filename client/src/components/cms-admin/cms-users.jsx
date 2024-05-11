import './styles.css'
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import authorization from "../../utils/auth.jsx";
import API from "../../../api.js";

const CmsUsers = () =>{
  const [reportData, setReportData] = useState([]);
  const navigate = useNavigate();

  const user_id = Cookies.get("user_id");
  const username = Cookies.get("username");
  const signature = Cookies.get("signature");

  useEffect(() => {
    async function fetchUserReport() {
      if (! await authorization(user_id, username, signature)) {
        navigate("/");
      }
      const response = await fetch(API + '/usersReport',
          {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user_id: user_id, username: username, signature: signature})
          });
      const dataJSON = await response.json()
      setReportData(dataJSON)
    }
    fetchUserReport()
  }, []);

  return (
    <>
      <h2>Users per region report</h2>
      <p>This table shows how many users are registered per region, and how many rocks have been found by users registered to the region.</p>
      <table>
        <tbody>
          <tr>
            <th>Region</th>
            <th>Total users</th>
            <th>Total rocks found</th>
          </tr>
          {reportData.map((region) => (
              <tr key={region.region.region_name}>
                <td>{region.region.region_name}</td>
                <td>{region.region.user_count}</td>
                <td>{region.region.rocks_count}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      </>
  );
}

export default CmsUsers;