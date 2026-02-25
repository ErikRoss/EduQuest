import React from 'react';

const StatBadge = ({ icon, val, color }) => (
    <div className={`flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-${color}-500/30`}>
        {icon}
        <span className={`font-black text-sm text-${color}-500`}>{val}</span>
    </div>
);

export default StatBadge;
