import { StartQuizButton } from "./StartQuizButton";
import { QuizBoxInfo } from "./QuizBoxInfo";
export function QuizBox(props) {
  return (
    <div class="max-w-xl w-full rounded-xl border border-gray-300 bg-white px-6 py-4 flex items-center justify-between shadow-sm">
      <div class="flex items-center gap-4 flex-1 min-w-0 ">
        <div class="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300">
          <span class="text-xl">🧠</span>
        </div>
        <QuizBoxInfo
          title={props.title}
          description={props.subject}
        />
      </div>

      <div className="">
        <StartQuizButton quizId={props.quizId} />
      </div>
    </div>
  );
}
