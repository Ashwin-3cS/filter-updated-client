import { NextRequest, NextResponse } from 'next/server';
import { NeynarAPIClient, FeedType, FilterType } from '@neynar/nodejs-sdk';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Capture the dynamic id parameter from the URL

  const apiKey = process.env.NEYNAR_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing Neynar API Key" }, { status: 500 });
  }

  const client = new NeynarAPIClient(apiKey);

  try {
    const fetchAllFollowing = async (fid: number) => {
      let cursor: string | null = "";
      let users: any = [];
      do {
        const result = await client.fetchUserFollowing(fid, {
          limit: 150,
          cursor,
        });
        users = users.concat(result.result.users);
        cursor = result.result.next.cursor;
      } while (cursor !== "" && cursor !== null);

      return users;
    };

    const vitalikFollowings = await fetchAllFollowing(Number(id)); // Use dynamic id
    const fids = vitalikFollowings.map((user: any) => user.fid);

    const feed = await client.fetchFeed(FeedType.Filter, {
      filterType: FilterType.Fids,
      fids,
    });

    return NextResponse.json(feed); // Respond with the fetched feed
  } catch (error) {
    console.error('Error fetching feed:', error);
    return NextResponse.json({ error: 'Failed to fetch feed' }, { status: 500 });
  }
}
