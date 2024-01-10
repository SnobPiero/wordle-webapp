import { useMemo, useCallback } from "react";
import PropTypes from "prop-types";

import Button from "@/components/ui/Button";

import { RiDeleteBack2Line } from "react-icons/ri";

const VirtualKeyboard = ({ setValue, checkValidity, currentBox, setFocus, currentValue }) => {
  const letters_1 = useMemo(() => ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"], []);
  const letters_2 = useMemo(() => ["a", "s", "d", "f", "g", "h", "j", "k", "l"], []);
  const letters_3 = useMemo(() => ["z", "x", "c", "v", "b", "n", "m"], []);

  const backSpaceKey = useCallback(() => {
    if (currentValue.length > 0) {
      let prevBox = currentBox.slice(0, -1);
      const prevValueLastChar = currentBox.charAt(currentBox.length - 1);
      prevBox = prevBox + (prevValueLastChar - 1);
      if (currentValue.length === 4) {
        setValue(currentBox, "");
      } else {
        setValue(prevBox, "");
      }
      setFocus(prevBox);
    }
  }, [currentBox, currentValue, setFocus, setValue]);

  return (
    <div className="flex flex-col space-y-2 items-center mb-4">
      <div className="flex gap-2">
        {letters_1.map((letter, i) => (
          <Button className="!p-0 w-6 md:!px-12 md:!py-4 uppercase" key={i} onClick={() => setValue(currentBox, letter)}>
            {letter}
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        {letters_2.map((letter, i) => (
          <Button className="!p-0 w-6 md:!px-12 md:!py-4 uppercase" key={i} onClick={() => setValue(currentBox, letter)}>
            {letter}
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        <Button className="!p-1 md:!px-12 md:!py-4 uppercase" onClick={checkValidity}>
          Enter
        </Button>
        {letters_3.map((letter, i) => (
          <Button className="!p-0 w-6 md:!px-12 md:!py-4 uppercase" key={i} onClick={() => setValue(currentBox, letter)}>
            {letter}
          </Button>
        ))}
        <Button className="!p-0 md:!px-12 md:!py-4" onClick={backSpaceKey} icon={RiDeleteBack2Line} />
      </div>
    </div>
  );
};

VirtualKeyboard.propTypes = {
  setValue: PropTypes.func,
  checkValidity: PropTypes.func,
  currentBox: PropTypes.string,
  setFocus: PropTypes.func,
  currentValue: PropTypes.string,
};

export default VirtualKeyboard;
