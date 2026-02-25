import React, { useState } from 'react';
import {
  Coins, Gem, User, Backpack, Trophy,
  ShoppingCart, BookOpen, Globe, Sun, Moon,
} from 'lucide-react';

import StatBadge from './components/shared/StatBadge';
import NavBtn from './components/shared/NavBtn';
import Dashboard from './components/dashboard/Dashboard';
import Inventory from './components/inventory/Inventory';

import { defaultHero } from './data/heroData';
import { defaultInventory, defaultEquipped } from './data/inventoryData';
import { translations } from './data/translations';

const App = () => {
  // ── Global state ──
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('ua');
  const [activeTab, setActiveTab] = useState('hero');
  const [isShelterMode, setIsShelterMode] = useState(false);

  // ── Data state ──
  const [hero] = useState(defaultHero);
  const [equipped, setEquipped] = useState(defaultEquipped);
  const [inventory] = useState(defaultInventory);

  const t = translations[lang];

  // ── Render ──
  return (
    <div
      className={`fixed inset-0 w-full h-[100dvh] flex flex-col transition-colors duration-500 overflow-hidden ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
        }`}
    >
      <div
        className={`relative w-full h-full md:h-[95vh] md:max-w-6xl md:m-auto md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border-0 md:border-8 transition-all ${theme === 'dark'
          ? 'md:border-slate-800 bg-slate-900'
          : 'md:border-amber-700 bg-white'
          }`}
      >
        {/* ── Header ── */}
        <div className="h-16 flex items-center justify-between px-6 border-b-2 border-white/5 bg-black/20 shrink-0 z-20">
          <div className="flex gap-2">
            <StatBadge
              icon={<Coins className="text-yellow-500" size={16} />}
              val={hero.gold}
              color="yellow"
            />
            <StatBadge
              icon={<Gem className="text-cyan-400" size={16} />}
              val={hero.gems}
              color="cyan"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang((l) => (l === 'ua' ? 'en' : 'ua'))}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Globe size={18} />
            </button>
            <button
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-black text-green-500 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-xl">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              {t.classroom.toUpperCase()}
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        {activeTab === 'hero' ? (
          <Dashboard
            hero={hero}
            equipped={equipped}
            lang={lang}
            t={t}
            isShelterMode={isShelterMode}
            setIsShelterMode={setIsShelterMode}
          />
        ) : activeTab === 'inventory' ? (
          <Inventory
            hero={hero}
            inventory={inventory}
            equipped={equipped}
            setEquipped={setEquipped}
            t={t}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center opacity-30 italic">
            {t.comingSoon}
          </div>
        )}

        {/* ── Bottom Navigation ── */}
        <div className="h-20 md:h-24 bg-black/90 backdrop-blur-2xl border-t border-white/5 flex items-center justify-around px-4 shrink-0 z-50">
          <NavBtn
            icon={<BookOpen />}
            label={t.quests}
            active={activeTab === 'quests'}
            onClick={() => setActiveTab('quests')}
          />
          <NavBtn
            icon={<Backpack />}
            label={t.inventory}
            active={activeTab === 'inventory'}
            onClick={() => setActiveTab('inventory')}
          />
          <NavBtn
            icon={<User />}
            label={t.hero}
            active={activeTab === 'hero'}
            onClick={() => setActiveTab('hero')}
          />
          <NavBtn
            icon={<ShoppingCart />}
            label={t.shop}
            active={activeTab === 'shop'}
            onClick={() => setActiveTab('shop')}
          />
          <NavBtn
            icon={<Trophy />}
            label={t.leaderboard}
            active={activeTab === 'leaderboard'}
            onClick={() => setActiveTab('leaderboard')}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
