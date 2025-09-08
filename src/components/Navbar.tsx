import { useEffect, useState } from "react";
import { Link } from "react-router";
import { TiThMenu } from "react-icons/ti";
import { CgMenuMotion } from "react-icons/cg";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "/" },
  { label: "Sign In", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

const Navbar = () => {
  const [open, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed w-full top-0 z-50 transition-all duration-300"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        className={`group w-[90%] md:w-[80vw] mx-auto transition-all duration-300 border rounded-b-3xl
        ${
          isScrolled
            ? "bg-black/50 backdrop-blur-md border-white/20"
            : "bg-transparent border-none"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 mx-auto text-white">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="text-2xl font-bold text-cyan-400">
              HealthCare AI
            </Link>
          </motion.div>

          {/* Desktop menu */}
          <motion.ul
            className="hidden md:flex items-center space-x-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {/* {links.map((link) => ( */}
            <motion.li
              // key={link.href}
              className="space-x-6"
              variants={{
                hidden: { y: -10, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
            >
              <Link
                to="/login"
                className={classNames(
                  "transition-colors bg-cyan-400 hover:bg-cyan-700 py-2 px-4 text-white font-semibold rounded-2xl hover"
                )}
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className={classNames(
                  "transition-colors hover:text-cyan-400 py-2 px-4 text-white font-semibold border hover:border-cyan-400 border-white rounded-2xl hover"
                )}
              >
                Log In
              </Link>
            </motion.li>
            {/* ))} */}
          </motion.ul>

          {/* Mobile menu toggle */}
          {open ? (
            <CgMenuMotion
              className="block text-3xl cursor-pointer md:hidden text-slate-300"
              onClick={() => setIsOpen(!open)}
            />
          ) : (
            <TiThMenu
              className="block text-3xl cursor-pointer md:hidden text-slate-300"
              onClick={() => setIsOpen(!open)}
            />
          )}
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-10 bg-black opacity-70"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            className="w-8/12 absolute z-20 h-screen bg-white text-black left-0 top-0 py-6"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {links.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={link.href}
                  className="flex w-full p-4 hover:bg-cyan-500 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
