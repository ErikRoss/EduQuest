import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Plus, Users, TrendingUp, Star } from 'lucide-react';
import './ParentPortal.css';

const MOCK_LEADERBOARD = [
    { id: 1, name: 'Elena V.', level: 5, avatar: '🧝‍♀️', xp: 4200 },
    { id: 2, name: 'Alex Student', level: 4, avatar: '🧙‍♂️', xp: 3450 },
    { id: 3, name: 'Max G.', level: 4, avatar: '🥷', xp: 3100 },
    { id: 4, name: 'Sophia R.', level: 3, avatar: '🧛‍♀️', xp: 2800 },
];

const ParentPortal = () => {
    const { user, grades, loading } = useUser();
    const [familyQuests, setFamilyQuests] = useState([
        { id: 1, title: 'Finish week with no grades below 10', reward: '50💎', active: true },
        { id: 2, title: 'Read 2 chapters of History', reward: '100🪙', active: false }
    ]);
    const [newQuest, setNewQuest] = useState('');

    if (loading || !user) return <div className="page-container"><h2>Loading Portal...</h2></div>;

    const subjectAverages = grades.reduce((acc, grade) => {
        if (!acc[grade.subject]) {
            acc[grade.subject] = { total: 0, count: 0 };
        }
        acc[grade.subject].total += grade.value;
        acc[grade.subject].count += 1;
        return acc;
    }, {});

    const addQuest = (e) => {
        e.preventDefault();
        if (!newQuest.trim()) return;
        setFamilyQuests([...familyQuests, { id: Date.now(), title: newQuest, reward: 'Mystery Loot', active: true }]);
        setNewQuest('');
    };

    return (
        <div className="page-container parent-portal">
            <header className="portal-header">
                <div>
                    <h1>Parent / Guardian Portal</h1>
                    <p>Monitor progress and set custom bounties.</p>
                </div>
            </header>

            <div className="portal-grid">
                {/* Left Column: Progress & Leaderboard */}
                <div className="portal-col">
                    <section className="portal-card">
                        <div className="card-header">
                            <TrendingUp className="card-icon" />
                            <h2>Subject Mastery</h2>
                        </div>
                        <div className="charts-list">
                            {Object.keys(subjectAverages).length === 0 && <p className="text-muted">No mastery data yet.</p>}
                            {Object.keys(subjectAverages).map(subject => {
                                const avg = subjectAverages[subject].total / subjectAverages[subject].count;
                                const percent = (avg / 12) * 100;
                                return (
                                    <div key={subject} className="chart-item">
                                        <div className="chart-label">
                                            <span>{subject}</span>
                                            <span>{avg.toFixed(1)} / 12</span>
                                        </div>
                                        <div className="chart-bar-bg">
                                            <div
                                                className={`chart-bar-fill ${avg >= 10 ? 'excellent' : avg >= 7 ? 'good' : 'average'}`}
                                                style={{ width: `${percent}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section className="portal-card">
                        <div className="card-header">
                            <Users className="card-icon" />
                            <h2>Class Leaderboard</h2>
                        </div>
                        <ul className="leaderboard-list">
                            {MOCK_LEADERBOARD.map((student, index) => (
                                <li key={student.id} className={`leaderboard-item ${student.name === user.name ? 'highlight' : ''}`}>
                                    <div className="rank">#{index + 1}</div>
                                    <div className="student-avatar">{student.avatar}</div>
                                    <div className="student-info">
                                        <h4>{student.name}</h4>
                                        <p>Level {student.level}</p>
                                    </div>
                                    <div className="student-xp">{student.xp} XP</div>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* Right Column: Family Quests */}
                <div className="portal-col">
                    <section className="portal-card family-quests">
                        <div className="card-header">
                            <Star className="card-icon" />
                            <h2>Family Quests</h2>
                        </div>
                        <p className="text-muted" style={{ marginBottom: '1rem' }}>
                            Create custom bounties to incentivize specific achievements outside of school.
                        </p>

                        <form onSubmit={addQuest} className="add-quest-form">
                            <input
                                type="text"
                                placeholder="E.g., Complete chores for 3 days..."
                                value={newQuest}
                                onChange={(e) => setNewQuest(e.target.value)}
                            />
                            <button type="submit"><Plus size={18} /> Add</button>
                        </form>

                        <ul className="quest-bounties">
                            {familyQuests.map(quest => (
                                <li key={quest.id} className={`bounty-item ${quest.active ? 'active' : 'completed'}`}>
                                    <div className="bounty-status"></div>
                                    <div className="bounty-content">
                                        <h4>{quest.title}</h4>
                                        <span className="bounty-reward">{quest.reward}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ParentPortal;
