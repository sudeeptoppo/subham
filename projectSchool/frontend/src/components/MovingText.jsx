import React, { useState, useEffect } from 'react';

export function MovingText({
  text = "Breaking News: Its beginning to look like Christmas!",
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
  gradient = false,
  repeatCount = 5,
  className = '',
}) {
  const [isPaused, setIsPaused] = useState(false);

  // Speed values in seconds
  const speedDurations = {
    slow: '40s',
    normal: '25s',
    fast: '15s',
    'very-fast': '8s',
  };

  // Create repeated text
  const repeatedText = Array(repeatCount).fill(text).join(' • ');

  // Inline animation style
  const marqueeStyle = {
    animation: `marquee ${speedDurations[speed]} linear infinite`,
    animationPlayState: isPaused ? 'paused' : 'running',
    animationDirection: direction === 'right' ? 'reverse' : 'normal',
  };

  // Gradient colors
  const gradientClass = gradient
    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
    : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900';

  // Add CSS to document head
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes marquee {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-100%); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 overflow-hidden">
      <div
        className={`flex ${className}`}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        onClick={() => setIsPaused(!isPaused)}
      >
        {/* First marquee item */}
        <div
          className="flex whitespace-nowrap"
          style={marqueeStyle}
        >
          <div className={`flex items-center px-4 py-3 ${gradientClass} text-white font-medium`}>
            <span className="flex items-center">
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></span>
              {repeatedText}
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-3 animate-pulse"></span>
            </span>
          </div>
        </div>
        
        {/* Duplicate for seamless loop */}
        <div
          className="flex whitespace-nowrap"
          style={marqueeStyle}
        >
          <div className={`flex items-center px-4 py-3 ${gradientClass} text-white font-medium`}>
            <span className="flex items-center">
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></span>
              {repeatedText}
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-3 animate-pulse"></span>
            </span>
          </div>
        </div>
      </div>
      
      {/* Control indicator */}
      <div className="absolute bottom-1 right-2 z-10">
        <div className="text-xs text-white px-2 py-1 rounded">
          {isPaused ? '' : ''}
        </div>
      </div>
    </div>
  );
}