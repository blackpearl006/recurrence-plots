import React, { useState } from 'react';
import Section from '../components/Section';
import { CheckCircle, AlertCircle } from 'lucide-react';

const Results = () => {
    const [activeTab, setActiveTab] = useState('visual');

    return (
        <Section id="results" className="bg-white">
            <div className="text-center mb-16">
                <span className="text-blue-600 font-medium text-sm uppercase tracking-wider">Findings</span>
                <h2 className="text-4xl font-bold mt-2 mb-4 text-slate-900">Distinct Dynamical Signatures</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Our method reveals clear structural differences between healthy and MCI brain dynamics, achieving 93% classification accuracy.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-12">
                <div className="bg-slate-100 p-1 rounded-xl inline-flex">
                    {['visual', 'metrics', 'embeddings'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="min-h-[500px]">
                {activeTab === 'visual' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center group">
                            <div className="relative bg-green-50 rounded-3xl p-8 mb-6 transition-transform group-hover:scale-[1.02]">
                                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-green-700 shadow-sm">
                                    HEALTHY CONTROL
                                </div>
                                <img src={`${import.meta.env.BASE_URL}assets/HEALTHY.png`} alt="Healthy Recurrence Plot" className="w-full rounded-xl shadow-sm mix-blend-multiply" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Structured & Modular</h3>
                            <p className="text-slate-500 text-sm max-w-xs mx-auto">
                                Characterized by shorter diagonals and sharper box-like structures, indicating high modularity and flexible switching.
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="relative bg-red-50 rounded-3xl p-8 mb-6 transition-transform group-hover:scale-[1.02]">
                                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-red-700 shadow-sm">
                                    MCI PATIENT
                                </div>
                                <img src={`${import.meta.env.BASE_URL}assets/MCI.png`} alt="MCI Recurrence Plot" className="w-full rounded-xl shadow-sm mix-blend-multiply" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Rigid & Slow</h3>
                            <p className="text-slate-500 text-sm max-w-xs mx-auto">
                                Longer, thicker diagonal lines suggest the system gets "trapped" in states, indicating reduced dynamical complexity.
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'metrics' && (
                    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Brain Network</th>
                                        <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Accuracy</th>
                                        <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Precision</th>
                                        <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Recall</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {[
                                        { n: 'Cerebellum', a: '93.33%', p: '0.89', r: '1.00', best: true },
                                        { n: 'Cingulo-Opercular', a: '92.86%', p: '1.00', r: '0.83' },
                                        { n: 'Sensorimotor', a: '92.86%', p: '0.87', r: '1.00' },
                                        { n: 'Default Mode', a: '92.31%', p: '0.83', r: '1.00' },
                                        { n: 'Frontoparietal', a: '85.71%', p: '1.00', r: '0.80' },
                                        { n: 'Occipital', a: '78.57%', p: '0.71', r: '0.83' },
                                    ].map((row, i) => (
                                        <tr key={row.n} className={`hover:bg-slate-50 transition-colors ${row.best ? 'bg-green-50/50' : ''}`}>
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900 flex items-center gap-2">
                                                {row.best && <CheckCircle size={16} className="text-green-500" />}
                                                {row.n}
                                            </td>
                                            <td className={`px-6 py-4 text-sm text-center font-bold ${row.best ? 'text-green-600' : 'text-slate-700'}`}>{row.a}</td>
                                            <td className="px-6 py-4 text-sm text-center text-slate-500">{row.p}</td>
                                            <td className="px-6 py-4 text-sm text-center text-slate-500">{row.r}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-center text-slate-400 text-sm mt-6">
                            Results based on 100 subjects (50 HC, 50 MCI) from the ADNI dataset.
                        </p>
                    </div>
                )}

                {activeTab === 'embeddings' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h4 className="font-bold text-slate-900 mb-4 text-center">Traditional RQA Features</h4>
                            <img src={`${import.meta.env.BASE_URL}assets/DMN_RQA_TSNE.png`} alt="RQA t-SNE" className="w-full rounded-lg" />
                            <div className="mt-4 flex items-center justify-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-full text-sm font-medium mx-auto w-fit">
                                <AlertCircle size={16} />
                                <span>Significant Overlap</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm ring-2 ring-blue-100">
                            <h4 className="font-bold text-slate-900 mb-4 text-center">Proposed Latent Embeddings</h4>
                            <img src={`${import.meta.env.BASE_URL}assets/t-SNE.png`} alt="Latent Space t-SNE" className="w-full rounded-lg" />
                            <div className="mt-4 flex items-center justify-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full text-sm font-medium mx-auto w-fit">
                                <CheckCircle size={16} />
                                <span>Clear Separation</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Section>
    );
};

export default Results;
