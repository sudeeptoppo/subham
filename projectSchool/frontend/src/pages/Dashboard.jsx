import { useNavigate } from "react-router-dom";
import ThemeSwitch from "../components/theme/ThemeSwitch";
export const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/AllQuiz")}>Attempt Quiz</button>
      <h1 className="text-[#808080]">Dashboard</h1>
      <ThemeSwitch />
    </div>
  );
};
