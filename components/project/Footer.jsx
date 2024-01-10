import Image from "next/image";
import Container from "@/components/layout/Container";

// import whiteLogo from "@/images/logo-white.svg";
import noBackgroungLogo from "@/images/logo-no-background.svg";

const Footer = () => (
  <div className="bg-[#191919]">
    <Container>
      <div className="flex min-h-[87px] flex-col items-center justify-center gap-8 p-4 md:flex-row">
        <Image src={noBackgroungLogo} width={200} height="auto" alt="Wordle" priority />
        <p className="text-center text-sm font-extralight text-white">
          Via Amedeo Peyron 54, 10143 TO P.IVA IT12380050018 Ragione Sociale Plesh Tech SRL Capitale sociale 25.500€
        </p>
      </div>
    </Container>
  </div>
);

export default Footer;
