import React, { useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Instagram } from "lucide-react";

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => setFormStatus("sent"), 1200);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@homiesstudio.in");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="contact" className="relative py-20 px-6 md:px-12 bg-black text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-14">
          <p className="text-xs tracking-widest text-white/40 uppercase mb-3">
            07 / Contact
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
            Where your mind meets our hands.
          </h2>

          <p className="text-white/60 text-lg max-w-xl">
            Drop a message. We reply within 24 hours.
          </p>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-14">

         <form onSubmit={handleSubmit} className="space-y-6">

  {/* NAME + EMAIL */}
  <div className="grid md:grid-cols-2 gap-6">
    <input type="text" required placeholder="Name" className="input-style" />
    <input type="email" required placeholder="Email" className="input-style" />
  </div>

  {/* PROJECT TITLE */}
  <input
    type="text"
    required
    placeholder="Project Title"
    className="input-style"
  />

  {/* DROPDOWNS FIXED */}
  <div className="grid md:grid-cols-2 gap-6">

    {/* PROJECT TYPE */}
    <div className="relative">
      <select className="input-style appearance-none text-white bg-black">
        <option className="bg-black text-white">Project Type</option>
        <option className="bg-black text-white">IoT / Robotics</option>
        <option className="bg-black text-white">AI / ML</option>
        <option className="bg-black text-white">Web / Software</option>
        <option className="bg-black text-white">Hardware / PCB</option>
      </select>
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40">▾</span>
    </div>

    {/* BUDGET */}
    <div className="relative">
      <select className="input-style appearance-none text-white bg-black">
        <option className="bg-black text-white">Budget Range</option>
        <option className="bg-black text-white">Under ₹15k</option>
        <option className="bg-black text-white">₹15k – ₹40k</option>
        <option className="bg-black text-white">Above ₹40k</option>
      </select>
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40">▾</span>
    </div>

  </div>

  {/* DETAILS */}
  <textarea
    rows={4}
    placeholder="More details about your project..."
    className="input-style resize-none"
  />

  {/* BUTTON */}
  <button
    type="submit"
    disabled={formStatus !== "idle"}
    className="w-full py-4 bg-white text-black font-semibold text-lg rounded-md hover:bg-gray-200 transition transform hover:scale-[1.02]"
  >
    {formStatus === "idle"
      ? "Connect to Homies →"
      : formStatus === "submitting"
      ? "Connecting..."
      : "Connected ✓"}
  </button>

</form>

          {/* RIGHT SIDE */}
          <div className="flex flex-col justify-between">

            <div className="space-y-10">

              {/* EMAIL COPY */}
              <div
                onClick={copyEmail}
                className="flex items-center gap-4 group cursor-pointer hover:translate-x-1 transition"
              >
                <div className="icon-box">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="label">Email</p>
                  <p className="text-lg">
                    {copied ? "Copied ✓" : "hello@homiesstudio.in"}
                  </p>
                </div>
              </div>

              {/* WHATSAPP */}
              <a
                href="https://wa.me/917416636417"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group hover:translate-x-1 transition"
              >
                <div className="icon-box">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="label">WhatsApp</p>
                  <p className="text-lg">+91 74166 36417</p>
                </div>
              </a>

              {/* LOCATION */}
              <a
                href="https://www.google.com/maps?q=Ongole,+Andhra+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group hover:translate-x-1 transition"
              >
                <div className="icon-box">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="label">Location</p>
                  <p className="text-lg">Ongole, Andhra Pradesh</p>
                </div>
              </a>

            </div>

            {/* FOOTER */}
            <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">

              <div className="flex gap-6">
                <Github className="icon-hover" />
                <Linkedin className="icon-hover" />
                <Instagram className="icon-hover" />
              </div>

              <p className="text-white/30 text-xs tracking-widest uppercase">
                © 2026 Homies Studio
              </p>

            </div>

          </div>
        </div>
      </div>

      {/* FLOATING WHATSAPP BUTTON */}
<a
  href="https://wa.me/917416636417"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition text-sm font-medium"
>
  Chat on WhatsApp
</a>

      {/* TOAST */}
      {copied && (
        <div className="fixed bottom-20 right-6 bg-white text-black px-4 py-2 rounded shadow">
          Email Copied ✓
        </div>
      )}

      {/* STYLES */}
      <style>{`
        .input-style {
          width: 100%;
          background: transparent;
          border-bottom: 1px solid rgba(255,255,255,0.2);
          padding: 12px 0;
          outline: none;
          color: white;
          transition: 0.3s;
        }
        .input-style::placeholder {
          color: rgba(255,255,255,0.3);
        }
        .input-style:focus {
          border-color: white;
        }
        .icon-box {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
        }
        .label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.4);
        }
        .icon-hover {
          color: rgba(255,255,255,0.3);
          cursor: pointer;
          transition: 0.3s;
        }
        .icon-hover:hover {
          color: white;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};

export default Contact;