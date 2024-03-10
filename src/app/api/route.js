import { NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function POST(request) {
  try {
    const req = await request.json();
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
    const query = req.QUERY;
    console.log(query);

    // const res = "this is dumm y on ly for testing";
    async function main() {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: query }],
        model: "gpt-3.5-turbo",
      });
      const res = completion.choices[0].message.content;
      console.log(res);
    return NextResponse.json({ RESULT: res });
    }

    // Await main() to ensure it completes before returning the response
    return await main();
  } catch (error) {
    console.error("Error occurred:", error);
    // Provide a meaningful response in case of error
    return NextResponse.error();
  }
}
