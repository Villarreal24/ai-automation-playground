/**
 * Sends a message to the n8n webhook proxy and streams back the response.
 *
 * Note: n8n's "Respond to Webhook" node sends the complete response at once (not true SSE token streaming).
 * To provide a good streaming UX, we read the full response and emit it word-by-word
 * using a typewriter simulation on the client side.
 */
export async function streamChatResponse(
  scenario: string,
  message: string,
  sessionId: string,
  onChunk: (text: string) => void,
  onError?: (error: Error) => void
): Promise<void> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, scenario, sessionId }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    // Read the securely parsed text from our own Next.js backend
    const cleanText = await response.text();
    
    if (!cleanText.trim()) {
      throw new Error('Empty response received from n8n');
    }

    // Simulate typewriter streaming: emit word-by-word with a small delay
    const words = cleanText.split(/(\s+)/); // split preserving spaces
    for (const word of words) {
      if (word) {
        onChunk(word);
        // Small delay between words to create typewriter effect (~40ms ≈ ~25 words/sec)
        await new Promise(resolve => setTimeout(resolve, 40));
      }
    }

  } catch (error) {
    const err = error instanceof Error ? error : new Error('Stream failed');
    if (onError) {
      onError(err);
    } else {
      throw err;
    }
  }
}

