import InvestmentTab from "@/components/pages/investimento/page";
import AlavancagemSection from "@/components/pages/investimento/AlavancagemSection";
import Navbar from "@/components/extras/navbar/page";
import Footer from "@/components/extras/footer/page";
export default function Page() {
  return (
    <>
      <Navbar/>
      <InvestmentTab />
      <AlavancagemSection />
      <Footer/>
    </>
  );
}