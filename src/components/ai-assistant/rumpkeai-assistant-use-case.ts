export const rumpkeai_assistant_use_case = async (prompt: string) => {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_GPT_API}/assistant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    if (!resp.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await resp.json();
  

    return {
      message: {
        role: 'assistant',
        content: data.message?.content || 'Sin respuesta del servidor.'
      }
    };
  } catch (error) {
    return {
      message: {
        role: 'assistant',
        content: 'Es gab einen Fehler beim Verarbeiten deiner Anfrage.'
      }
    };
  }
};
