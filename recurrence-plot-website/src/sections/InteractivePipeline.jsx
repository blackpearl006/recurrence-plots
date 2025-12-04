import React, { useState, useEffect, useMemo } from 'react';
import Section from '../components/Section';
import PhaseSpaceViz from '../components/PhaseSpaceViz';
import TimeSeriesPlot from '../components/TimeSeriesPlot';
import RecurrencePlotCanvas from '../components/RecurrencePlotCanvas';
import { generateSignal, computeRecurrenceMatrix } from '../utils/signal';
import { SlidersHorizontal, Activity, Box, ArrowRight, Grid } from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';

const InteractivePipeline = () => {
    const [tau, setTau] = useState(10);
    const [signal, setSignal] = useState([]);
    const [isDark, setIsDark] = useState(false);

    // Generate a Lorenz attractor signal for the demo
    useEffect(() => {
        const data = generateSignal('lorenz', 500, 0.05, 0);
        setSignal(data);

        // Check for dark mode
        const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
        checkDark();

        // Listen for theme changes
        const observer = new MutationObserver(checkDark);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    // Compute RP matrix based on current signal and tau
    const rpData = useMemo(() => {
        if (!signal.length) return null;
        // Use a subset for RP to keep it fast
        const subset = signal.slice(0, 200);
        return computeRecurrenceMatrix(subset, 3, tau, 0.1); // m=3, threshold=0.1
    }, [signal, tau]);

    // Don't render until signal is loaded
    if (!signal || signal.length === 0) {
        return (
            <Section id="pipeline" className="bg-white dark:bg-slate-950 transition-colors duration-300">
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
                    <p className="text-slate-500 dark:text-slate-400 mt-4">Loading visualization...</p>
                </div>
            </Section>
        );
    }

    return (
        <Section id="pipeline" className="bg-white dark:bg-slate-950 transition-colors duration-300">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mt-2 mb-4 text-slate-900 dark:text-white">From 1D Signal to Recurrence</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                    See how the Time Delay (<span className="font-mono">τ</span>) extracts hidden 3D structure from 1D data, which is then captured in the Recurrence Plot.
                </p>
            </div>

            {/* Controls */}
            <div className="max-w-2xl mx-auto mb-12 bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <SlidersHorizontal size={20} />
                        Adjust Time Delay (<InlineMath math="\tau" />)
                    </h3>
                    <span className="text-2xl font-mono font-bold text-teal-600 dark:text-teal-400">{tau}</span>
                </div>
                <input
                    type="range"
                    min="1"
                    max="50"
                    value={tau}
                    onChange={(e) => setTau(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                    <span>Compressed (Low <InlineMath math="\tau" />)</span>
                    <span>Optimal Unfolding</span>
                    <span>Disconnected (High <InlineMath math="\tau" />)</span>
                </div>
            </div>

            {/* Unified Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">

                {/* 1. Time Series */}
                <div className="flex flex-col">
                    <div className="flex-1 bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col">
                        <h3 className="text-md font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                            <Activity size={18} className="text-blue-500" />
                            1. Input Signal
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                            We pick 3 points separated by <InlineMath math="\tau" /> to form a vector.
                        </p>
                        <div className="flex-1 min-h-[200px] bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 p-2 relative">
                            <TimeSeriesPlot signal={signal.slice(0, 200)} tau={tau} color={isDark ? '#94a3b8' : '#64748b'} />
                            {/* Legend */}
                            <div className="absolute top-2 right-2 flex flex-col gap-1 text-[10px] bg-white/80 dark:bg-slate-900/80 p-1 rounded border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> x(t)</div>
                                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> x(t+τ)</div>
                                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> x(t+2τ)</div>
                            </div>
                        </div>
                    </div>
                    <div className="h-8 flex items-center justify-center text-slate-300 dark:text-slate-700 lg:rotate-0 rotate-90">
                        <ArrowRight size={24} />
                    </div>
                </div>

                {/* 2. Phase Space */}
                <div className="flex flex-col">
                    <div className="flex-1 bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col">
                        <h3 className="text-md font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                            <Box size={18} className="text-teal-500" />
                            2. Phase Space (3D)
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                            The vectors <InlineMath math="[x(t), x(t+\tau), x(t+2\tau)]" /> trace a trajectory.
                        </p>
                        <div className="flex-1 min-h-[200px] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 relative">
                            <PhaseSpaceViz signal={signal} tau={tau} isDark={isDark} />
                        </div>
                    </div>
                    <div className="h-8 flex items-center justify-center text-slate-300 dark:text-slate-700 lg:rotate-0 rotate-90">
                        <ArrowRight size={24} />
                    </div>
                </div>

                {/* 3. Recurrence Plot */}
                <div className="flex flex-col">
                    <div className="flex-1 bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col">
                        <h3 className="text-md font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                            <Grid size={18} className="text-indigo-500" />
                            3. Recurrence Plot
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                            Distances in 3D space are visualized as a 2D plot.
                        </p>
                        <div className="flex-1 min-h-[200px] bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 p-2 flex items-center justify-center">
                            {rpData && (
                                <RecurrencePlotCanvas
                                    matrix={rpData.binary}
                                    width={250}
                                    height={250}
                                    color={isDark ? '#2dd4bf' : '#4f46e5'}
                                />
                            )}
                        </div>
                    </div>
                    <div className="h-8 lg:hidden"></div>
                </div>

            </div>
        </Section>
    );
};

export default InteractivePipeline;
