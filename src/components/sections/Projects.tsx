import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Search } from 'lucide-react';
import type { Project } from '../../data/projects';
import { projects, categories } from '../../data/projects';

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ y: -5 }}
    onClick={onClick}
    className="relative rounded-2xl overflow-hidden border border-[var(--border)] hover:border-[var(--border-hover)] bg-[var(--card)] hover:bg-[var(--card-hover)] transition-all duration-300 group cursor-pointer"
  >
    {/* Subtle noise texture */}
    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.025]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`
      }} 
    />

    <div className="p-6 relative z-10">
      <div className="flex justify-between items-start mb-6">
        <div className="text-[9px] font-medium tracking-[0.15em] uppercase px-2.5 py-1 rounded-full w-fit bg-[var(--border)] text-[var(--text-muted)] border border-[var(--border)] transition-colors">
          {project.category}
        </div>
        {project.hsCode && (
          <div className="text-[9px] tracking-widest font-mono text-[var(--text-faint)]">
            {project.hsCode}
          </div>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-base font-bold text-[#f5a623] leading-snug group-hover:text-white transition-colors duration-300">
          {project.title}
        </h3>
        {/* VIEW DETAILS REVEAL */}
        <div className="flex items-center gap-1.5 mt-1 text-[10px] tracking-[0.18em] uppercase font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-all opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 duration-250">
          VIEW DETAILS <span className="text-xs">›</span>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-[var(--border)]">
        {project.problem && (
          <div>
            <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--text-faint)] mb-1 block font-mono">THE CHALLENGE</span>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">{project.problem}</p>
          </div>
        )}
        {project.result && (
          <div>
            <span className="text-[9px] tracking-[0.2em] uppercase text-[#4ade80] mb-1 block font-mono">THE IMPACT</span>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">{project.result}</p>
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<string | 'All'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // CUSTOM EVENT LISTENER FOR HERO INTEGRATION
  useEffect(() => {
    const handleSetFilter = (e: any) => {
      if (e.detail) setActiveCategory(e.detail);
    };
    window.addEventListener('set-project-filter', handleSetFilter);
    return () => window.removeEventListener('set-project-filter', handleSetFilter);
  }, []);

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="work" className="py-24 px-6 md:px-12 bg-[var(--bg)] text-[var(--text)] transition-colors duration-500 overflow-hidden">
      <div className="max-w-[1440px] mx-auto relative">
        
        {/* FLOATING DECOR */}
        <div className="hidden md:block absolute -top-10 -left-10 text-[100px] pointer-events-none select-none z-0 opacity-[0.13]" style={{ color: 'var(--floating-icon)' }}>{`<>`}</div>
        <div className="hidden md:block absolute top-1/2 -right-16 text-[120px] pointer-events-none select-none z-0 opacity-[0.13]" style={{ color: 'var(--floating-icon)' }}>⚡</div>
        <div className="hidden md:block absolute -bottom-20 left-1/3 text-[140px] pointer-events-none select-none z-0 opacity-[0.13]" style={{ color: 'var(--floating-icon)' }}>⚙</div>

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 relative z-10">
          <div className="max-w-2xl">
            <p className="font-mono text-[clamp(10px,1vw,12px)] text-[#f5a623] uppercase tracking-[0.3em] mb-4">// PORTFOLIO</p>
            <h2 className="text-[clamp(42px,6vw,86px)] font-display font-black leading-[0.9] tracking-tight uppercase">
              333+ SYSTEMS <br />ENGINEERED.
            </h2>
          </div>
          <div className="relative group w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-faint)]" size={18} />
            <input 
              type="text" 
              placeholder="SEARCH PROJECTS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--card)] border border-[var(--border)] p-4 pl-12 rounded-2xl outline-none focus:border-[var(--text)] transition-all text-xs font-bold uppercase tracking-widest text-[var(--text)]"
            />
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-2 mb-16 relative z-10">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[var(--text)] text-[var(--bg)]'
                  : 'bg-[var(--card)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--border-hover)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        <motion.div
           layout
           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => setSelectedProject(project)} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-40 text-center relative z-10">
            <h3 className="text-4xl font-display font-black text-[var(--text-faint)] mb-4 uppercase">NO SYSTEMS FOUND</h3>
            <p className="text-[var(--text-muted)] font-mono tracking-widest text-sm uppercase italic">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[2000] px-6 py-10 flex items-center justify-center"
          >
             <motion.div
              initial={{ scale: 0.95, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-[var(--surface)] rounded-[3rem] p-10 md:p-16 relative overflow-y-auto max-h-[85vh] border border-[var(--border)] shadow-2xl transition-colors duration-500"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-[var(--text)] text-[var(--bg)] flex items-center justify-center hover:scale-110 active:scale-95 transition"
              >
                <X size={24} />
              </button>

              <div className="mb-12">
                 <p className="font-mono text-[#f5a623] uppercase tracking-widest mb-4 text-xs">
                   {selectedProject.hsCode} / {selectedProject.category}
                 </p>
                 <h2 className="text-[clamp(24px,5vw,56px)] font-display font-black text-[var(--text)] leading-tight mb-8 uppercase tracking-tighter">
                   {selectedProject.title}
                 </h2>
                 <p className="text-[var(--text-muted)] text-lg md:text-xl font-light leading-relaxed">
                   {selectedProject.description}
                 </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 border-t border-[var(--border)] pt-12">
                 <div>
                   <span className="font-bold block text-[10px] uppercase tracking-widest text-[var(--text-faint)] mb-4 italic">The Challenge</span>
                   <p className="text-[var(--text)] text-base leading-relaxed opacity-80">{selectedProject.problem}</p>
                 </div>
                 <div>
                   <span className="font-bold block text-[10px] uppercase tracking-widest text-[#4ade80] mb-4 italic">The Breakthrough</span>
                   <p className="text-[var(--text)] text-base leading-relaxed opacity-80">{selectedProject.result}</p>
                 </div>
              </div>

              <button
                  onClick={() => {
                    const sanitizedNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '917416636417').replace(/\D/g, '');
                    window.location.href = `https://wa.me/${sanitizedNumber}?text=Hi%20Homies!%20🚀%0AName:%20Guest%0AProject:%20${encodeURIComponent(selectedProject.title)}`;
                  }}
                 className="mt-16 w-full py-6 bg-[var(--text)] text-[var(--bg)] font-black text-xs tracking-widest rounded-2xl flex items-center justify-center gap-4 hover:bg-[#f5a623] hover:text-black transition-all uppercase group"
              >
                 GET QUOTE FOR THIS SYSTEM <ExternalLink size={18} className="group-hover:rotate-45 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;