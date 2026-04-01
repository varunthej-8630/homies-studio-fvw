import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, LayoutDashboard, Receipt, Wallet, 
  Bell, Plus, ChevronDown, Rocket, Sun, Moon 
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Sync theme with HTML class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  const navItems = [
    { 
      name: 'Dashboard', 
      icon: <LayoutDashboard size={20} />, 
      hasSubmenu: true, 
      subItems: ['Activity', 'Traffic', 'Statistics'] 
    },
    { name: 'Invoices', icon: <Receipt size={20} />, hasSubmenu: false },
    { name: 'Wallet', icon: <Wallet size={20} />, hasSubmenu: false },
    { name: 'Notifications', icon: <Bell size={20} />, hasSubmenu: false },
  ];

  const contacts = [
    { name: 'Varun Thej', initial: 'VT', color: '#F97316' },
    { name: 'Alex Rivera', initial: 'AR', color: '#10B981' },
    { name: 'Jane Cooper', initial: 'JC', color: '#3B82F6' },
  ];

  return (
    <div className={`fixed left-0 top-0 bottom-0 z-50 p-4 transition-all duration-500 ease-in-out hidden md:block ${isCollapsed ? 'w-[100px]' : 'w-[280px]'}`}>
      <motion.div 
        layout
        className={`h-full flex flex-col rounded-[2.5rem] shadow-2xl transition-colors duration-500 overflow-hidden bg-[var(--nav-bg)] text-[var(--text)] border border-[var(--border)]`}
      >
        {/* HEADER / USER PROFILE */}
        <div className="p-8 flex flex-col items-center relative gap-4">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`absolute top-10 -right-3 w-8 h-8 rounded-full border border-[var(--border)] shadow-md flex items-center justify-center transition-all duration-500 bg-[var(--bg)] text-[var(--text)] cursor-pointer hover:scale-110 active:scale-95 ${isCollapsed ? 'rotate-180' : ''}`}
          >
            <ChevronRight size={14} />
          </button>

          <div className="relative group cursor-pointer">
            <div className={`w-16 h-16 rounded-full bg-[#f97316] ring-4 ring-offset-2 ring-[#f97316]/20 flex items-center justify-center font-black text-2xl text-white transition-all duration-500 shadow-xl ${isCollapsed ? 'w-12 h-12 text-sm' : ''}`}>
               VT
            </div>
          </div>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center"
              >
                <p className="text-[10px] font-black tracking-[0.2em] text-[var(--text-faint)] uppercase mb-1">PROJECT DIRECTOR</p>
                <h2 className="text-lg font-black tracking-tight text-[var(--text)]">Varun Thej</h2>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* NAVIGATION */}
        <div className="flex-1 px-4 py-4 overflow-y-auto overflow-x-hidden space-y-8 scrollbar-hide">
          
          {/* MAIN SECTION */}
          <div>
            {!isCollapsed && <p className="text-[10px] font-black tracking-[0.3em] text-[var(--text-faint)] uppercase px-4 mb-4">MAIN</p>}
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button 
                    onClick={() => item.hasSubmenu ? toggleSubmenu(item.name) : null}
                    className={`w-full group flex items-center rounded-2xl p-4 transition-all duration-300 hover:bg-[#F97316]/10 relative ${isCollapsed ? 'justify-center' : ''}`}
                  >
                    <span className={`transition-colors duration-300 group-hover:text-[#F97316] ${openSubmenu === item.name ? 'text-[#F97316]' : 'text-[var(--text-muted)]'}`}>
                       {item.icon}
                    </span>
                    {!isCollapsed && <span className={`ml-4 font-bold text-sm tracking-tight transition-all duration-300 group-hover:text-[#F97316] ${openSubmenu === item.name ? 'text-[#F97316]' : 'text-[var(--text-muted)]'}`}>{item.name}</span>}
                    
                    {!isCollapsed && item.hasSubmenu && (
                      <ChevronDown size={14} className={`ml-auto transition-transform duration-300 text-[var(--text-faint)] ${openSubmenu === item.name ? 'rotate-180 opacity-100 text-[#F97316]' : ''}`} />
                    )}

                    {openSubmenu === item.name && !isCollapsed && (
                       <motion.div layoutId="active-nav" className="absolute left-0 w-1.5 h-6 bg-[#F97316] rounded-full" />
                    )}
                  </button>

                  <AnimatePresence>
                    {item.hasSubmenu && openSubmenu === item.name && !isCollapsed && (
                      <motion.ul 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-12 mt-2 space-y-2 overflow-hidden"
                      >
                        {item.subItems?.map((sub) => (
                          <li key={sub}>
                             <button className="text-[10px] font-bold text-[var(--text-faint)] hover:opacity-100 hover:text-[#F97316] transition-all p-2 uppercase tracking-widest">
                               {sub}
                             </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>

          {/* MESSAGES SECTION */}
          <div>
            {!isCollapsed && (
              <div className="flex items-center justify-between px-4 mb-4">
                <p className="text-[10px] font-black tracking-[0.3em] text-[var(--text-faint)] uppercase">CONTACTS</p>
                <Plus size={14} className="text-[var(--text-faint)] hover:text-[#F97316] cursor-pointer transition-colors" />
              </div>
            )}
            <ul className="space-y-3">
              {contacts.map((contact) => (
                <li key={contact.name}>
                  <button className={`w-full flex items-center rounded-2xl px-4 py-2 transition-all duration-300 hover:bg-[var(--text)]/5 ${isCollapsed ? 'justify-center' : ''}`}>
                     <div 
                       className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-lg" 
                       style={{ background: contact.color }}
                     >
                        {contact.initial}
                     </div>
                     {!isCollapsed && (
                       <div className="ml-4 text-left">
                          <p className="text-sm font-bold tracking-tight text-[var(--text)]">{contact.name}</p>
                          <p className="text-[10px] text-[var(--text-faint)] font-bold uppercase transition-colors">HOMIE LABS</p>
                       </div>
                     )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="p-6 mt-auto">
          <div className={`rounded-3xl bg-[#F97316]/5 p-6 border border-[#F97316]/10 flex flex-col items-center transition-all duration-500 overflow-hidden ${isCollapsed ? 'p-2 border-0 bg-transparent' : ''}`}>
            
             {!isCollapsed && (
                <div className="mb-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-[#F97316] text-white rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-[#F97316]/20">
                     <Rocket size={24} />
                  </div>
                  <h4 className="text-sm font-black mb-1 uppercase tracking-tight text-[var(--text)]">Let's start!</h4>
                  <p className="text-[10px] text-[var(--text-faint)] font-bold leading-tight">Creating or adding new tasks couldn't be easier</p>
                </div>
             )}

             <button 
               onClick={() => document.getElementById('initiate_modal_trigger')?.click()}
               className={`bg-[#F97316] hover:bg-[#ea580c] text-white rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl shadow-[#F97316]/30 ${isCollapsed ? 'w-12 h-12 rounded-full' : 'w-full py-4 text-sm font-black'}`}
               title="Add New Project"
             >
                <Plus size={20} />
                {!isCollapsed && <span className="ml-3 font-black uppercase tracking-widest text-[10px]">NEW PROJECT</span>}
             </button>
          </div>

          {/* THEME TOGGLE */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className={`w-full mt-4 p-4 rounded-2xl flex items-center bg-[var(--text)]/5 hover:bg-[var(--text)]/10 transition-all border border-[var(--border)] ${isCollapsed ? 'justify-center bg-transparent border-0 hover:bg-transparent' : ''}`}
          >
             {isDark ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-indigo-600" />}
             {!isCollapsed && <span className="ml-4 text-xs font-black uppercase tracking-[0.2em] text-[var(--text)]">{isDark ? 'LIGHT MODE' : 'DARK MODE'}</span>}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
