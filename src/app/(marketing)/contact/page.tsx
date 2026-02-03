"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { sendContactForm } from "@/app/lib/firebase/client";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
    </>
  );
}

function ContactHero() {
  return (
    <section className="px-5 md:px-20 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-xs md:text-sm text-[var(--color-accent)] tracking-[0.15em] font-semibold">
          Contact
        </p>
        <h1 className="mt-5 md:mt-8 text-4xl md:text-6xl font-bold text-[var(--color-text-primary)]">
          Let&apos;s Talk
        </h1>
        <p className="mt-4 md:mt-5 text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">
          Ready to modernize your infrastructure or discuss a project? Get in
          touch and let&apos;s explore how we can help.
        </p>
      </div>
    </section>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter a message";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const success = await sendContactForm({
      name: formData.name,
      email: formData.email,
      company: formData.company || undefined,
      message: formData.message,
    });

    setIsSubmitting(false);

    if (success) {
      setSubmitted(true);
      setFormData({ name: "", email: "", company: "", message: "" });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (submitted) {
    return (
      <section className="px-5 md:px-20 py-16 md:py-24 border-t border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto">
          <div className="card p-10 text-center border-[var(--color-accent)]">
            <svg
              className="w-16 h-16 mx-auto text-[var(--color-accent)]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="mt-6 text-2xl font-semibold text-[var(--color-text-primary)]">
              Message Sent Successfully
            </h2>
            <p className="mt-4 text-[var(--color-text-secondary)]">
              Thank you for reaching out. We&apos;ll get back to you within 24
              hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-8 text-[var(--color-accent)] font-semibold hover:text-[var(--color-accent-light)] transition-colors"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-5 md:px-20 py-16 md:py-24 border-t border-[var(--color-border)]">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm text-[var(--color-text-muted)] mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input w-full ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm text-[var(--color-text-muted)] mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input w-full ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="company"
              className="block text-sm text-[var(--color-text-muted)] mb-2"
            >
              Company (Optional)
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="input w-full"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm text-[var(--color-text-muted)] mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className={`input w-full resize-none ${
                errors.message ? "border-red-500" : ""
              }`}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
