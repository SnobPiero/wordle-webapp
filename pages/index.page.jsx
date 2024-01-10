import Head from "next/head";
import PropTypes from "prop-types";

import InternalLayout from "@/components/layout/InternalLayout";
import Body from "@/components/project/Body";
import { headTags } from "@/utils/seo";

const Homepage = () => {
  return (
    <>
      <Head>
        {headTags({
          title: "Wordle By Plesh",
        })}
      </Head>
      <InternalLayout helpTitleText="Wordle: the game of words" headerTitle="Plesh game">
        <Body />
      </InternalLayout>
    </>
  );
};

Homepage.propTypes = {
  error: PropTypes.bool,
};

export default Homepage;
