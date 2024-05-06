import '../components/cms-admin/styles.css'
import Header from '../components/header';
import Footer from '../components/footer';
import CmsPages from '../components/cms-admin/cms-pages';
import CmsTopics from '../components/cms-admin/cms-topics';
import CmsRocks from '../components/cms-admin/cms-rocks';
import CmsUsers from '../components/cms-admin/cms-users';
import authorization from "../utils/auth.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


export default function CmsPage() {
    const [display, setDisplay] = useState({
        pages: false,
        topics: true,
        rocks: false,
        users: false
      });
    const navigate = useNavigate();

    const user_id = Cookies.get("user_id");
    const username = Cookies.get("username");
    const signature = Cookies.get("signature");

    useEffect(() => {
        const authorize = async () => {
            if (! await authorization(user_id, username, signature)){
                navigate("/");
            }
        }; authorize();
    });

  return (
    <>
      <Header />
        <main>
            <article className='side-padding  top-padding'>
           <h1>Content management system</h1>
           <div className='cms-nav'>
            <ul>
                <li onClick={() => setDisplay({pages: true, topics: false, rocks: false, users: false})}
                 className={display.pages ? 'active' : ''}>Pages</li>
                <li onClick={() => setDisplay({pages: false, topics: true, rocks: false, users: false})}
                className={display.topics ? 'active' : ''}>Topic pages</li>
                <li onClick={() => setDisplay({pages: false, topics: false, rocks: true, users: false})}
                className={display.rocks ? 'active' : ''}>Rocks</li>
                <li onClick={() => setDisplay({pages: false, topics: false, rocks: false, users: true})}
                className={display.users ? 'active' : ''}>Users</li>
            </ul>
           </div>
           {display.pages ? <CmsPages /> : null}
           {display.topics ? <CmsTopics /> : null}
           {display.rocks ? <CmsRocks /> : null}
           {display.users ? <CmsUsers /> : null}
          </article>
        </main>
        <Footer />
    </>
  );
}