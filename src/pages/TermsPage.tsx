import React from 'react';
import { ArrowRight, ShieldCheck, FileText, CheckCircle2, Lock, Scale } from 'lucide-react';
import { POLICY_DOCUMENTS } from '../data/content';

interface TermsPageProps {
  onNavigateHome: () => void;
  onOpenContact: (preselectedService?: string) => void;
  onNavigatePolicy: (policyKey: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({
  onNavigateHome,
  onOpenContact,
  onNavigatePolicy,
}) => {
  const data = POLICY_DOCUMENTS.terms;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-[#111111] dark:text-[#f5f5f5] pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header Section */}
        <section className="space-y-6 border-b border-[#F0F0F0] dark:border-[#222222] pb-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full text-[11px] font-mono tracking-wider uppercase text-neutral-600 dark:text-neutral-400">
              <Scale className="w-3.5 h-3.5 text-neutral-500" />
              <span>Studio Legal Agreement</span>
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
              className="px-4 py-2 text-xs font-medium uppercase tracking-wider bg-[#111111] dark:bg-white text-white dark:text-[#111111] rounded-lg transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => onNavigatePolicy('privacy')}
              className="px-4 py-2 text-xs font-medium uppercase tracking-wider border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 rounded-lg transition-colors cursor-pointer"
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

        {/* Feature Highlights Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#FAFAFA] dark:bg-[#141414] border border-[#EFEFEF] dark:border-[#262626] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1f1f1f] border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-black dark:text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-medium">100% IP Transfer</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Full ownership of source code, vector assets, and compiled software is assigned to you upon invoice completion.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAFAFA] dark:bg-[#141414] border border-[#EFEFEF] dark:border-[#262626] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1f1f1f] border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-black dark:text-white">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-medium">2 Comprehensive Revisions</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Every deliverable phase includes two full revision cycles to align precision details before final handover.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAFAFA] dark:bg-[#141414] border border-[#EFEFEF] dark:border-[#262626] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1f1f1f] border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-black dark:text-white">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-medium">Strict Confidentiality</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We maintain absolute NDA-level confidentiality for all proprietary business systems and design concepts.
            </p>
          </div>
        </section>

        {/* Content Body: Sidebar + Main Sections */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Index Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212] space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
                Document Sections
              </span>
              <nav className="space-y-2">
                {data.sections.map((sec, idx) => (
                  <a
                    key={sec.heading}
                    href={`#section-${idx + 1}`}
                    className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors py-1.5 border-b border-neutral-100 dark:border-neutral-900 last:border-0"
                  >
                    {sec.heading}
                  </a>
                ))}
              </nav>
            </div>

            <div className="p-6 rounded-2xl bg-[#111111] dark:bg-[#181818] text-white space-y-3">
              <FileText className="w-6 h-6 text-neutral-400" />
              <h4 className="text-sm font-medium">Need custom terms?</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                For enterprise multi-tier systems or master service agreements (MSA), we tailor custom clauses.
              </p>
              <button
                onClick={() => onOpenContact('Terms Consultation')}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white hover:underline pt-2 cursor-pointer"
              >
                <span>Discuss Master Scope</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </aside>

          {/* Main Sections */}
          <main className="lg:col-span-8 space-y-8">
            {data.sections.map((sec, idx) => (
              <article
                id={`section-${idx + 1}`}
                key={sec.heading}
                className="p-8 rounded-2xl bg-white dark:bg-[#141414] border border-[#EFEFEF] dark:border-[#242424] space-y-4 shadow-sm hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center font-mono text-xs font-semibold">
                    0{idx + 1}
                  </span>
                  <h2 className="text-xl md:text-2xl font-medium tracking-tight text-[#111111] dark:text-white">
                    {sec.heading}
                  </h2>
                </div>
                
                <p className="text-sm md:text-base text-[#555555] dark:text-[#aaaaaa] leading-relaxed pl-11">
                  {sec.content}
                </p>

                {/* Section Specific Visual Callouts */}
                {idx === 1 && (
                  <div className="mt-4 ml-11 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Includes 100% vector SVGs, TypeScript repositories, and compiled bundle licenses upon final payment.</span>
                  </div>
                )}
                {idx === 2 && (
                  <div className="mt-4 ml-11 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Out-of-scope requests are scoped clearly via transparent change requests before work begins.</span>
                  </div>
                )}
              </article>
            ))}
          </main>
        </section>

        {/* Bottom CTA */}
        <section className="p-8 md:p-10 rounded-2xl bg-[#111111] dark:bg-[#161616] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-medium">Ready to initiate your project under these terms?</h3>
            <p className="text-xs text-neutral-400">
              Our standard agreement applies across all Techno Techin digital suite offerings.
            </p>
          </div>
          <button
            onClick={() => onOpenContact('Initiate Under Terms')}
            className="px-6 py-3 bg-white text-black font-semibold text-xs uppercase tracking-widest rounded-xl hover:bg-neutral-200 transition-colors shrink-0 cursor-pointer"
          >
            Start Engagement
          </button>
        </section>

      </div>
    </div>
  );
};
