import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('/products/api'); // Using fetch instead of axios

      // Check if the response is successful (status code 200)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // Convert the response to JSON
      console.log('Response Data:', data);

      // Check if the data is an empty array or not
      if (data.length > 0) {
        setData(data); // Set the data if it's not empty
      } else {
        console.log('No data returned');
      }
    } catch (err) {
      setError(err.message); // Set any errors that occur
    } finally {
      setLoading(false); // Stop loading when data is fetched
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li> // Displaying the fetched data
        ))}
      </ul>
    </div>
  );
}

export default App;