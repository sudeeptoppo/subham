import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { Name } from "../components/dashboard/Name";
import { Question } from "../components/Quiz/Question";
import { Options } from "../components/Quiz/Options";
import  FullQuizPage  from "../components/Quiz/FullQuizPage";
import { AllQuiz } from "../components/Quiz/AllQuiz";
export const Dashboard = () => {
  return (
    <div>
      <div className="m-8 ">
        
        <AllQuiz />
        

        <script
          type="module"
          src="https://unpkg.com/@splinetool/viewer@1.12.16/build/spline-viewer.js"
        ></script>
        
      </div>
    </div>
  );
};
