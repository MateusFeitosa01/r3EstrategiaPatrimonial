// app/page.tsx
import ScrollExpandMedia from "./hero";
import NossaEstrategia from "./nossaEstrategia";
import PorqueConsorcio from "./porqueConsorcio";
import Avaliacao from "./avaliacao";
import Formulario from "./forms";
import Navbar from "@/components/extras/navbar/page";

export default function Home() {
  return (
    <>
    <Navbar/>
    <ScrollExpandMedia
     
      scrollToExpand="↓ Role para explorar"
      textBlend={false}
    >
        <NossaEstrategia/>
        <PorqueConsorcio/>
        <Avaliacao/>
        <Formulario/>
    </ScrollExpandMedia>
    </>
  );
}