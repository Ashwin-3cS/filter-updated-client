import { NeynarAPIClient, FeedType, FilterType } from '@neynar/nodejs-sdk';

export async function GET(req) {
  const apiKey = process.env.NEYNAR_API_KEY; // Securely handled on server side
  const client = new NeynarAPIClient(apiKey);

  try {
    const feed = await client.fetchFeed(FeedType.Filter, {
      filterType: FilterType.GlobalTrending,
    });
    return new Response(JSON.stringify(feed), { status: 200 });
  } catch (error) {
    console.error('Error fetching feed:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch feed' }), { status: 500 });
  }
}
