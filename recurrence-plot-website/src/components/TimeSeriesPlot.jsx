import React from 'react';

const TimeSeriesPlot = ({ signal, tau = 0, color = '#3b82f6', height = 100 }) => {
    const width = 400;
    const pad = 20;
    const min = Math.min(...signal);
    const max = Math.max(...signal);
    const range = max - min || 1;

    const points = signal.map((v, i) => {
        const x = pad + (i / (signal.length - 1)) * (width - 2 * pad);
        const y = pad + (1 - (v - min) / range) * (height - 2 * pad);
        return `${x},${y}`;
    }).join(' ');

    // Calculate marker positions for t, t+tau, t+2tau
    // We'll pick a fixed 't' (e.g., index 50) to demonstrate the window
    const tIndex = 50;
    const indices = [tIndex, tIndex + tau, tIndex + 2 * tau];

    const markers = indices.map((idx, i) => {
        if (idx >= signal.length) return null;
        const x = pad + (idx / (signal.length - 1)) * (width - 2 * pad);
        const y = pad + (1 - (signal[idx] - min) / range) * (height - 2 * pad);
        const colors = ['#ef4444', '#22c55e', '#3b82f6']; // Red, Green, Blue
        return (
            <g key={i}>
                <circle cx={x} cy={y} r="4" fill={colors[i]} stroke="white" strokeWidth="1.5" />
                <line x1={x} y1={pad} x2={x} y2={height - pad} stroke={colors[i]} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
            </g>
        );
    });

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#e5e7eb" strokeWidth="1" />
            <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#e5e7eb" strokeWidth="1" />
            <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {tau > 0 && markers}
            <text x={width / 2} y={height - 4} textAnchor="middle" className="fill-gray-400 text-[10px] font-sans">Time</text>
        </svg>
    );
};

export default TimeSeriesPlot;
