import { useState } from "react";
import { useCreateFeedbackMutation } from "@/features/feedback/feedbackApiSlice";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const FeedbackForm = ({ onClose }: { onClose: () => void }) => {
  const [message, setMessage] = useState("");
  const [createFeedback, { isLoading, isSuccess, isError }] =
    useCreateFeedbackMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const res = await createFeedback({ message });
    setMessage("");

    console.log(res);

    toast.success("Feedback Submitted successfully");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your feedback..."
        className="w-full p-3 rounded-xl border"
        rows={4}
      />
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-cyan-600 hover:bg-cyan-700"
      >
        {isLoading ? "Submitting..." : "Submit Feedback"}
      </Button>
      {isSuccess && (
        <p className="text-green-600 text-sm">✅ Feedback submitted!</p>
      )}
      {isError && <p className="text-red-600 text-sm">❌ Failed to submit</p>}
    </form>
  );
};

export default FeedbackForm;
