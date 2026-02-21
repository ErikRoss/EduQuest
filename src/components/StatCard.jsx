import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, icon, colorHint, subtitle }) => {
    return (
        <div className={`stat-card border-${colorHint}`}>
            <div className="stat-icon" style={{ color: `var(--color-${colorHint})` }}>
                {icon}
            </div>
            <div className="stat-data">
                <h3>{title}</h3>
                <div className="stat-val">{value}</div>
                {subtitle && <p className="stat-subtitle">{subtitle}</p>}
            </div>
            <div className="glow-bg" />
        </div>
    );
};

export default StatCard;
