import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrackingSection from "@/components/TrackingSection";
import BillManagementSection from "@/components/BillManagementSection";
import GoalsSection from "@/components/GoalsSection";
import SecuritySection from "@/components/SecuritySection";
import UseCasesSection from "@/components/UseCasesSection";
import PreLaunchFooter from "@/components/PreLaunchFooter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <TrackingSection />
      <BillManagementSection />
      <GoalsSection />
      <SecuritySection />
      <UseCasesSection />
      <PreLaunchFooter />
    </div>
  );
};

export default Index;
