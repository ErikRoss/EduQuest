import React, { useState, useRef } from 'react';

const HeroAvatar = ({ heroId, size = 'large' }) => {
    const [videoFailed, setVideoFailed] = useState(false);
    const videoRef = useRef(null);

    const videoSrc = `/assets/heroes/${heroId}.mp4`;
    const posterSrc = `/assets/heroes/${heroId}.jpeg`;

    const sizeClasses = size === 'large'
        ? 'w-[260px] h-[260px] md:w-[340px] md:h-[340px]'
        : 'w-[160px] h-[160px] md:w-[220px] md:h-[220px]';

    return (
        <div className={`relative ${sizeClasses} rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl`}>
            {!videoFailed ? (
                <video
                    ref={videoRef}
                    src={videoSrc}
                    poster={posterSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onError={() => setVideoFailed(true)}
                    className="w-full h-full object-cover"
                />
            ) : (
                <img
                    src={posterSrc}
                    alt={heroId}
                    className="w-full h-full object-cover"
                />
            )}
        </div>
    );
};

export default HeroAvatar;
