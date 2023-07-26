import React, { useState } from 'react';
import axios from 'axios';

const TestComponent = () => {
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState('');

  const handleFetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/getUsers?id=${userId}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setData(null);
    }
  };

  return (
    <div>
      <h1>Test Component</h1>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleFetchUsers}>Fetch Users</button>
      {data ? (
        <div>
          <h2>Similar Users:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default TestComponent;
