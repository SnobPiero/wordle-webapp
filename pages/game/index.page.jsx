import PropTypes from "prop-types";

import InternalLayout from "@/components/layout/InternalLayout";
import Container from "@/components/layout/Container";
import GameForm from "@/components/project/GameForm";

import { fetcher } from "@/utils/fetcher";
import { redirectError } from "@/utils/error";

const GamePage = ({ mainWord, wordsList }) => {
  return (
    <InternalLayout>
      <div className="grow">
        <Container>
          <GameForm mainWord={mainWord} wordsList={wordsList} />
        </Container>
      </div>
    </InternalLayout>
  );
};

export const getServerSideProps = async () => {
  try {
    const [mainWord] = await fetcher({ url: "https://random-word-api.herokuapp.com/word?length=5&lang=en" });
    const wordsList = await fetcher({ url: "https://random-word-api.herokuapp.com/all" });
    return {
      props: {
        mainWord,
        wordsList,
      },
    };
  } catch (error) {
    return redirectError(error);
  }
};

GamePage.propTypes = {
  mainWord: PropTypes.string,
  wordsList: PropTypes.array,
};

export default GamePage;
