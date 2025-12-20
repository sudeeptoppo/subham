import { useState, useEffect } from "react";
import { StartQuizButton } from "./StartQuizButton";
import { QuizBoxInfo } from "./QuizBoxInfo";
import axios from "axios";
export function QuizBox() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/quiz/available")
      .then((response) => {
        setQuizzes(response.data.quizzes);
      });
  }, [quizzes]);
  return (
    <div class="max-w-xl w-full rounded-xl border border-gray-300 bg-white px-6 py-4 flex items-center justify-between shadow-sm">
      <div class="flex items-center gap-4 flex-1 min-w-0 ">
        <div class="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300">
          <span class="text-xl">🧠</span>
        </div>

        {quizzes.map((quiz) => (
          <QuizBoxInfo
            key={quiz._id}
            title={quiz.title}
            description={quiz.subject}
          />
        ))}
      </div>

      <div className="">
        <StartQuizButton />
      </div>
    </div>
  );
}
