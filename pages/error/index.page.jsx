import Head from "next/head";
import Link from "next/link";

import Heading from "@/components/typography/Heading";

import { headTags } from "@/utils/seo";

const PageError = () => {
  return (
    <>
      <Head>
        {headTags({
          title: "Error",
          robotIndex: false,
          robotFollow: false,
        })}
      </Head>
      <div className="flex flex-col items-center justify-center pt-24">
        <Heading>Error</Heading>
        <p>Si è verificato un errore</p>
        <Link className="pt-12" href="/">
          Vai alla pagina iniziale
        </Link>
      </div>
    </>
  );
};

export default PageError;
