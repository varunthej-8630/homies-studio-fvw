import { motion } from 'framer-motion';
import { FileText, Presentation, ShieldCheck, HelpCircle, FileSearch } from 'lucide-react';

const docs = [
  {
    icon: <FileSearch className="w-10 h-10" />,
    title: 'IEEE STANDARD REPORT',
    description: '40-60 pages including Abstract, Literature Survey, Methodology, Results, and References.',
    count: '60+ Pages'
  },
  {
    icon: <Presentation className="w-10 h-10" />,
    title: 'PROFESSIONAL PPT',
    description: '25-35 high-end slides including Problem Statement, System Design, and Results Analysis.',
    count: '35 Slides'
  },
  {
    icon: <ShieldCheck className="w-10 h-10" />,
    title: 'PLAGIARISM REPORT',
    description: 'Guaranteed <15% similarity. Clean, original research for top marks.',
    count: '<15% Similarity'
  },
  {
    icon: <HelpCircle className="w-10 h-10" />,
    title: 'VIVA GUIDE',
    description: '10 most critical questions + answers to help you ace your defense.',
    count: 'Quick Prep'
  }
];

const Documentation = () => {
  return (
    <section id="docs" className="relative py-24 md:py-32 px-6 md:px-12 bg-[var(--bg)] text-[var(--text)] transition-colors duration-500 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-3xl">
             <p className="font-mono text-[9px] md:text-xs text-[var(--text-faint)] uppercase tracking-[0.4em] mb-4">// SERVICES</p>
             <h2 className="text-[clamp(32px,6vw,80px)] font-display font-black leading-[0.85] tracking-tight uppercase">
                A+ DOCUMENTATION <br />THAT GETS TOP MARKS.
             </h2>
          </div>
          <div className="text-right">
             <p className="text-lg md:text-2xl font-light text-[var(--text-muted)] max-w-sm ml-auto">
               90% of marks come from documentation - We handle it all.
             </p>
          </div>
        </div>

        {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {docs.map((doc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-[var(--card)] p-12 rounded-[2.5rem] md:rounded-[3rem] border border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--card-hover)] transition-all duration-500"
              >
                <div className="mb-10 text-[var(--text)] group-hover:text-[#f5a623] transition-all duration-500 flex justify-between items-start">
                   {doc.icon}
                   <span className="font-mono text-[10px] tracking-widest text-[var(--text-faint)] group-hover:text-[var(--text-muted)] transition-colors uppercase">{doc.count}</span>
                </div>
                <h3 className="text-xl font-display font-black mb-4 uppercase tracking-tight">{doc.title}</h3>
                <p className="text-[var(--text-muted)] group-hover:text-[var(--text)] leading-relaxed font-light transition-colors">
                  {doc.description}
                </p>
              </motion.div>
            ))}
          </div>

        {/* FOOTER CTA */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="mt-16 p-8 md:p-12 bg-[var(--card)] border border-[var(--border)] rounded-[3rem] md:rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-8"
        >
           <div className="flex items-center gap-6">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#f5a623] rounded-full flex items-center justify-center text-black">
                 <FileText size={32} />
              </div>
              <div>
                 <h4 className="text-xl md:text-2xl font-display font-black uppercase leading-tight">Conference Ready Abstract</h4>
                 <p className="text-[var(--text-faint)] font-mono text-[9px] md:text-xs tracking-widest uppercase">FREE WITH ALL PROJECTS — 250 WORDS GUARANTEED</p>
              </div>
           </div>
           <button 
             onClick={() => window.open(`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=Hi%20Homies%2C%20I%20want%20to%20get%20professional%20documentation%20for%20my%20project`, '_blank', 'noopener,noreferrer')}
             className="w-full sm:w-auto px-10 py-5 bg-[var(--text)] text-[var(--bg)] font-black rounded-full hover:opacity-90 transition-all uppercase text-xs tracking-widest"
           >
             START YOUR DOCUMENTATION
           </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Documentation;
