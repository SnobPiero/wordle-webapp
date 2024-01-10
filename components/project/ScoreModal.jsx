import PropTypes from "prop-types";

import Paragraph from "@/components/typography/Paragraph";

const ScoreModal = ({ score }) => {
  if (Object.keys(score).length === 0) {
    return <Paragraph>Start playing. You will find your score here!</Paragraph>;
  }
  return (
    <div className="flex flex-col">
      {Object.values(score).map((value, i) => (
        <Paragraph key={i}>
          In your game #{i + 1}, you obtained <strong>{value}</strong> as score
        </Paragraph>
      ))}
    </div>
  );
};

ScoreModal.propTypes = {
  score: PropTypes.object,
};

export default ScoreModal;
