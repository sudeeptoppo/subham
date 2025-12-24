import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useSearchParams } from "react-router-dom";
export function StartQuizButton(props) {
  //   const [searchParams] = useSearchParams();
  //   const id = searchParams.get("id");
  const navigate = useNavigate();

  return (
    <button
      className="rounded-md bg-gray-900 font-medium text-white px-4 py-2 text-sm hover:bg-gray-800 transition"
      onClick={async()  => {
        try {
          await axios.post(
            `http://localhost:3000/api/v1/quiz/${props.quizId}/submit`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          navigate("/Questions");
        } catch (error) {
          console.log(error);
        }
      }}
    >
      Start Quiz
    </button>
  );
}
