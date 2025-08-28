import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="w-full bg-[#003049] text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold tracking-wide"
        >
          Fintra
        </motion.h1>

        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-x-6 text-lg"
        >
          <a href="#home" className="hover:text-[#f77f00] transition-colors">
            Home
          </a>
          <a href="#features" className="hover:text-[#f77f00] transition-colors">
            Features
          </a>
          <a href="#about" className="hover:text-[#f77f00] transition-colors">
            About
          </a>
        </motion.nav>

   
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#f77f00] px-5 py-2 rounded-xl font-semibold text-white shadow-lg hover:bg-[#d65a00] transition-colors"
        >
        Manage Your Expenses
        </motion.button>
      </div>
    </header>
  );
}




