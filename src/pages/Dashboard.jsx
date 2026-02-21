import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import StatCard from '../components/StatCard';
import { Shield, Target, PlusCircle, Award, Zap } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const { user, grades, loading, syncNewGrade, xpPerLevel, activeBoosts } = useUser();
    const [simulating, setSimulating] = useState(false);

    if (loading) return <div className="page-container"><h2>Loading Hero Data...</h2></div>;
    if (!user) return null;

    const handleSimulateSync = () => {
        setSimulating(true);
        setTimeout(() => {
            // Pick a random subject and grade between 8-12
            const subjects = ['Math', 'Science', 'History', 'Literature'];
            const sub = subjects[Math.floor(Math.random() * subjects.length)];
            const val = Math.floor(Math.random() * 5) + 8;
            syncNewGrade(val, sub);
            setSimulating(false);
        }, 800);
    };

    const xpPercent = (user.xp / xpPerLevel) * 100;

    return (
        <div className="page-container dashboard">
            <header className="dashboard-header">
                <div>
                    <h1>Welcome back, {user.name}!</h1>
                    <p>Your quest continues.</p>
                </div>
                <button
                    className="sync-btn"
                    onClick={handleSimulateSync}
                    disabled={simulating}
                >
                    {simulating ? <Zap className="spin" size={18} /> : <PlusCircle size={18} />}
                    <span>{simulating ? 'Syncing...' : 'Sync Latest Grades'}</span>
                </button>
            </header>

            {/* Hero Progress Banner */}
            <section className="hero-banner">
                <div className="hero-avatar-large">
                    <span role="img" aria-label="avatar">
                        {user.equipped?.avatar?.includes('fire') ? '🔥' : user.equipped?.avatar?.includes('ice') ? '❄️' : '🧙‍♂️'}
                    </span>
                </div>
                <div className="hero-details">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h2>Level {user.level} {user.avatar}</h2>
                        <div className="equipped-mini">
                            {user.equipped?.weapon && <span title="Weapon">🗡️</span>}
                            {user.equipped?.armor && <span title="Armor">🛡️</span>}
                        </div>
                    </div>
                    <div className="xp-container">
                        <div className="xp-bar-bg">
                            <div className="xp-bar-fill" style={{ width: `${Math.min(xpPercent, 100)}%` }}></div>
                        </div>
                        <div className="xp-label">
                            <span>
                                {user.xp} / {xpPerLevel} XP
                                {activeBoosts['boost_xp'] && activeBoosts['boost_xp'] > Date.now() && <span className="boost-badge">🌟 Double XP Active!</span>}
                            </span>
                            <span>{Math.round(xpPercent)}% to Level {user.level + 1}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="stats-grid">
                <StatCard
                    title="Gold"
                    value={user.currency.gold}
                    icon={<span role="img" aria-label="gold">🪙</span>}
                    colorHint="accent"
                />
                <StatCard
                    title="Diamonds"
                    value={user.currency.diamonds}
                    icon={<span role="img" aria-label="diamond">💎</span>}
                    colorHint="primary"
                />
                <StatCard
                    title="Total Quests"
                    value={grades.length}
                    icon={<Shield size={24} />}
                    colorHint="success"
                />
                <StatCard
                    title="Avg Grade"
                    value={grades.length > 0 ? (grades.reduce((acc, g) => acc + g.value, 0) / grades.length).toFixed(1) : 0}
                    icon={<Target size={24} />}
                    colorHint="danger"
                />
            </section>

            {/* Recent Quests (Grades) */}
            <section className="recent-quests">
                <h3>Recent Quest Log (Grades)</h3>
                <div className="quest-list">
                    {grades.length === 0 && <p className="no-quests">No recent quests found.</p>}
                    {grades.slice(0, 5).map(grade => (
                        <div key={grade.id} className="quest-item">
                            <div className="quest-icon">
                                <Award size={20} color={grade.value >= 10 ? "var(--color-accent)" : "var(--color-success)"} />
                            </div>
                            <div className="quest-info">
                                <h4>{grade.subject} Assignment</h4>
                                <p>{new Date(grade.timestamp).toLocaleDateString()} &middot; via {grade.source.replace('_', ' ')}</p>
                            </div>
                            <div className={`quest-score ${grade.value >= 10 ? 'high-score' : ''}`}>
                                {grade.value}/12
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
