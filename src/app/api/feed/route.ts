import { NeynarAPIClient, FeedType, FilterType } from '@neynar/nodejs-sdk';


type User = {
  fid: number;
  // Add other properties as needed based on API response
};

export async function GET(req: Request) {
  const apiKey = process.env.NEYNAR_API_KEY;
  if (!apiKey) {
    throw new Error("Missing Neynar API Key");
  }
  const client = new NeynarAPIClient(apiKey);

  try {
    const fetchAllFollowing = async (fid: number): Promise<User[]> => {
      let cursor: string | null = "";
      let users: User[] = [];
      do {
        const result = await client.fetchUserFollowing(fid, {
          limit: 150,
          cursor,
        });
        users = users.concat(result.result.users as User[]);
        cursor = result.result.next.cursor;
        console.log(cursor);
      } while (cursor !== "" && cursor !== null);

      return users;
    };

    const vitalikFID = 5650;
    const vitalikFollowings = await fetchAllFollowing(vitalikFID);
    const fids = vitalikFollowings.map((user) => user.fid);

    console.log(fids);

    const feed = await client.fetchFeed(FeedType.Filter, {
      filterType: FilterType.Fids,
      fids,
    });
    
    console.log(feed);
    

    return new Response(JSON.stringify({ fids }), { status: 200 });
  } catch (error) {
    console.error('Error fetching feed:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch feed' }), { status: 500 });
  }
}
