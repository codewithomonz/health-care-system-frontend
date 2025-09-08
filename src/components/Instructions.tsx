import { UserPlus, LogIn, FileText, Activity } from "lucide-react";

const Instructions = () => {
  const steps = [
    {
      id: 1,
      title: "Sign Up",
      description:
        "Create your account by entering your full name (not real name), a hospital ID (for login purpose), and a strong password with at least 8 characters. This ensures security and personalized access to the system.",
      icon: UserPlus,
    },
    {
      id: 2,
      title: "Login",
      description:
        "Use your registered hospital ID and password to log into the system. Once logged in, you’ll have access to all available health tools and resources.",
      icon: LogIn,
    },
    {
      id: 3,
      title: "Provide Analysis Data",
      description:
        "Enter your health details, including free-text notes, contextual information, and symptoms. The more detailed your input, the more accurate and relevant the AI-powered analysis will be.",
      icon: FileText,
    },
    {
      id: 4,
      title: "Receive Analysis",
      description:
        "After submission, the system processes your data and provides an insightful health analysis. You’ll receive guidance on possible conditions, preventive steps, and recommendations for further care.",
      icon: Activity,
    },
  ];

  return (
    <section id="instructions" className="bg-slate-50">
      <div className="py-20 px-6 max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center gap-3 mb-12 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-cyan-800">
            How to Use the System
          </h2>
          <p className="text-base text-slate-500 max-w-2xl">
            Follow these simple steps to get started with our AI-powered Health
            Care System. Each stage is designed to guide you smoothly from
            account creation to receiving accurate health insights.
          </p>
        </div>

        {/* Instructions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="p-6 space-y-4 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition bg-white"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-cyan-50">
                  <Icon size={36} className="text-cyan-600" />
                </div>
                <h3 className="text-xl font-semibold text-cyan-800">
                  {step.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Instructions;
