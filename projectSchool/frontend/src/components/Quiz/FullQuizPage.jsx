import { useState } from "react";

export default function QuizQuestion() {
  const [selected, setSelected] = useState("A");

  const options = [
    { id: "A", label: "Immanuel Kant" },
    { id: "B", label: "Friedrich Nietzsche" },
    { id: "C", label: "David Hume" },
    { id: "D", label: "John Locke" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f6f2] px-4">
      <div className="w-full max-w-2xl text-center">
        {/* Progress */}
        <div className="mb-8">
          <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
            <div className="h-full w-[30%] bg-gray-800 rounded-full" />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Question 3 of 10
          </p>
        </div>

        {/* Question */}
        <h1 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 mb-8">
          Which philosopher wrote the treatise
          <br />
          <span className="italic">'Critique of Pure Reason'?</span>
        </h1>

        {/* Options */}
        <div className="space-y-4 text-left max-w-md mx-auto">
          {options.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="radio"
                name="answer"
                checked={selected === option.id}
                onChange={() => setSelected(option.id)}
                className="hidden"
              />

              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${
                  selected === option.id
                    ? "border-gray-800"
                    : "border-gray-400"
                }`}
              >
                {selected === option.id && (
                  <span className="w-2.5 h-2.5 bg-gray-800 rounded-full" />
                )}
              </span>

              <span className="text-gray-800 text-lg">
                {option.id}) {option.label}
              </span>
            </label>
          ))}
        </div>

        {/* Submit */}
        <button
          className="mt-10 px-6 py-2 border border-gray-400 rounded-md
          text-gray-800 hover:bg-gray-100 transition"
        >
          Submit Answer
        </button>

        {/* Navigation */}
        <div className="mt-8 flex justify-center gap-6">
          <button className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center">
            &lt;
          </button>
          <button className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
