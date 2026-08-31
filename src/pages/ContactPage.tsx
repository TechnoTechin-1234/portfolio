import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Send,
  CheckCircle2,
  ArrowRight,
  Home,
  Search,
  ChevronDown,
} from "lucide-react";

import { ProjectInquiry } from "../types";
import {
  CONTACT_SERVICE_OPTIONS,
  resolveContactService,
  STUDIO_CONTACT,
} from "../data/content";

interface ContactPageProps {
  onNavigateHome: () => void;
  initialService?: string;
}

/* =========================================================
   HELPERS
========================================================= */

const cleanServiceName = (service: string) => {
  if (!service) return "";

  return service.replace(/\s*\(\$[\d,.]+\)/g, "").trim();
};

const getServicePrice = (service: string) => {
  if (!service) return "";

  const match = service.match(/\$[\d,.]+/);

  return match ? match[0] : "";
};

/* =========================================================
   COMPONENT
========================================================= */

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateHome,
  initialService,
}) => {
  const resolvedInitialService = resolveContactService(initialService);

  const [formData, setFormData] = useState<ProjectInquiry>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: resolvedInitialService,
    timeframe: "",
    details: "",
  });

  /*
   * Price is intentionally kept separate from formData.
   * It automatically follows the selected service.
   */
  const [price, setPrice] = useState(getServicePrice(resolvedInitialService));

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /* Service dropdown */
  const [serviceOpen, setServiceOpen] = useState(false);
  const [serviceSearch, setServiceSearch] = useState("");

  /* =========================================================
     UPDATE SERVICE FROM OUTSIDE
  ========================================================= */

  useEffect(() => {
    const nextService = resolveContactService(initialService);

    setFormData((prev) => ({
      ...prev,
      service: nextService,
    }));

    setPrice(getServicePrice(nextService));

    setSubmitted(false);
    setSubmitError(null);
  }, [initialService]);

  /* =========================================================
     SERVICE OPTIONS
  ========================================================= */

  const serviceOptions = useMemo(() => {
    const uniqueServices = Array.from(new Set(CONTACT_SERVICE_OPTIONS));

    return uniqueServices;
  }, []);

  const filteredServices = useMemo(() => {
    const query = serviceSearch.trim().toLowerCase();

    if (!query) {
      return serviceOptions;
    }

    return serviceOptions.filter((service) =>
      cleanServiceName(service).toLowerCase().includes(query),
    );
  }, [serviceOptions, serviceSearch]);

  /* =========================================================
     TIMELINE OPTIONS
  ========================================================= */

  const timeframeOptions = [
    "Immediate (< 1 mo)",
    "1 – 2 Months",
    "2 – 4 Months",
    "Flexible",
  ];

  /* =========================================================
     SERVICE CHANGE
  ========================================================= */

  const handleServiceChange = (service: string) => {
    const serviceName = cleanServiceName(service);
    const servicePrice = getServicePrice(service);

    setFormData((prev) => ({
      ...prev,
      service: serviceName,
    }));

    setPrice(servicePrice);

    setServiceOpen(false);
    setServiceSearch("");
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setSubmitError(null);

  // Frontend validation
  if (
    !formData.name.trim() ||
    !formData.email.trim() ||
    !formData.phone.trim() ||
    !formData.service.trim() ||
    !formData.details.trim()
  ) {
    setSubmitError("Please fill in all required fields.");
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),

        // Company field removed from UI,
        // but backend receives a safe fallback.
        company: formData.company?.trim() || "N/A",

        service: cleanServiceName(formData.service),
        price: price || getServicePrice(formData.service),
        timeframe: formData.timeframe,
        details: formData.details.trim(),
      }),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        result.error || "Failed to send inquiry. Please try again.",
      );
    }

    setSubmitted(true);
  } catch (error) {
    setSubmitError(
      error instanceof Error
        ? error.message
        : "Failed to send inquiry. Please try again.",
    );
  } finally {
    setIsSubmitting(false);
  }
};

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-[#111111] dark:text-[#f5f5f5] pt-28 pb-20 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* =====================================================
            LEFT SIDE
        ===================================================== */}

        <div className="lg:col-span-5 space-y-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#888888]">
            Contact
          </span>

          <h1 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight">
            Let's start your project.
          </h1>

          <p className="text-[#666666] dark:text-[#999999] text-base leading-relaxed max-w-md">
            Share a few details and we'll respond within 24 hours with a clear
            next step.
          </p>

          {/* =================================================
              SELECTED SERVICE
          ================================================= */}

          <div className="rounded-xl border border-[#EFEFEF] dark:border-[#2a2a2a] bg-[#FAFAFA] dark:bg-[#111111] px-4 py-3">
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#888888] mb-1">
              Selected service
            </p>

            {/* ONLY SERVICE NAME — NO PRICE */}
            <p className="text-sm font-medium text-[#111111] dark:text-white">
              {cleanServiceName(formData.service)}
            </p>
          </div>

          {/* =================================================
              CONTACT INFORMATION
          ================================================= */}

          <div className="pt-4 border-t border-[#F0F0F0] dark:border-[#222222] space-y-4 text-sm">
            <div className="space-y-1">
              <p className="text-[#888888]">Direct mail</p>

              <a
                href="mailto:TechnoTechin@outlook.com"
                className="font-mono text-[#111111] dark:text-white hover:underline"
              >
                TechnoTechin@outlook.com
              </a>
            </div>

            <div className="space-y-1">
              <p className="text-[#888888]">Address</p>

              <address className="text-[#111111] dark:text-[#cccccc] leading-relaxed not-italic">
                {STUDIO_CONTACT.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          </div>
        </div>

        {/* =====================================================
            RIGHT SIDE FORM
        ===================================================== */}

        <div className="lg:col-span-7 border border-[#EFEFEF] dark:border-[#2a2a2a] rounded-2xl p-6 sm:p-10 bg-white dark:bg-[#111111]">
          <AnimatePresence mode="wait">
            {/* =================================================
                SUCCESS
            ================================================= */}

            {submitted ? (
              <motion.div
                key="success"
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -12,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#111111] dark:text-white" />

                  <h3 className="text-2xl font-medium tracking-tight">
                    Inquiry received
                  </h3>
                </div>

                <p className="text-sm text-[#666666] dark:text-[#999999] leading-relaxed">
                  Thanks {formData.name}. We'll review your request for{" "}
                  {cleanServiceName(formData.service)} and follow up at{" "}
                  {formData.email}.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={onNavigateHome}
                    className="px-6 py-3 bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Home className="w-4 h-4" />

                    <span>Go to Home</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setSubmitError(null);
                    }}
                    className="px-6 py-3 border border-[#EFEFEF] dark:border-[#333333] text-[#111111] dark:text-white text-xs font-semibold tracking-wider uppercase hover:border-[#111111] dark:hover:border-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit another</span>

                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              /* =================================================
                 FORM
              ================================================= */

              <motion.form
                key="form"
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -12,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* =================================================
                    SERVICE FIELD
                ================================================= */}

                <div className="relative">
                  <label className="block text-[11px] font-medium uppercase tracking-widest text-[#888888] mb-2">
                    Service
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setServiceOpen((prev) => !prev);
                      setServiceSearch("");
                    }}
                    className="w-full px-4 py-3 border border-[#EFEFEF] dark:border-[#333333] rounded-lg text-sm text-left text-[#111111] dark:text-white bg-white dark:bg-[#0a0a0a] focus:outline-none focus:border-[#111111] dark:focus:border-white transition-colors flex items-center justify-between cursor-pointer"
                  >
                    {/* ONLY SERVICE NAME */}
                    <span>{cleanServiceName(formData.service)}</span>

                    <motion.div
                      animate={{
                        rotate: serviceOpen ? 180 : 0,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                    >
                      <ChevronDown className="w-4 h-4 text-[#888888]" />
                    </motion.div>
                  </button>

                  {/* =================================================
                      SEARCHABLE SERVICE LIST
                  ================================================= */}

                  <AnimatePresence>
                    {serviceOpen && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -8,
                          scale: 0.98,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          y: -8,
                          scale: 0.98,
                        }}
                        transition={{
                          duration: 0.18,
                          ease: "easeOut",
                        }}
                        className="absolute z-30 left-0 right-0 mt-2 overflow-hidden rounded-xl border border-[#EFEFEF] dark:border-[#333333] bg-white dark:bg-[#111111] shadow-xl"
                      >
                        {/* SEARCH BAR */}

                        <div className="p-2 border-b border-[#EFEFEF] dark:border-[#2a2a2a]">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]" />

                            <input
                              autoFocus
                              type="text"
                              value={serviceSearch}
                              onChange={(e) => setServiceSearch(e.target.value)}
                              placeholder="Search service..."
                              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#FAFAFA] dark:bg-[#0a0a0a] text-sm text-[#111111] dark:text-white placeholder:text-[#999999] focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* SERVICE RESULTS */}

                        <div className="max-h-56 overflow-y-auto p-1.5">
                          <AnimatePresence mode="popLayout" initial={false}>
                            {filteredServices.length > 0 ? (
                              filteredServices.map((service) => {
                                const serviceName = cleanServiceName(service);

                                const servicePrice = getServicePrice(service);

                                const isSelected =
                                  cleanServiceName(formData.service) ===
                                  serviceName;

                                return (
                                  <motion.button
                                    layout
                                    key={service}
                                    type="button"
                                    initial={{
                                      opacity: 0,
                                      y: -5,
                                    }}
                                    animate={{
                                      opacity: 1,
                                      y: 0,
                                    }}
                                    exit={{
                                      opacity: 0,
                                      y: -5,
                                    }}
                                    transition={{
                                      duration: 0.15,
                                    }}
                                    onClick={() => handleServiceChange(service)}
                                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between gap-4 cursor-pointer ${
                                      isSelected
                                        ? "bg-[#111111] text-white dark:bg-white dark:text-[#111111]"
                                        : "text-[#444444] dark:text-[#cccccc] hover:bg-[#F5F5F5] dark:hover:bg-[#1a1a1a]"
                                    }`}
                                  >
                                    <span className="text-sm">
                                      {serviceName}
                                    </span>

                                    {servicePrice && (
                                      <span
                                        className={`text-[10px] font-mono shrink-0 ${
                                          isSelected
                                            ? "opacity-80"
                                            : "text-[#888888]"
                                        }`}
                                      >
                                        {servicePrice}
                                      </span>
                                    )}
                                  </motion.button>
                                );
                              })
                            ) : (
                              <motion.p
                                initial={{
                                  opacity: 0,
                                }}
                                animate={{
                                  opacity: 1,
                                }}
                                className="px-3 py-4 text-sm text-center text-[#999999]"
                              >
                                No services found
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* =================================================
                    NAME / EMAIL / PHONE
                ================================================= */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* NAME */}

                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-widest text-[#888888] mb-1.5">
                      Full Name *
                    </label>

                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-[#EFEFEF] dark:border-[#333333] rounded-lg text-sm text-[#111111] dark:text-white bg-white dark:bg-[#0a0a0a] placeholder:text-[#999999] focus:outline-none focus:border-[#111111] dark:focus:border-white transition-colors"
                    />
                  </div>

                  {/* EMAIL */}

                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-widest text-[#888888] mb-1.5">
                      Email *
                    </label>

                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-[#EFEFEF] dark:border-[#333333] rounded-lg text-sm text-[#111111] dark:text-white bg-white dark:bg-[#0a0a0a] placeholder:text-[#999999] focus:outline-none focus:border-[#111111] dark:focus:border-white transition-colors"
                    />
                  </div>

                  {/* PHONE */}

                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-widest text-[#888888] mb-1.5">
                      Phone Number *
                    </label>

                    <input
                      type="tel"
                      required
                      placeholder="Your Phone Number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-[#EFEFEF] dark:border-[#333333] rounded-lg text-sm text-[#111111] dark:text-white bg-white dark:bg-[#0a0a0a] placeholder:text-[#999999] focus:outline-none focus:border-[#111111] dark:focus:border-white transition-colors"
                    />
                  </div>
                </div>

                {/* =================================================
                    PRICE FIELD
                ================================================= */}

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-widest text-[#888888] mb-1.5">
                    Price
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      value={price}
                      readOnly
                      placeholder="Select a service"
                      className="w-full px-4 py-3 border border-[#EFEFEF] dark:border-[#333333] rounded-lg text-sm text-[#111111] dark:text-white bg-[#FAFAFA] dark:bg-[#0d0d0d] placeholder:text-[#999999] focus:outline-none cursor-default"
                    />
                  </div>
                </div>

                {/* =================================================
                    TIMELINE
                ================================================= */}

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-widest text-[#888888] mb-2">
                    Timeline
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timeframeOptions.map((time) => (
                      <button
                        type="button"
                        key={time}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            timeframe: time,
                          })
                        }
                        className={`py-2 px-1 text-[11px] font-medium border rounded-lg text-center transition-all cursor-pointer ${
                          formData.timeframe === time
                            ? "border-[#111111] dark:border-white bg-[#111111] dark:bg-white text-white dark:text-[#111111]"
                            : "border-[#EFEFEF] dark:border-[#333333] text-[#666666] dark:text-[#999999] hover:border-[#111111] dark:hover:border-white"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* =================================================
                    PROJECT DETAILS
                ================================================= */}

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-widest text-[#888888] mb-1.5">
                    Project Details *
                  </label>

                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about the work you need."
                    value={formData.details}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        details: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-[#EFEFEF] dark:border-[#333333] rounded-lg text-sm text-[#111111] dark:text-white bg-white dark:bg-[#0a0a0a] placeholder:text-[#999999] focus:outline-none focus:border-[#111111] dark:focus:border-white transition-colors resize-none"
                  />
                </div>

                {/* =================================================
                    ERROR
                ================================================= */}

                {submitError && (
                  <motion.p
                    initial={{
                      opacity: 0,
                      y: -4,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="text-sm text-red-600 dark:text-red-400"
                  >
                    {submitError}
                  </motion.p>
                )}

                {/* =================================================
                    SUBMIT
                ================================================= */}

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#111111] dark:bg-white text-white dark:text-[#111111] font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Inquiry"}</span>

                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
