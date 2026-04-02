import React, { useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Instagram } from "lucide-react";

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const projectTitle = formData.get('projectTitle');
    const projectType = formData.get('projectType');
    const budget = formData.get('budget');
    const details = formData.get('details');

    const message = `Hello Homies Studio Team,\nMy name is ${name}.\n\nI am interested in your services.\nHere are my details:\n\nEmail: ${email}\nProject Type: ${projectType}\nProject Title: ${projectTitle}\nBudget: ${budget}\n\nDescription: ${details}\n\nI would like to connect and discuss this further.\nPlease let me know the next steps.\n\nThank you.`;
    
    const sanitizedNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '917416636417').replace(/\D/g, '');
    window.location.href = `https://wa.me/${sanitizedNumber}?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      setFormStatus("sent");
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1200);
  };

  return (
    <section id="contact" className="min-h-screen bg-[var(--bg)] px-6 md:px-16 py-24 flex flex-col justify-center transition-colors duration-500 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto w-full relative z-10">
        
        <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[var(--text-faint)] mb-4 font-mono italic">
          07 / START A PROJECT
        </p>

        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* LEFT SIDE — HEADING + FORM */}
          <div>
            <h2 className="text-[clamp(32px,6vw,80px)] font-black text-[var(--text)] leading-[1.1] mb-6 uppercase tracking-tighter">
              Turning visions<br/>into systems.
            </h2>
            <p className="text-[clamp(14px,1.5vw,18px)] text-[var(--text-muted)] mb-12 max-w-md leading-relaxed font-light">
              Ready to dominate the market? Tell us about your project or book a call above.
            </p>

            <form onSubmit={handleSubmit} className="max-w-xl">
              
              <div className="border-b border-[var(--border)] hover:border-[var(--border-hover)] focus-within:border-[var(--text)] transition-colors pb-2 mb-8">
                <input name="name" type="text" required placeholder="YOUR NAME *" className="w-full bg-transparent text-[var(--text)] text-sm placeholder-[var(--text-faint)] outline-none py-1 uppercase font-bold tracking-tight" />
              </div>

              <div className="border-b border-[var(--border)] hover:border-[var(--border-hover)] focus-within:border-[var(--text)] transition-colors pb-2 mb-8">
                <input name="email" type="email" required placeholder="EMAIL ADDRESS *" className="w-full bg-transparent text-[var(--text)] text-sm placeholder-[var(--text-faint)] outline-none py-1 uppercase font-bold tracking-tight" />
              </div>

              <div className="border-b border-[var(--border)] hover:border-[var(--border-hover)] focus-within:border-[var(--text)] transition-colors pb-2 mb-8">
                <input name="projectTitle" type="text" required placeholder="PROJECT TITLE *" className="w-full bg-transparent text-[var(--text)] text-sm placeholder-[var(--text-faint)] outline-none py-1 uppercase font-bold tracking-tight" />
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="relative border-b border-[var(--border)] hover:border-[var(--border-hover)] focus-within:border-[var(--text)] transition-colors pb-2">
                  <select name="projectType" className="w-full bg-transparent text-[var(--text)] text-sm outline-none py-1 appearance-none cursor-pointer uppercase font-bold tracking-tight">
                    <option value="" className="bg-[var(--surface)]">PROJECT TYPE</option>
                    <option value="IoT / Robotics" className="bg-[var(--surface)]">IoT / Robotics</option>
                    <option value="AI / ML" className="bg-[var(--surface)]">AI / ML</option>
                    <option value="Web / Software" className="bg-[var(--surface)]">Web / Software</option>
                    <option value="Hardware / FPGA" className="bg-[var(--surface)]">Hardware / FPGA</option>
                  </select>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[var(--text-faint)] text-[10px] pointer-events-none">▼</span>
                </div>

                <div className="relative border-b border-[var(--border)] hover:border-[var(--border-hover)] focus-within:border-[var(--text)] transition-colors pb-2">
                  <select name="budget" className="w-full bg-transparent text-[var(--text)] text-sm outline-none py-1 appearance-none cursor-pointer uppercase font-bold tracking-tight">
                    <option value="" className="bg-[var(--surface)]">BUDGET RANGE</option>
                    <option value="Under ₹20k" className="bg-[var(--surface)]">Under ₹20k</option>
                    <option value="₹20k – ₹50k" className="bg-[var(--surface)]">₹20k – ₹50k</option>
                    <option value="Above ₹50k" className="bg-[var(--surface)]">Above ₹50k</option>
                  </select>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[var(--text-faint)] text-[10px] pointer-events-none">▼</span>
                </div>
              </div>

              <div className="border-b border-[var(--border)] hover:border-[var(--border-hover)] focus-within:border-[var(--text)] transition-colors pb-2 mb-12">
                <textarea name="details" placeholder="DESCRIBE YOUR VISION..." className="w-full bg-transparent text-[var(--text)] text-sm placeholder-[var(--text-faint)] outline-none resize-none py-1 min-h-[80px] uppercase font-bold tracking-tight" />
              </div>

              <button 
                type="submit"
                disabled={formStatus !== "idle"}
                className="w-full py-5 px-8 bg-[var(--text)] text-[var(--bg)] text-xs font-black tracking-[0.25em] uppercase rounded-xl hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-3 group"
              >
                {formStatus === "idle" ? "START YOUR PROJECT" : formStatus === "submitting" ? "CONNECTING..." : "MESSAGE SENT"}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>

            </form>
          </div>

          {/* RIGHT SIDE — CONTACT INFO */}
          <div className="flex flex-col justify-between pt-10 lg:pt-24 font-display">
            <div className="space-y-2">
              
              <div className="flex items-center gap-6 py-8 border-b border-[var(--border)] hover:border-[var(--border-hover)] transition-colors group cursor-pointer" onClick={() => window.location.href = `mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}>
                <div className="w-12 h-12 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center flex-shrink-0 group-hover:border-[var(--text)] transition-all">
                  <Mail size={18} className="text-[var(--text-muted)] group-hover:text-[#f5a623]" />
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-[var(--text-faint)] mb-0.5 font-mono">Email</p>
                  <p className="text-base text-[var(--text)] font-bold tracking-tight uppercase">{import.meta.env.VITE_CONTACT_EMAIL || 'hello@homiesstudio.in'}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 py-8 border-b border-[var(--border)] hover:border-[var(--border-hover)] transition-colors group cursor-pointer" onClick={() => {
                const sanitizedNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '917416636417').replace(/\D/g, '');
                window.location.href = `https://wa.me/${sanitizedNumber}`;
              }}>
                <div className="w-12 h-12 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center flex-shrink-0 group-hover:border-[var(--text)] transition-all">
                  <Phone size={18} className="text-[var(--text-muted)] group-hover:text-[#f5a623]" />
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-[var(--text-faint)] mb-0.5 font-mono">WhatsApp</p>
                  <p className="text-base text-[var(--text)] font-bold tracking-tight uppercase">+{import.meta.env.VITE_WHATSAPP_NUMBER || '91 74166 36417'}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 py-8 border-b border-[var(--border)] hover:border-[var(--border-hover)] transition-colors group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center flex-shrink-0 group-hover:border-[var(--text)] transition-all">
                  <MapPin size={18} className="text-[var(--text-muted)] group-hover:text-[#f5a623]" />
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-[var(--text-faint)] mb-0.5 font-mono">Location</p>
                  <p className="text-base text-[var(--text)] font-bold tracking-tight uppercase">Ongole, Andhra Pradesh</p>
                </div>
              </div>

            </div>

            <div className="mt-12">
              <div className="flex gap-4 mb-8">
                <div className="w-11 h-11 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#f5a623] hover:border-[var(--text)] transition-all cursor-pointer">
                  <Github size={18} />
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#f5a623] hover:border-[var(--text)] transition-all cursor-pointer">
                  <Linkedin size={18} />
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#f5a623] hover:border-[var(--text)] transition-all cursor-pointer">
                  <Instagram size={18} />
                </div>
              </div>
              <p className="text-[9px] tracking-[0.4em] uppercase text-[var(--text-faint)] font-mono italic">
                © 2026 Homies Studio — Crafted for performance.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* BACKGROUND DECOR */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[var(--text)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none select-none z-0" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-[var(--text)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none select-none z-0" />

    </section>
  );
};

export default Contact;