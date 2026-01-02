import { motion } from "framer-motion";
import { Bell, Calendar, CreditCard, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const BillManagementSection = () => {
  const bills = [
    { name: "Netflix Subscription", amount: "₹1,299", date: "Mar 15", icon: CreditCard, status: "paid" },
    { name: "Car Loan EMI", amount: "₹37,500", date: "Mar 20", icon: CreditCard, status: "upcoming" },
    { name: "Rent Payment", amount: "₹1,00,000", date: "Mar 25", icon: CreditCard, status: "upcoming" },
    { name: "Internet Bill", amount: "₹6,499", date: "Mar 28", icon: CreditCard, status: "upcoming" },
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
              <span className="text-sm font-semibold text-primary">Never Miss a Payment</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Automated Bill & Deadline Tracking
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Stop worrying about forgotten bills. Spendture tracks all your loans, EMIs, 
              subscriptions, and sends timely reminders so you never miss a deadline.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Bill list animation */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {bills.map((bill, index) => (
              <motion.div
                key={bill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${bill.status === "paid" ? "bg-primary/10" : "bg-accent/10"}`}>
                      <bill.icon className={`w-5 h-5 ${bill.status === "paid" ? "text-primary" : "text-accent"}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{bill.name}</h4>
                      <p className="text-sm text-muted-foreground">{bill.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-foreground">{bill.amount}</span>
                    {bill.status === "paid" ? (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    ) : (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Bell className="w-5 h-5 text-accent" />
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Animation illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gradient-hero rounded-3xl p-12 text-primary-foreground relative overflow-hidden">
              {/* Decorative background */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground rounded-full blur-3xl" />
              </div>

              <div className="relative z-10 space-y-8">
                {/* Calendar animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex justify-center"
                >
                  <div className="bg-primary-foreground/20 backdrop-blur-sm p-8 rounded-2xl">
                    <Calendar className="w-24 h-24 text-primary-foreground" />
                  </div>
                </motion.div>

                {/* Reminder bell animation */}
                <motion.div
                  animate={{
                    rotate: [0, -15, 15, -10, 10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="flex justify-center"
                >
                  <div className="relative">
                    <div className="bg-accent p-6 rounded-full shadow-glow">
                      <Bell className="w-12 h-12 text-accent-foreground" />
                    </div>
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 0, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="absolute inset-0 bg-accent rounded-full"
                    />
                  </div>
                </motion.div>

                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold">Smart Reminders</h3>
                  <p className="text-primary-foreground/80">
                    Get notified 3 days before any payment is due. 
                    Never face late fees again.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Button variant="download" size="xl" className="gap-3">
            <Download className="w-6 h-6" />
            Start Tracking Bills
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BillManagementSection;
