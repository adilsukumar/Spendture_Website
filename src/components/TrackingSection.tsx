import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, PieChart, AlertCircle } from "lucide-react";

const TrackingSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  return (
    <section ref={containerRef} className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary-foreground blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Sticky phone mockup */}
          <motion.div 
            style={{ opacity, scale }}
            className="lg:sticky lg:top-24 space-y-8"
          >
            <div className="bg-primary-foreground/10 backdrop-blur-sm p-8 rounded-3xl shadow-elegant">
              <div className="bg-background text-foreground rounded-2xl p-6 space-y-6">
                {/* Mock dashboard */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Monthly Overview</h3>
                  <span className="text-accent font-semibold">This Month</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Spent</span>
                    <span className="text-2xl font-bold text-foreground">₹2,37,000</span>
                  </div>
                  
                  <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "68%" }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="absolute left-0 top-0 h-full bg-accent rounded-full"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Budget</span>
                    <span className="text-lg font-semibold text-foreground">₹3,50,000</span>
                  </div>
                </div>

                {/* Category breakdown */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-muted p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-primary">
                      <PieChart className="w-4 h-4" />
                      <span className="text-sm font-medium">Food & Dining</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground mt-2">₹70,500</div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-primary">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">Transport</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground mt-2">₹35,200</div>
                  </div>
                </div>
                
                {/* Alert */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-accent/10 border border-accent p-4 rounded-xl flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-accent">Budget Alert</div>
                    <div className="text-sm text-foreground/80">You're approaching your dining budget limit</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Scrolling text content */}
          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-2 bg-primary-foreground/20 rounded-full">
                <span className="text-sm font-semibold text-primary-foreground">Smart Tracking</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Personalized Budget Management
              </h2>
              <p className="text-xl text-primary-foreground/80 leading-relaxed">
                Spendture automatically categorizes your expenses and creates intelligent budgets 
                based on your spending patterns. Stay in control without the manual work.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-2 bg-primary-foreground/20 rounded-full">
                <span className="text-sm font-semibold text-primary-foreground">Real-Time Alerts</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Overspending Detection
              </h2>
              <p className="text-xl text-primary-foreground/80 leading-relaxed">
                Get instant notifications when you're approaching budget limits. Make informed 
                decisions before overspending becomes a problem.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-2 bg-primary-foreground/20 rounded-full">
                <span className="text-sm font-semibold text-primary-foreground">Visual Insights</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Beautiful Data Visualization
              </h2>
              <p className="text-xl text-primary-foreground/80 leading-relaxed">
                Transform complex financial data into clear, actionable insights with our 
                intuitive charts and progress indicators.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackingSection;
