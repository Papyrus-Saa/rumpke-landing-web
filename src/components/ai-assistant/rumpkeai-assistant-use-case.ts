export const rumpkeai_assistant_use_case = async (prompt: string) => {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_GPT_API}/assistant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });
    const data = await resp.json();
    if (!resp.ok) {
      if (data && data.error) {
        return { error: data.error };
      }
      return { error: { code: 'UNKNOWN', message: resp.statusText || 'Unknown error', details: {} } };
    }
    return {
      message: {
        role: 'assistant',
        content: data.message?.content || 'Keine Antwort vom Server.'
      }
    };
  } catch {
    return {
      error: {
        code: 'NETWORK_ERROR',
        message: 'Beim Verarbeiten deiner Anfrage ist ein Fehler aufgetreten.',
        details: {}
      }
    };
  }
};
