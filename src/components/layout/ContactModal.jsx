import { motion, AnimatePresence } from 'framer-motion';

const ContactModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 80 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 80 }}
            transition={{ duration: 0.3 }}
            className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-8 shadow-2xl"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Start Your Project</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-black">✕</button>
            </div>

            {/* FORM */}
            <form className="flex flex-col gap-4">

              <input
                type="text"
                placeholder="Your Name"
                className="border p-3 rounded-xl outline-none focus:border-black"
              />

              <input
                type="email"
                placeholder="Email"
                className="border p-3 rounded-xl outline-none focus:border-black"
              />

              <textarea
                placeholder="Project Details"
                rows={3}
                className="border p-3 rounded-xl outline-none focus:border-black"
              />

              <input
                type="text"
                placeholder="Timeline (e.g. 2 weeks / 1 month)"
                className="border p-3 rounded-xl outline-none focus:border-black"
              />

              <input
                type="text"
                placeholder="Budget (₹ / $)"
                className="border p-3 rounded-xl outline-none focus:border-black"
              />

              <input
                type="text"
                placeholder="Your Location"
                className="border p-3 rounded-xl outline-none focus:border-black"
              />

              <button
                type="submit"
                className="mt-4 bg-black text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                Submit Request →
              </button>

            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;