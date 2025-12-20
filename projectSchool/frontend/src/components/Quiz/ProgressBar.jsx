export function ProgressBar() {
  return (
    <>
      {/* Progress */}
      <div className="mb-8">
        <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
          <div className="h-full w-[30%] bg-gray-800 rounded-full" />
        </div>
        <p className="mt-2 text-sm text-gray-600">Question 3 of 10</p>
      </div>
    </>
  );
}
