import React from 'react';

const Slot = ({ icon, item, label, onClick }) => (
    <button
        onClick={onClick}
        className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl border-2 flex items-center justify-center text-3xl transition-all active:scale-90 ${item
                ? 'border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/20'
                : 'border-white/5 bg-white/5 opacity-40'
            }`}
    >
        {item ? item.icon : icon}
    </button>
);

export default Slot;
