"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ContactPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#047857] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Reach Out
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2238] mt-3">
          {t.nav.contact}
        </h1>
        <p className="mt-3 text-base text-slate-600">
          {t.getInTouch.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 border-slate-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#047857] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0B2238]">Office Address</h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  Madeena Welfare Society Campus, Main Road, Bhatkal, Karnataka — 581320
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-slate-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#047857] flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0B2238]">Email Inquiries</h3>
                <p className="text-sm text-slate-600 mt-1">
                  contact@madeenaws.bhatkal.org
                </p>
                <p className="text-xs text-slate-400 mt-0.5">We reply within 24–48 hours</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-slate-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#047857] flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0B2238]">Helpline & WhatsApp</h3>
                <p className="text-sm text-slate-600 mt-1">
                  +91 91123 45678 / +91 8386 226789
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Mon - Sat: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <Card className="p-8 border-slate-200">
            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <CheckCircle className="w-14 h-14 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-[#0B2238]">Thank You!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Your message has been received by Madeena Welfare Society Bhatkal. Our community coordinators will reach out shortly.
                </p>
                <Button
                  variant="outline-pill"
                  onClick={() => setSubmitted(false)}
                  className="mt-4"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-[#0B2238]">Send a Direct Message</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Mohammed Farhan"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Subject / Program Area
                  </label>
                  <select className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857] bg-white">
                    <option>General Welfare Inquiry</option>
                    <option>Education Scholarship Support</option>
                    <option>Medical & Healthcare Assistance</option>
                    <option>Emergency Relief</option>
                    <option>Volunteer Opportunity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can Madeena Welfare Society assist you?"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#047857]"
                  ></textarea>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <span>Send Message</span>
                  <Send className="w-4 h-4 rtl:rotate-180" />
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
