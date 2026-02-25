import React, { useState } from 'react';
import {
    User, Shield, Sword, Sparkles, Zap, Crown,
    CheckCircle2,
} from 'lucide-react';
import HeroAvatar from '../dashboard/HeroAvatar';
import Slot from '../shared/Slot';
import ItemDetailModal from './ItemDetailModal';

const FILTER_CATEGORIES = ['skin', 'body', 'weapon', 'head', 'accessory', 'bonus'];

/* Slot definitions: 3 on each side of the hero */
const LEFT_SLOTS = [
    { key: 'skin', icon: <User size={16} />, label: 'Skin' },
    { key: 'body', icon: <Shield size={16} />, label: 'Body' },
    { key: 'weapon', icon: <Sword size={16} />, label: 'Weapon' },
];
const RIGHT_SLOTS = [
    { key: 'head', icon: <Crown size={16} />, label: 'Head' },
    { key: 'accessory1', icon: <Sparkles size={16} />, label: 'Acc 1' },
    { key: 'accessory2', icon: <Zap size={16} />, label: 'Acc 2' },
];

const Inventory = ({ hero, inventory, equipped, setEquipped, t }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [filter, setFilter] = useState('skin');

    const items = inventory.filter((i) => i.category === filter);

    const isItemEquipped = (item) =>
        Object.values(equipped).some((eq) => eq?.id === item.id);

    const toggleEquip = (item) => {
        if (isItemEquipped(item)) {
            // Find which slot holds this item and clear it
            const slotKey = Object.keys(equipped).find((k) => equipped[k]?.id === item.id);
            if (slotKey) setEquipped((prev) => ({ ...prev, [slotKey]: null }));
        } else {
            // Equip into the matching slot
            setEquipped((prev) => ({ ...prev, [item.type]: item }));
        }
        setSelectedItem(null);
    };

    const renderSlotColumn = (slots) => (
        <div className="flex flex-col gap-3 justify-center">
            {slots.map(({ key, icon, label }) => (
                <Slot
                    key={key}
                    icon={icon}
                    item={equipped[key]}
                    label={label}
                    onClick={() => equipped[key] && setSelectedItem(equipped[key])}
                />
            ))}
        </div>
    );

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* ── Top: Hero with flanking equipment slots ── */}
            <div className="flex items-center justify-center gap-4 md:gap-8 py-6 px-4 border-b border-white/5 bg-black/10 shrink-0">
                {/* Left slots */}
                {renderSlotColumn(LEFT_SLOTS)}

                {/* Centre: Hero video (smaller) */}
                <HeroAvatar heroId={hero.id} size="small" />

                {/* Right slots */}
                {renderSlotColumn(RIGHT_SLOTS)}
            </div>

            {/* ── Bottom: Filter tabs + item grid ── */}
            <div className="flex-1 p-4 md:p-6 flex flex-col overflow-y-auto">
                {/* Category tabs */}
                <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar shrink-0">
                    {FILTER_CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase whitespace-nowrap transition-all ${filter === cat
                                    ? 'bg-cyan-500 text-black'
                                    : 'bg-white/5 text-white/40 hover:bg-white/10'
                                }`}
                        >
                            {t[cat]}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-3">
                    {items.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className={`aspect-square rounded-2xl border-2 flex items-center justify-center text-3xl transition-all relative ${isItemEquipped(item)
                                    ? 'border-cyan-400 bg-cyan-400/20'
                                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                                }`}
                        >
                            {item.icon}
                            {isItemEquipped(item) && (
                                <div className="absolute -top-1 -right-1 bg-cyan-500 rounded-full p-0.5">
                                    <CheckCircle2 size={12} className="text-black" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Detail modal */}
            <ItemDetailModal
                item={selectedItem}
                isEquipped={selectedItem ? isItemEquipped(selectedItem) : false}
                onToggleEquip={toggleEquip}
                onClose={() => setSelectedItem(null)}
                t={t}
            />
        </div>
    );
};

export default Inventory;
