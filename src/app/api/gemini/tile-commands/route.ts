import { getTileCommands } from "@/utils/getTileCommands";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = body.message
    
    const response = await getTileCommands(message);
    return new Response(JSON.stringify({ message: response }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
