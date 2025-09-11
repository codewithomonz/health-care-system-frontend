import {
  useGetAllFeedbacksQuery,
  useDeleteFeedbackMutation,
  type Feedback,
} from "@/features/feedback/feedbackApiSlice";

const FeedbackPage = () => {
  const { data: feedbacks, isLoading, isError } = useGetAllFeedbacksQuery();
  const [deleteFeedback] = useDeleteFeedbackMutation();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this feedback?")) {
      try {
        await deleteFeedback(id).unwrap();
      } catch (error) {
        console.error("Failed to delete feedback:", error);
      }
    }
  };

  const hasFeedback = feedbacks?.data && feedbacks.data.length > 0;

  if (isLoading) return <p>Loading feedbacks...</p>;
  if (isError) return <p className="text-red-600">Failed to load feedbacks</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h4 className="text-2xl font-semibold mb-6">User Feedbacks</h4>

      {hasFeedback ? (
        <ul className="space-y-4">
          {feedbacks!.data.map((fb: Feedback) => (
            <li
              key={fb._id}
              className="p-4 border rounded-lg shadow flex justify-between items-center bg-slate-50"
            >
              <div>
                <p className="font-medium">{fb.message}</p>
                <small className="text-gray-500">
                  Posted on {new Date(fb.createdAt).toLocaleString()}
                </small>
              </div>
              <button
                onClick={() => handleDelete(fb._id)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedback yet.</p>
      )}
    </div>
  );
};

export default FeedbackPage;
