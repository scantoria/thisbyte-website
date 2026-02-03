import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services - ThisByte",
  description:
    "Comprehensive IT engineering services that address your entire technology ecosystem.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <ApproachSection />
    </>
  );
}

function ServicesHero() {
  return (
    <section className="px-5 md:px-20 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-xs md:text-sm text-[var(--color-accent)] tracking-[0.15em] font-semibold">
          Services
        </p>
        <h1 className="mt-5 md:mt-8 text-4xl md:text-6xl font-bold text-[var(--color-text-primary)]">
          How We Help
        </h1>
        <p className="mt-4 md:mt-5 text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">
          Comprehensive IT engineering services that address your entire
          technology ecosystem.
        </p>
      </div>
    </section>
  );
}

function ServicesGrid() {
  const services = [
    {
      title: "Custom Platform Development",
      description:
        "Replace manual processes and Excel sheets with modern, tailored applications built on robust stacks like React.js and Node.js.",
    },
    {
      title: "Integration & Automation",
      description:
        "Deploy orchestration platforms and RPA solutions to connect disparate technologies and eliminate repetitive manual tasks.",
    },
    {
      title: "Governance as a Service",
      description:
        "Establish documented, repeatable processes for risk management and compliance based on federal-level standards.",
    },
    {
      title: "Cloud Modernization",
      description:
        "Architect scalable Azure/AWS environments and redesign networks for measurable cost savings and improved reliability.",
    },
    {
      title: "Mobile Application Products",
      description:
        "Proprietary applications launched on Google Play Store and Apple App Store, with a growing product pipeline.",
    },
    {
      title: "Fractional CIO Services",
      description:
        "Strategic technology leadership, governance oversight, and budget management without full-time executive costs.",
    },
  ];

  return (
    <section className="px-5 md:px-20 py-16 md:py-24 border-y border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="card p-8 md:p-9">
      <h3 className="text-xl md:text-[22px] font-semibold text-[var(--color-text-primary)] leading-snug">
        {title}
      </h3>
      <p className="mt-4 text-[15px] text-[var(--color-text-secondary)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function ApproachSection() {
  const steps = [
    {
      number: "01",
      title: "Discovery & Assessment",
      description:
        "We analyze your current technology landscape, identifying gaps, risks, and opportunities for improvement.",
    },
    {
      number: "02",
      title: "Strategic Planning",
      description:
        "Develop a comprehensive roadmap that aligns technology investments with your business objectives.",
    },
    {
      number: "03",
      title: "Implementation",
      description:
        "Execute with precision, building secure, scalable infrastructure and applications that meet compliance requirements.",
    },
    {
      number: "04",
      title: "Ongoing Support",
      description:
        "Provide continuous governance, optimization, and strategic guidance to ensure long-term success.",
    },
  ];

  return (
    <section className="px-5 md:px-20 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text-primary)]">
          Our Approach
        </h2>

        <div className="mt-8 md:mt-12 space-y-8 md:space-y-10">
          {steps.map((step) => (
            <ApproachStep key={step.number} {...step} />
          ))}
        </div>

        <div className="mt-10 md:mt-16">
          <Link
            href="/contact"
            className="inline-block btn-primary text-sm md:text-base"
          >
            Discuss Your Project
          </Link>
        </div>
      </div>
    </section>
  );
}

function ApproachStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-5 md:gap-10">
      <span className="font-mono text-3xl md:text-5xl font-bold text-[var(--color-accent)]/30">
        {number}
      </span>
      <div className="flex-1">
        <h3 className="text-xl md:text-2xl font-semibold text-[var(--color-text-primary)]">
          {title}
        </h3>
        <p className="mt-2 text-[15px] md:text-base text-[var(--color-text-secondary)] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
