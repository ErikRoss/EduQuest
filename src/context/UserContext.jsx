import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchUserProfile, fetchRecentGrades, processGradeReward } from '../services/api';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const XP_PER_LEVEL = 1000;

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeBoosts, setActiveBoosts] = useState({});

    useEffect(() => {
        const initData = async () => {
            setLoading(true);
            const [profile, recentGrades] = await Promise.all([
                fetchUserProfile(),
                fetchRecentGrades(),
            ]);
            setUser(profile);
            setGrades(recentGrades);
            setLoading(false);
        };
        initData();
    }, []);

    const syncNewGrade = (mockGradeValue, subject) => {
        // Simulate syncing a new grade
        const newGrade = {
            id: `g_new_${Date.now()}`,
            subject,
            value: mockGradeValue,
            timestamp: new Date().toISOString(),
            source: 'manual_sync'
        };

        setGrades([newGrade, ...grades]);

        // Process Reward with active boosts (e.g., Doubling XP if Double XP Artifact is active)
        const activeMultiplier = activeBoosts['boost_xp'] && activeBoosts['boost_xp'] > Date.now() ? 2 : 1;
        const reward = processGradeReward(mockGradeValue);
        const finalXp = reward.xp * activeMultiplier;

        setUser(prev => {
            const newXp = prev.xp + finalXp;
            const levelUps = Math.floor(newXp / XP_PER_LEVEL);
            const newLevel = prev.level + levelUps;
            const remainderXp = newXp % XP_PER_LEVEL;

            return {
                ...prev,
                xp: remainderXp,
                level: newLevel,
                currency: {
                    ...prev.currency,
                    gold: prev.currency.gold + reward.gold,
                    diamonds: reward.hasLootbox ? prev.currency.diamonds + 1 : prev.currency.diamonds
                }
            };
        });

        return reward;
    };

    const purchaseItem = (cost, currentCurrencyType, itemId) => {
        if (user.currency[currentCurrencyType] >= cost) {
            setUser(prev => ({
                ...prev,
                currency: {
                    ...prev.currency,
                    [currentCurrencyType]: prev.currency[currentCurrencyType] - cost
                },
                inventory: [...prev.inventory, itemId]
            }));
            return true;
        }
        return false;
    };

    const equipItem = (itemType, itemId) => {
        if (user.inventory.includes(itemId) || itemId === null) {
            setUser(prev => ({
                ...prev,
                equipped: {
                    ...prev.equipped,
                    [itemType]: itemId
                }
            }));
            return true;
        }
        return false;
    };

    const consumeItem = (itemId) => {
        if (user.inventory.includes(itemId)) {
            // Remove from inventory
            setUser(prev => ({
                ...prev,
                inventory: prev.inventory.filter(id => id !== itemId)
            }));

            // Activate boost for 1 hour
            setActiveBoosts(prev => ({
                ...prev,
                [itemId]: Date.now() + 3600000 // 1 hour from now
            }));
            return true;
        }
        return false;
    };

    return (
        <UserContext.Provider value={{ user, grades, loading, syncNewGrade, purchaseItem, equipItem, consumeItem, activeBoosts, xpPerLevel: XP_PER_LEVEL }}>
            {children}
        </UserContext.Provider>
    );
};
