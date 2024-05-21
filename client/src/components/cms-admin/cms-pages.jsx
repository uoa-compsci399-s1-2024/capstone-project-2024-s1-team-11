import './styles.css'
import {Link, useNavigate} from "react-router-dom";

export default function CmsPages() {
    const navigate = useNavigate();
  return (
      <>
        <h2>Pages</h2>
        <p>This table show the pages that can be edited.</p>
        <table>
          <tbody>
          <tr>
            <th>Page Name</th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <td>About Us Page</td>
              <td><Link to={`/about`}><button className='btn blue'>View</button></Link>

                  <button className='btn blue' onClick={() => {navigate(`/cms/edit-page/about`)}}>
                      Edit
                  </button>
              </td>
          </tr>
          <tr>
              <td>Privacy Policy Page</td>
              <td>
                  <Link to={`/privacy-policy`}><button className='btn blue'>View</button></Link>

                  <button className='btn blue' onClick={() => {navigate(`/cms/edit-page/privacy-policy`)}}>
                      Edit
                  </button>
              </td>
          </tr>
          </tbody>
        </table>
      </>
  );
}