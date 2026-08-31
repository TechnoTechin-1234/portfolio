import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import {
  SERVICES_DATA,
  getServiceContactLabel,
  getVariantContactLabel,
} from "../data/content";

interface ServiceDetailPageProps {
  serviceId: string;
  onNavigateHome: () => void;
  onNavigateService: (serviceId: string) => void;
  onOpenContact: (preselectedService?: string) => void;
}

/* =========================================================
   SERVICE IMAGES
========================================================= */

const SERVICE_IMAGES: Record<string, string> = {
  "7-layer-design": "/7-layer.png",
  "3-layer-design": "/3-layer.png",
  "single-website-design": "/single-website.png",
  "single-layer-design": "/single-layer.png",
  cleanup: "/cleanup.png",
  "vpn-service": "/vpn.png",
};

/* =========================================================
   COMPONENT
========================================================= */

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceId,
  onNavigateHome,
  onNavigateService,
  onOpenContact,
}) => {
  const service = SERVICES_DATA.find((s) => s.id === serviceId);

  /* =======================================================
     SERVICE NOT FOUND
  ======================================================= */

  if (!service) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-[#111111] dark:text-[#f5f5f5] pt-28 pb-20 px-6 flex flex-col items-center justify-center text-center transition-colors duration-300">
        <h1 className="text-3xl font-medium text-[#111111] dark:text-white">
          Service not found
        </h1>

        <p className="text-[#666666] dark:text-[#999999] mt-2">
          The requested service does not exist in our catalog.
        </p>

        <button
          onClick={onNavigateHome}
          className="mt-6 px-6 py-3 bg-[#111111] dark:bg-white text-white dark:text-[#111111] font-semibold text-xs tracking-wider uppercase hover:bg-[#333333] dark:hover:bg-[#e5e5e5] transition-colors cursor-pointer"
        >
          Return Home
        </button>
      </div>
    );
  }

  const serviceImage = SERVICE_IMAGES[service.id];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-[#111111] dark:text-[#f5f5f5] pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-10">
        {/* ===================================================
            BACK BUTTON
        =================================================== */}

        <motion.button
          initial={{
            opacity: 0,
            x: -10,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.35,
          }}
          onClick={() => onNavigateService("services")}
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#888888] dark:text-[#999999] hover:text-[#111111] dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />

          <span>Back to Services</span>
        </motion.button>

        {/* ===================================================
            SERVICE IMAGE
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="relative w-full h-[240px] sm:h-[320px] md:h-[390px] overflow-hidden rounded-2xl border border-[#EFEFEF] dark:border-[#2a2a2a] bg-[#F5F5F5] dark:bg-[#111111]"
        >
          {serviceImage ? (
            <img
              src={serviceImage}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-[#999999] dark:text-[#666666]">
              No image available
            </div>
          )}

          {/* Image overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

          {/* Service number */}

          <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-sm text-[10px] font-mono tracking-[0.18em] uppercase text-[#111111] dark:text-white border border-white/20">
              {service.number}
            </span>
          </div>
        </motion.div>

        {/* ===================================================
            HERO CONTENT
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.08,
          }}
          className="space-y-5"
        >
          {/* TAG + PRICE */}

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-[#888888] dark:text-[#999999]">
              {service.number} — {service.tagline}
            </span>

            {!service.hasVariants && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F5F5F5] dark:bg-[#171717] border border-[#EAEAEA] dark:border-[#303030] text-xs font-mono font-semibold text-[#111111] dark:text-white">
                {service.price}
              </span>
            )}
          </div>

          {/* TITLE */}

          <h1 className="text-4xl md:text-6xl font-medium tracking-tight leading-[1.05] text-[#111111] dark:text-white">
            {service.title}
          </h1>

          {/* DESCRIPTION */}

          <p className="text-base md:text-lg text-[#666666] dark:text-[#a5a5a5] leading-relaxed max-w-3xl">
            {service.description}
          </p>

          {/* SINGLE SERVICE CTA */}

          {!service.hasVariants && (
            <button
              type="button"
              onClick={() => onOpenContact(getServiceContactLabel(service))}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#111111] dark:bg-white text-white dark:text-[#111111] font-semibold text-xs tracking-wider uppercase hover:bg-[#333333] dark:hover:bg-[#e5e5e5] transition-colors cursor-pointer"
            >
              <span>Inquire Service</span>

              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </motion.div>

        {/* ===================================================
            VARIANTS
        =================================================== */}

        {service.hasVariants && service.variants && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              delay: 0.12,
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {service.variants.map((variant, index) => (
              <motion.div
                key={variant.name}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.35,
                  delay: 0.08 * index,
                }}
                className="group border border-[#EAEAEA] dark:border-[#2b2b2b] bg-white dark:bg-[#111111] rounded-2xl p-5 sm:p-6 space-y-4 hover:border-[#CFCFCF] dark:hover:border-[#444444] transition-all duration-300"
              >
                {/* VARIANT HEADER */}

                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-base sm:text-lg font-medium leading-snug text-[#111111] dark:text-white">
                    {variant.name}
                  </h2>

                  <span className="shrink-0 inline-flex items-center px-2.5 py-1 rounded-md bg-[#F5F5F5] dark:bg-[#1b1b1b] border border-[#EAEAEA] dark:border-[#303030] text-xs font-mono font-semibold text-[#111111] dark:text-white">
                    {variant.price}
                  </span>
                </div>

                {/* VARIANT DESCRIPTION */}

                <p className="text-sm text-[#666666] dark:text-[#999999] leading-relaxed">
                  {variant.desc}
                </p>

                {/* CTA */}

                <button
                  type="button"
                  onClick={() => onOpenContact(getVariantContactLabel(variant))}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#111111] dark:bg-white text-white dark:text-[#111111] font-semibold text-xs tracking-wider uppercase hover:bg-[#333333] dark:hover:bg-[#e5e5e5] transition-colors cursor-pointer"
                >
                  <span>Select this option</span>

                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ===================================================
            SCOPE
        =================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.45,
          }}
          className="border-t border-[#EFEFEF] dark:border-[#2a2a2a] pt-10 space-y-6"
        >
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#999999] dark:text-[#777777]">
              What's included
            </span>

            <h2 className="mt-2 text-2xl font-medium tracking-tight text-[#111111] dark:text-white">
              Scope
            </h2>
          </div>

          <ul className="space-y-3">
            {service.detailedScope.map((scope) => (
              <li key={scope} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#F5F5F5] dark:bg-[#181818] border border-[#EAEAEA] dark:border-[#303030] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-[#111111] dark:text-white" />
                </span>

                <span className="text-sm text-[#555555] dark:text-[#a0a0a0] leading-relaxed pt-0.5">
                  {scope}
                </span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* ===================================================
            DELIVERABLES
        =================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.45,
          }}
          className="border-t border-[#EFEFEF] dark:border-[#2a2a2a] pt-10 space-y-6"
        >
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#999999] dark:text-[#777777]">
              Final output
            </span>

            <h2 className="mt-2 text-2xl font-medium tracking-tight text-[#111111] dark:text-white">
              Deliverables
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.deliverables.map((item) => (
              <div
                key={item}
                className="group border border-[#EAEAEA] dark:border-[#2b2b2b] bg-white dark:bg-[#111111] rounded-xl px-4 py-4 text-sm text-[#333333] dark:text-[#b5b5b5] hover:border-[#CFCFCF] dark:hover:border-[#444444] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111] dark:bg-white shrink-0" />

                  <span>{item}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ===================================================
            FOCUS AREAS
        =================================================== */}

        {service.focusAreas && service.focusAreas.length > 0 && (
          <motion.section
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.45,
            }}
            className="border-t border-[#EFEFEF] dark:border-[#2a2a2a] pt-10 space-y-5"
          >
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#999999] dark:text-[#777777]">
                Key priorities
              </span>

              <h2 className="mt-2 text-2xl font-medium tracking-tight text-[#111111] dark:text-white">
                Focus Areas
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {service.focusAreas.map((area) => (
                <span
                  key={area}
                  className="px-3 py-2 rounded-full border border-[#EAEAEA] dark:border-[#303030] bg-[#FAFAFA] dark:bg-[#111111] text-xs text-[#555555] dark:text-[#999999]"
                >
                  {area}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* ===================================================
            BOTTOM NAV
        =================================================== */}

        <div className="border-t border-[#EFEFEF] dark:border-[#2a2a2a] pt-8 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center text-xs uppercase tracking-widest">
          <span className="text-[#888888] dark:text-[#777777]">
            {service.title}
          </span>

          <button
            type="button"
            onClick={() => onNavigateService("services")}
            className="text-[#666666] dark:text-[#999999] hover:text-[#111111] dark:hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>All services</span>

            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
