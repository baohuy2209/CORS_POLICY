"use client";
import React, { useState } from "react";
const baseUrl = process.env.NEXT_STATIC_BASE_URL || "http://localhost:4000";
const styles = {
  idie: {
    backgroundColor: "white",
    color: "black",
  },
  ok: {
    backgroundColor: "green",
    color: "white",
  },
  error: {
    backgroundColor: "red",
    color: "white",
  },
};
interface exampleProps {
  heading: string;
  url: string;
  method: string;
}
const ExampleComponent: React.FC<exampleProps> = ({ heading, url, method }) => {
  const [state, setState] = useState<"idie" | "ok" | "error">("idie");
  const [response, setResponse] = useState<string>("");
  const callUrlWithMethod = async (ev: React.FormEvent) => {
    try {
      ev.preventDefault();
      const res = await fetch(baseUrl + url, { method });
      if (res.ok) {
        setState("ok");
        setResponse(
          res.status === 204 ? "STATUS CODE: 204" : (await res.json()).text
        );
      } else {
        throw await res.text();
      }
    } catch (error: any) {
      setState("error");
      setResponse(error.toString());
    }
  };
  return (
    <article className="mb-10">
      <h2 className="bg-[#FCDE70] h-10 px-2 py-3 rounded-lg">{heading}</h2>
      <pre>
        {method} {baseUrl}
        {url}
      </pre>
      <div>
        <textarea
          style={styles[state]}
          value={(state === "ok" && response) || ""}
          readOnly
          className="rounded-lg text-black px-2 py-3 border border-primary focus:border-stroke"
        />
        {state === "error" && <p style={{ color: "red" }}>{response}</p>}
      </div>
      <div>
        <button
          type="button"
          className="bg-white px-2 py-1 text-black rounded-lg"
          onClick={callUrlWithMethod}
        >
          Fetch
        </button>
      </div>
    </article>
  );
};
export default ExampleComponent;
