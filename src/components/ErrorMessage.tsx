type Props = {
  message?: string;
};

const ErrorMessage = ({
  message = "Something went wrong. Please try again.",
}: Props) => {
  return (
    <div className="w-full md:max-w-2xl mx-auto p-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl shadow">
        <strong className="font-semibold">Error: </strong>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;
