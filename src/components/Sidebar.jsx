import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { LayoutDashboard, ShoppingBag, Users, Shield, Loader, Sword } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
    const { user, loading } = useUser();

    return (
        <aside className="sidebar">
            <div className="logo-container">
                <div className="logo-icon">⚔️</div>
                <div className="logo-text">EduQuest</div>
            </div>

            {!loading && user && (
                <div className="user-mini-profile">
                    <div className="avatar-circle">
                        <span role="img" aria-label="avatar">🧙‍♂️</span>
                    </div>
                    <div className="user-info">
                        <h4>{user.name}</h4>
                        <p className="level-badge">Lvl {user.level} {user.avatar}</p>
                    </div>
                </div>
            )}
            {loading && <div className="loader"><Loader className="spin" size={24} /></div>}

            <nav className="nav-menu">
                <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <LayoutDashboard size={20} />
                    <span>Hero Dashboard</span>
                </NavLink>
                <NavLink to="/marketplace" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <ShoppingBag size={20} />
                    <span>Marketplace</span>
                </NavLink>
                <NavLink to="/inventory" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <Sword size={20} />
                    <span>Inventory</span>
                </NavLink>
                <NavLink to="/parent-portal" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <Shield size={20} />
                    <span>Parent Portal</span>
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;
