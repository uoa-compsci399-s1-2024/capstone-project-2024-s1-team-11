import Header from '../components/header';
import Footer from '../components/footer';
import TopImage from '../components/top-image';
import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Repository from '../../../server/repository/repository';


export default function RockTopicPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This should change the state if user is logged in, haven't made an Authenticator yet so won't work
  const [isFromQRCode, setIsFromQRCode] = useState(false); // This should change the state if user came from QRCode
  const history = useHistory();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const repository = new Repository();

  const [rock, setRock] = useState(null);
  const productKey = urlParams.get('productKey');
  const topicId = urlParams.get('topicId'); // Extract the topic ID from URL parameters

  const handleCollectRock = async () => {
    if (!isLoggedIn) {
      // Redirect to sign-in page if user is not logged in
      window.location.href = "/sign-in"; // Change to sign in page
    } else {
      // Call the addRock method from Repository
      try {
        await repository.addRock(userId, rockId); // Pass userId and rockId as needed
        alert("Rock added to collection!");
      } catch (error) {
        console.error("Error adding rock to collection:", error);
        alert("Error adding rock to collection. Please try again later.");
      }
    }
  };

  const fetchRock = async () => {
    try {
      const rockData = await repository.getRockByTopic(topicId); // Assuming there's a method to get rock by topic ID
      setRock(rockData);
    } catch (error) {
      console.error('Error fetching rock:', error.message);
    }
  };

  useEffect(() => {
    // Check if user is logged in
    const checkUserLoggedIn = async () => {
      // Call the isLoggedIn method from Repository
      const loggedIn = await repository.isLoggedIn(userId);
      setIsLoggedIn(loggedIn);
    };
    checkUserLoggedIn();

    // Check if user came from QR code
    const checkIfFromQRCode = async () => {
      // Call the isFromQRCode method from Repository
      const fromQRCode = await repository.isFromQRCode(userId, rockId);
      setIsFromQRCode(fromQRCode);
    };
    checkIfFromQRCode();
    fetchRock();
  }, []);

  return (
    <>
      <Header />
        <main>
          <TopImage />
          <article className='side-padding'>
            {rock ? (
              <>
                <h1>{rock.rock_name}</h1>
                <p>{rock.description}</p>
                {isFromQRCode && (
                  <button onClick={handleCollectRock}>
                    {isLoggedIn ? "Add Rock to Collection" : "Sign in to Collect"}
                  </button>
                )}
              </>
            ) : (
              <p>Loading...</p>
            )}
          </article>
        </main>
        <Footer />
    </>
  );
}
