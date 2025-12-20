export function QuizBoxInfo(props) {
  const { title, description } = props;
  return (
    <>
      <div className="flex-1 min-w-0">
        <h2 class="text-lg font-semibold text-gray-900">{title}</h2>
        <p class="text-sm text-gray-600">{description}</p>
      </div>
    </>
  );
}
