export const rumpkeai_assistant_use_case = async (prompt: string) => {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_GPT_API}/assistant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });
    if (!resp.ok) throw new Error();
    const data = await resp.json();
    return {
      message: {
        role: 'assistant',
        content: data.message?.content || 'Keine Antwort vom Server.'
      }
    };
  } catch {
    return {
      message: {
        role: 'assistant',
        content: 'Beim Verarbeiten deiner Anfrage ist ein Fehler aufgetreten.'
      }
    };
  }
};
