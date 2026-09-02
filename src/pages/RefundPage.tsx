import React from 'react';
import { RefreshCw, ShieldCheck, Mail, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { POLICY_DOCUMENTS, STUDIO_CONTACT } from '../data/content';

interface RefundPageProps {
  onNavigateHome: () => void;
  onOpenContact: (preselectedService?: string) => void;
  onNavigatePolicy: (policyKey: string) => void;
}

export const RefundPage: React.FC<RefundPageProps> = ({
  onNavigateHome,
  onOpenContact,
  onNavigatePolicy,
}) => {
  const data = POLICY_DOCUMENTS.refund;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-[#111111] dark:text-[#f5f5f5] pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header Section */}
        <section className="space-y-6 border-b border-[#F0F0F0] dark:border-[#222222] pb-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-full text-[11px] font-mono tracking-wider uppercase text-amber-700 dark:text-amber-300">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>100% Risk-Free Studio Guarantee</span>
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
              className="px-4 py-2 text-xs font-medium uppercase tracking-wider border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 rounded-lg transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigatePolicy('refund')}
              className="px-4 py-2 text-xs font-medium uppercase tracking-wider bg-[#111111] dark:bg-white text-white dark:text-[#111111] rounded-lg transition-colors cursor-pointer"
            >
              Refund Guarantee
            </button>
          </div>
        </section>

        {/* 15-Day Satisfaction Guarantee Showcase Card */}
        <section className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-neutral-900 via-[#141414] to-[#1a1a1a] text-white border border-neutral-800 shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <span className="inline-block text-[11px] font-mono tracking-[0.25em] uppercase text-amber-400">
                15-Day Window
              </span>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
                100% Satisfaction Guarantee
              </h2>
              <p className="text-sm md:text-base text-neutral-300 max-w-2xl leading-relaxed">
                If within the first 15 days of project commencement or initial prototype delivery you are unsatisfied with our progress, you receive a full 100% refund of your deposit. No hassle. No friction.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl text-center min-w-[200px]">
              <span className="text-4xl font-bold font-mono text-white">100%</span>
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mt-1">Full Deposit Refund</span>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Back by Techno Techin Studio Quality Commitment</span>
            </div>
            <button
              onClick={() => onOpenContact('Refund Request')}
              className="px-6 py-3 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Initiate Refund Request
            </button>
          </div>
        </section>

        {/* 3-Step Refund Process Visual Timeline */}
        <section className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
              Process Flow
            </span>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
              3-Step Easy Refund Procedure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#141414] border border-[#EFEFEF] dark:border-[#262626] space-y-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4 text-neutral-500" />
                  <span>Submit Request</span>
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Email <span className="font-mono text-black dark:text-white">{STUDIO_CONTACT.email}</span> with your project reference number and reason for cancellation.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#141414] border border-[#EFEFEF] dark:border-[#262626] space-y-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-neutral-500" />
                  <span>Fast Verification</span>
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Our studio leads review and confirm your 15-day eligibility within 24 hours of receiving your request.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#141414] border border-[#EFEFEF] dark:border-[#262626] space-y-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>3-Day Credit Return</span>
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Your 100% initial deposit is credited back to your original payment method within 3 business days.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Sections List */}
        <section className="space-y-6">
          {data.sections.map((sec, idx) => (
            <div
              key={sec.heading}
              className="p-8 rounded-2xl bg-white dark:bg-[#141414] border border-[#EFEFEF] dark:border-[#242424] space-y-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center font-mono text-xs font-semibold">
                  0{idx + 1}
                </span>
                <h3 className="text-xl font-medium text-[#111111] dark:text-white tracking-tight">
                  {sec.heading}
                </h3>
              </div>

              <p className="text-sm md:text-base text-[#555555] dark:text-[#aaaaaa] leading-relaxed pl-11">
                {sec.content}
              </p>
            </div>
          ))}
        </section>

        {/* Footer Contact */}
        <section className="p-8 md:p-10 rounded-2xl bg-[#111111] dark:bg-[#161616] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-medium">Ready to start a risk-free project?</h3>
            <p className="text-xs text-neutral-400">
              Our 15-day money-back guarantee applies to all service tiers.
            </p>
          </div>
          <button
            onClick={() => onOpenContact('General Project')}
            className="px-6 py-3 bg-white text-black font-semibold text-xs uppercase tracking-widest rounded-xl hover:bg-neutral-200 transition-colors shrink-0 cursor-pointer flex items-center gap-2"
          >
            <span>Start Risk-Free Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

      </div>
    </div>
  );
};
