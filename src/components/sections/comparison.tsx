import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const points = [
  { others: "Copy-paste projects", ours: "Custom-built systems" },
  { others: "Just code delivery", ours: "Real working solution" },
  { others: "No real understanding", ours: "Deep technical explanation" },
  { others: "No support after delivery", ours: "Dedicated support & guidance" },
  { others: "Fake demos", ours: "Real-time tested systems" },
  { others: "Only software", ours: "Hardware + Software integration" },
  { others: "No scalability", ours: "Startup-ready architecture" },
];

const Comparison: React.FC = () => {
  const [start, setStart] = useState(false);
  const [clash, setClash] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Trigger animation once
  useEffect(() => {
    const timer = setTimeout(() => setStart(true), 300);
    return () => clearTimeout(timer);
  }, []);

// start animation
useEffect(() => {
  const t = setTimeout(() => setStart(true), 200);
  return () => clearTimeout(t);
}, []);

// trigger clash
useEffect(() => {
  if (start) {
    const t = setTimeout(() => {
      setClash(true);
      audioRef.current?.play().catch(() => {});
    }, 700);
    return () => clearTimeout(t);
  }
}, [start]);

// show table
useEffect(() => {
  if (clash) {
    const t = setTimeout(() => setShowTable(true), 500);
    return () => clearTimeout(t);
  }
}, [clash]);

  return (
    <section id="comparison" className="py-24 bg-white px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-10">
          <div className="font-mono text-xs text-text-secondary mb-4 underline decoration-accent-emerald underline-offset-4">
            06 / Comparison
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl mb-6">
            Why We Homies Stand Out
          </h2>
          <p className="font-body text-xl text-text-secondary max-w-2xl">
              We don't just deliver code. We deliver systems that actually work.
          </p>
      </div>
      </div>

      {/* CLASH STAGE */}
{!showTable && (
  <div className="relative h-[160px] flex items-center justify-center overflow-hidden">

    {/* LEFT BLOCK */}
    <motion.div
      initial={{ x: "-200%" }}
      animate={start ? { x: clash ? "-15%" : "-60%" } : {}}
      transition={{ duration: clash ? 0.2 : 0.8, ease: "easeOut" }}
      className="absolute text-gray-400 font-semibold text-lg"
    >
      Others project makers 
    </motion.div>

    {/* RIGHT BLOCK */}
    <motion.div
      initial={{ x: "200%" }}
      animate={start ? { x: clash ? "15%" : "60%" } : {}}
      transition={{ duration: clash ? 0.2 : 0.8, ease: "easeOut" }}
      className="absolute text-black font-semibold text-lg"
    >
      Homies Labs
    </motion.div>

    {/* CENTER IMPACT */}
    {clash && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.6, 0.8] }}
        transition={{ duration: 0.4 }}
        className="absolute w-12 h-12 rounded-full bg-black/10"
      />
    )}

    {/* FLASH LINE */}
    {clash && (
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: [0, 1, 0], scaleY: [0, 1.5, 0] }}
        transition={{ duration: 0.3 }}
        className="absolute w-[2px] h-16 bg-black"
      />
    )}

    {/* VS POP */}
    <motion.div
      initial={{ scale: 0 }}
      animate={{
        scale: clash ? [1, 1.5, 1] : 0,
        opacity: clash ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      className="text-xl font-bold z-10"
    >
      VS
    </motion.div>

  </div>
)}

      {/* TABLE */}
      {showTable && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto border border-gray-200 rounded-xl shadow-sm px-5 py-4"
        >
          <div className="grid grid-cols-2 mb-4">

  <div className="text-gray-400 text-sm md:text-base font-semibold tracking-[0.12em] uppercase">
    Others project makers
  </div>

  <div className="text-black text-right text-sm md:text-base font-bold tracking-[0.12em] uppercase">
    Homies
  </div>

</div>

          <div className="divide-y divide-gray-100">
            {points.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-2 items-center py-3"
              >
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100">
                    <X size={12} />
                  </div>
                  <span className="text-sm">{item.others}</span>
                </div>

                <div className="flex items-center justify-end gap-2 text-black font-medium">
                  <span className="text-sm">{item.ours}</span>
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white">
                    <Check size={12} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* FOOTER */}
      <div className="text-center mt-10">
        <p className="text-xl md:text-2xl font-semibold mt-1 text-black">
          Anyone can deliver a project.
        </p>
        <p className="text-gray-500 text-lg md:text-xl mt-2">
          We deliver systems that actually work.
        </p>
      </div>
    </section>
  );
};

export default Comparison;