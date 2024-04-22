import Header from '../components/header';
import Footer from '../components/footer';
import TopImage from '../components/top-image';
import { useState, useEffect } from 'react';


export default function RockTopicPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This should change the state if user is logged in, haven't made an Authenticator yet so won't work
  const [isFromQRCode, setIsFromQRCode] = useState(false); // This should change the state if user came from QRCode
  const repository = new Repository();

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
  }, []);

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

  return (
    <>
      <Header />
        <main>
          <TopImage />
          <article className='side-padding'>
            <h1>What’s interesting about the number 0?</h1>
            <p>Insert text .....</p>
            {isFromQRCode && (
            <button onClick={handleCollectRock}>
              {isLoggedIn ? "Add Rock to Collection" : "Sign in to Collect"}
            </button>
            )}
          </article>
        </main>
        <Footer />
    </>
  );
}
