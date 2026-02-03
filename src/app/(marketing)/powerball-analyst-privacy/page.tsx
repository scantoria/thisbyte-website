import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Powerball Analyst Privacy Policy - ThisByte",
  description:
    "Privacy policy for the Powerball Analyst mobile application by ThisByte, LLC.",
};

export default function PowerballPrivacyPage() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Introduction",
      content:
        'ThisByte, LLC ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how Powerball Analyst collects, uses, and safeguards your information when you use our mobile application.',
    },
    {
      title: "Information We Collect",
      content: `Powerball Analyst is designed with privacy as a priority. The app operates primarily offline with local data storage.

• Data You Provide: Number picks, cycle notes, and settings you manually enter
• Automatically Generated Data: Statistical calculations, baselines, and pattern detection results
• External Data Sources: Publicly available Powerball drawing results from the NY Lottery Open Data API (data.ny.gov)`,
    },
    {
      title: "How We Use Your Information",
      content: `Your data is used exclusively to:

• Perform statistical analysis of Powerball lottery patterns
• Generate pick recommendations based on historical data
• Track your saved picks and cycle history
• Create and restore backups of your analysis data
• Calculate baselines, frequencies, and pattern shifts`,
    },
    {
      title: "Data Storage and Security",
      content: `Local Storage Only:

• All personal data is stored locally on your device using Hive (encrypted local database)
• No cloud storage: We do not upload, sync, or transmit your picks or analysis to any remote servers
• No user accounts: The app does not require registration, login, or authentication
• Device-only access: Your data remains on your device and is accessible only to you

Data persists on your device until you manually delete it through the app or uninstall the application.`,
    },
    {
      title: "Information Sharing",
      content: `We Do Not Share Your Data:

• No third-party sharing: Your picks, analysis results, and settings are never shared with third parties
• No analytics tracking: We do not use Google Analytics, Firebase Analytics, or any other analytics services in the mobile app
• No advertising networks: The app contains no advertisements and does not share data with ad networks
• No data collection: ThisByte, LLC does not collect, access, or store any data from Powerball Analyst users`,
    },
    {
      title: "Permissions Required",
      content: `The app requests the following permissions:

• Internet Access: Fetch Powerball drawing results from NY Lottery Open Data API (read-only access to public lottery data)
• Network State: Check if internet connection is available before attempting to sync data
• Storage Access (Android 12 and below): Export and import backup files (user-controlled)
• Media Permissions (Android 13+): Save backup files to your device's media storage (user-controlled)`,
    },
    {
      title: "Analytics and Cookies",
      content: `Mobile App: No Analytics

Unlike our website, the Powerball Analyst mobile application does not use:

• Google Analytics
• Firebase Analytics
• Cookies or tracking technologies
• Usage analytics of any kind

The app operates completely offline (except for syncing public lottery data) and does not track your usage.`,
    },
    {
      title: "Third-Party Services",
      content: `NY Lottery Open Data API:

• Provider: New York State Gaming Commission
• Purpose: Source of public Powerball drawing results
• Data accessed: Historical drawing dates, winning numbers, and jackpot amounts (all publicly available)
• Privacy policy: See data.ny.gov for their terms of service

Powerball Analyst does not integrate with any other third-party services, including cloud storage providers, social media platforms, advertising networks, payment processors, or user authentication services.`,
    },
    {
      title: "Your Rights",
      content: `You have complete control over your data:

• Access: View all your data within the app at any time
• Modification: Edit or delete any picks, cycles, or notes
• Deletion: Delete all data by clearing app storage or uninstalling the app
• Export: Create backups to transfer your data to another device
• Portability: Exported backups are in standard JSON format for easy migration

Since Powerball Analyst does not use user accounts or collect data on our servers, there are no accounts to delete. Simply uninstall the app to remove all locally stored data from your device.`,
    },
    {
      title: "Legal Disclaimers",
      content: `No Gambling Guarantees:

Powerball Analyst provides statistical analysis tools only. The app:

• Does not guarantee lottery wins
• Does not simulate gambling
• Does not process lottery ticket purchases
• Does not provide gambling opportunities

Lottery outcomes are random. Past patterns do not predict future results. Please play responsibly and within your means.

Educational and Informational Use:

The app is designed for educational and informational purposes, helping users understand statistical patterns in historical lottery data. It should not be considered financial advice or a winning strategy.`,
    },
    {
      title: "Children's Privacy",
      content:
        "Powerball Analyst does not knowingly collect information from children under 18 years of age. Lottery participation is restricted by law to adults only. By using this app, you confirm you are of legal age to participate in lottery activities in your jurisdiction.",
    },
    {
      title: "Changes to This Privacy Policy",
      content: `We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. Changes will be reflected in the "Last updated" date at the top of this document. Continued use of Powerball Analyst after changes constitutes acceptance of the updated policy.

Significant changes will be communicated through app update notes in the Google Play Store.`,
    },
    {
      title: "Contact Us",
      content: `If you have questions about this privacy policy or our data practices, please contact us:

Email: support@thisbyte.com
Developer: ThisByte, LLC
App: Powerball Analyst
Website: https://thisbyte.com`,
    },
  ];

  const summaryItems = [
    "All data stored locally on your device",
    "No cloud storage or data transmission",
    "No user accounts or registration",
    "No analytics or usage tracking",
    "No data sharing with third parties",
    "No advertisements",
    "Only fetches public lottery data from official sources",
    "You have complete control over your data",
    "Privacy-first design",
  ];

  return (
    <section className="px-5 md:px-20 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">
          Privacy Policy
        </h1>
        <p className="mt-3 text-lg font-medium text-[var(--color-accent)]">
          Powerball Analyst
        </p>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Last updated: December 24, 2025
        </p>

        <div className="mt-12 md:mt-16 space-y-10">
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {section.title}
              </h2>
              <p className="mt-4 text-base text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Privacy Summary Box */}
        <div className="mt-12 p-6 rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30">
          <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Privacy Policy Summary
          </h3>
          <ul className="mt-4 space-y-2">
            {summaryItems.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-[15px] text-[var(--color-text-secondary)]"
              >
                <span className="text-[var(--color-accent)] font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-16 text-sm text-[var(--color-text-muted)]">
          © {currentYear} ThisByte, LLC. All rights reserved.
        </p>
      </div>
    </section>
  );
}
