import axios from 'axios';

const getData = async (userId) => {
  try {
    const [userData, userPosts] = await Promise.all([
      axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`),
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    ]);

    const userDetails = userData.data;
    const userPostsData = userPosts.data;

    const combinedData = {
      ...userDetails,
      posts: userPostsData
    };

    return combinedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
};

export default getData;

