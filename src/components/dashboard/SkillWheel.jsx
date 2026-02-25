import React from 'react';
import {
    Brain,
    MessageSquareText,
    HeartPulse,
    Palette,
    ShieldCheck,
} from 'lucide-react';

const STAT_ICONS = {
    logic: <Brain size={14} />,
    eloquence: <MessageSquareText size={14} />,
    vitality: <HeartPulse size={14} />,
    creation: <Palette size={14} />,
    resilience: <ShieldCheck size={14} />,
};

const generateRadarPoints = (stats) => {
    const center = 50;
    const radius = 35;
    return stats
        .map((stat, i) => {
            const angle = (Math.PI * 2 * i) / stats.length - Math.PI / 2;
            const val = stat.value / 100;
            return `${center + radius * val * Math.cos(angle)},${center + radius * val * Math.sin(angle)}`;
        })
        .join(' ');
};

const SkillWheel = ({ stats, label }) => (
    <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <p className="text-[10px] font-black uppercase opacity-40 text-center tracking-widest mb-4">
            {label}
        </p>
        <div className="relative aspect-square">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
                {/* Grid rings */}
                {[0.5, 1].map((r, i) => (
                    <circle
                        key={i}
                        cx="50"
                        cy="50"
                        r={35 * r}
                        fill="none"
                        stroke="white"
                        strokeWidth="0.5"
                        className="opacity-10"
                    />
                ))}

                {/* Filled polygon */}
                <polygon
                    points={generateRadarPoints(stats)}
                    className="fill-cyan-500/40 stroke-cyan-400"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />

                {/* Axis lines & icons */}
                {stats.map((stat, i) => {
                    const angle = (Math.PI * 2 * i) / stats.length - Math.PI / 2;
                    return (
                        <g key={i}>
                            <line
                                x1="50"
                                y1="50"
                                x2={50 + 35 * Math.cos(angle)}
                                y2={50 + 35 * Math.sin(angle)}
                                stroke="white"
                                strokeWidth="0.5"
                                className="opacity-10"
                            />
                            <foreignObject
                                x={50 + 42 * Math.cos(angle) - 7}
                                y={50 + 42 * Math.sin(angle) - 7}
                                width="14"
                                height="14"
                            >
                                <div className="text-cyan-400 flex items-center justify-center">
                                    {STAT_ICONS[stat.key]}
                                </div>
                            </foreignObject>
                        </g>
                    );
                })}
            </svg>
        </div>
    </div>
);

export default SkillWheel;
