import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Back Button */}
        <Link to="/">
          <Button variant="ghost" className="mb-8 gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-deep-teal to-emerald bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last updated: January 2026
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-10">
          
          {/* TL;DR Summary */}
          <section className="p-6 rounded-2xl bg-emerald/10 dark:bg-soft-aqua/10 border border-emerald/30 dark:border-soft-aqua/30">
            <h2 className="text-xl font-semibold text-emerald dark:text-soft-aqua mb-4 flex items-center gap-2">
              🔒 Security First: Here's what you need to know
            </h2>
            <ul className="text-foreground space-y-3 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-emerald dark:text-soft-aqua">✓</span>
                <span>Bank-grade encryption protects every piece of your financial data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald dark:text-soft-aqua">✓</span>
                <span>Zero-knowledge architecture - we can't see your sensitive information even if we wanted to</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald dark:text-soft-aqua">✓</span>
                <span>Multi-layered security protocols that exceed industry standards</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald dark:text-soft-aqua">✓</span>
                <span>Your data is never sold, shared, or exploited - period</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald dark:text-soft-aqua">✓</span>
                <span>Complete control over your data with instant deletion options</span>
              </li>
            </ul>
          </section>

          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Your financial privacy is our fortress 🛡️</h2>
            <p className="text-muted-foreground leading-relaxed">
              As a comprehensive financial management platform, Spendture handles sensitive financial data with the highest level of security and privacy protection available today.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We've built Spendture with military-grade security protocols because your financial information deserves nothing less than impenetrable protection. Every transaction, every account detail, every financial insight is secured with enterprise-level encryption that makes your data virtually impossible to breach.
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">What we collect to power your financial insights</h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              To provide you with comprehensive financial management, we securely collect and protect:
            </p>
            <div className="space-y-4 ml-1">
              <div className="flex items-start gap-3">
                <span className="text-lg">🏦</span>
                <div>
                  <p className="text-foreground font-medium">Financial Account Information</p>
                  <p className="text-muted-foreground text-sm">Bank accounts, credit cards, and investment accounts (encrypted with AES-256 encryption)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">💳</span>
                <div>
                  <p className="text-foreground font-medium">Transaction Data</p>
                  <p className="text-muted-foreground text-sm">Purchase history, spending patterns, and financial behavior (processed through secure, encrypted channels)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">📊</span>
                <div>
                  <p className="text-foreground font-medium">Financial Goals & Budgets</p>
                  <p className="text-muted-foreground text-sm">Your savings targets, budget categories, and financial objectives</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">📧</span>
                <div>
                  <p className="text-foreground font-medium">Contact Information</p>
                  <p className="text-muted-foreground text-sm">Email, phone number, and communication preferences</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">🔐</span>
                <div>
                  <p className="text-foreground font-medium">Authentication Data</p>
                  <p className="text-muted-foreground text-sm">Secure login credentials, biometric data (stored locally), and security preferences</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-5 rounded-xl bg-emerald/10 border border-emerald/30">
              <p className="text-foreground font-semibold mb-3">🛡️ Our Security Promise:</p>
              <ul className="text-muted-foreground space-y-2 ml-1">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald"></span>
                  256-bit AES encryption for all data at rest and in transit
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald"></span>
                  Zero-knowledge architecture - your sensitive data is encrypted before it reaches our servers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald"></span>
                  Multi-factor authentication and biometric security options
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald"></span>
                  Regular security audits by third-party cybersecurity experts
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald"></span>
                  SOC 2 Type II compliance and bank-level security standards
                </li>
              </ul>
            </div>
          </section>

          {/* How We Use Data */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">How we use your data to empower your finances</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your financial data powers intelligent insights and personalized recommendations:
            </p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-center gap-3 text-muted-foreground">
                <span className="text-emerald dark:text-soft-aqua">→</span>
                Generate personalized budgeting and spending insights
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <span className="text-emerald dark:text-soft-aqua">→</span>
                Provide intelligent financial recommendations and alerts
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <span className="text-emerald dark:text-soft-aqua">→</span>
                Track progress toward your financial goals
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <span className="text-emerald dark:text-soft-aqua">→</span>
                Detect unusual spending patterns and potential fraud
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <span className="text-emerald dark:text-soft-aqua">→</span>
                Improve our services and develop new financial tools
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-5">
              All processing happens within our secure, encrypted environment. Your raw financial data never leaves our protected systems.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Fortress-level security architecture</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your financial data is protected by multiple layers of enterprise-grade security:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-card border border-border">
                <h4 className="font-semibold text-foreground mb-2">🔐 Encryption</h4>
                <p className="text-sm text-muted-foreground">AES-256 encryption, TLS 1.3, and end-to-end encryption for all data transmission</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h4 className="font-semibold text-foreground mb-2">🏰 Infrastructure</h4>
                <p className="text-sm text-muted-foreground">AWS-hosted with SOC 2 compliance, isolated environments, and 24/7 monitoring</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h4 className="font-semibold text-foreground mb-2">🛡️ Access Control</h4>
                <p className="text-sm text-muted-foreground">Zero-trust architecture, role-based permissions, and multi-factor authentication</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h4 className="font-semibold text-foreground mb-2">🔍 Monitoring</h4>
                <p className="text-sm text-muted-foreground">Real-time threat detection, automated security responses, and continuous auditing</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Our security measures exceed those used by major financial institutions. We undergo regular penetration testing and security audits to ensure your data remains impenetrable.
            </p>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Your data stays yours - always</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We never sell, rent, or share your personal financial information with third parties for marketing purposes. Your data is used exclusively to provide you with financial services.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Limited sharing only occurs when:
            </p>
            <ul className="space-y-2 ml-1 mt-3">
              <li className="flex items-center gap-3 text-muted-foreground">
                <span className="text-emerald dark:text-soft-aqua">→</span>
                You explicitly authorize it for specific financial services
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <span className="text-emerald dark:text-soft-aqua">→</span>
                Required by law or regulatory compliance
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <span className="text-emerald dark:text-soft-aqua">→</span>
                Necessary to prevent fraud or protect your account security
              </li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Complete control over your financial data</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have full control over your information with these rights:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-card border border-border">
                <h4 className="font-semibold text-foreground mb-2">📥 Access</h4>
                <p className="text-sm text-muted-foreground">Download all your data in a portable format anytime</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h4 className="font-semibold text-foreground mb-2">✏️ Correction</h4>
                <p className="text-sm text-muted-foreground">Update or correct any inaccurate information instantly</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h4 className="font-semibold text-foreground mb-2">🗑️ Deletion</h4>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h4 className="font-semibold text-foreground mb-2">🚫 Opt-out</h4>
                <p className="text-sm text-muted-foreground">Control marketing communications and data processing preferences</p>
              </div>
            </div>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Age requirements</h2>
            <p className="text-muted-foreground leading-relaxed">
              Spendture is designed for users aged 15 and above. We do not knowingly collect information from children under 15. If you're a parent and believe your child under 15 has provided us with information, please contact us immediately for removal.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Policy updates and transparency</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this policy to reflect new features, security enhancements, or regulatory requirements. You'll be notified of any material changes via email and in-app notifications at least 30 days before they take effect.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Questions about your privacy?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our team is here to help with any questions or concerns:
            </p>
            <p className="mt-4">
              <a 
                href="mailto:official.spendture@gmail.com" 
                className="text-emerald dark:text-soft-aqua hover:underline font-semibold text-lg"
              >
                official.spendture@gmail.com
              </a>
            </p>
            <p className="text-muted-foreground mt-4">
              For all inquiries including privacy concerns, please use the email above.
            </p>
            <p className="text-muted-foreground mt-4 italic">
              Your financial privacy and security are our top priorities. We're committed to maintaining the highest standards of data protection in the industry.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
