import PropTypes from "prop-types";

import Text from "@/components/form/Text";

const MatrixCells = ({
  tries = [],
  control = {},
  checkColors = null,
  watch = null,
  tryRowIndex = [],
  setFocus = null,
  currentBox = "",
}) => (
  <div className="grid grid-cols-1 mt-6 mb-12 md:mx-20 space-y-1.5">
    {tries.map((tryNumber, i) => (
      <div className="flex gap-4 justify-center" key={i}>
        {tryRowIndex.map((rowIndex) => (
          <Text
            inputClass={`uppercase ${checkColors(`input_${tryNumber}_${rowIndex}`)}`}
            key={`input_${tryNumber}_${rowIndex}`}
            name={`input_${tryNumber}_${rowIndex}`}
            control={control}
            maxlength={1}
            keyDown={(e) => {
              const value = watch(`input_${tryNumber}_${rowIndex}`);
              if (!value && e.key === "Backspace") {
                e.preventDefault();
              }
            }}
            keyUp={(e) => {
              if (e.key === "Backspace") {
                setFocus(`input_${tryNumber}_${rowIndex - 1}`);
              }
            }}
            change={(value) => {
              if (value.length === 1) {
                setFocus(`input_${tryNumber}_${rowIndex + 1}`);
              }
            }}
            blur={(value) => value.replace(/[^a-zA-Z]/g, "")}
            mouseDown={(e) => {
              setFocus(currentBox);
              e.preventDefault();
            }}
          />
        ))}
      </div>
    ))}
  </div>
);

MatrixCells.propTypes = {
  tries: PropTypes.array,
  tryRowIndex: PropTypes.array,
  control: PropTypes.object,
  currentBox: PropTypes.string,
  checkColors: PropTypes.func,
  watch: PropTypes.func,
  setFocus: PropTypes.func,
};

export default MatrixCells;
