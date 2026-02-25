import React, { useState, useMemo } from 'react';
import { 
  Shield, Zap, Coins, Gem, User, Backpack, Trophy, 
  ShoppingCart, BookOpen, CloudLightning, Sun, Moon, 
  Globe, Bell, Brain, MessageSquareText, HeartPulse, 
  Palette, ShieldCheck, ChevronRight, X, CheckCircle2, 
  Trash2, Info, Sparkles, Sword
} from 'lucide-react';

const App = () => {
  // --- Глобальний стан застосунку ---
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('ua');
  const [activeTab, setActiveTab] = useState('hero'); // hero (dashboard), inventory, shop, quests, leader
  const [isShelterMode, setIsShelterMode] = useState(false);

  // --- Дані героя та інвентарю ---
  const [hero, setHero] = useState({
    name: lang === 'ua' ? 'Кобзар-Vibe' : 'Kobzar-Vibe',
    level: 12,
    xp: 750,
    maxXp: 1200,
    gold: 450,
    gems: 25,
    class: lang === 'ua' ? 'Літописець' : 'Chronicler',
    stats: [
      { key: 'logic', value: 45, icon: <Brain size={14}/>, label: lang === 'ua' ? 'Логіка' : 'Logic' },
      { key: 'eloquence', value: 95, icon: <MessageSquareText size={14}/>, label: lang === 'ua' ? 'Мова' : 'Eloquence' },
      { key: 'vitality', value: 60, icon: <HeartPulse size={14}/>, label: lang === 'ua' ? 'Життя' : 'Vitality' },
      { key: 'creation', value: 85, icon: <Palette size={14}/>, label: lang === 'ua' ? 'Творчість' : 'Creation' },
      { key: 'resilience', value: 70, icon: <ShieldCheck size={14}/>, label: lang === 'ua' ? 'Стійкість' : 'Resilience' }
    ]
  });

  const [equipped, setEquipped] = useState({
    head: { id: 1, name: 'Кібер-Шолом', icon: '🖲️', rarity: 'rare', type: 'head', stat: '+5 Logic' },
    body: { id: 2, name: 'Броня Кобзаря', icon: '🧥', rarity: 'epic', type: 'body', stat: '+10 Resilience' },
    weapon: { id: 3, name: 'Енерго-Шабля', icon: '⚔️', rarity: 'legendary', type: 'weapon', stat: '+15 Logic' },
    accessory: null
  });

  const [inventory] = useState([
    { id: 1, name: 'Кібер-Шолом', icon: '🖲️', type: 'head', category: 'gear', rarity: 'rare', stat: '+5 Logic', desc: 'Стандартний захист для техно-магів.' },
    { id: 2, name: 'Броня Кобзаря', icon: '🧥', rarity: 'epic', type: 'body', category: 'gear', stat: '+10 Resilience', desc: 'Посилена броня з вбудованими динаміками.' },
    { id: 3, name: 'Енерго-Шабля', icon: '⚔️', rarity: 'legendary', type: 'weapon', category: 'gear', stat: '+15 Logic', desc: 'Легендарна зброя, що розрізає віруси забуття.' },
    { id: 4, name: 'Вуха Ская', icon: '🎧', type: 'head', category: 'gear', rarity: 'common', stat: '+2 Creativity', desc: 'Допомагають краще чути ритм навчання.' },
    { id: 5, name: 'Плащ Мавки', icon: '🌿', type: 'body', category: 'gear', rarity: 'rare', stat: '+5 Vitality', desc: 'Сплетений з цифрових лоз лісу.' },
    { id: 10, name: 'Скін: Неоновий Лицар', icon: '👤', type: 'skin', category: 'skins', rarity: 'epic', stat: '+5 Style', desc: 'Легендарний вигляд для твого героя.' },
    { id: 11, name: 'Золоте Яблуко', icon: '🍎', type: 'consumable', category: 'items', rarity: 'rare', stat: '+50 Energy', desc: 'Миттєво відновлює енергію.' },
  ]);

  const [selectedInvItem, setSelectedInvItem] = useState(null);
  const [invFilter, setInvFilter] = useState('gear');

  // --- Переклади ---
  const translations = {
    ua: {
      shop: 'Крамниця', inventory: 'Рюкзак', quests: 'Квести', leaderboard: 'Рейтинг',
      classroom: 'Синхронізовано', shelter: 'В УКРИТТІ', safe: 'БЕЗПЕЧНО',
      stats: 'Навички', level: 'Рівень', hero: 'Герой', recent: 'Події',
      equip: 'Вдягнути', unequip: 'Зняти', gear: 'Стрій', skins: 'Скіни', items: 'Речі'
    },
    en: {
      shop: 'Shop', inventory: 'Backpack', quests: 'Quests', leaderboard: 'Ranking',
      classroom: 'Synced', shelter: 'IN SHELTER', safe: 'SAFE',
      stats: 'Skills', level: 'Level', hero: 'Hero', recent: 'Events',
      equip: 'Equip', unequip: 'Unequip', gear: 'Gear', skins: 'Skins', items: 'Items'
    }
  };
  const t = translations[lang];

  // --- Допоміжні функції ---
  const generateRadarPoints = (stats) => {
    const center = 50;
    const radius = 35;
    return stats.map((stat, i) => {
      const angle = (Math.PI * 2 * i) / stats.length - Math.PI / 2;
      const val = stat.value / 100;
      return `${center + radius * val * Math.cos(angle)},${center + radius * val * Math.sin(angle)}`;
    }).join(' ');
  };

  const isItemEquipped = (item) => Object.values(equipped).some(eq => eq?.id === item.id);

  const toggleEquip = (item) => {
    if (isItemEquipped(item)) {
      setEquipped(prev => ({ ...prev, [item.type]: null }));
    } else if (item.category === 'gear') {
      setEquipped(prev => ({ ...prev, [item.type]: item }));
    }
    setSelectedInvItem(null);
  };

  // --- Компоненти Візуалізації ---

  const DashboardView = () => (
    <div className="flex-1 overflow-y-auto relative flex flex-col md:flex-row">
      {/* Ліва панель: Статус */}
      <div className="w-full md:w-1/4 p-4 md:p-8 flex flex-col gap-4 shrink-0 order-2 md:order-1">
        <div className="bg-white/5 p-5 rounded-3xl border border-white/5 backdrop-blur-md shadow-xl">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">{hero.name}</h1>
          <span className="text-[10px] font-black px-2 py-1 bg-cyan-500 text-black rounded uppercase">{hero.class}</span>
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase opacity-60">
              <span>{t.level} {hero.level}</span>
              <span>{hero.xp}/{hero.maxXp} XP</span>
            </div>
            <div className="h-3 bg-black/40 rounded-full p-0.5 border border-white/10">
              <div className="h-full bg-gradient-to-r from-cyan-600 to-blue-400 rounded-full" style={{ width: `${(hero.xp / hero.maxXp) * 100}%` }} />
            </div>
          </div>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🎁</div>
            <div className="text-[10px] font-bold">Lootbox #12 <br/><span className="opacity-40">{lang === 'ua' ? 'Готовий!' : 'Ready!'}</span></div>
          </div>
          <ChevronRight className="opacity-30" />
        </div>
      </div>

      {/* Центр: Герой */}
      <div className="flex-1 flex flex-col items-center justify-center relative min-h-[450px] order-1 md:order-2">
        <div className="absolute inset-0 bg-radial-gradient from-cyan-500/10 to-transparent pointer-events-none opacity-50" />
        <div className="relative z-10 transition-transform duration-500 scale-110">
          <div className="absolute -inset-16 bg-cyan-400/20 blur-[100px] rounded-full animate-pulse opacity-40" />
          <div className="relative text-[160px] md:text-[200px] animate-hero-float drop-shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-center">
            💂‍♂️
            {equipped.weapon && <div className="absolute -right-6 bottom-10 text-6xl animate-weapon-sway">{equipped.weapon.icon}</div>}
          </div>
        </div>
        <div className={`absolute bottom-4 right-4 flex items-center gap-3 px-5 py-2.5 rounded-2xl border-2 transition-all shadow-xl backdrop-blur-md z-30 ${isShelterMode ? 'bg-red-600 border-red-400 text-white animate-bounce' : 'bg-black/60 border-slate-700 text-white'}`}>
          {isShelterMode ? <CloudLightning /> : <Shield className="text-green-500" />}
          <div className="text-left leading-none">
            <p className="text-[8px] font-black opacity-60 uppercase">{isShelterMode ? t.shelter : t.safe}</p>
            <button onClick={() => setIsShelterMode(!isShelterMode)} className="text-[11px] font-black uppercase mt-0.5">{isShelterMode ? 'OFF' : 'TEST'}</button>
          </div>
        </div>
      </div>

      {/* Права панель: Колесо */}
      <div className="w-full md:w-1/4 p-4 md:p-8 flex flex-col gap-6 order-3 shrink-0">
        <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <p className="text-[10px] font-black uppercase opacity-40 text-center tracking-widest mb-4">{t.stats}</p>
          <div className="relative aspect-square">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
              {[0.5, 1].map((r, i) => <circle key={i} cx="50" cy="50" r={35 * r} fill="none" stroke="white" strokeWidth="0.5" className="opacity-10" />)}
              <polygon points={generateRadarPoints(hero.stats)} className="fill-cyan-500/40 stroke-cyan-400" strokeWidth="2" strokeLinejoin="round" />
              {hero.stats.map((stat, i) => {
                const angle = (Math.PI * 2 * i) / hero.stats.length - Math.PI / 2;
                return (
                  <g key={i}>
                    <line x1="50" y1="50" x2={50 + 35 * Math.cos(angle)} y2={50 + 35 * Math.sin(angle)} stroke="white" strokeWidth="0.5" className="opacity-10" />
                    <foreignObject x={50 + 42 * Math.cos(angle) - 7} y={50 + 42 * Math.sin(angle) - 7} width="14" height="14">
                      <div className="text-cyan-400 flex items-center justify-center">{stat.icon}</div>
                    </foreignObject>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  const InventoryView = () => {
    const items = inventory.filter(i => i.category === invFilter);
    return (
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/3 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 bg-black/10">
          <div className="grid grid-cols-4 md:grid-cols-1 gap-4 mb-8">
            <Slot icon={<Zap size={16}/>} item={equipped.head} label="Head" onClick={() => equipped.head && setSelectedInvItem(equipped.head)} />
            <Slot icon={<Shield size={16}/>} item={equipped.body} label="Body" onClick={() => equipped.body && setSelectedInvItem(equipped.body)} />
            <Slot icon={<Sword size={16}/>} item={equipped.weapon} label="Weapon" onClick={() => equipped.weapon && setSelectedInvItem(equipped.weapon)} />
            <Slot icon={<Sparkles size={16}/>} item={equipped.accessory} label="Acc" onClick={() => equipped.accessory && setSelectedInvItem(equipped.accessory)} />
          </div>
          <div className="text-[120px] md:text-[180px] animate-hero-float">💂‍♂️</div>
        </div>
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
            {['gear', 'skins', 'items'].map(cat => (
              <button key={cat} onClick={() => setInvFilter(cat)} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${invFilter === cat ? 'bg-cyan-500 text-black' : 'bg-white/5 text-white/40'}`}>
                {t[cat]}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {items.map(item => (
              <button key={item.id} onClick={() => setSelectedInvItem(item)} className={`aspect-square rounded-2xl border-2 flex items-center justify-center text-3xl transition-all relative ${isItemEquipped(item) ? 'border-cyan-400 bg-cyan-400/20' : 'border-white/10 bg-white/5'}`}>
                {item.icon}
                {isItemEquipped(item) && <div className="absolute -top-1 -right-1 bg-cyan-500 rounded-full p-0.5"><CheckCircle2 size={12} className="text-black"/></div>}
              </button>
            ))}
          </div>
        </div>
        {selectedInvItem && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-8">
            <div className="w-full md:w-[400px] bg-slate-800 rounded-t-[3rem] md:rounded-[3rem] p-8 border-t-8 md:border-8 border-cyan-500 animate-slide-up relative">
              <button onClick={() => setSelectedInvItem(null)} className="absolute top-6 right-6 p-2 bg-white/10 rounded-full"><X size={20}/></button>
              <div className="flex items-center gap-6 mb-6">
                <div className="text-6xl p-5 bg-black/20 rounded-3xl border-2 border-cyan-500/30">{selectedInvItem.icon}</div>
                <div>
                  <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">{selectedInvItem.rarity}</p>
                  <h2 className="text-2xl font-black italic uppercase text-white">{selectedInvItem.name}</h2>
                </div>
              </div>
              <div className="bg-black/40 p-5 rounded-2xl mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-[10px] font-bold opacity-40 uppercase">{t.stats}</span>
                  <span className="text-green-400 font-black">{selectedInvItem.stat}</span>
                </div>
                <p className="text-sm opacity-70">{selectedInvItem.desc}</p>
              </div>
              <button onClick={() => toggleEquip(selectedInvItem)} className={`w-full py-5 rounded-2xl font-black uppercase transition-all flex items-center justify-center gap-2 ${isItemEquipped(selectedInvItem) ? 'bg-red-500 text-white' : 'bg-cyan-500 text-black'}`}>
                {isItemEquipped(selectedInvItem) ? <Trash2 size={20}/> : <Zap size={20}/>}
                {isItemEquipped(selectedInvItem) ? t.unequip : t.equip}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // --- Основний рендер ---
  return (
    <div className={`fixed inset-0 w-full h-[100dvh] flex flex-col transition-colors duration-500 overflow-hidden ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className={`relative w-full h-full md:h-[95vh] md:max-w-6xl md:m-auto md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border-0 md:border-8 transition-all ${theme === 'dark' ? 'md:border-slate-800 bg-slate-900' : 'md:border-amber-700 bg-white'}`}>
        
        {/* Хедер (Ресурси та Налаштування) */}
        <div className="h-16 flex items-center justify-between px-6 border-b-2 border-white/5 bg-black/20 shrink-0 z-20">
          <div className="flex gap-2">
            <StatBadge icon={<Coins className="text-yellow-500" size={16}/>} val={hero.gold} color="yellow" />
            <StatBadge icon={<Gem className="text-cyan-400" size={16}/>} val={hero.gems} color="cyan" />
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setLang(l => l === 'ua' ? 'en' : 'ua')} className="p-2 hover:bg-white/10 rounded-lg"><Globe size={18} /></button>
            <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} className="p-2 hover:bg-white/10 rounded-lg">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-black text-green-500 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-xl">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> {t.classroom.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Основний Контент */}
        {activeTab === 'hero' ? <DashboardView /> : activeTab === 'inventory' ? <InventoryView /> : <div className="flex-1 flex items-center justify-center opacity-30 italic">{lang === 'ua' ? 'Скоро...' : 'Coming Soon...'}</div>}

        {/* Навігація */}
        <div className="h-20 md:h-24 bg-black/90 backdrop-blur-2xl border-t border-white/5 flex items-center justify-around px-4 shrink-0 z-50">
          <NavBtn icon={<BookOpen />} label={t.quests} active={activeTab === 'quests'} onClick={() => setActiveTab('quests')} />
          <NavBtn icon={<Backpack />} label={t.inventory} active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} />
          <NavBtn icon={<User />} label={t.hero} active={activeTab === 'hero'} onClick={() => setActiveTab('hero')} />
          <NavBtn icon={<ShoppingCart />} label={t.shop} active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} />
          <NavButton icon={<Trophy />} label={t.leaderboard} active={activeTab === 'leaderboard'} onClick={() => setActiveTab('leaderboard')} />
        </div>
      </div>

      <style>{`
        @keyframes hero-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes weapon-sway { 0%, 100% { transform: rotate(0); } 50% { transform: rotate(10deg) translate(5px, -5px); } }
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-hero-float { animation: hero-float 4s ease-in-out infinite; }
        .animate-weapon-sway { animation: weapon-sway 3s ease-in-out infinite; }
        .bg-radial-gradient { background: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 70%); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

// --- Допоміжні мікро-компоненти ---
const StatBadge = ({ icon, val, color }) => (
  <div className={`flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-${color}-500/30`}>
    {icon} <span className={`font-black text-sm text-${color}-500`}>{val}</span>
  </div>
);

const NavBtn = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center gap-1 flex-1 transition-all ${active ? 'text-cyan-400' : 'text-slate-500'}`}>
    <div className={`p-3 rounded-2xl transition-all ${active ? 'bg-cyan-500/20 border-2 border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.3)]' : ''}`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <span className="text-[9px] font-black uppercase opacity-60 tracking-tighter">{label}</span>
  </button>
);

const NavButton = NavBtn; // Alias for backward compatibility in current file

const Slot = ({ icon, item, label, onClick }) => (
  <button onClick={onClick} className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl border-2 flex items-center justify-center text-3xl transition-all active:scale-90 ${item ? 'border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/20' : 'border-white/5 bg-white/5 opacity-40'}`}>
    {item ? item.icon : icon}
  </button>
);

export default App;