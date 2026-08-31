import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check, Zap, Layers3 } from "lucide-react";
import {
  SERVICES_DATA,
  getServiceContactLabel,
  getVariantContactLabel,
} from "../data/content";

interface ServicesSectionProps {
  onNavigateService: (serviceId: string) => void;
  onOpenContact: (serviceName?: string) => void;
}

const SERVICE_IMAGES: Record<string, string> = {
  "7-layer-design": "/7-layer.png",
  "3-layer-design": "/3-layer.png",
  "single-website-design": "/single-website.png",
  "single-layer-design": "/single-layer.png",
  cleanup: "/cleanup.png",
  "vpn-service": "/vpn.png",
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onNavigateService,
  onOpenContact,
}) => {
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, number>
  >({
    "7-layer-design": 0,
    "3-layer-design": 0,
  });

  const handleVariantChange = (serviceId: string, variantIndex: number) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [serviceId]: variantIndex,
    }));
  };

  return (
    <section
      id="services"
      className="w-full bg-white dark:bg-[#0a0a0a] py-24 md:py-32 border-b border-[#F0F0F0] dark:border-[#222222] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* HEADER */}
        <div className="max-w-3xl mb-14 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] uppercase text-[#888888]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111] dark:bg-white" />
            Core practice areas
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mt-3 text-3xl sm:text-4xl font-medium text-[#111111] dark:text-white tracking-tight leading-tight"
          >
            Services built around your goals.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-4 text-base text-[#666666] dark:text-[#999999] font-normal leading-relaxed"
          >
            Six focused offerings — from layered architecture and website design
            to cleanup and secure network setup.
          </motion.p>
        </div>

        {/* SERVICE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES_DATA.map((service, idx) => {
            const hasVariants =
              service.hasVariants &&
              service.variants &&
              service.variants.length > 1;

            const activeVariantIndex = selectedVariants[service.id] ?? 0;

            const activeVariant = hasVariants
              ? service.variants?.[activeVariantIndex]
              : null;

            return (
              <motion.article
                key={service.id}
                id={`service-card-${service.id}`}
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-40px",
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.04 * idx,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -4,
                }}
                className="
                  group
                  overflow-hidden
                  rounded-2xl
                  border border-[#EAEAEA]
                  dark:border-[#292929]
                  bg-white
                  dark:bg-[#111111]
                  transition-all
                  duration-300
                  hover:border-[#D2D2D2]
                  dark:hover:border-[#444444]
                  hover:shadow-[0_15px_40px_rgba(0,0,0,0.07)]
                  dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]
                "
              >
                {/* IMAGE */}
                <div className="relative h-[180px] sm:h-[190px] overflow-hidden bg-[#F4F4F4] dark:bg-[#171717]">
                  <img
                    src={SERVICE_IMAGES[service.id]}
                    alt={`${service.title} service`}
                    className="
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-[1.04]
                    "
                  />

                  {/* GRADIENT */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* PRICE */}
                  <div className="absolute top-3 right-3">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={
                          activeVariant ? activeVariant.price : service.price
                        }
                        initial={{
                          opacity: 0,
                          y: -4,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: 4,
                        }}
                        transition={{
                          duration: 0.18,
                        }}
                        className="
                          inline-flex
                          px-2.5
                          py-1.5
                          rounded-md
                          bg-white/90
                          dark:bg-black/75
                          backdrop-blur-md
                          text-[#111111]
                          dark:text-white
                          text-[12px]
                          font-mono
                        "
                      >
                        {activeVariant ? activeVariant.price : service.price}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  {/* IMAGE BOTTOM CONTENT */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.18em] text-white/75 truncate">
                        {service.tagline}
                      </span>

                      {hasVariants && (
                        <span className="shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-black/50 backdrop-blur-md text-white/90 text-[8px] uppercase tracking-wider">
                          <Layers3 className="w-2.5 h-2.5" />2 Options
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-4 sm:p-5">
                  {/* TITLE */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-lg font-medium tracking-tight text-[#111111] dark:text-white capitalize">
                        {service.title}
                      </h3>

                      <p className="mt-0.5 text-[10px] text-[#999999] dark:text-[#888888]">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  {/* VARIANT TOGGLE */}
                  {hasVariants && service.variants && (
                    <div className="mt-3 p-0.5 rounded-lg bg-[#F4F4F4] dark:bg-[#191919] border border-[#EAEAEA] dark:border-[#292929] flex">
                      {service.variants.map((variant, variantIndex) => {
                        const isActive = activeVariantIndex === variantIndex;

                        const isApi = variant.name
                          .toLowerCase()
                          .includes("api");

                        return (
                          <button
                            key={variant.name}
                            type="button"
                            onClick={() =>
                              handleVariantChange(service.id, variantIndex)
                            }
                            className="relative flex-1 cursor-pointer"
                          >
                            {isActive && (
                              <motion.div
                                layoutId={`toggle-${service.id}`}
                                className="absolute inset-0 rounded-md bg-white dark:bg-[#2A2A2A] border border-[#E2E2E2] dark:border-[#383838] shadow-sm"
                                transition={{
                                  type: "spring",
                                  stiffness: 450,
                                  damping: 32,
                                }}
                              />
                            )}

                            <span
                              className={`
                                  relative
                                  z-10
                                  flex
                                  items-center
                                  justify-center
                                  gap-1
                                  px-2
                                  py-1.5
                                  text-[8px]
                                  sm:text-[9px]
                                  font-semibold
                                  uppercase
                                  tracking-wider
                                  transition-colors
                                  ${
                                    isActive
                                      ? "text-[#111111] dark:text-white"
                                      : "text-[#888888]"
                                  }
                                `}
                            >
                              {isApi && <Zap className="w-2.5 h-2.5" />}

                              {isApi ? "API Integration" : "Standard"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* DESCRIPTION */}
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeVariant ? activeVariant.name : service.id}
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      transition={{
                        duration: 0.18,
                      }}
                      className="mt-3 text-xs text-[#666666] dark:text-[#999999] leading-relaxed line-clamp-2"
                    >
                      {activeVariant ? activeVariant.desc : service.description}
                    </motion.p>
                  </AnimatePresence>

                  {/* FEATURES */}
                  <div className="mt-3 space-y-1.5">
                    {service.detailedScope.slice(0, 2).map((scope) => (
                      <div key={scope} className="flex items-start gap-2">
                        <span className="mt-[2px] flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#F2F2F2] dark:bg-[#222222]">
                          <Check className="w-2 h-2 text-[#555555] dark:text-[#BBBBBB]" />
                        </span>

                        <span className="text-[10px] text-[#707070] dark:text-[#999999] leading-relaxed line-clamp-1">
                          {scope}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* FOCUS TAGS */}
                  <div className="mt-3 flex gap-1.5 overflow-hidden">
                    {service.focusAreas.slice(0, 2).map((focus) => (
                      <span
                        key={focus}
                        className="shrink-0 px-2 py-1 rounded-full border border-[#EAEAEA] dark:border-[#303030] text-[8px] uppercase tracking-wider text-[#888888] whitespace-nowrap"
                      >
                        {focus}
                      </span>
                    ))}
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-4 pt-3 border-t border-[#F0F0F0] dark:border-[#252525] grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onOpenContact(
                          activeVariant
                            ? getVariantContactLabel(activeVariant)
                            : getServiceContactLabel(service),
                        )
                      }
                      className="
                        w-full
                        inline-flex
                        items-center
                        justify-center
                        gap-1.5
                        py-2.5
                        rounded-lg
                        bg-[#111111]
                        dark:bg-white
                        text-white
                        dark:text-[#111111]
                        text-[9px]
                        font-semibold
                        tracking-[0.14em]
                        uppercase
                        hover:bg-[#333333]
                        dark:hover:bg-[#E5E5E5]
                        transition-all
                        cursor-pointer
                      "
                    >
                      <span>{activeVariant ? "Select" : "Order"}</span>

                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigateService(service.id)}
                      className="
                        w-full
                        inline-flex
                        items-center
                        justify-center
                        gap-1.5
                        py-2.5
                        rounded-lg
                        border
                        border-[#E8E8E8]
                        dark:border-[#303030]
                        text-[#555555]
                        dark:text-[#BBBBBB]
                        text-[9px]
                        font-semibold
                        tracking-[0.14em]
                        uppercase
                        hover:border-[#111111]
                        dark:hover:border-white
                        hover:text-[#111111]
                        dark:hover:text-white
                        transition-all
                        cursor-pointer
                      "
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
