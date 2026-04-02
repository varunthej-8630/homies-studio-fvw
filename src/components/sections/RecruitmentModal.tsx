import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  X, User, Mail, Phone, MapPin, 
  Briefcase, GraduationCap, Brain, 
  Globe, Check, Upload, MessageSquare, 
  Calendar, Settings, Zap
} from 'lucide-react';

// INITIALIZE EMAILJS
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedRole?: string;
}

const interestAreas = [
  'AI/ML', 'Web Development', 'App Development', 
  'IoT / Embedded', 'Robotics', 'Design / UI/UX', 
  'Marketing / Social Media', 'Business / Operations'
];

const RecruitmentModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    status: '', // Student/Freelancer/Professional
    organization: '',
    year: '',
    interests: [] as string[],
    skills: '',
    tools: '',
    hasProjects: 'No',
    projectDetails: '',
    portfolio: '',
    resumeLink: '',
    motivation: '',
    whatMakesDifferent: '',
    availability: '',
  });

  const [resume, setResume] = useState<File | null>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleInterest = (interest: string) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name) newErrors.name = 'Protocol name required';
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Secure email required';
    if (!form.phone) newErrors.phone = 'Uplink frequency required';
    if (!form.resumeLink && !form.portfolio) newErrors.resumeLink = 'Resume protocol/link required';
    if (form.interests.length === 0) newErrors.interests = 'Select at least one sector';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const msg = `Hello Homies Studio Team,\nMy name is ${form.name}.\n\nI want to Join the Homies!\n\nBackground: ${form.status} at ${form.organization} ${form.year ? `(Year ${form.year})` : ''}\nInterests: ${form.interests.join(', ')}\nMotivation: ${form.motivation}\nAvailability: ${form.availability}\n${resume ? `Resume Ready: ${resume.name} (I'll attach it manually below)` : ''}\n\nThank you.`;

      // EMAIL JS SEND
      const emailPromise = emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          location: form.location || 'Not Specified',
          interest: form.interests.join(', '),
          experience: `${form.status} at ${form.organization} ${form.year ? ` - Year ${form.year}` : ''}`,
          skills: `${form.skills}\nTools: ${form.tools}`,
          projects: form.hasProjects === 'Yes' ? form.projectDetails : 'None',
          motivation: form.motivation,
          resume: form.resumeLink || form.portfolio || 'No Link Provided',
          to_email: 'info.homiesstudio@gmail.com'
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // Timeout after 8 seconds
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), 8000));
      
      try {
        await Promise.race([emailPromise, timeoutPromise]);
      } catch (e: any) {
        console.warn("Mail delayed or failed, proceeding to WhatsApp", e);
        setSubmitError("Email protocol slow. Proceeding to WhatsApp...");
      }

      // REDIRECT TO WHATSAPP AS WELL FOR FAST COMMS
      const waUrl = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      setShowSuccess(true);
    } catch (err) {
      console.error("Critical submission error:", err);
      setSubmitError("Submission failed. Please use WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setShowSuccess(false);
      setErrors({});
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="w-full max-w-2xl bg-[#080808] border border-white/10 sm:rounded-[2.5rem] rounded-none p-6 sm:p-12 relative shadow-[0_0_50px_rgba(255,255,255,0.05)] overflow-y-auto h-full sm:h-auto sm:max-h-[90vh] custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              onClick={onClose}
              className="absolute top-8 right-8 w-10 h-10 rounded-full border border-white/10 text-white/30 hover:text-white hover:border-white/40 flex items-center justify-center transition-all bg-white/5 z-10"
            >
              <X size={18} />
            </button>

            {showSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 text-white"
              >
                <div className="w-20 h-20 bg-white/10 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  <Check size={40} strokeWidth={3} />
                </div>
                <h2 className="text-4xl font-black mb-4 tracking-tighter uppercase">MISSION ACCEPTED</h2>
                <p className="text-white/40 text-[10px] sm:text-xs max-w-sm mx-auto leading-relaxed uppercase tracking-[0.2em] font-medium font-mono">
                  Application received. <br/>We will review and contact you soon.
                </p>
                <button
                  onClick={onClose}
                  className="mt-12 px-12 py-5 bg-white text-black font-black text-[10px] tracking-[0.4em] uppercase rounded-full hover:scale-105 transition-all shadow-xl"
                >
                  Return to Home Base
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                <div>
                  <p className="text-[10px] tracking-[0.5em] uppercase text-white/20 mb-3 font-mono">// JOIN THE HOMIES</p>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-6">Enlist Now.</h2>
                  <p className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em] leading-relaxed max-w-md">
                    "We don’t hire for roles. We build people. If you are passionate, you belong here."
                  </p>
                </div>

                {/* PERSONAL INFO */}
                <div className="space-y-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 flex items-center gap-4">
                    <span className="w-8 h-px bg-white/20"></span> 01 / Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="group relative flex items-center bg-white/5 border border-white/10 rounded-2xl focus-within:border-white/30 transition-all px-6">
                      <User size={14} className="text-white/20 group-focus-within:text-white transition-colors" />
                      <input
                        required
                        placeholder="FULL NAME *"
                        className={`w-full bg-transparent py-4 pl-4 outline-none text-xs font-bold uppercase tracking-wider text-white placeholder-white/20 transition-all ${errors.name ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/10 focus-within:border-white/30'}`}
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                      />
                      {errors.name && <p className="absolute -bottom-5 left-1 text-[7px] text-red-500 uppercase font-black tracking-widest">{errors.name}</p>}
                    </div>
                    <div className="group relative flex items-center bg-white/5 border border-white/10 rounded-2xl focus-within:border-white/30 transition-all px-6">
                      <Mail size={14} className="text-white/20 group-focus-within:text-white transition-colors" />
                      <input
                        required
                        type="email"
                        placeholder="EMAIL ADDRESS *"
                        className={`w-full bg-transparent py-4 pl-4 outline-none text-xs font-bold uppercase tracking-wider text-white placeholder-white/20 transition-all ${errors.email ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/10 focus-within:border-white/30'}`}
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                      />
                      {errors.email && <p className="absolute -bottom-5 left-1 text-[7px] text-red-500 uppercase font-black tracking-widest">{errors.email}</p>}
                    </div>
                    <div className="group relative flex items-center bg-white/5 border border-white/10 rounded-2xl focus-within:border-white/30 transition-all px-6">
                      <Phone size={14} className="text-white/20 group-focus-within:text-white transition-colors" />
                      <input
                        required
                        placeholder="PHONE NUMBER *"
                        className="w-full bg-transparent py-4 pl-4 outline-none text-xs font-bold uppercase tracking-wider text-white placeholder-white/20"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                    <div className="group relative flex items-center bg-white/5 border border-white/10 rounded-2xl focus-within:border-white/30 transition-all px-6">
                      <MapPin size={14} className="text-white/20 group-focus-within:text-white transition-colors" />
                      <input
                        placeholder="LOCATION (OPTIONAL)"
                        className="w-full bg-transparent py-4 pl-4 outline-none text-xs font-bold uppercase tracking-wider text-white placeholder-white/20"
                        value={form.location}
                        onChange={e => setForm({ ...form, location: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* BACKGROUND */}
                <div className="space-y-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 flex items-center gap-4">
                    <span className="w-8 h-px bg-white/20"></span> 02 / Background
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="group relative flex items-center bg-white/5 border border-white/10 rounded-2xl focus-within:border-white/30 transition-all px-6">
                      <Briefcase size={14} className="text-white/20" />
                      <select
                        required
                        className="w-full bg-transparent py-4 pl-4 outline-none text-xs font-bold uppercase tracking-wider text-white appearance-none cursor-pointer"
                        value={form.status}
                        onChange={e => setForm({ ...form, status: e.target.value })}
                      >
                        <option value="" className="bg-[#080808]">STATUS *</option>
                        <option value="Student" className="bg-[#080808]">Student</option>
                        <option value="Freelancer" className="bg-[#080808]">Freelancer</option>
                        <option value="Professional" className="bg-[#080808]">Professional</option>
                      </select>
                    </div>
                    <div className="group relative flex items-center bg-white/5 border border-white/10 rounded-2xl focus-within:border-white/30 transition-all px-6">
                      <GraduationCap size={14} className="text-white/20 group-focus-within:text-white transition-colors" />
                      <input
                        placeholder="COLLEGE / COMPANY"
                        className="w-full bg-transparent py-4 pl-4 outline-none text-xs font-bold uppercase tracking-wider text-white placeholder-white/20"
                        value={form.organization}
                        onChange={e => setForm({ ...form, organization: e.target.value })}
                      />
                    </div>
                    {form.status === 'Student' && (
                      <div className="group relative flex items-center bg-white/5 border border-white/10 rounded-2xl focus-within:border-white/30 transition-all px-6 md:col-span-2">
                        <Calendar size={14} className="text-white/20" />
                        <input
                          placeholder="YEAR OF STUDY"
                          className="w-full bg-transparent py-4 pl-4 outline-none text-xs font-bold uppercase tracking-wider text-white placeholder-white/20"
                          value={form.year}
                          onChange={e => setForm({ ...form, year: e.target.value })}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* SKILLS & INTERESTS */}
                <div className="space-y-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 flex items-center gap-4">
                    <span className="w-8 h-px bg-white/20"></span> 03 / Skills & Interests
                  </h3>
                  <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Area of Interest (Multi-select) *</label>
                    <div className="flex flex-wrap gap-2">
                       {interestAreas.map(interest => (
                         <button
                           key={interest}
                           type="button"
                           onClick={() => toggleInterest(interest)}
                           className={`px-4 py-2 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${form.interests.includes(interest) ? 'bg-white border-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30'}`}
                         >
                           {interest}
                         </button>
                       ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="group relative flex flex-col bg-white/5 border border-white/10 rounded-2xl focus-within:border-white/30 transition-all p-6">
                      <div className="flex items-center gap-3 mb-2 text-white/20 group-focus-within:text-white transition-colors">
                        <Brain size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Core Skills *</span>
                      </div>
                      <textarea
                        placeholder="DESCRIBE YOUR POWER LEVEL..."
                        className="w-full bg-transparent outline-none text-xs font-bold uppercase tracking-wider text-white placeholder-white/10 resize-none pt-2"
                        rows={2}
                        value={form.skills}
                        onChange={e => setForm({ ...form, skills: e.target.value })}
                      />
                    </div>
                    <div className="group relative flex flex-col bg-white/5 border border-white/10 rounded-2xl focus-within:border-white/30 transition-all p-6">
                      <div className="flex items-center gap-3 mb-2 text-white/20 group-focus-within:text-white transition-colors">
                        <Settings size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Tools & Tech</span>
                      </div>
                      <textarea
                        placeholder="E.G. ROS, TENSORFLOW, NEXT.JS"
                        className="w-full bg-transparent outline-none text-xs font-bold uppercase tracking-wider text-white placeholder-white/10 resize-none pt-2"
                        rows={2}
                        value={form.tools}
                        onChange={e => setForm({ ...form, tools: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* EXPERIENCE */}
                <div className="space-y-6 sm:space-y-8">
                  <h3 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-white/50 flex items-center gap-3 sm:gap-4 leading-none">
                    <span className="w-6 sm:w-8 h-px bg-white/20"></span> 04 / Experience
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl gap-4">
                      <div className="flex items-center gap-3">
                        <Zap size={14} className="text-white/20" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Any built projects?</span>
                      </div>
                      <div className="flex gap-2 sm:gap-4">
                        {['Yes', 'No'].map(opt => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setForm({ ...form, hasProjects: opt })}
                            className={`flex-1 sm:flex-none px-6 py-2 sm:py-2.5 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${form.hasProjects === opt ? 'bg-white border-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-white/5 border-white/10 text-white/30'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                    {form.hasProjects === 'Yes' && (
                      <div className="group relative flex flex-col bg-white/5 border border-white/10 rounded-2xl focus-within:border-white/30 transition-all p-5 sm:p-6">
                        <textarea
                          placeholder="MISSION LOGS (PROJECTS BUILT)..."
                          className="w-full bg-transparent outline-none text-xs font-bold uppercase tracking-wider text-white placeholder-white/10 resize-none"
                          rows={3}
                          value={form.projectDetails}
                          onChange={e => setForm({ ...form, projectDetails: e.target.value })}
                        />
                      </div>
                    )}
                    <div className="group relative flex items-center bg-white/5 border border-white/10 rounded-2xl focus-within:border-white/30 transition-all px-5 sm:px-6">
                       <Globe size={14} className="text-white/20 group-focus-within:text-white transition-colors" />
                       <input
                        placeholder="PORTFOLIO / GITHUB / LINKEDIN"
                        className="w-full bg-transparent py-4 pl-4 outline-none text-xs font-bold uppercase tracking-wider text-white placeholder-white/20"
                        value={form.portfolio}
                        onChange={e => setForm({ ...form, portfolio: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* UPLOAD */}
                <div className="space-y-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 flex items-center gap-4">
                    <span className="w-8 h-px bg-white/20"></span> 05 / Resume
                  </h3>
                  
                  <div className="space-y-4">
                    <div className={`group relative flex items-center bg-white/5 border rounded-2xl transition-all px-6 ${errors.resumeLink ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/10 focus-within:border-white/30'}`}>
                      <Globe size={14} className="text-white/20 group-focus-within:text-white transition-colors" />
                      <input
                        placeholder="RESUME DRIVE LINK / PORTFOLIO *"
                        className="w-full bg-transparent py-4 pl-4 outline-none text-xs font-bold uppercase tracking-wider text-white placeholder-white/20"
                        value={form.resumeLink}
                        onChange={e => setForm({ ...form, resumeLink: e.target.value })}
                      />
                      {errors.resumeLink && <p className="absolute -bottom-5 left-1 text-[7px] text-red-500 uppercase font-black tracking-widest">{errors.resumeLink}</p>}
                    </div>
                    
                    <div 
                      onClick={() => resumeInputRef.current?.click()}
                      className="border border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 hover:border-white/30 transition-all cursor-pointer group bg-white/[0.02]"
                    >
                       <input 
                        type="file" 
                        ref={resumeInputRef} 
                        className="hidden" 
                        onChange={(e) => setResume(e.target.files ? e.target.files[0] : null)}
                        accept="application/pdf"
                       />
                       <Upload size={32} className={`transition-all transform ${resume ? 'text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'text-white/10 group-hover:text-white group-hover:-translate-y-1'}`} />
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-white text-center">
                         {resume ? `RESUME READY: ${resume.name}` : 'Upload CV (Manual Backup)'}
                       </span>
                    </div>
                  </div>
                </div>

                {/* MOTIVATION */}
                <div className="space-y-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 flex items-center gap-4">
                    <span className="w-8 h-px bg-white/20"></span> 06 / Motivation
                  </h3>
                  <div className="space-y-4">
                    <div className="group relative flex flex-col bg-white/5 border border-white/10 rounded-2xl focus-within:border-white/30 transition-all p-6">
                       <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">Why do you want to join Homies Studio? *</label>
                       <textarea
                        required
                        placeholder="YOUR DRIVE..."
                        className="w-full bg-transparent outline-none text-xs font-bold uppercase tracking-wider text-white placeholder-white/10 resize-none pt-2"
                        rows={3}
                        value={form.motivation}
                        onChange={e => setForm({ ...form, motivation: e.target.value })}
                      />
                    </div>
                    <div className="group relative flex flex-col bg-white/5 border border-white/10 rounded-2xl focus-within:border-white/30 transition-all p-6">
                       <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">What makes you different?</label>
                       <textarea
                        placeholder="YOUR UNIQUE EDGE..."
                        className="w-full bg-transparent outline-none text-xs font-bold uppercase tracking-wider text-white placeholder-white/10 resize-none pt-2"
                        rows={3}
                        value={form.whatMakesDifferent}
                        onChange={e => setForm({ ...form, whatMakesDifferent: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* AVAILABILITY */}
                <div className="space-y-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 flex items-center gap-4">
                    <span className="w-8 h-px bg-white/20"></span> 07 / Availability
                  </h3>
                  <div className="group relative flex items-center bg-white/5 border border-white/10 rounded-2xl focus-within:border-white/30 transition-all px-6">
                    <MessageSquare size={14} className="text-white/20" />
                    <select
                      required
                      className="w-full bg-transparent py-5 pl-4 outline-none text-xs font-bold uppercase tracking-wider text-white appearance-none cursor-pointer"
                      value={form.availability}
                      onChange={e => setForm({ ...form, availability: e.target.value })}
                    >
                      <option value="" className="bg-[#080808]">AVAILABLE TIME *</option>
                      <option value="Part-time" className="bg-[#080808]">Part-time</option>
                      <option value="Full-time" className="bg-[#080808]">Full-time</option>
                      <option value="Flexible" className="bg-[#080808]">Flexible</option>
                    </select>
                  </div>
                </div>

                  {submitError && (
                    <p className="text-[10px] text-red-500 font-bold uppercase text-center mt-4 animate-pulse">
                     {submitError}
                    </p>
                  )}

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className={`w-full py-6 bg-white text-black font-black text-xs tracking-[0.4em] uppercase rounded-2xl transition-all flex items-center justify-center gap-2 group ${isSubmitting ? 'opacity-50 pointer-events-none' : 'hover:scale-[1.02] shadow-[0_10px_40px_rgba(255,255,255,0.1)] active:scale-95'}`}
                  >
                    {isSubmitting ? 'INITIATING RECRUITMENT PROTOCOL...' : 'Join the Homies →'}
                  </button>

                <p className="text-center text-[9px] text-white/10 tracking-[0.5em] uppercase font-mono italic">
                   TRANSMISSION SECURED // END OF FORM.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RecruitmentModal;
