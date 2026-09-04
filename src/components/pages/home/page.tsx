// app/page.tsx
import ScrollExpandMedia from "./hero";
import NossaEstrategia from "./nossaEstrategia";
import PorqueConsorcio from "./porqueConsorcio";
import Avaliacao from "./avaliacao";

export default function Home() {
  return (
    <ScrollExpandMedia
     
      scrollToExpand="↓ Role para explorar"
      textBlend={false}
    >
        <NossaEstrategia/>
        <PorqueConsorcio/>
        <Avaliacao/>
    </ScrollExpandMedia>
  );
}