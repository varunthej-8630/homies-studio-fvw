import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedRole: string;
}

const RecruitmentModal: React.FC<Props> = ({ isOpen, onClose, selectedRole }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: selectedRole,
    location: '',
    experience: '',
    portfolio: '',
    about: '',
    availability: '',
    rate: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync role if updated via prop
  React.useEffect(() => {
    setForm(f => ({ ...f, role: selectedRole }));
  }, [selectedRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: import.meta.env.VITE_RECRUITMENT_TARGET_EMAIL,
          applicant_name: form.name,
          applicant_email: form.email,
          applicant_phone: form.phone,
          applying_role: form.role,
          location: form.location,
          experience: form.experience,
          portfolio: form.portfolio,
          about_yourself: form.about,
          availability: form.availability,
          compensation: form.rate,
          cv_note: 'CV attached separately via upload',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
      setTimeout(() => {
        const waMsg = `Hi Homies! I just applied as a ${form.role}. Portfolio: ${form.portfolio}`;
        window.open(`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`, '_blank');
      }, 1500);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Try WhatsApp instead.');
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-[var(--bg)]/90 backdrop-blur-md flex items-start justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="w-full max-w-2xl bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 md:p-12 relative my-8 shadow-2xl transition-colors duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[var(--text)]/10 text-[var(--text-faint)] hover:bg-[var(--text)]/20 hover:text-[var(--text)] flex items-center justify-center text-xs transition-all duration-300"
            >
              <X size={14} />
            </button>

            {submitted ? (
              <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                <div className="text-6xl mb-6">🤝</div>
                <h3 className="text-3xl font-black text-[var(--text)] mb-3 tracking-tighter">Application Received.</h3>
                <p className="text-[var(--text-faint)] text-sm max-w-xs mx-auto leading-relaxed">
                  We'll review your profile and hit you up within 48 hours. Stay obsessed.
                </p>
                <button
                  onClick={onClose}
                  className="mt-10 text-[10px] tracking-[0.2em] uppercase text-[var(--text-faint)] hover:text-[var(--text)] transition-colors"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <>
                <div className="mb-10">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-faint)] mb-2 font-mono italic">// JOIN THE HOMIES</p>
                  <h2 className="text-3xl font-black text-[var(--text)] mb-1 uppercase tracking-tighter transition-colors">You want in?</h2>
                  <p className="text-sm text-[var(--text-muted)] border-l-2 border-amber-500 pl-4 mt-4 transition-colors">
                    Applying as: <span className="text-[var(--text)] font-semibold ml-1">{form.role}</span>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <div className="border-b border-[var(--border)] focus-within:border-[var(--text)]/40 hover:border-[var(--border-hover)] transition-colors mb-7">
                      <input
                        required
                        placeholder="FULL NAME *"
                        className="w-full bg-transparent text-[var(--text)] text-sm placeholder-[var(--text-faint)] outline-none py-2 font-bold uppercase tracking-tight"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div className="border-b border-[var(--border)] focus-within:border-[var(--text)]/40 hover:border-[var(--border-hover)] transition-colors mb-7">
                      <input
                        required
                        type="email"
                        placeholder="EMAIL ADDRESS *"
                        className="w-full bg-transparent text-[var(--text)] text-sm placeholder-[var(--text-faint)] outline-none py-2 font-bold uppercase tracking-tight"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <div className="border-b border-[var(--border)] focus-within:border-[var(--text)]/40 hover:border-[var(--border-hover)] transition-colors mb-7">
                      <input
                        required
                        placeholder="WHATSAPP NUMBER *"
                        className="w-full bg-transparent text-[var(--text)] text-sm placeholder-[var(--text-faint)] outline-none py-2 font-bold uppercase tracking-tight"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                    <div className="border-b border-[var(--border)] focus-within:border-[var(--text)]/40 hover:border-[var(--border-hover)] transition-colors mb-7">
                      <select
                        required
                        className="w-full bg-transparent text-[var(--text)] text-sm placeholder-[var(--text-faint)] outline-none py-2 font-bold uppercase tracking-tight appearance-none cursor-pointer"
                        value={form.role}
                        onChange={e => setForm({ ...form, role: e.target.value })}
                      >
                        <option value="EMBEDDED SYSTEMS ENGINEER" className="bg-[var(--surface)]">EMBEDDED SYSTEMS ENGINEER</option>
                        <option value="ROBOTICS & MOTION ENGINEER" className="bg-[var(--surface)]">ROBOTICS & MOTION ENGINEER</option>
                        <option value="IoT & CONNECTIVITY SPECIALIST" className="bg-[var(--surface)]">IoT & CONNECTIVITY SPECIALIST</option>
                        <option value="HARDWARE & FPGA ENGINEER" className="bg-[var(--surface)]">HARDWARE & FPGA ENGINEER</option>
                        <option value="AI/ML & VISION ENGINEER" className="bg-[var(--surface)]">AI/ML & VISION ENGINEER</option>
                        <option value="FULL STACK WEB DEVELOPER" className="bg-[var(--surface)]">FULL STACK WEB DEVELOPER</option>
                        <option value="PCB & CIRCUIT DESIGNER" className="bg-[var(--surface)]">PCB & CIRCUIT DESIGNER</option>
                        <option value="SIMULATION & CONTROL ENGINEER" className="bg-[var(--surface)]">SIMULATION & CONTROL ENGINEER</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <div className="border-b border-[var(--border)] focus-within:border-[var(--text)]/40 hover:border-[var(--border-hover)] transition-colors mb-7">
                      <input
                        required
                        placeholder="CITY / LOCATION *"
                        className="w-full bg-transparent text-[var(--text)] text-sm placeholder-[var(--text-faint)] outline-none py-2 font-bold uppercase tracking-tight"
                        value={form.location}
                        onChange={e => setForm({ ...form, location: e.target.value })}
                      />
                    </div>
                    <div className="border-b border-[var(--border)] focus-within:border-[var(--text)]/40 hover:border-[var(--border-hover)] transition-colors mb-7">
                      <select
                        required
                        className="w-full bg-transparent text-[var(--text)] text-sm appearance-none cursor-pointer placeholder-[var(--text-faint)] outline-none py-2 font-bold uppercase tracking-tight"
                        value={form.experience}
                        onChange={e => setForm({ ...form, experience: e.target.value })}
                      >
                        <option value="" disabled className="bg-[var(--surface)]">EXPERIENCE LEVEL *</option>
                        <option value="Student" className="bg-[var(--surface)]">STUDENT</option>
                        <option value="<1 Year" className="bg-[var(--surface)]">&lt; 1 YEAR</option>
                        <option value="1–3 Years" className="bg-[var(--surface)]">1–3 YEARS</option>
                        <option value="3–5 Years" className="bg-[var(--surface)]">3–5 YEARS</option>
                        <option value="5+ Years" className="bg-[var(--surface)]">5+ YEARS</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-b border-[var(--border)] focus-within:border-[var(--text)]/40 hover:border-[var(--border-hover)] transition-colors mb-7">
                    <input
                      type="url"
                      placeholder="PORTFOLIO / GITHUB / LINKEDIN URL"
                      className="w-full bg-transparent text-[var(--text)] text-sm placeholder-[var(--text-faint)] outline-none py-2 font-bold uppercase tracking-tight"
                      value={form.portfolio}
                      onChange={e => setForm({ ...form, portfolio: e.target.value })}
                    />
                  </div>

                  <div className="border-b border-[var(--border)] focus-within:border-[var(--text)]/40 hover:border-[var(--border-hover)] transition-colors mb-7">
                    <textarea
                      required
                      placeholder="TELL US ABOUT YOURSELF... WHAT HAVE YOU BUILT? *"
                      rows={4}
                      className="w-full bg-transparent text-[var(--text)] text-sm placeholder-[var(--text-faint)] outline-none py-2 font-bold uppercase tracking-tight resize-none"
                      value={form.about}
                      onChange={e => setForm({ ...form, about: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <div className="border-b border-[var(--border)] focus-within:border-[var(--text)]/40 hover:border-[var(--border-hover)] transition-colors mb-7">
                      <select
                        required
                        className="w-full bg-transparent text-[var(--text)] text-sm appearance-none cursor-pointer outline-none py-2 font-bold uppercase tracking-tight"
                        value={form.availability}
                        onChange={e => setForm({ ...form, availability: e.target.value })}
                      >
                        <option value="" disabled className="bg-[var(--surface)]">AVAILABILITY *</option>
                        <option value="Full-time" className="bg-[var(--surface)]">Full-time</option>
                        <option value="Part-time" className="bg-[var(--surface)]">Part-time</option>
                        <option value="Project-based" className="bg-[var(--surface)]">Project-based</option>
                        <option value="Internship" className="bg-[var(--surface)]">Internship</option>
                      </select>
                    </div>
                    <div className="border-b border-[var(--border)] focus-within:border-[var(--text)]/40 hover:border-[var(--border-hover)] transition-colors mb-7">
                      <select
                        required
                        className="w-full bg-transparent text-[var(--text)] text-sm appearance-none cursor-pointer outline-none py-2 font-bold uppercase tracking-tight"
                        value={form.rate}
                        onChange={e => setForm({ ...form, rate: e.target.value })}
                      >
                        <option value="" disabled className="bg-[var(--surface)]">EXPECTED COMPENSATION *</option>
                        <option value="Unpaid Internship" className="bg-[var(--surface)]">Unpaid Internship</option>
                        <option value="₹5k–15k/mo" className="bg-[var(--surface)]">₹5k–15k/mo</option>
                        <option value="₹15k–30k/mo" className="bg-[var(--surface)]">₹15k–30k/mo</option>
                        <option value="₹30k–50k/mo" className="bg-[var(--surface)]">₹30k–50k/mo</option>
                        <option value="₹50k+/mo" className="bg-[var(--surface)]">₹50k+/mo</option>
                        <option value="Per Project" className="bg-[var(--surface)]">Per Project</option>
                      </select>
                    </div>
                  </div>

                  <div className="border border-dashed border-[var(--border)] rounded-xl p-6 text-center hover:border-[var(--text)]/30 transition-colors cursor-pointer text-[var(--text-faint)] text-[10px] tracking-wider uppercase relative mb-4">
                    <input type="file" accept=".pdf,.doc,.docx" className="absolute inset-0 opacity-0 cursor-pointer" />
                    <Upload size={18} className="mx-auto mb-2 opacity-30" />
                    DROP YOUR CV HERE (PDF, max 5MB)
                  </div>

                  {error && <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest text-center my-4">{error}</p>}

                  <button
                    disabled={loading}
                    type="submit"
                    className={`w-full mt-6 py-4 bg-[var(--text)] text-[var(--bg)] text-[10px] font-black tracking-[0.25em] uppercase rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 group ${loading ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    {loading ? 'SENDING...' : 'SUBMIT APPLICATION'} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-center text-[9px] text-[var(--text-faint)] mt-4 tracking-wider uppercase">
                    We read every application personally. expect a reply within 48 hours.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { RecruitmentModal };
export default RecruitmentModal;
