import React, { useState } from "react";
import { useCreateFeedbackMutation } from "@/features/feedback/feedbackApiSlice";

const FeedbackForm = () => {
  const [message, setMessage] = useState("");
  const [createFeedback, { isLoading, isSuccess, isError }] =
    useCreateFeedbackMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    await createFeedback({ message });
    setMessage(""); // clear after submit
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 space-y-4 border rounded-lg shadow"
    >
      <h4 className="text-xl font-semibold">Give Feedback</h4>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your feedback..."
        className="w-full border rounded-md p-2"
        rows={4}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 disabled:opacity-50"
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
      {isSuccess && (
        <p className="text-green-600">Feedback submitted successfully!</p>
      )}
      {isError && <p className="text-red-600">Failed to submit feedback.</p>}
    </form>
  );
};

export default FeedbackForm;
