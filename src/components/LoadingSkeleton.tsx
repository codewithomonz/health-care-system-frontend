const LoadingSkeleton = () => {
  return (
    <div className="w-full md:max-w-2xl mx-auto p-4 space-y-6 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-4">
          {/* User bubble skeleton */}
          <div className="flex justify-end">
            <div className="bg-cyan-100 rounded-2xl h-6 w-40" />
          </div>

          {/* System bubble skeleton */}
          <div className="flex justify-start">
            <div className="bg-slate-400 rounded-2xl h-20 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
