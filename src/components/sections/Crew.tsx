import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import CrewAvatar from '../ui/CrewAvatar';
import type { Transition } from "framer-motion";

// ================= DATA =================

const managers = [
  {
    id: 101,
    name: 'Project Lead',
    role: 'Manager',
    tagline: 'Driving execution',
    color: '#bbbbbb',
    skills: ['Planning','Leadership'],
    bio: 'Ensures project delivery and coordination.'
  },
  {
    id: 102,
    name: 'Operations Head',
    role: 'Manager',
    tagline: 'Optimizing workflows',
    color: '#999999',
    skills: ['Ops','Strategy'],
    bio: 'Manages team operations and growth.'
  }
];

const developers = [
  {
    id: 201,
    name: 'Frontend Dev',
    role: 'Developer',
    tagline: 'Crafting experiences',
    color: '#dddddd',
    skills: ['React','UI'],
    bio: 'Builds beautiful user interfaces.'
  },
  {
    id: 202,
    name: 'Backend Dev',
    role: 'Developer',
    tagline: 'Powering the backend',
    color: '#aaaaaa',
    skills: ['Node','API'],
    bio: 'Handles servers and logic.'
  },
  {
    id: 203,
    name: 'AI Engineer',
    role: 'Developer',
    tagline: 'Making systems intelligent',
    color: '#888888',
    skills: ['ML','CV'],
    bio: 'Builds AI models and pipelines.'
  },
  {
    id: 204,
    name: 'Iot Engineer',
    role: 'Developer',
    tagline: 'Making systems intelligent',
    color: '#888888',
    skills: ['ML','CV'],
    bio: 'Builds AI models and pipelines.'
  }  
];

// ================= AUDIO =================
const clickAudio = new Audio('/hover.mp3');
clickAudio.volume = 0.2;

// ================= ANIMATION =================
const spring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.6
};
// ================= COMPONENT =================

const Crew = () => {
  const [tab, setTab] = useState<'managers' | 'developers'>('developers');
  const [selected, setSelected] = useState<any>(null);
  const [index, setIndex] = useState(0);

  const data = tab === 'managers' ? managers : developers;

  const next = () => setIndex((prev) => (prev + 1) % data.length);
  const prev = () => setIndex((prev) => (prev - 1 + data.length) % data.length);

  const handleClick = (member: any) => {
    clickAudio.currentTime = 0;
    clickAudio.play().catch(() => {});
    setSelected(member);
  };

  const getVisibleCards = () => {
    const prevIndex = (index - 1 + data.length) % data.length;
    const nextIndex = (index + 1) % data.length;

    return [
      { ...data[prevIndex], position: 'left' },
      { ...data[index], position: 'center' },
      { ...data[nextIndex], position: 'right' }
    ];
  };

  const visibleCards = getVisibleCards();

  return (
    <section id="crew" className="bg-black text-white py-24 px-6 overflow-hidden">

      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-5xl font-bold mb-6">The Homies.</h2>

        {/* TABS */}
        <div className="flex justify-center gap-4 mb-12">
          {[
            { key: 'managers', label: 'Homie Managers' },
            { key: 'developers', label: 'Homie Developers' }
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setTab(t.key as any);
                setIndex(0);
              }}
              className={`px-6 py-2 rounded-full border ${
                tab === t.key
                  ? 'bg-white text-black'
                  : 'border-white/20 text-white/60'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* CAROUSEL */}
        <div className="relative flex items-center justify-center h-[420px]">

          {/* LEFT */}
          <button
            onClick={prev}
            className="absolute left-0 z-20 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-full backdrop-blur-md"
          >
            ←
          </button>

          {/* RIGHT */}
          <button
            onClick={next}
            className="absolute right-0 z-20 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-full backdrop-blur-md"
          >
            →
          </button>

          {/* CARDS */}
          <AnimatePresence mode="popLayout">
            {visibleCards.map((member) => {

              let styles: any = {};

              if (member.position === 'center') {
                styles = {
                  x: 0,
                  scale: 1.15,
                  opacity: 1,
                  zIndex: 3
                };
              } else if (member.position === 'left') {
                styles = {
                  x: -280,
                  scale: 0.8,
                  opacity: 0.4,
                  zIndex: 2
                };
              } else {
                styles = {
                  x: 280,
                  scale: 0.8,
                  opacity: 0.4,
                  zIndex: 2
                };
              }

              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={styles}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={spring}
                  drag={member.position === 'center' ? "x" : false}
                  dragElastic={0.25}
                  dragConstraints={{ left: 0, right: 0 }}
                  whileDrag={{ scale: 1.2 }}
                  onDragEnd={(_, info) => {
                    const threshold = 80;

                    if (info.offset.x < -threshold) next();
                    else if (info.offset.x > threshold) prev();
                  }}
                  className="absolute cursor-grab active:cursor-grabbing"
                  onClick={() => handleClick(member)}
                >
                  <div className="w-[300px] bg-[#111] p-8 rounded-2xl border border-white/10 shadow-xl">

                    {/* AVATAR */}
                    <div className="h-[200px] bg-black rounded-xl flex items-center justify-center mb-6">
                      <CrewAvatar color={member.color} isHovered />
                    </div>

                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-white/40 text-sm">{member.role}</p>

                    <p className="text-xs text-white/50 mt-2 italic">
                      {member.tagline}
                    </p>

                    <div className="flex gap-2 mt-4 flex-wrap justify-center">
                      {member.skills.map((s: string) => (
                        <span
                          key={s}
                          className="text-xs bg-white/5 px-3 py-1 rounded-full text-white/60"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

        </div>
      </div>

      {/* POPUP */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
              onClick={() => setSelected(null)}
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={spring}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              w-[340px] bg-[#111] rounded-2xl p-6 text-center"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3"
              >
                <X size={18} />
              </button>

              <CrewAvatar color={selected.color} isHovered />

              <h2 className="text-xl mt-4 font-semibold">{selected.name}</h2>
              <p className="text-white/50 text-sm">{selected.role}</p>

              <p className="mt-2 text-xs text-white/50 italic">
                {selected.tagline}
              </p>

              <p className="mt-3 text-white/70 text-sm">
                {selected.bio}
              </p>

              <div className="flex gap-2 mt-4 flex-wrap justify-center">
                {selected.skills.map((s: string) => (
                  <span key={s} className="px-2 py-1 bg-white/10 rounded-full text-xs">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Crew;