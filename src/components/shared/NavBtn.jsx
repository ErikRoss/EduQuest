import React from 'react';

const NavBtn = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center gap-1 flex-1 transition-all ${active ? 'text-cyan-400' : 'text-slate-500'
            }`}
    >
        <div
            className={`p-3 rounded-2xl transition-all ${active
                    ? 'bg-cyan-500/20 border-2 border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.3)]'
                    : ''
                }`}
        >
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <span className="text-[9px] font-black uppercase opacity-60 tracking-tighter">
            {label}
        </span>
    </button>
);

export default NavBtn;
