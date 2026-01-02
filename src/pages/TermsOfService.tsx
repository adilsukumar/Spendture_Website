import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const TermsOfService = () => {
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
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Last updated: January 2026
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          
          {/* TL;DR */}
          <section className="bg-muted/30 rounded-xl p-6 border border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-3">⚡ The "I don't have time" version:</h2>
            <ul className="text-muted-foreground space-y-2">
              <li>✅ Use Spendture to track your money, not for anything sketchy</li>
              <li>✅ Your data is yours — we just help you organize it</li>
              <li>✅ Don't try to break our app (please, we worked hard on it)</li>
              <li>✅ Be a decent human and we'll get along great</li>
            </ul>
          </section>

          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Hey, let's set some ground rules 🤝</h2>
            <p className="text-muted-foreground leading-relaxed">
              By using Spendture — whether that's our app, website, or anything else we make — you're agreeing to play by these rules. Think of it like a handshake agreement between friends. If something here doesn't sit right with you, no hard feelings, but maybe this isn't the app for you.
            </p>
          </section>

          {/* Description of Service */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">So what exactly is Spendture? 🎯</h2>
            <p className="text-muted-foreground leading-relaxed">
              We're your personal money sidekick. We help you track where your cash goes, set budgets you might actually stick to, and show you insights that (hopefully) make you go "oh, that's where all my money went." Features include expense tracking, budget planning, fancy charts, and gentle nudges when you're about to blow your coffee budget... again.
            </p>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">About your account 👤</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To get the full experience, you'll need to create an account. Here's the deal:
            </p>
            <ul className="list-none text-muted-foreground space-y-2">
              <li>📝 Give us real info (fake emails won't help when you forget your password)</li>
              <li>🔐 Keep your password secret, keep it safe (Gandalf voice)</li>
              <li>🙋 Whatever happens on your account is on you</li>
              <li>🚨 If someone sneaks into your account, tell us ASAP</li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">The "please don't" list 🚫</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Look, we're pretty chill, but here are some things that'll get you kicked out:
            </p>
            <ul className="list-none text-muted-foreground space-y-2">
              <li>❌ Using Spendture for anything illegal (tracking heist money doesn't count as budgeting)</li>
              <li>❌ Trying to hack, break, or mess with our systems</li>
              <li>❌ Uploading viruses or anything nasty</li>
              <li>❌ Pretending to be someone you're not</li>
              <li>❌ Using bots or scrapers without asking nicely first</li>
              <li>❌ Being a general nuisance (you know what we mean)</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our stuff is our stuff 💡</h2>
            <p className="text-muted-foreground leading-relaxed">
              Everything that makes Spendture... Spendture — the design, the code, the features, even that little loading animation you probably never noticed — that's ours. We put a lot of love into it. Please don't copy, sell, or redistribute any of it without asking us first. We're reasonable people, just shoot us an email.
            </p>
          </section>

          {/* User Content */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Your data stays yours 📊</h2>
            <p className="text-muted-foreground leading-relaxed">
              Here's something important: the financial data you put into Spendture? That's 100% yours. We're not claiming ownership of your grocery lists or that embarrassing late-night shopping spree. We only use your data to make the app work for you — showing your charts, sending your notifications, that kind of thing. We're not selling it to advertisers or anyone else. Check our Privacy Policy for the full story.
            </p>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Money talk 💰</h2>
            <p className="text-muted-foreground leading-relaxed">
              Some fancy features might cost money (we need to keep the lights on somehow). If you subscribe to a paid plan, you're agreeing to pay for it — no surprise there. Refunds aren't really our thing unless the law says otherwise. And heads up: prices might change, but we'll always give you a heads up before that happens. If the new price doesn't work for you, you can always cancel.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">The "we're only human" clause 🤷</h2>
            <p className="text-muted-foreground leading-relaxed">
              We try our best, but we can't promise perfection. If something goes wrong — like you lose data, miss a payment reminder, or the app has a bad day — we're really sorry, but we can't be held responsible for any damages that come from it. We're a budgeting app, not a financial guarantee. Use common sense alongside our tools, yeah?
            </p>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Real talk: we're not financial advisors 📢</h2>
            <p className="text-muted-foreground leading-relaxed">
              Spendture is a tool, not a therapist for your wallet. The insights, charts, and suggestions we give are just information — not professional financial advice. Before making any big money decisions, please talk to an actual expert. We're here to help you see your spending patterns, not to tell you whether you should invest in crypto or buy that vintage motorcycle.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Breaking up is hard to do 💔</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you break the rules, we might have to cut you off — sometimes without warning. It's not personal, it's just business. On the flip side, if Spendture isn't working out for you, you can delete your account anytime from the app settings. No questions asked, no guilt trips. We'll miss you though.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">The legal geography bit 🇮🇳</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms follow Indian law. If we ever end up in a dispute (hope not!), it'll be handled in Indian courts. We're not trying to be dramatic — this is just standard stuff that lawyers make us include.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Things might change 🔄</h2>
            <p className="text-muted-foreground leading-relaxed">
              We might update these terms from time to time. When we do, we'll update the date at the top and post the new version here. If you keep using Spendture after that, it means you're cool with the changes. We're not going to suddenly add anything crazy — we just want to keep things current.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Got questions? Let's chat 💬</h2>
            <p className="text-muted-foreground leading-relaxed">
              If anything here confused you, or you just want to say hi, we're all ears:
            </p>
            <p className="text-muted-foreground mt-4">
              <strong>Drop us a line:</strong>{" "}
              <a 
                href="mailto:official.spendture@gmail.com" 
                className="text-emerald dark:text-soft-aqua hover:underline font-semibold"
              >
                official.spendture@gmail.com
              </a>
            </p>
            <p className="text-muted-foreground mt-4 italic">
              Thanks for reading all this. Seriously, most people just scroll past. You're one of the good ones. 🌟
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
