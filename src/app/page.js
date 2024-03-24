"use client";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState("it's null right now");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState([]);
  const messagesEndRef = useRef(null);
  const [principleQuery, setPrincipleQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newQuery = formData.get("llmQuery");

    // Update the chat state with the user's message
    setChat((prevChat) => [
      ...prevChat,
      {
        role: "user",
        message: newQuery,
      },
    ]);
``

    // Clear the input field
    setQuery("");
    setPrincipleQuery(
      (e) =>
        "Early Query is " +
        e +
        " and current prompt is" +
        query +
        "Now answer latest prompt with your knowledge and prior prompt"
    );
    // Fetch data based on the user's query
    fetchData();
  }

  async function fetchData() {
    try {
      const command = JSON.stringify({ QUERY: query });
      setLoading(true);
      const response = await fetch("http://localhost:3000/api", {
        method: "POST",
        body: command,
      });
      const data = await response.json();

      // Update the chat state with the server response
      setChat((prevChat) => [
        ...prevChat,
        {
          role: "Adira",
          message: data.RESULT,
        },
      ]);

      setOutput(JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <main>
      <div className={`mb-[10vw]`}>
        {loading ? <p>Loading...</p> : ""}

        {/* Display chat messages */}
        {chat.map((message, index) => (
          <div
            key={index}
            className={`text-white p-2 rounded-lg max-w-[70%] mb-2 ${
              message.role === "user"
                ? "bg-blue-500 self-end text-right ml-auto mr-[5%]"
                : "bg-yellow-500 self-start ml-[5%] "
            }`}
          >
            {message.message}
          </div>
        ))}
        {/* Create a reference to the last message to scroll into view */}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 left-0 w-full  p-4 border-t "
      >
        <div className="max-w-screen-lg mx-auto flex items-center">
          <label className="flex-grow">
            <span className="sr-only">Enter your query:</span>
            <input
              type="text"
              name="llmQuery"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Please Enter Your Query ..."
            />
          </label>
          <button
            type="submit"
            className="ml-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
