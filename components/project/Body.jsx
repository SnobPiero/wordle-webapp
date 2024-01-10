import Container from "@/components/layout/Container";
import Heading from "@/components/typography/Heading";
import Link from "next/link";

const Body = () => {
  return (
    <div className="grow flex min-h-[50vh] sm:min-h-0">
      <Container>
        <div className="flex flex-col items-center md:mt-16 md:max-w-3xl md:mx-auto">
          <Heading size={4} className="text-4xl md:text-5xl break-words font-normal text-center">
            You have 6 chances to guess a 5-letter word.
          </Heading>
          <Link className="button !bg-black large mt-2" href="/game">
            Play
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Body;
