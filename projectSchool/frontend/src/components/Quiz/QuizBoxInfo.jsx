export function QuizBoxInfo(props) {
  const { title, description } = props;
  return (
    <>
      <div className="  h-18 w-50">
        <h2 class="text-lg font-semibold text-gray-900">{title}</h2>
        <p class="text-sm text-gray-600">{description}</p>
      </div>
    </>
  );
}
