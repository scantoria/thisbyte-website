import LeadCapture from '@/app/components/marketing/LeadCapture';
import ServiceCard from '@/app/components/marketing/ServiceCard';

export default function HomePage() {
  const services = [
    {
      id: 'web-dev',
      title: 'Full-Stack Web Development',
      description: 'Enterprise React.js, Next.js, and Node.js solutions built for federal compliance and CMMI readiness.',
      icon: '💻'
    },
    {
      id: 'mobile-dev',
      title: 'Cross-Platform Mobile',
      description: 'Flutter and React Native applications with built-in audit trails and security protocols.',
      icon: '📱'
    },
    {
      id: 'compliance',
      title: 'Federal Compliance',
      description: 'CMMI, SOC 2, and federal audit preparation integrated into your development lifecycle.',
      icon: '🛡️'
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="text-blue-600">ThisByte</span>: Full Stack and Beneath
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Enterprise solutions engineered for federal compliance, CMMI maturity, and scalable innovation.
        </p>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Ready for Compliant Innovation?</h2>
          <LeadCapture />
        </div>
      </section>
    </div>
  );
}
