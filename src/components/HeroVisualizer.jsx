import React from 'react';

const HeroVisualizer = ({ equippedAvatar, equippedWeapon, equippedArmor }) => {
    // Determine base colors from avatar
    const isFire = equippedAvatar?.id === 'avatar_skin_fire';
    const isIce = equippedAvatar?.id === 'avatar_skin_ice';

    const bodyColor = isFire ? '#ef4444' : isIce ? '#3b82f6' : '#4f46e5';
    const skinColor = '#fbbf24'; // Amber-400 for neutral skin
    const eyeColor = '#1e293b';

    return (
        <svg
            viewBox="0 0 400 600"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: '100%', filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.5))' }}
        >
            <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Fire Aura */}
                <radialGradient id="fire-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                    <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </radialGradient>

                {/* Ice Aura */}
                <radialGradient id="ice-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="70%" stopColor="#60a5fa" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* --- AURA --- */}
            {isFire && <circle cx="200" cy="300" r="250" fill="url(#fire-gradient)" />}
            {isIce && <circle cx="200" cy="300" r="250" fill="url(#ice-gradient)" />}

            {/* --- CHARACTER BASE --- */}
            <g id="hero-base">
                {/* Back Arm (Left Arm) */}
                <g transform="translate(130, 220) rotate(15)">
                    <rect x="-15" y="0" width="30" height="120" rx="15" fill={skinColor} stroke="#b45309" strokeWidth="2" />
                </g>

                {/* Left Leg */}
                <rect x="150" y="360" width="35" height="150" rx="10" fill="#1e293b" />
                {/* Left Foot */}
                <path d="M 140 510 Q 150 490 185 500 L 185 520 L 140 520 Z" fill="#0f172a" />

                {/* Right Leg */}
                <rect x="215" y="360" width="35" height="150" rx="10" fill="#1e293b" />
                {/* Right Foot */}
                <path d="M 215 500 Q 250 490 260 510 L 260 520 L 215 520 Z" fill="#0f172a" />

                {/* Torso */}
                <rect x="140" y="200" width="120" height="170" rx="30" fill={bodyColor} stroke="#333" strokeWidth="2" />

                {/* Head */}
                <circle cx="200" cy="140" r="55" fill={skinColor} stroke="#b45309" strokeWidth="2" />

                {/* Face */}
                <circle cx="180" cy="130" r="6" fill={eyeColor} />
                <circle cx="220" cy="130" r="6" fill={eyeColor} />
                <path d="M 185 155 Q 200 165 215 155" stroke={eyeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            </g>

            {/* --- AVATAR (Cosmetics/Hats) --- */}
            {isFire && (
                <g id="fire-hat" transform="translate(200, 85)">
                    <path d="M -40 0 Q 0 -60 40 0 Z" fill="#b91c1c" />
                    <path d="M -20 0 Q 0 -40 20 0 Z" fill="#f59e0b" />
                </g>
            )}
            {isIce && (
                <g id="ice-crown" transform="translate(200, 80)">
                    <path d="M -40 0 L -30 -30 L -15 -10 L 0 -40 L 15 -10 L 30 -30 L 40 0 Z" fill="#60a5fa" stroke="#2563eb" strokeWidth="2" />
                </g>
            )}

            {/* --- ARMOR --- */}
            {equippedArmor?.id === 'armor_leather_tunic' && (
                <g id="leather-tunic">
                    <rect x="138" y="198" width="124" height="174" rx="32" fill="#8b4513" stroke="#5c3a21" strokeWidth="3" />
                    {/* Belt */}
                    <rect x="135" y="300" width="130" height="20" fill="#451a03" />
                    <rect x="185" y="295" width="30" height="30" rx="5" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
                    {/* Collar */}
                    <path d="M 160 198 L 200 240 L 240 198" fill="none" stroke="#5c3a21" strokeWidth="4" strokeLinecap="round" />
                </g>
            )}

            {equippedArmor?.id === 'armor_mithril' && (
                <g id="mithril-armor">
                    <rect x="136" y="196" width="128" height="178" rx="30" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="4" />
                    {/* Details */}
                    <path d="M 140 220 L 260 220 M 140 240 L 260 240 M 140 260 L 260 260 M 140 280 L 260 280" stroke="#cbd5e1" strokeWidth="3" />
                    <path d="M 170 200 L 170 370 M 200 200 L 200 370 M 230 200 L 230 370" stroke="#cbd5e1" strokeWidth="3" />
                    <circle cx="200" cy="250" r="25" fill="#38bdf8" filter="url(#glow)" />
                </g>
            )}

            {/* --- WEAPON (Held in Right Arm / Foreground) --- */}
            {/* Right Arm base */}
            <g transform="translate(270, 220) rotate(-20)">
                <rect x="-15" y="0" width="30" height="120" rx="15" fill={skinColor} stroke="#b45309" strokeWidth="2" />
            </g>

            {/* Weapon object anchored at the hand (approx x: 290, y: 320) */}
            <g id="weapon-anchor" transform="translate(310, 310) rotate(15)">
                {equippedWeapon?.id === 'weapon_wooden_staff' && (
                    <g transform="translate(0, 0)">
                        <rect x="-8" y="-120" width="16" height="200" rx="8" fill="#78350f" stroke="#451a03" strokeWidth="2" />
                        <circle cx="0" cy="-120" r="15" fill="#b45309" stroke="#78350f" strokeWidth="2" />
                    </g>
                )}

                {equippedWeapon?.id === 'weapon_crystal_wand' && (
                    <g transform="translate(0, 50)">
                        {/* Handle */}
                        <rect x="-5" y="-60" width="10" height="90" rx="4" fill="#d1d5db" stroke="#9ca3af" strokeWidth="2" />
                        {/* Crystal Core */}
                        <polygon points="0,-90 -15,-50 15,-50" fill="#a855f7" filter="url(#glow)" stroke="#c084fc" strokeWidth="2" />
                        <polygon points="0,-50 -10,-30 10,-30" fill="#d8b4fe" />
                    </g>
                )}

                {equippedWeapon?.id === 'weapon_iron_sword' && (
                    <g transform="translate(0, 50)">
                        {/* Blade */}
                        <rect x="-12" y="-140" width="24" height="140" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
                        <polygon points="-12,-140 0,-170 12,-140" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
                        <path d="M 0 -170 L 0 0" stroke="#f8fafc" strokeWidth="4" />
                        {/* Crossguard */}
                        <rect x="-35" y="0" width="70" height="12" rx="4" fill="#475569" stroke="#334155" strokeWidth="2" />
                        {/* Grip */}
                        <rect x="-8" y="12" width="16" height="40" fill="#881337" stroke="#4c0519" strokeWidth="2" />
                        {/* Pommel */}
                        <circle cx="0" cy="55" r="12" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
                    </g>
                )}
            </g>

            {/* Right Hand Overlap (Thumb) */}
            <g transform="translate(310, 310) rotate(-20)">
                <circle cx="0" cy="0" r="18" fill={skinColor} stroke="#b45309" strokeWidth="2" />
            </g>

        </svg>
    );
};

export default HeroVisualizer;
