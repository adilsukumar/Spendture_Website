import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs: Array<{
    question: string;
    answer: string | React.ReactNode;
  }> = [
    {
      question: "How is my data kept private?",
      answer: (
        <>
          Your data is encrypted with{" "}
          <a
            href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-soft-aqua hover:text-emerald underline underline-offset-2 font-semibold transition-colors"
          >
            AES-256 encryption
          </a>
          , hosted on servers in{" "}
          <a
            href="https://en.wikipedia.org/wiki/Data_center"
            target="_blank"
            rel="noopener noreferrer"
            className="text-soft-aqua hover:text-emerald underline underline-offset-2 font-semibold transition-colors"
          >
            India
          </a>
          , and follows a{" "}
          <a
            href="https://en.wikipedia.org/wiki/Zero-knowledge_proof"
            target="_blank"
            rel="noopener noreferrer"
            className="text-soft-aqua hover:text-emerald underline underline-offset-2 font-semibold transition-colors"
          >
            zero-access policy
          </a>
          . We don't sell your data. Ever. You're always in control.
        </>
      ),
    },
    {
      question: "What happens after I join the waitlist?",
      answer: "Once you register, we'll keep you updated here and there as we get closer and closer to the launch. You can also invite friends to jump the queue.",
    },
    {
      question: "When will Spendture launch?",
      answer: "We're aiming for mid 2026. Waitlist members get invited first, in the order they signed up.",
    },
    {
      question: "Will there be a free version?",
      answer: "Yes. The basics are free forever. If you want the fancy AI insights and deep analytics, there's a paid tier. But you can try everything first.",
    },
    {
      question: "What's the early-bird pricing?",
      answer: "The first 1,000 waitlist members lock in a special launch price for life. We're still finalizing the numbers, but early birds always get the best deal.",
    },
    {
      question: "How do I get priority access?",
      answer: "After you sign up, you get a personal referral link. Every 3 friends who join? You jump 10 spots. Simple.",
    },
    {
      question: "Can I delete my data anytime?",
      answer: "Absolutely. One click and it's gone. No paperwork, no waiting. Gone means gone.",
    },
    {
      question: "Which platforms will Spendture support?",
      answer: "Android and iOS at launch. Web dashboard comes shortly after for those who prefer bigger screens.",
    },
  ];

  return (
    <section className="py-20 gradient-animate-subtle">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Got questions?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-effect rounded-2xl px-6 shadow-soft hover:shadow-glow border-2 border-border/50 hover:border-soft-aqua/40 transition-all"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:no-underline hover:text-soft-aqua transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {typeof faq.answer === 'string' ? faq.answer : faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;