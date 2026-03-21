import { NextRequest, NextResponse } from 'next/server';
import { VALID_SCENARIOS } from '@/data/scenarios';

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

export async function POST(request: NextRequest) {
  try {
    if (!N8N_WEBHOOK_URL) {
      console.error('N8N_WEBHOOK_URL is not configured');
      return NextResponse.json(
        { error: 'Webhook URL is not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { message, scenario, sessionId } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    if (!scenario || !VALID_SCENARIOS.includes(scenario)) {
      return NextResponse.json(
        { error: `Invalid scenario. Must be one of: ${VALID_SCENARIOS.join(', ')}` },
        { status: 400 }
      );
    }

    // Forward the request to the n8n webhook
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, scenario, sessionId }),
    });

    const fullText = await n8nResponse.text();
    
    if (!fullText.trim()) {
      console.error('[API /chat] Empty response from n8n');
      return NextResponse.json(
        { error: 'Empty response from assistant' },
        { status: 500 }
      );
    }

    // Safely extract the output from the n8n JSON securely on the SERVER
    let cleanText = fullText.trim();
    try {
      const parsed = JSON.parse(cleanText);
      if (Array.isArray(parsed) && parsed[0]?.output !== undefined) {
        cleanText = parsed[0].output;
      } else if (parsed?.output !== undefined) {
        cleanText = parsed.output;
      }
    } catch {
      // Not JSON, use as is
    }

    // Return plain, sanitized text to the client
    return new Response(cleanText, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0',
      },
    });

  } catch (error) {
    console.error('Streaming proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
