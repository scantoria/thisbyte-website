import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValueSection />
      <CTASection />
    </>
  );
}

function HeroSection() {
  return (
    <section className="px-5 md:px-20 py-16 md:py-32">
      <div className="max-w-7xl mx-auto">
        {/* Tagline */}
        <p className="font-mono text-xs md:text-sm text-[var(--color-accent)] tracking-[0.15em] font-semibold animate-fade-in-up">
          Accurate IT Engineering
        </p>

        {/* Main Heading */}
        <h1 className="mt-5 md:mt-8 text-4xl md:text-7xl font-bold text-[var(--color-text-primary)] leading-tight animate-fade-in-up animation-delay-200">
          The Full Stack
          <br />
          and Beneath
        </h1>

        {/* Subtitle */}
        <p className="mt-5 md:mt-8 text-base md:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-3xl animate-fade-in-up animation-delay-400">
          We engineer the underlying infrastructure, security governance, and
          network architecture to ensure your software is compliant, resilient,
          and cost-effective.
        </p>

        {/* CTA Button */}
        <div className="mt-8 md:mt-12 animate-fade-in-up animation-delay-600">
          <Link
            href="/contact"
            className="inline-block btn-primary text-sm md:text-base"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}

function ValueSection() {
  const values = [
    {
      title: "Executive-Level Expertise",
      description:
        "Proven track record stabilizing federal healthcare systems and architecting ATO-compliant environments with 100% audit success.",
    },
    {
      title: "Complete Infrastructure Focus",
      description:
        "We engineer security governance, network architecture, and cloud infrastructure—not just application code.",
    },
    {
      title: "Enterprise Standards for SMBs",
      description:
        "Bringing federal-grade compliance and architecture to small and mid-sized businesses without enterprise budgets.",
    },
  ];

  return (
    <section className="px-5 md:px-20 py-16 md:py-24 border-y border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text-primary)]">
          What We Do Differently
        </h2>
        <p className="mt-4 md:mt-5 text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">
          We go beyond code to address the complete technology
          ecosystem—systems, networks, and infrastructure.
        </p>

        {/* Value Cards Grid */}
        <div className="mt-10 md:mt-16 grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ValueCard key={index} {...value} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="card p-8">
      {/* Accent bar */}
      <div className="w-10 h-0.5 bg-[var(--color-accent)] mb-5" />

      <h3 className="text-xl font-semibold text-[var(--color-text-primary)] leading-snug">
        {title}
      </h3>
      <p className="mt-4 text-[15px] text-[var(--color-text-secondary)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function CTASection() {
  return (
    <section className="px-5 md:px-20 py-16 md:py-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text-primary)]">
          Ready to build something reliable?
        </h2>
        <p className="mt-5 md:mt-8 text-base md:text-lg text-[var(--color-text-secondary)]">
          Let&apos;s discuss your technology infrastructure needs.
        </p>
        <div className="mt-8 md:mt-10">
          <Link
            href="/contact"
            className="inline-block btn-primary text-sm md:text-base"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
