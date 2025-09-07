// import { Link } from "react-router";
// import background from "@/assets/images/background.png";

// export default function Hero() {
//   return (
//     <section
//       className="h-screen bg-cover bg-center relative flex items-center px-6 md:px-16"
//       style={{ backgroundImage: `url(${background})` }}
//     >
//       {/* Overlay for glassy dark effect */}
//       <div className="absolute inset-0 bg-black/50 backdrop-blur-[5px]"></div>

//       {/* Content */}
//       <div className="pl-4 md:pl-20 relative z-10 max-w-xl text-left text-white">
//         <h1 className="text-5xl md:text-6xl font-bold leading-tight">
//           AI-Powered <span className="text-cyan-400">Health Care</span> System
//         </h1>
//         <p className="mt-6 text-lg md:text-xl text-gray-200">
//           Get instant AI-driven analysis of your symptoms, track your health,
//           and connect with trusted professionals. Your health, smarter.
//         </p>
//         <Link
//           to="/signup"
//           className="mt-8 inline-block px-8 py-4 bg-cyan-500 hover:bg-cyan-600 rounded-full text-white text-lg font-semibold transition"
//         >
//           Get Started
//         </Link>
//       </div>
//     </section>
//   );
// }

import { Link } from "react-router";
import background from "@/assets/images/background.png";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="h-screen bg-cover bg-center relative flex items-center px-6 md:pl-32"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Animated Content */}
      <motion.div
        className="relative pl-5 z-10 max-w-xl text-left text-white"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold leading-tight"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          AI-Powered <span className="text-cyan-400">Health Care</span> System
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-xl text-gray-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        >
          Get instant AI-driven analysis of your symptoms, track your health,
          and connect with trusted professionals. Your health, smarter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        >
          <Link
            to="/signup"
            className="mt-8 inline-block px-8 py-4 bg-cyan-500 hover:bg-cyan-600 rounded-full text-white text-lg font-semibold transition"
          >
            Get Started
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
