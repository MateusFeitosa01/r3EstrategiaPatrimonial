// app/page.tsx
import ScrollExpandMedia from "./hero";
import NossaEstrategia from "./nossaEstrategia";

export default function Home() {
  return (
    <ScrollExpandMedia
     
      scrollToExpand="↓ Role para explorar"
      textBlend={false}
    >
        <NossaEstrategia/>
    </ScrollExpandMedia>
  );
}