import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { CheckCircle, Lock } from 'lucide-react';
import './Marketplace.css';

const ITEMS = [
    { id: 'avatar_skin_fire', title: 'Fire Mage Skin', cost: 100, currency: 'gold', icon: '🔥', type: 'avatar' },
    { id: 'avatar_skin_ice', title: 'Ice Warrior Skin', cost: 150, currency: 'gold', icon: '❄️', type: 'avatar' },
    { id: 'weapon_wooden_staff', title: 'Wooden Staff', cost: 20, currency: 'gold', icon: '🦯', type: 'weapon' },
    { id: 'weapon_crystal_wand', title: 'Crystal Wand', cost: 200, currency: 'gold', icon: '🪄', type: 'weapon' },
    { id: 'weapon_iron_sword', title: 'Iron Sword', cost: 150, currency: 'gold', icon: '🗡️', type: 'weapon' },
    { id: 'armor_leather_tunic', title: 'Leather Tunic', cost: 80, currency: 'gold', icon: '🧥', type: 'armor' },
    { id: 'armor_mithril', title: 'Mithril Chainmail', cost: 10, currency: 'diamonds', icon: '🛡️', type: 'armor' },
    { id: 'title_scholar', title: '"The Scholar" Title', cost: 50, currency: 'gold', icon: '📜', type: 'title' },
    { id: 'boost_xp', title: 'Double XP Artifact (1h)', cost: 5, currency: 'diamonds', icon: '✨', type: 'boost' },
];

const Marketplace = () => {
    const { user, purchaseItem, loading } = useUser();
    const [purchaseMsg, setPurchaseMsg] = useState('');

    if (loading || !user) return <div className="page-container"><h2>Loading Shop...</h2></div>;

    const handleBuy = (item) => {
        const success = purchaseItem(item.cost, item.currency, item.id);
        if (success) {
            setPurchaseMsg(`You successfully acquired ${item.title}!`);
        } else {
            setPurchaseMsg(`Not enough ${item.currency} to buy ${item.title}.`);
        }
        setTimeout(() => setPurchaseMsg(''), 3000);
    };

    return (
        <div className="page-container marketplace">
            <header className="marketplace-header">
                <div>
                    <h1>Marketplace</h1>
                    <p>Spend your wealth on epic loot and titles.</p>
                </div>
                <div className="wallet">
                    <div className="wallet-item">
                        <span role="img" aria-label="gold">🪙</span> {user.currency.gold}
                    </div>
                    <div className="wallet-item">
                        <span role="img" aria-label="diamonds">💎</span> {user.currency.diamonds}
                    </div>
                </div>
            </header>

            {purchaseMsg && (
                <div className={`purchase-alert ${purchaseMsg.includes('success') ? 'success' : 'error'}`}>
                    {purchaseMsg}
                </div>
            )}

            <div className="shop-grid">
                {ITEMS.map(item => {
                    const isOwned = user.inventory.includes(item.id);
                    const canAfford = user.currency[item.currency] >= item.cost;

                    return (
                        <div key={item.id} className={`shop-card ${isOwned ? 'owned' : ''}`}>
                            <div className="shop-icon">{item.icon}</div>
                            <div className="shop-details">
                                <h3>{item.title}</h3>
                                <p className="item-type">{item.type.toUpperCase()}</p>
                            </div>
                            <div className="shop-price">
                                <span role="img" aria-label={item.currency}>{item.currency === 'gold' ? '🪙' : '💎'}</span>
                                {item.cost}
                            </div>

                            <button
                                className={`buy-btn ${isOwned ? 'owned-btn' : ''}`}
                                onClick={() => handleBuy(item)}
                                disabled={isOwned || !canAfford}
                            >
                                {isOwned ? (
                                    <><CheckCircle size={16} /> Owned</>
                                ) : !canAfford ? (
                                    <><Lock size={16} /> Locked</>
                                ) : (
                                    'Buy'
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Marketplace;
