const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const generateBookSummary = async (title) => {
  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `Summarize the book "${title}".`,
        max_tokens: 100,
        temperature: 0.7,
        n: 1,
      }),
    });

    const data = await response.json();
    const summary = data.choices[0].text.trim();
    return summary;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate book summary.");
  }
};

export default async function handler(req, res) {
  const { title } = req.body;

  if (req.method === "POST") {
    try {
      const summary = await generateBookSummary(title);
      res.status(200).json({ summary });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to generate book summary." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
