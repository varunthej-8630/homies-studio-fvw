import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import CrewAvatar from '../ui/CrewAvatar';

// ================= DATA =================

const coreTeam = [
  {
    id: 1,
    name: 'Varun Thej',
    role: 'Lead Engineer',
    tagline: 'Building intelligent systems',
    color: '#ffffff',
    skills: ['IoT','System','C++'],
    bio: 'Leads system architecture and embedded innovation.'
  },
  {
    id: 2,
    name: 'Sanidhyand',
    role: 'Full Stack',
    tagline: 'Turning ideas into products',
    color: '#cccccc',
    skills: ['React','Node'],
    bio: 'Builds scalable web platforms.'
  },
  {
    id: 3,
    name: 'Teja Reddy',
    role: 'Robotics',
    tagline: 'Engineering smart machines',
    color: '#aaaaaa',
    skills: ['ROS','YOLO'],
    bio: 'Develops robotics intelligence systems.'
  }
];

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
  }
];

// ================= AUDIO =================
const clickAudio = new Audio('/hover.mp3');
clickAudio.volume = 0.2;

// ================= COMPONENT =================

const Crew = () => {
  const [tab, setTab] = useState<'core' | 'managers' | 'developers'>('core');
  const [selected, setSelected] = useState<any>(null);
  const [index, setIndex] = useState(0);

  const data =
    tab === 'core'
      ? coreTeam
      : tab === 'managers'
      ? managers
      : developers;

  const next = () => setIndex((prev) => (prev + 1) % data.length);
  const prev = () => setIndex((prev) => (prev - 1 + data.length) % data.length);

  const handleClick = (member: any) => {
    clickAudio.currentTime = 0;
    clickAudio.play().catch(() => {});
    setSelected(member);
  };

  return (
    <section className="bg-black text-white py-28 px-6 overflow-hidden">

      <div className="max-w-6xl mx-auto text-center">

        {/* TITLE */}
        <h2 className="text-5xl font-semibold tracking-tight mb-8">
          The Homies.
        </h2>

        {/* TABS */}
        <div className="flex justify-center gap-3 mb-16 flex-wrap">
          {[
            { key: 'core', label: 'Core Team' },
            { key: 'managers', label: 'Homie Managers' },
            { key: 'developers', label: 'Homie Developers' }
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setTab(t.key as any);
                setIndex(0);
              }}
              className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                tab === t.key
                  ? 'bg-white text-black shadow-lg'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
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
            className="absolute left-4 z-20 bg-white/5 hover:bg-white/10 px-4 py-3 rounded-full backdrop-blur-xl border border-white/10 transition"
          >
            ←
          </button>

          {/* RIGHT */}
          <button
            onClick={next}
            className="absolute right-4 z-20 bg-white/5 hover:bg-white/10 px-4 py-3 rounded-full backdrop-blur-xl border border-white/10 transition"
          >
            →
          </button>

          {/* CARDS */}
          <div className="relative w-full flex items-center justify-center">

            {data.map((member, i) => {
              const position = i - index;

              return (
                <motion.div
                  key={member.id}
                  onClick={() => handleClick(member)}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 100) prev();
                    else if (info.offset.x < -100) next();
                  }}
                  animate={{
                    x: position * (window.innerWidth < 640 ? 180 : 260),
                    scale: position === 0 ? (window.innerWidth < 640 ? 1 : 1.1) : 0.85,
                    opacity: position === 0 ? 1 : 0.25,
                    zIndex: 10 - Math.abs(position),
                    filter: position === 0 ? 'blur(0px)' : 'blur(4px)'
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 18
                  }}
                  className="absolute cursor-pointer"
                >
                  <div className="w-[240px] bg-gradient-to-b from-white/[0.08] to-white/[0.02] 
                  backdrop-blur-xl p-5 rounded-3xl border border-white/10 
                  shadow-[0_10px_40px_rgba(0,0,0,0.6)]">

                    {/* AVATAR */}
                    <div className="aspect-[4/5] bg-black/80 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <CrewAvatar color={member.color} isHovered={position === 0} isActive={Math.abs(position) <= 1} />
                    </div>

                    {/* NAME */}
                    <h3 className="text-base font-semibold tracking-wide">
                      {member.name}
                    </h3>

                    <p className="text-white/40 text-xs">
                      {member.role}
                    </p>

                    {/* TAGLINE */}
                    <p className="text-[11px] text-white/40 mt-2 italic">
                      {member.tagline}
                    </p>

                    {/* SKILLS */}
                    <div className="flex gap-1.5 mt-3 flex-wrap justify-center">
                      {member.skills.map((s: string) => (
                        <span
                          key={s}
                          className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-white/50"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                  </div>
                </motion.div>
              );
            })}

          </div>
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
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              w-[320px] bg-[#111] rounded-2xl p-6 text-center border border-white/10"
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
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Crew;