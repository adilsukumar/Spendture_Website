import { motion } from "framer-motion";
import { Target, TrendingUp, PiggyBank, Home } from "lucide-react";

const GoalsSection = () => {
  const goals = [
    { name: "Emergency Fund", current: 7500, target: 10000, icon: PiggyBank, color: "text-primary" },
    { name: "House Down Payment", current: 32000, target: 50000, icon: Home, color: "text-accent" },
    { name: "Vacation Savings", current: 2800, target: 5000, icon: Target, color: "text-primary" },
  ];

  return (
    <section className="py-32 bg-secondary relative overflow-hidden">
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
              <span className="text-sm font-semibold text-primary">Financial Goals</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Achieve What Matters Most
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Set personalized savings goals, track progress in real-time, and get intelligent 
              recommendations to reach your financial milestones faster.
            </p>
          </motion.div>
        </div>

        {/* Goals Dashboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-card rounded-3xl shadow-elegant p-8 lg:p-12 border border-border">
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-3xl font-bold text-foreground">Your Goals</h3>
              <div className="flex items-center gap-2 text-accent">
                <TrendingUp className="w-6 h-6" />
                <span className="text-2xl font-bold">68%</span>
                <span className="text-muted-foreground">Overall Progress</span>
              </div>
            </div>

            <div className="space-y-8">
              {goals.map((goal, index) => {
                const progress = (goal.current / goal.target) * 100;
                
                return (
                  <motion.div
                    key={goal.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-muted rounded-lg">
                          <goal.icon className={`w-6 h-6 ${goal.color}`} />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-foreground">{goal.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            ₹{goal.current.toLocaleString()} of ₹{goal.target.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-accent">{Math.round(progress)}%</div>
                        <div className="text-sm text-muted-foreground">Complete</div>
                      </div>
                    </div>

                    <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: index * 0.2 + 0.3, ease: "easeOut" }}
                        className={`absolute left-0 top-0 h-full rounded-full ${
                          progress >= 75 ? "bg-accent" : "bg-primary"
                        }`}
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: [0, 1, 0] }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: index * 0.2 + 0.5, ease: "easeOut" }}
                        className="absolute right-0 top-0 h-full w-1 bg-accent shadow-glow"
                        style={{ left: `${progress}%` }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Summary cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-border">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center p-6 bg-muted rounded-xl"
              >
                <div className="text-4xl font-bold text-accent mb-2">₹35.2L</div>
                <div className="text-sm text-muted-foreground">Total Saved</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-center p-6 bg-muted rounded-xl"
              >
                <div className="text-4xl font-bold text-primary mb-2">₹1,04,000</div>
                <div className="text-sm text-muted-foreground">Monthly Average</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-center p-6 bg-muted rounded-xl"
              >
                <div className="text-4xl font-bold text-primary mb-2">18 mo</div>
                <div className="text-sm text-muted-foreground">To Complete All Goals</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GoalsSection;
