'use client';

import React, { useEffect, useState } from 'react';

// Define a type for the feed items based on the response structure
type FeedItem = {
  hash: string;
  text: string;
  parent_url: string | null;
  // Add other properties as needed based on the actual data
};

const Page = () => {
  // Use the FeedItem type in your state
  const [feed, setFeed] = useState<FeedItem[]>([]);

  useEffect(() => {
    // Fetch the data from the server-side API route
    const fetchData = async () => {
      try {
        const response = await fetch('/api/feed'); // Ensure the URL is correct
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Check the structure of the fetched data
        console.log(data);

        // Extract `casts` array from the response
        const feedItems = data.casts; // Adjust if the structure is different

        // Set the feed data
        setFeed(feedItems);
      } catch (error) {
        console.error('Error fetching feed:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Render your feed data here */}
      {feed.length > 0 ? (
        feed.map((item, index) => (
          <div key={index}>
            <h3>{item.hash}</h3> {/* Display hash */}
            <p>{item.text}</p> {/* Display text */}
            {item.parent_url && <a href={item.parent_url} target="_blank" rel="noopener noreferrer">Parent URL</a>}
          </div>
        ))
      ) : (
        <div>No feed items available</div>
      )}
    </div>
  );
};

export default Page;
