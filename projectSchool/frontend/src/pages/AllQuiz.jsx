import { useState, useEffect } from "react";
import axios from "axios";
import { QuizBox } from "../components/Quiz/QuizBox.jsx";
export function AllQuiz() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/quiz/available")
      .then((response) => {
        setQuizzes(response.data.quizzes);
      });
  }, []);
  return (
    <div className="min-h-screen w-full  flex flex-col justify-center items-center bg-[#F7F6F1] ">
      <div className="flex flex-col justify-center content-center gap-4   ">
        {quizzes.map((quiz) => (
          <QuizBox key={quiz._id} title={quiz.title} subject={quiz.subject} />
        ))}
      </div>
    </div>
  );
}
