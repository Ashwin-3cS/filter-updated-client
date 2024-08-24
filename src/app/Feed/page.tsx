'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { customImageLoader } from '@/src/utils/imageLoader'; // Adjust the path as needed

// Define a type for the feed items based on the response structure
type FeedItem = {
  hash: string;
  text: string;
  parent_url: string | null;
  author: {
    username: string;
    pfp_url: string;
  };
  timestamp: string;
};

const Page = () => {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const { data: session } = useSession();

  const user_fid = session?.user?.fid;
  console.log('user_fid : ', user_fid);

  useEffect(() => {
    // Fetch the data from the server-side API route
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/feed/${user_fid}`); // Ensure the URL is correct
        if (response.status < 200 || response.status >= 300) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
         
        console.log('the response is :', response);

        // Axios automatically parses the response data as JSON
        const data = response.data;

        // Check the structure of the fetched data
        console.log('the data is :', data);

        // Extract `casts` array from the response
        const feedItems = data.casts; // Adjust if the structure is different

        // Set the feed data
        setFeed(feedItems);
      } catch (error) {
        console.error('Error fetching feed:', error);
      }
    };

    if (user_fid) {
      fetchData();
    }
  }, [user_fid]);

  return (
    <div>
      <div className="pt-[140px]">
        <div className="max-w-screen-md mx-auto p-4 rounded-lg overflow-hidden">
          <div style={{ maxHeight: 'calc(100vh - 80px)' }}>
            {feed.length > 0 ? (
              feed.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-4 mb-4 ring-1 ring-slate-900/10">
                  <div className="flex items-center mb-2">
                    {/* Render profile picture */}
                    <Image
                      loader={customImageLoader}
                      src={item.author.pfp_url || ''}
                      width={50}
                      height={50}
                      alt={item.author.username || 'User Avatar'}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <div>
                      {/* Render user name */}
                      <p className="text-gray-800 font-semibold">{item.author.username || 'Anonymous'}</p>
                      {/* Render post time */}
                      <span className="text-gray-500 text-sm">{item.timestamp ? formatDistanceToNow(new Date(item.timestamp), { addSuffix: true }) : 'Unknown Time'}</span>
                    </div>
                  </div>
                  {/* Render post content */}
                  <p className={`text-gray-800`}>{item.text}</p>
                  {/* Render parent URL if available
                  {item.parent_url && (
                    <a href={item.parent_url} target="_blank" rel="noopener noreferrer">
                      Parent URL
                    </a>
                  )} */}
                </div>
              ))
            ) : (
              <div>No feed items available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
