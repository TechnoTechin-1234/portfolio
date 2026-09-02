import React from 'react';
import { Shield, EyeOff, Lock, Server, Trash2, ArrowRight, Check } from 'lucide-react';
import { POLICY_DOCUMENTS, STUDIO_CONTACT } from '../data/content';

interface PrivacyPageProps {
  onNavigateHome: () => void;
  onOpenContact: (preselectedService?: string) => void;
  onNavigatePolicy: (policyKey: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({
  onNavigateHome,
  onOpenContact,
  onNavigatePolicy,
}) => {
  const data = POLICY_DOCUMENTS.privacy;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-[#111111] dark:text-[#f5f5f5] pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Hero Header */}
        <section className="space-y-6 border-b border-[#F0F0F0] dark:border-[#222222] pb-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-full text-[11px] font-mono tracking-wider uppercase text-emerald-700 dark:text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Data Protection Shield Active</span>
            </div>
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              Effective Date: {data.lastUpdated}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#111111] dark:text-white">
            {data.title}
          </h1>

          <p className="text-lg md:text-xl text-[#666666] dark:text-[#aaaaaa] max-w-3xl leading-relaxed">
            {data.summary}
          </p>

          {/* Policy Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={() => onNavigatePolicy('terms')}
              className="px-4 py-2 text-xs font-medium uppercase tracking-wider border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 rounded-lg transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => onNavigatePolicy('privacy')}
              className="px-4 py-2 text-xs font-medium uppercase tracking-wider bg-[#111111] dark:bg-white text-white dark:text-[#111111] rounded-lg transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigatePolicy('refund')}
              className="px-4 py-2 text-xs font-medium uppercase tracking-wider border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 rounded-lg transition-colors cursor-pointer"
            >
              Refund Guarantee
            </button>
          </div>
        </section>

        {/* Security Principles Banner */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-medium">Voluntary Scope Collection</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We only request necessary project requirements voluntarily provided by you during consultation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className="text-base font-medium">Zero Data Monetization</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Your details are never sold, rented, or distributed to advertising networks or external data brokers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-base font-medium">Encrypted Vault Storage</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              All project repositories, server credentials, and communications are shielded by studio encryption.
            </p>
          </div>
        </section>

        {/* Detailed Sections List */}
        <section className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
              Privacy Protocols
            </span>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
              Data Handling Standard
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {data.sections.map((sec, idx) => (
              <div
                key={sec.heading}
                className="p-8 rounded-2xl bg-white dark:bg-[#141414] border border-[#EFEFEF] dark:border-[#242424] space-y-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors shadow-sm"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
                      0{idx + 1}
                    </span>
                    <h3 className="text-xl font-medium text-[#111111] dark:text-white tracking-tight">
                      {sec.heading}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
                    Verified Clause
                  </span>
                </div>

                <p className="text-sm md:text-base text-[#555555] dark:text-[#aaaaaa] leading-relaxed pl-11">
                  {sec.content}
                </p>

                {idx === 2 && (
                  <div className="mt-6 ml-11 p-5 rounded-xl bg-neutral-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Trash2 className="w-5 h-5 text-rose-400 shrink-0" />
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider">Client Data Erasure Right</h4>
                        <p className="text-xs text-neutral-400">Request total purge of project records & repository snapshots at any time.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenContact('Data Deletion Request')}
                      className="px-4 py-2 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer shrink-0"
                    >
                      Request Erasure
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Data Security Specs */}
        <section className="p-8 rounded-2xl bg-[#FAFAFA] dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 space-y-6">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            <h3 className="text-lg font-medium">Techno Techin Security Commitments</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-2.5 text-xs text-neutral-700 dark:text-neutral-300">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>TLS / SSL Encrypted In-Transit</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-700 dark:text-neutral-300">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>AES-256 Storage at Rest</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-700 dark:text-neutral-300">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>No Ad Tracking Cookies</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-700 dark:text-neutral-300">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Strict Staff Access Control</span>
            </div>
          </div>
        </section>

        {/* Footer Contact */}
        <section className="p-8 md:p-10 rounded-2xl bg-[#111111] dark:bg-[#161616] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-medium">Have questions regarding your data privacy?</h3>
            <p className="text-xs text-neutral-400">
              Directly contact our technical team at <span className="font-mono text-white">{STUDIO_CONTACT.email}</span>.
            </p>
          </div>
          <button
            onClick={() => onOpenContact('Privacy Inquiry')}
            className="px-6 py-3 bg-white text-black font-semibold text-xs uppercase tracking-widest rounded-xl hover:bg-neutral-200 transition-colors shrink-0 cursor-pointer flex items-center gap-2"
          >
            <span>Inquire Security</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

      </div>
    </div>
  );
};
