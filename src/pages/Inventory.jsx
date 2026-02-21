import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Sword, Shield, User, Zap, Filter, CheckCircle } from 'lucide-react';
import HeroVisualizer from '../components/HeroVisualizer';
import './Inventory.css';

// Complete dictionary of all items in the game for lookup
const ALL_ITEMS = {
    avatar_skin_fire: { id: 'avatar_skin_fire', title: 'Fire Mage Skin', icon: '🔥', type: 'avatar', description: 'A fierce robe imbued with the power of fire.' },
    avatar_skin_ice: { id: 'avatar_skin_ice', title: 'Ice Warrior Skin', icon: '❄️', type: 'avatar', description: 'Sturdy armor carved from everlasting ice.' },
    weapon_wooden_staff: { id: 'weapon_wooden_staff', title: 'Wooden Staff', icon: '🦯', type: 'weapon', description: 'A basic staff for novice spellcasters.' },
    weapon_crystal_wand: { id: 'weapon_crystal_wand', title: 'Crystal Wand', icon: '🪄', type: 'weapon', description: 'Enhances magical focus significantly.' },
    weapon_iron_sword: { id: 'weapon_iron_sword', title: 'Iron Sword', icon: '🗡️', type: 'weapon', description: 'A reliable blade for close combat.' },
    armor_leather_tunic: { id: 'armor_leather_tunic', title: 'Leather Tunic', icon: '🧥', type: 'armor', description: 'Lightweight protection for beginners.' },
    armor_mithril: { id: 'armor_mithril', title: 'Mithril Chainmail', icon: '🛡️', type: 'armor', description: 'Incredibly light yet tough as dragon scales.' },
    title_scholar: { id: 'title_scholar', title: '"The Scholar" Title', icon: '📜', type: 'title', description: 'Shows your dedication to knowledge.' },
    boost_xp: { id: 'boost_xp', title: 'Double XP Artifact', icon: '✨', type: 'boost', description: 'Consume to earn double XP for the next hour.' },
};

const Inventory = () => {
    const { user, loading, equipItem, consumeItem } = useUser();
    const [filterType, setFilterType] = useState('all');
    const [itemToConsume, setItemToConsume] = useState(null);

    if (loading || !user) return <div className="page-container"><h2>Loading Inventory...</h2></div>;

    const handleItemClick = (item) => {
        if (item.type === 'boost') {
            setItemToConsume(item);
        } else if (['avatar', 'weapon', 'armor'].includes(item.type)) {
            // Toggle equip state
            const isEquipped = user.equipped[item.type] === item.id;
            equipItem(item.type, isEquipped ? null : item.id);
        }
    };

    const handleConfirmConsume = () => {
        if (itemToConsume) {
            // Consume logic to be implemented in context
            consumeItem && consumeItem(itemToConsume.id);
            setItemToConsume(null);
        }
    };

    // Filter inventory
    const filteredInventory = user.inventory
        .map(id => ALL_ITEMS[id])
        .filter(item => item && (filterType === 'all' || item.type === filterType));

    const equippedAvatar = user.equipped.avatar ? ALL_ITEMS[user.equipped.avatar] : null;
    const equippedWeapon = user.equipped.weapon ? ALL_ITEMS[user.equipped.weapon] : null;
    const equippedArmor = user.equipped.armor ? ALL_ITEMS[user.equipped.armor] : null;

    return (
        <div className="page-container inventory-page">
            <header className="inventory-header">
                <h1>Hero Inventory</h1>
                <p>Manage your character and equip your epic gear.</p>
            </header>

            <div className="inventory-split-layout">
                {/* Left Column: Character Visualizer */}
                <div className="character-column">
                    <div className="character-stage">
                        <div className="character-glow"></div>

                        {/* Visualizer */}
                        <div className="character-model">
                            <HeroVisualizer
                                equippedAvatar={equippedAvatar}
                                equippedWeapon={equippedWeapon}
                                equippedArmor={equippedArmor}
                            />
                        </div>

                        {/* Equipped Names */}
                        <div className="equipped-labels">
                            <div className="eq-label"><span>Avatar:</span> {equippedAvatar ? equippedAvatar.title : 'Default'}</div>
                            <div className="eq-label"><span>Weapon:</span> {equippedWeapon ? equippedWeapon.title : 'None'}</div>
                            <div className="eq-label"><span>Armor:</span> {equippedArmor ? equippedArmor.title : 'None'}</div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Inventory Grid */}
                <div className="inventory-collection-column">
                    <div className="inventory-controls">
                        <div className="filter-group">
                            <Filter size={18} className="filter-icon" />
                            <button className={filterType === 'all' ? 'active' : ''} onClick={() => setFilterType('all')}>All</button>
                            <button className={filterType === 'avatar' ? 'active' : ''} onClick={() => setFilterType('avatar')}>Avatars</button>
                            <button className={filterType === 'weapon' ? 'active' : ''} onClick={() => setFilterType('weapon')}>Weapons</button>
                            <button className={filterType === 'armor' ? 'active' : ''} onClick={() => setFilterType('armor')}>Armor</button>
                            <button className={filterType === 'boost' ? 'active' : ''} onClick={() => setFilterType('boost')}>Boosts</button>
                        </div>
                    </div>

                    <div className="inventory-grid">
                        {filteredInventory.map(item => {
                            const isEquipped = ['avatar', 'weapon', 'armor'].includes(item.type) && user.equipped[item.type] === item.id;

                            return (
                                <div
                                    key={item.id}
                                    className={`inventory-item-card ${isEquipped ? 'equipped' : ''} type-${item.type}`}
                                    onClick={() => handleItemClick(item)}
                                >
                                    {isEquipped && <div className="equipped-badge">E</div>}
                                    <div className="item-icon-large">{item.icon}</div>

                                    {/* Hover Tooltip */}
                                    <div className="item-tooltip">
                                        <h4>{item.title}</h4>
                                        <span className="tooltip-type">{item.type.toUpperCase()}</span>
                                        <p>{item.description}</p>
                                        <span className="tooltip-action">
                                            {item.type === 'boost' ? 'Click to Consume' :
                                                isEquipped ? 'Click to Unequip' : 'Click to Equip'}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}

                        {filteredInventory.length === 0 && (
                            <div className="empty-state">No {filterType !== 'all' ? filterType + 's' : 'items'} found.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Consume Modal */}
            {itemToConsume && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-icon">{itemToConsume.icon}</div>
                        <h2>Activate {itemToConsume.title}?</h2>
                        <p>{itemToConsume.description}</p>
                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={() => setItemToConsume(null)}>Cancel</button>
                            <button className="confirm-btn primary" onClick={handleConfirmConsume}>Activate</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Inventory;
