import React from 'react';
import { X, Zap, Trash2 } from 'lucide-react';

const ItemDetailModal = ({ item, isEquipped, onToggleEquip, onClose, t }) => {
    if (!item) return null;

    return (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-8">
            <div className="w-full md:w-[400px] bg-slate-800 rounded-t-[3rem] md:rounded-[3rem] p-8 border-t-8 md:border-8 border-cyan-500 animate-slide-up relative">
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="flex items-center gap-6 mb-6">
                    <div className="text-6xl p-5 bg-black/20 rounded-3xl border-2 border-cyan-500/30">
                        {item.icon}
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                            {item.rarity}
                        </p>
                        <h2 className="text-2xl font-black italic uppercase text-white">
                            {item.name}
                        </h2>
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-black/40 p-5 rounded-2xl mb-8">
                    <div className="flex justify-between mb-2">
                        <span className="text-[10px] font-bold opacity-40 uppercase">{t.stats}</span>
                        <span className="text-green-400 font-black">{item.stat}</span>
                    </div>
                    <p className="text-sm opacity-70">{item.desc}</p>
                </div>

                {/* Action */}
                <button
                    onClick={() => onToggleEquip(item)}
                    className={`w-full py-5 rounded-2xl font-black uppercase transition-all flex items-center justify-center gap-2 ${isEquipped
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-cyan-500 text-black hover:bg-cyan-400'
                        }`}
                >
                    {isEquipped ? <Trash2 size={20} /> : <Zap size={20} />}
                    {isEquipped ? t.unequip : t.equip}
                </button>
            </div>
        </div>
    );
};

export default ItemDetailModal;
