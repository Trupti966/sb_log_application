import React, { useState } from "react";
import { Entry } from "../services/client";

export const EntryCard: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [open, setOpen] = useState(false);

  const date = new Date(entry.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className="bg-white rounded-xl p-5 shadow-sm border hover:shadow-md transition-all duration-200 cursor-pointer w-full"
      onClick={() => setOpen(!open)}
    >

      {/* Top Row */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-400 text-sm">{date}</span>
      </div>

      {/* Question */}
      <h3 className="text-lg font-bold mb-3">
        {entry.question}
      </h3>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {entry.tags.map(tag => (
          <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
            #{tag}
          </span>
        ))}
      </div>

      {/* Expand Arrow */}
      <div className="text-right text-indigo-600 text-sm">
        {open ? "Hide Details ▲" : "Show Details ▼"}
      </div>

      {/* Expanded Section */}
      {open && (
        <div className="mt-5 space-y-4 animate-fadeIn">

          {/* Answer Points */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Answer Summary:</h4>
            <ul className="list-decimal ml-5 text-gray-700 space-y-1">
              {entry.answerPoints.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          {/* Example */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Example Explanation:</h4>
            <p className="text-gray-700 whitespace-pre-line">{entry.exampleExplanation}</p>
          </div>

          {/* Code Snippet */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Code Snippet:</h4>
            <pre className="bg-gray-900 text-green-300 p-4 rounded-lg text-sm overflow-auto whitespace-pre-wrap">
              {entry.codeSnippet}
            </pre>
          </div>

          {/* Code Explanation */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Step-by-Step Code Explanation:</h4>
            <ul className="list-decimal ml-5 text-gray-700 space-y-1">
              {entry.codeExplanationSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
