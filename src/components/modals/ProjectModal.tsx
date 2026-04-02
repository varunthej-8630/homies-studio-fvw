import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  X, User, Mail, Phone, ChevronRight, ChevronLeft, 
  Check, Upload, Calendar, DollarSign, Brain, Code, 
  Cpu, Settings, Zap, Briefcase, FileText,
  MessageSquare, PhoneCall
} from 'lucide-react';

// INITIALIZE EMAILJS GLOBALLY
emailjs.init("Ni-K4p5KCay07Ma_S");

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  { id: 1, title: 'Identity', icon: User },
  { id: 2, title: 'Concept', icon: Brain },
  { id: 3, title: 'Resource', icon: Calendar },
  { id: 4, title: 'Uplink', icon: MessageSquare },
];

const projectTypes = [
  { value: 'Student Project', label: 'Student Project (Minor/Major)', icon: Zap },
  { value: 'AI/ML', label: 'AI/ML Project', icon: Brain },
  { value: 'Development', label: 'Web/App Development', icon: Code },
  { value: 'IoT', label: 'IoT / Embedded Systems', icon: Cpu },
  { value: 'Robotics', label: 'Robotics', icon: Settings },
  { value: 'Other', label: 'Other', icon: Briefcase },
];

const budgetRanges = [
  { value: 'Low', label: 'Low (Entry Level)' },
  { value: 'Medium', label: 'Medium (Standard)' },
  { value: 'High', label: 'High (Commercial)' },
  { value: 'Not Sure', label: 'Not Sure Yet' },
];

const ProjectModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    projectTitle: '',
    description: '',
    features: '',
    tech: '',
    deadline: '',
    budget: '',
    driveLink: '',
    contactMethod: 'WhatsApp',
  });
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!form.name) newErrors.name = 'Identity required';
      if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Valid comms required';
    } else if (step === 2) {
      if (!form.projectType) newErrors.projectType = 'Project type required';
      if (!form.projectTitle) newErrors.projectTitle = 'Title required';
      if (!form.description) newErrors.description = 'Vision needed';
    } else if (step === 3) {
      if (!form.deadline) newErrors.deadline = 'Timeline needed';
      if (!form.budget) newErrors.budget = 'Resource level required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const msg = `Hello Homies Studio Team,\nMy name is ${form.name}.\n\nI am interested in starting a project.\n\nProject: ${form.projectTitle}\nType: ${form.projectType}\nGoal: ${form.description}\nFeatures: ${form.features}\nDeadline: ${form.deadline}\nBudget: ${form.budget}\nDrive Link: ${form.driveLink || 'None'}\n\nPreferred Contact: ${form.contactMethod}\n${file ? `Included Reference: ${file.name} (I'll attach it manually)` : ''}\n\nThank you.`;
      
      // EMAIL JS SEND
      const emailPromise = emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          message: msg,
          project_type: form.projectType,
          project_title: form.projectTitle,
          description: form.description,
          features: form.features,
          deadline: form.deadline,
          budget: form.budget,
          drive_link: form.driveLink || 'None',
          file_name: file ? file.name : 'No file',
          to_email: 'info.homiesstudio@gmail.com'
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // Timeout after 8 seconds
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), 8000));
      
      try {
        await Promise.race([emailPromise, timeoutPromise]);
      } catch (e: any) {
        console.warn("Mail uplink delayed or failed", e);
        setSubmitError("Email protocol slow. Proceeding to WhatsApp...");
      }

      if (form.contactMethod === 'WhatsApp' || !!submitError) {
        const waUrl = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }
      
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      setSubmitError("Submission protocol failed. Please use WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
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
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-2xl bg-[#080808] border border-white/10 sm:rounded-[2.5rem] rounded-none p-6 sm:p-12 relative shadow-[0_0_50px_rgba(255,255,255,0.05)] overflow-y-auto transition-colors h-full sm:h-auto sm:max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* GLOW DECOR */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none" />

            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="absolute top-8 right-8 w-10 h-10 rounded-full border border-white/10 text-white/30 hover:text-white hover:border-white/40 flex items-center justify-center transition-all bg-white/5 z-10"
            >
              <X size={18} />
            </button>

            {showSuccess ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 text-white"
              >
                <div className="w-20 h-20 bg-white/10 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  <Check size={40} strokeWidth={3} />
                </div>
                <h2 className="text-4xl font-black mb-4 tracking-tighter uppercase">MISSION INITIALIZED</h2>
                <p className="text-white/40 text-[10px] sm:text-xs max-w-sm mx-auto leading-relaxed uppercase tracking-[0.2em] font-medium font-mono">
                  Your project request has been received. <br/>Our team will contact you shortly via {form.contactMethod}.
                </p>
                <button
                  onClick={onClose}
                  className="mt-12 px-12 py-5 bg-white text-black font-black text-[10px] tracking-[0.4em] uppercase rounded-full hover:scale-105 transition-all shadow-xl"
                >
                  Confirm Protocol
                </button>
              </motion.div>
            ) : (
              <>
                <div className="mb-8 sm:mb-12">
                  <p className="text-[9px] sm:text-[10px] tracking-[0.4em] sm:tracking-[0.5em] uppercase text-white/20 mb-3 font-mono">// START A PROJECT</p>
                  <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter leading-none mb-6 sm:mb-8">Initiate System.</h2>
                  
                  {/* PROGRESS INDICATOR */}
                  <div className="flex items-center gap-1">
                    {steps.map((step) => (
                      <div key={step.id} className="flex-1 flex flex-col gap-2">
                        <div className={`h-1 rounded-full transition-all duration-500 ${step.id <= currentStep ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-white/10'}`} />
                        <div className="flex items-center gap-2 px-1">
                          <step.icon size={10} className={step.id <= currentStep ? 'text-white' : 'text-white/20'} />
                          <span className={`text-[8px] font-black uppercase tracking-widest ${step.id <= currentStep ? 'text-white' : 'text-white/20'}`}>
                            {step.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <form className="space-y-6">
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-5"
                      >
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Identity *</label>
                          <div className={`group relative flex items-center bg-white/5 border rounded-2xl transition-all duration-300 ${errors.name ? 'border-red-500/50' : 'border-white/10 focus-within:border-white/30 focus-within:shadow-[0_0_20px_rgba(255,255,255,0.05)]'}`}>
                            <User size={16} className="ml-6 text-white/20 group-focus-within:text-white transition-colors" />
                            <input
                              required
                              placeholder="FULL NAME"
                              className="w-full bg-transparent px-4 py-5 outline-none text-xs font-bold uppercase tracking-wider text-white placeholder-white/20"
                              value={form.name}
                              onChange={e => setForm({ ...form, name: e.target.value })}
                            />
                          </div>
                          {errors.name && <p className="text-[8px] text-red-500 uppercase font-bold tracking-widest ml-1">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Communication Channel *</label>
                          <div className={`group relative flex items-center bg-white/5 border rounded-2xl transition-all duration-300 ${errors.email ? 'border-red-500/50' : 'border-white/10 focus-within:border-white/30 focus-within:shadow-[0_0_20px_rgba(255,255,255,0.05)]'}`}>
                            <Mail size={16} className="ml-6 text-white/20 group-focus-within:text-white transition-colors" />
                            <input
                              required
                              type="email"
                              placeholder="EMAIL ADDRESS"
                              className="w-full bg-transparent px-4 py-5 outline-none text-xs font-bold uppercase tracking-wider text-white placeholder-white/20"
                              value={form.email}
                              onChange={e => setForm({ ...form, email: e.target.value })}
                            />
                          </div>
                          {errors.email && <p className="text-[8px] text-red-500 uppercase font-bold tracking-widest ml-1">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Direct Uplink</label>
                          <div className="group relative flex items-center bg-white/5 border border-white/10 rounded-2xl focus-within:border-white/30 transition-all duration-300">
                            <Phone size={16} className="ml-6 text-white/20 group-focus-within:text-white transition-colors" />
                            <input
                              placeholder="PHONE NUMBER (OPTIONAL)"
                              className="w-full bg-transparent px-4 py-5 outline-none text-xs font-bold uppercase tracking-wider text-white placeholder-white/20"
                              value={form.phone}
                              onChange={e => setForm({ ...form, phone: e.target.value })}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-5"
                      >
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Project Classification *</label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {projectTypes.map((type) => (
                              <button
                                key={type.value}
                                type="button"
                                onClick={() => setForm({ ...form, projectType: type.value })}
                                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 gap-2 ${form.projectType === type.value ? 'bg-white border-white text-black' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30'}`}
                              >
                                <type.icon size={20} />
                                <span className="text-[8px] font-black uppercase tracking-tight text-center">{type.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Mission Title *</label>
                          <input
                            required
                            placeholder="PROJECT TITLE"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none text-xs font-bold uppercase tracking-wider text-white placeholder-white/20 focus:border-white/30 transition-all"
                            value={form.projectTitle}
                            onChange={e => setForm({ ...form, projectTitle: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Vision Description *</label>
                          <textarea
                            required
                            placeholder="WHAT ARE WE BUILDING?"
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none text-xs font-bold uppercase tracking-wider text-white placeholder-white/20 resize-none focus:border-white/30 transition-all"
                            value={form.description}
                            onChange={e => setForm({ ...form, description: e.target.value })}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Key Features</label>
                            <input
                              placeholder="E.G. AI CHAT, SENSOR LOGGING"
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none text-[10px] font-bold uppercase tracking-wider text-white placeholder-white/20 focus:border-white/30 transition-all"
                              value={form.features}
                              onChange={e => setForm({ ...form, features: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Preferred Stack</label>
                            <input
                              placeholder="E.G. REACT, ESP32, PYTORCH"
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none text-[10px] font-bold uppercase tracking-wider text-white placeholder-white/20 focus:border-white/30 transition-all"
                              value={form.tech}
                              onChange={e => setForm({ ...form, tech: e.target.value })}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 ml-1 flex items-center gap-2">
                             <Calendar size={12} /> Expected Deadline *
                          </label>
                          <input
                            required
                            type="date"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none text-xs font-bold uppercase tracking-wider text-white focus:border-white/30 transition-all [color-scheme:dark]"
                            value={form.deadline}
                            onChange={e => setForm({ ...form, deadline: e.target.value })}
                          />
                        </div>

                        <div className="space-y-4">
                          <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/40 ml-1 flex items-center gap-2 leading-none">
                             <DollarSign size={12} /> Budget Range *
                          </label>
                          <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            {budgetRanges.map((range) => (
                              <button
                                key={range.value}
                                type="button"
                                onClick={() => setForm({ ...form, budget: range.value })}
                                className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border text-center transition-all duration-300 ${form.budget === range.value ? 'bg-white border-white text-black' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30'}`}
                              >
                                <span className="text-[10px] font-black uppercase tracking-widest">{range.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 ml-1 flex items-center gap-2">
                             <FileText size={12} /> Blueprint / Reference Code
                          </label>
                          <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="border border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 hover:border-white/30 transition-colors cursor-pointer group"
                          >
                             <input 
                              type="file" 
                              ref={fileInputRef} 
                              className="hidden" 
                              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                             />
                             <Upload size={32} className={`transition-all transform ${file ? 'text-green-500' : 'text-white/20 group-hover:text-white group-hover:-translate-y-1'}`} />
                             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-white/60">
                               {file ? `FILE ATTACHED: ${file.name}` : 'Upload Reference Files (Optional)'}
                             </span>
                             <span className="text-[8px] uppercase text-white/10">{file ? 'CLICK TO CHANGE' : 'ZIP, PDF, DOC (MAX 10MB)'}</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-white/40 ml-1 flex items-center gap-2">
                             <FileText size={12} /> Secondary Resource / Drive Link
                          </label>
                          <input 
                            placeholder="LINK TO DOCS / GOOGLE DRIVE" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-6 py-4 outline-none text-xs font-bold uppercase tracking-wider text-white placeholder-white/20 focus:border-white/30 transition-all"
                            value={form.driveLink}
                            onChange={e => setForm({ ...form, driveLink: e.target.value })}
                          />
                        </div>

                        <div className="space-y-4">
                          <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-white/40 ml-1 flex items-center gap-2">
                             <Settings size={12} /> Contact Protocol
                          </label>
                          <div className="grid grid-cols-3 gap-2 sm:gap-3">
                            {[
                              { id: 'WhatsApp', icon: MessageSquare },
                              { id: 'Email', icon: Mail },
                              { id: 'Call', icon: PhoneCall },
                            ].map((method) => (
                              <button
                                key={method.id}
                                type="button"
                                onClick={() => setForm({ ...form, contactMethod: method.id })}
                                className={`flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-300 ${form.contactMethod === method.id ? 'bg-white border-white text-black' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30'}`}
                              >
                                <method.icon size={16} />
                                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest leading-none">{method.id}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center gap-4 mt-12">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="p-5 border border-white/10 text-white rounded-2xl hover:bg-white/5 transition-all"
                      >
                        <ChevronLeft size={20} />
                      </button>
                    )}
                    
                    {currentStep < 4 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex-1 py-4 sm:py-5 bg-white text-black font-black text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase rounded-xl sm:rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        Next Phase <ChevronRight size={14} />
                      </button>
                    ) : (
                      <div className="flex-1 flex flex-col gap-2">
                         {submitError && <p className="text-[8px] text-red-500 font-bold uppercase text-center mb-1">{submitError}</p>}
                         <button
                           type="button"
                           onClick={handleSubmit}
                           disabled={isSubmitting}
                           className={`w-full py-4 sm:py-5 bg-white text-black font-black text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase rounded-xl sm:rounded-2xl transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-50 pointer-events-none' : 'hover:scale-[1.02] active:scale-95 shadow-[0_10px_40px_rgba(255,255,255,0.1)]'}`}
                         >
                           {isSubmitting ? 'ESTABLISHING...' : 'Start Project →'}
                         </button>
                      </div>
                    )}

                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
