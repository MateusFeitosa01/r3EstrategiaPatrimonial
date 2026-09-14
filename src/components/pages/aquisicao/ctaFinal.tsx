import StackSpread from "@/components/originkit/ui/cta";

export default function Cta(){
    return(
        <StackSpread
            scrollLength={350}
            bgColor="#ffffff"
            clusterRotation={true}
            stackScale={0.82}
            cardRadius={8}
            textColor="#141414"
            textFadeStart={0.3}
            />
    )
}