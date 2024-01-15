import PropTypes from "prop-types";

import Paragraph from "@/components/typography/Paragraph";

const ScoreModal = ({ score, text = "" }) => {
  return (
    <div>
      {text ? (
        <Paragraph>{text}</Paragraph>
      ) : (
        <div className="flex flex-col">
          {Object.values(score).map((value, i) => (
            <Paragraph key={i}>
              In your game #{i + 1}, you obtained <strong>{value}</strong> as score
            </Paragraph>
          ))}
        </div>
      )}
    </div>
  );
};

ScoreModal.propTypes = {
  score: PropTypes.object,
  text: PropTypes.string,
};

export default ScoreModal;
