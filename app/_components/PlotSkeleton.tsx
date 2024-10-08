import React from "react";

interface PlotSkeletonProps extends React.HTMLProps<HTMLDivElement> {}

export default function PlotSkeleton(props: PlotSkeletonProps) {
  const { className } = props;
  const combined_class = `${className || ""} p-4 animate-pulse md:p-6`;
  return (
    <div role="status" className={combined_class}>
      <div className="h-2.5 bg-gray-200 rounded-full  w-1/2 mb-2.5"></div>
      <div className="w-3/4 h-2 mb-10 bg-gray-200 rounded-full "></div>
      <div className="h-full flex items-baseline mt-4">
        <div className="w-full bg-gray-200 rounded-t-lg h-3/4 "></div>
        <div className="w-full h-1/2 ms-6 bg-gray-200 rounded-t-lg "></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-3/4 ms-6 "></div>
        <div className="w-full h-4/5 ms-6 bg-gray-200 rounded-t-lg "></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-5/6 ms-6 "></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-3/4 ms-6 "></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-5/6 ms-6 "></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
