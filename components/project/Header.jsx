import PropTypes from "prop-types";

import Image from "next/image";
import Link from "next/link";

import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";

import noBackgroungLogo from "@/images/logo-no-background.svg";

const Header = ({ headerTitle = "Wordle", helpTitleText = "Plesh" }) => {
  return (
    <div className="bg-header-bg bg-no-repeat bg-cover bg-center lg:min-h-[279px]">
      <div className="py-5 bg-[rgba(0,0,0,.5)] mb-4">
        <Container>
          <div className="flex justify-between items-center">
            <Link href="/">
              <Image src={noBackgroungLogo} width={200} height="auto" alt="Wordle" priority />
            </Link>
            <Link className="button" href="/preferences">
              Preferences
            </Link>
          </div>
        </Container>
      </div>
      <div className="pb-6 pt-2">
        <Container>
          <Heading fitDown className="text-header-text font-normal text-2xl md:text-6xl max-w-2xl uppercase mt-0" size={3}>
            {helpTitleText}
          </Heading>
          <Heading size={4} fitDown className="text-lg text-header-text mt-0">
            {headerTitle}
          </Heading>
        </Container>
      </div>
    </div>
  );
};

Header.propTypes = {
  headerTitle: PropTypes.string,
  helpTitleText: PropTypes.string,
};

export default Header;
