import React from 'react';
import Section from '../components/Section';
import { Brain, Activity, Network } from 'lucide-react';

const ResearchContext = () => {
    return (
        <Section id="research" className="bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <span className="text-teal-600 font-medium text-sm uppercase tracking-wider">The Challenge</span>
                    <h2 className="text-4xl font-bold mt-2 mb-6 text-slate-900">Detecting Early Cognitive Decline</h2>

                    <div className="prose prose-lg text-slate-600 mb-8">
                        <p>
                            <span className="font-semibold text-slate-900">Mild Cognitive Impairment (MCI)</span> is a critical transition stage between healthy aging and dementia.
                            Early detection offers a vital window for intervention, yet traditional diagnostic methods often miss subtle non-linear changes in brain dynamics.
                        </p>
                        <p>
                            Our research leverages <span className="font-semibold text-slate-900">resting-state fMRI</span> to analyze the complex dynamical patterns of brain activity across 6 key functional networks.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                    <Brain size={20} />
                                </div>
                                <h4 className="font-bold text-slate-900">100 Subjects</h4>
                            </div>
                            <p className="text-sm text-slate-500">Balanced ADNI dataset (50 Healthy, 50 MCI) for rigorous validation.</p>
                        </div>

                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-teal-100 text-teal-600 rounded-lg">
                                    <Network size={20} />
                                </div>
                                <h4 className="font-bold text-slate-900">160 ROIs</h4>
                            </div>
                            <p className="text-sm text-slate-500">Dosenbach atlas parcellation across 6 functional brain networks.</p>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-teal-100 rounded-3xl transform rotate-3 scale-105 opacity-50" />
                    <div className="relative bg-white p-4 rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                        <img
                            src={`${import.meta.env.BASE_URL}assets/FlowDiagram.png`}
                            alt="Research Methodology Flow"
                            className="w-full h-auto rounded-xl"
                        />
                        <div className="mt-4 text-center">
                            <p className="text-sm text-slate-400 font-medium">Fig 1. Proposed Methodology Pipeline</p>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default ResearchContext;
