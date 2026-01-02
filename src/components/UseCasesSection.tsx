import { motion } from "framer-motion";
import { Globe, Briefcase, Users, Wallet } from "lucide-react";

const UseCasesSection = () => {
  const useCases = [
    {
      icon: Globe,
      title: "International Travelers",
      description: "Track expenses across multiple currencies with real-time exchange rates. Perfect for digital nomads and frequent travelers.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Briefcase,
      title: "Freelancers & Entrepreneurs",
      description: "Separate personal and business expenses effortlessly. Generate reports for tax season in seconds.",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Users,
      title: "Shared Living",
      description: "Split bills and expenses with roommates or partners. Track who owes what with built-in settlement tracking.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Wallet,
      title: "Budget-Conscious Users",
      description: "Set strict budgets and get alerted before overspending. Perfect for students and those building savings habits.",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-semibold text-primary">Diverse Use Cases</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Built for Everyone
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              From travelers managing multiple currencies to freelancers tracking business expenses, 
              Spendture adapts to your unique financial needs.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-elegant transition-all"
            >
              <div className={`inline-block p-4 ${useCase.bgColor} rounded-xl mb-6`}>
                <useCase.icon className={`w-8 h-8 ${useCase.color}`} />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {useCase.title}
              </h3>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {useCase.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-wrap justify-center items-center gap-6 px-8 py-6 bg-muted rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-medium text-foreground">Multi-Currency Support</span>
            </div>
            <div className="w-px h-6 bg-border hidden md:block" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-medium text-foreground">Expense Separation</span>
            </div>
            <div className="w-px h-6 bg-border hidden md:block" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-medium text-foreground">Bill Splitting</span>
            </div>
            <div className="w-px h-6 bg-border hidden md:block" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-medium text-foreground">Tax Reports</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCasesSection;
