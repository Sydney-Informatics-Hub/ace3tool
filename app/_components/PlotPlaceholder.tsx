export function PlotPlaceholder() {
  return (
    <div role="status" className="w-[500px] h-[200px] animate-pulse">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
      <div className="w-48 h-2 mb-1 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      <div className="flex items-baseline mt-1">
        <div className="w-full bg-gray-200 rounded-t-lg h-20 dark:bg-gray-700"></div>
        <div className="w-full ms-6 bg-gray-200 rounded-t-lg h-24 dark:bg-gray-700"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-20 ms-6 dark:bg-gray-700"></div>
        <div className="w-full ms-6 bg-gray-200 rounded-t-lg h-24 dark:bg-gray-700"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-18 ms-6 dark:bg-gray-700"></div>
      </div>
    </div>
  );
}
