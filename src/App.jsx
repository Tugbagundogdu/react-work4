import { useState, useEffect } from 'react';
import getData from './components/getData';
import './App.css';


const App = () => {
  const [userDetails, setUserDetails] = useState(null);

  //When the page opens, we print the data to the screen
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getData(1);
        setUserDetails(data);
        // we log the data to the console
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);


  return (
    <div className="container">
      {userDetails ? (
        <div className="user-card">
          <h1>User Details</h1>
          <div className="user-info">
            <h2>{userDetails.name}</h2>
            <p>Username: {userDetails.username}</p>
            <p>Email: {userDetails.email}</p>
          </div>
          <div className="posts-container">
            {userDetails.posts.map((post) => (
              <div key={post.id} className="post-card">
                <strong>{post.title}</strong>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
