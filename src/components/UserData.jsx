import{ useState, useEffect } from 'react';
import axios from 'axios';

const fetchUserData = (userId) => {
  const fetchUser = axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
  const fetchPosts = axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

  return Promise.all([fetchUser, fetchPosts])
    .then((results) => {
      const userData = results[0].data;
      const userPosts = results[1].data;

      return {
        ...userData,
        posts: userPosts,
      };
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      throw new Error('Failed to fetch data');
    });
};

const UserData = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const userId = 1; // Değişebilir, istenen user id'si burada belirlenir

    fetchUserData(userId)
      .then((data) => setUserDetails(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="user-card">
    <h1>User Details</h1>
    {userDetails ? (
      <div>
        <div className="user-info">
          <h2>{userDetails.name}</h2>
          <p>Username: {userDetails.username}</p>
          <p>Email: {userDetails.email}</p>
          {/* Diğer bilgileri buraya ekleyebilirsiniz */}
        </div>
        <h3>Posts</h3>
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

export default UserData;
