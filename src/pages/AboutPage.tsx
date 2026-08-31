import React from 'react';
import {
  ArrowRight,
  Code2,
  Cpu,
  Sparkles,
  Shield,
  Zap,
  Users,
  MapPin,
  Mail,
} from 'lucide-react';
import aboutTeamImg from '../../assets/about_team.jpg';
import processStep1Img from '../../assets/process_step1.jpg';
import processStep2Img from '../../assets/process_step2.jpg';
import processStep3Img from '../../assets/process_step3.jpg';
import processStep4Img from '../../assets/process_step4.jpg';
import {
  ABOUT_VALUES,
  ABOUT_PROCESS,
  ABOUT_STATS,
  STUDIO_CONTACT,
} from '../data/content';

interface AboutPageProps {
  onNavigateHome: () => void;
  onOpenContact: (preselectedService?: string) => void;
}

const VALUE_ICONS: Record<string, React.ReactNode> = {
  code: <Code2 className="w-5 h-5" />,
  cpu: <Cpu className="w-5 h-5" />,
  sparkles: <Sparkles className="w-5 h-5" />,
  shield: <Shield className="w-5 h-5" />,
  zap: <Zap className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
};

const PROCESS_IMAGES: Record<string, string> = {
  "01": processStep1Img,
  "02": processStep2Img,
  "03": processStep3Img,
  "04": processStep4Img,
};

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenContact }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-[#111111] dark:text-[#f5f5f5] pb-20 transition-colors duration-300">
      <div className="max-w-[90vw] mx-auto md:max-w-full space-y-24 md:space-y-28">
        {/* Hero */}
        <section className="relative min-h-screen overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
            style={{
              backgroundImage: `url(${aboutTeamImg})`,
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Cinematic Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/70" />

          {/* Content */}
          <div className="relative z-10 min-h-screen translate-y-1/11 flex items-center justify-center px-6">
            <div className="w-full max-w-4xl mx-auto text-center">
              {/* Eyebrow */}
              <span className="inline-block mb-6 text-[10px] sm:text-xs font-mono tracking-[0.35em] uppercase text-white/60">
                Who we are
              </span>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-medium tracking-[-0.04em] leading-[1.05] text-white">
                We design and engineer{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">high-impact</span>

                  {/* <span className="absolute left-0 right-0 -bottom-1 md:-bottom-2 h-[2px] bg-white/80" /> */}
                </span>{" "}
                digital solutions.
              </h1>

              {/* Description */}
              <p className="mt-8 mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-white/70 leading-relaxed">
                Techno Techin is an independent digital technology studio
                building fast web platforms, thoughtful digital experiences, and
                reliable technology solutions for businesses that value
                precision.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => onOpenContact("Combined Digital Suite")}
                  className="group inline-flex items-center justify-center gap-3 min-w-[190px] px-6 py-4 bg-white text-black font-semibold text-xs tracking-[0.12em] uppercase rounded-xl hover:bg-neutral-200 transition-all duration-300"
                >
                  <span>Let's Work Together</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button className="group inline-flex items-center justify-center gap-3 min-w-[180px] px-6 py-4 text-white font-semibold text-xs tracking-[0.12em] uppercase border border-white/30 rounded-xl backdrop-blur-sm hover:bg-white/10 hover:border-white/60 transition-all duration-300">
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

              {/* Scroll Indicator */}
              <div className="mt-16 flex flex-col items-center gap-3 text-white/40">
                <span className="text-[9px] font-mono tracking-[0.35em] uppercase">
                  Scroll
                </span>

                <div className="relative w-px h-8 overflow-hidden bg-white/10">
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-white/60 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {ABOUT_STATS.map((stat) => (
            <div
              key={stat.label}
              className="border border-[#EFEFEF] dark:border-[#2a2a2a] rounded-xl p-6 text-center"
            >
              <p className="text-3xl md:text-4xl font-medium tracking-tight">
                {stat.value}
              </p>
              <p className="mt-2 text-xs text-[#888888] dark:text-[#999999] uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start border-t border-[#F0F0F0] dark:border-[#222222] pt-16">
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#888888]">
              Our mission
            </span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight leading-tight">
              Technology that works quietly and delivers loudly.
            </h2>
          </div>
          <div className="space-y-4 text-[#666666] dark:text-[#aaaaaa] leading-relaxed">
            <p>
              We believe the best digital products disappear into the
              experience. Users should not notice the architecture — they should
              notice the speed, clarity, and reliability.
            </p>
            <p>
              From Sipri Bazar to clients worldwide, Techno Techin brings the
              same standard to every engagement: listen first, architect
              thoughtfully, build cleanly, and ship something your business can
              depend on for years.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="max-w-2xl space-y-3">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#888888]">
              What we stand for
            </span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
              Principles behind every project.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ABOUT_VALUES.map((value) => (
              <div
                key={value.title}
                className="border border-[#EFEFEF] dark:border-[#2a2a2a] rounded-xl p-6 space-y-4 hover:border-[#D4D4D8] dark:hover:border-[#444444] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAFAFA] dark:bg-[#1a1a1a] border border-[#EFEFEF] dark:border-[#333333] flex items-center justify-center text-[#111111] dark:text-white">
                  {VALUE_ICONS[value.icon]}
                </div>
                <h3 className="text-lg font-medium">{value.title}</h3>
                <p className="text-sm text-[#666666] dark:text-[#999999] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <section className="max-w-7xl mx-auto border-t border-[#F0F0F0] dark:border-[#222222] pt-16 space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#888888] dark:text-[#a0a0a0]">
              HOW WE WORK
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-[#111111] dark:text-white">
              A clear path from idea to launch.
            </h2>
            <div className="w-14 h-[2px] bg-[#111111] dark:bg-white pt-0.5" />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ABOUT_PROCESS.map((item) => {
              const imageSrc = PROCESS_IMAGES[item.step];
              return (
                <div
                  key={item.step}
                  className="bg-white dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] rounded-2xl p-5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-300 group"
                >
                  <div>
                    {/* Graphic Box */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 mb-6">
                      <img
                        src={imageSrc}
                        alt={item.title}
                        className="w-full h-full object-cover grayscale contrast-[1.05] group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>

                    {/* Step tag */}
                    <span className="block text-[11px] font-mono tracking-[0.2em] uppercase text-[#888888] dark:text-neutral-400 mb-2">
                      STEP {item.step}
                    </span>

                    {/* Step Title */}
                    <h3 className="text-xl font-medium text-[#111111] dark:text-white tracking-tight mb-3">
                      {item.title}
                    </h3>

                    {/* Line Accent */}
                    <div className="w-8 h-[1.5px] bg-neutral-300 dark:bg-neutral-700 mb-4" />

                    {/* Description */}
                    <p className="text-sm text-[#666666] dark:text-[#999999] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Location */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 border border-[#EFEFEF] dark:border-[#2a2a2a] rounded-2xl p-8 md:p-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#888888]">
              <MapPin className="w-4 h-4" />
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase">
                Studio location
              </span>
            </div>
            <h3 className="text-2xl font-medium">
              Based in Jhansi, serving clients globally.
            </h3>
            <address className="text-sm text-[#666666] dark:text-[#aaaaaa] leading-relaxed not-italic">
              {STUDIO_CONTACT.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
          <div className="space-y-4 lg:border-l lg:border-[#EFEFEF] dark:lg:border-[#2a2a2a] lg:pl-10">
            <div className="flex items-center gap-2 text-[#888888]">
              <Mail className="w-4 h-4" />
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase">
                Get in touch
              </span>
            </div>
            <p className="text-sm text-[#666666] dark:text-[#aaaaaa] leading-relaxed">
              Reach out for architecture consultations, payment integrations,
              website design, VPN setup, or a combined scope across multiple
              services.
            </p>
            <a
              href={`mailto:${STUDIO_CONTACT.email}`}
              className="inline-block font-mono text-sm hover:underline"
            >
              {STUDIO_CONTACT.email}
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-7xl mx-auto p-8 md:p-12 rounded-2xl bg-[#111111] dark:bg-[#161616] text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-transparent dark:border-[#2a2a2a]">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-medium">
              Ready to discuss your project?
            </h3>
            <p className="text-sm text-neutral-400">
              Let's coordinate on API structures, custom layouts, or database
              connections.
            </p>
          </div>
          <button
            onClick={() => onOpenContact("Combined Digital Suite")}
            className="group whitespace-nowrap inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-black font-semibold text-xs tracking-wider uppercase rounded-xl hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <span>Initiate Consult</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
