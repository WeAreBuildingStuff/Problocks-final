export async function getCarCommands(message: string): Promise<string> {
  try {
    const response = await fetch(`/api/gemini/car-commands`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response');
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error fetching response:', error);
    throw error;
  }
}

export async function getTileCommands(message: string): Promise<string> {
  try {
    const response = await fetch(`/api/gemini/tile-commands`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response');
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error fetching response:', error);
    throw error;
  }
}

export async function getDrawBotCommands(message: string): Promise<string> {
  try {
    const response = await fetch(
      `/api/gemini/draw-bot-commands`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch response');
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error fetching response:', error);
    throw error;
  }
}

export async function getRandomChallenge(message: string): Promise<string> {
  try {
    const response = await fetch(
      `/api/gemini/random-challenge`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch response');
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error fetching response:', error);
    throw error;
  }
}

export async function getFeedback(message: string): Promise<string> {
  try {
    const response = await fetch(
      `/api/gemini/feedback`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch response');
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error fetching response:', error);
    throw error;
  }
}