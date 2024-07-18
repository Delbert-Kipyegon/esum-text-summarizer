import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
	token: process.env.COHERE_API_KEY,
});

export async function POST(request) {
	try {
		const { text } = await request.json();

		if (!text) {
			return new Response(
				JSON.stringify({ error: "No text provided for summarization" }),
				{ status: 400 }
			);
		}

		const response = await cohere.summarize({
			text: text || "",
			length: "long",
			format: "paragraph",
			model: "summarize-xlarge",
			additional_command: "",
			temperature: 0.3,
		});

		if (!response || !response.summary) {
			throw new Error("Invalid or missing summary in Cohere API response");
		}

		return new Response(JSON.stringify({ summary: response.summary }), {
			status: 200,
		});
	} catch (error) {
		console.error("Error in POST /api/summarize:", error);
		return new Response(
			JSON.stringify({
				error: "Internal Server Error",
				details: error.message,
			}),
			{ status: 500 }
		);
	}
}
