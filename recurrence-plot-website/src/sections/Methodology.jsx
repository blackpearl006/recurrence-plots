import React from 'react';
import Section from '../components/Section';
import { ArrowRight, Layers, Database, Cpu } from 'lucide-react';

const Methodology = () => {
    const steps = [
        {
            icon: <Database size={24} />,
            title: "1. Time Series Extraction",
            desc: "Extract representative BOLD signals from 160 Regions of Interest (ROIs) using the Dosenbach atlas.",
            color: "blue"
        },
        {
            icon: <Layers size={24} />,
            title: "2. Recurrence Encoding",
            desc: "Transform 1D time series into 2D Recurrence Plots, capturing non-linear phase space dynamics.",
            color: "indigo"
        },
        {
            icon: <Cpu size={24} />,
            title: "3. Latent Embedding",
            desc: "Compress high-dimensional RP images (224×224) into compact latent vectors (14×14) using a CNN Autoencoder.",
            color: "teal"
        }
    ];

    return (
        <Section id="methodology" className="bg-slate-50">
            <div className="text-center mb-16">
                <span className="text-indigo-600 font-medium text-sm uppercase tracking-wider">The Pipeline</span>
                <h2 className="text-4xl font-bold mt-2 mb-4 text-slate-900">From Signal to Symptom</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    We transform complex temporal dynamics into spatial patterns that deep learning models can understand.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {steps.map((step, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all">
                        <div className={`absolute top-0 right-0 p-4 opacity-10 text-${step.color}-600 transform scale-150 group-hover:scale-125 transition-transform`}>
                            {step.icon}
                        </div>
                        <div className={`w-12 h-12 bg-${step.color}-100 text-${step.color}-600 rounded-xl flex items-center justify-center mb-6`}>
                            {step.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                        <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500" />
                        Recurrence Visualization
                    </h4>
                    <img src={`${import.meta.env.BASE_URL}assets/RecVIZ.png`} alt="Recurrence Plot Visualization" className="w-full rounded-lg" />
                    <p className="text-sm text-slate-400 mt-4 text-center">
                        Transformation of time series state vectors into a 2D distance matrix.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-teal-500" />
                        Autoencoder Architecture
                    </h4>
                    <img src={`${import.meta.env.BASE_URL}assets/Autoencoder.png`} alt="Autoencoder Architecture" className="w-full rounded-lg" />
                    <p className="text-sm text-slate-400 mt-4 text-center">
                        Convolutional Autoencoder trained to minimize reconstruction loss + MSSIM.
                    </p>
                </div>
            </div>
        </Section>
    );
};

export default Methodology;
