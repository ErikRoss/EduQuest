import React from 'react';
import { Shield, CloudLightning, ChevronRight } from 'lucide-react';
import HeroAvatar from './HeroAvatar';
import SkillWheel from './SkillWheel';

const Dashboard = ({ hero, equipped, lang, t, isShelterMode, setIsShelterMode }) => (
    <div className="flex-1 overflow-y-auto relative flex flex-col md:flex-row" style={{ backgroundColor: hero.bgColor }}>
        {/* Left panel: Status */}
        <div className="w-full md:w-1/4 p-4 md:p-8 flex flex-col gap-4 shrink-0 order-2 md:order-1">
            <div className="bg-black/30 p-5 rounded-3xl border border-white/10 backdrop-blur-md shadow-xl">
                <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">
                    {typeof hero.name === 'object' ? hero.name[lang] : hero.name}
                </h1>
                <span className="text-[10px] font-black px-2 py-1 bg-cyan-500 text-black rounded uppercase">
                    {typeof hero.class === 'object' ? hero.class[lang] : hero.class}
                </span>
                <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase opacity-80 text-white">
                        <span>{t.level} {hero.level}</span>
                        <span>{hero.xp}/{hero.maxXp} XP</span>
                    </div>
                    <div className="h-3 bg-black/40 rounded-full p-0.5 border border-white/10">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-600 to-blue-400 rounded-full transition-all"
                            style={{ width: `${(hero.xp / hero.maxXp) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Lootbox teaser */}
            <div className="bg-black/30 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="text-2xl">🎁</div>
                    <div className="text-[10px] font-bold text-white">
                        Lootbox #12 <br />
                        <span className="opacity-60">{t.ready}</span>
                    </div>
                </div>
                <ChevronRight className="opacity-50 text-white" />
            </div>
        </div>

        {/* Centre: Hero — raised towards the top */}
        <div className="flex-1 flex flex-col items-center justify-start pt-8 md:pt-12 relative min-h-[450px] order-1 md:order-2">
            <HeroAvatar heroId={hero.id} size="large" />

            {/* Shelter toggle */}
            <div
                className={`absolute bottom-4 right-4 flex items-center gap-3 px-5 py-2.5 rounded-2xl border-2 transition-all shadow-xl backdrop-blur-md z-30 ${isShelterMode
                        ? 'bg-red-600 border-red-400 text-white animate-bounce'
                        : 'bg-black/60 border-slate-700 text-white'
                    }`}
            >
                {isShelterMode ? (
                    <CloudLightning />
                ) : (
                    <Shield className="text-green-500" />
                )}
                <div className="text-left leading-none">
                    <p className="text-[8px] font-black opacity-60 uppercase">
                        {isShelterMode ? t.shelter : t.safe}
                    </p>
                    <button
                        onClick={() => setIsShelterMode(!isShelterMode)}
                        className="text-[11px] font-black uppercase mt-0.5"
                    >
                        {isShelterMode ? 'OFF' : 'TEST'}
                    </button>
                </div>
            </div>
        </div>

        {/* Right panel: Skill wheel */}
        <div className="w-full md:w-1/4 p-4 md:p-8 flex flex-col gap-6 order-3 shrink-0">
            <SkillWheel stats={hero.stats} label={t.stats} />
        </div>
    </div>
);

export default Dashboard;
