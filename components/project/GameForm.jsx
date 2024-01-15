import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";

import { useForm } from "react-hook-form";

import VirtualKeyboard from "@/components/project/VirtualKeyboard";
import Text from "@/components/form/Text";
import ScoreModalContent from "@/components/project/ScoreModal";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

import { HiChartBar } from "react-icons/hi";

import { notify } from "@/utils/notify";
import { fetcher } from "@/utils/fetcher";

const GameForm = ({ mainWord, wordsList }) => {
  // console.log(
  //   "wordsLists",
  //   wordsList.filter((w) => w.length === 5),
  // );
  const { control, setFocus, watch, setValue, reset } = useForm();

  const scoreModalRef = useRef();

  const [playedGames, setPlayedGames] = useState(0);
  const [wordToFind, setWordToFind] = useState(mainWord);
  const [currentTry, setCurrentTry] = useState(0);
  const [notIncludedLetters, setNotIncludedLetters] = useState([]);
  const [displacedLetter, setDisplacedLetters] = useState([]);
  const [inPlaceLetters, setInPlaceLetters] = useState([]);
  const [score, setScore] = useState({});
  const [modalContent, setModalContent] = useState({
    text: "Start playing. You will find your score here!",
    triggerCallback: false,
  });

  // eslint-disable-next-line no-console
  console.log("wordToFind", wordToFind);

  const tries = useMemo(() => [...Array(6).keys()], []);
  const tryRowIndex = useMemo(() => [...Array(5).keys()], []);

  const lastWordAsArray = watch(tryRowIndex.map((index) => `input_${currentTry}_${index}`));
  const currentTryWords = watch(tryRowIndex.map((index) => `input_${currentTry}_${index}`));

  const currentBox = useMemo(() => {
    let lastLetterPosition = lastWordAsArray.filter((l) => l).length;
    if (lastLetterPosition === 5) {
      lastLetterPosition = 4;
    }
    return `input_${currentTry}_${lastLetterPosition}`;
  }, [currentTry, lastWordAsArray]);

  const currentValue = useMemo(() => {
    const formattedWord = currentTryWords.filter((w) => w).join("");
    return formattedWord;
  }, [currentTryWords]);

  const checkWord = useCallback(
    (word) => {
      const unincludedLetters = [];
      const includedLetters = [];
      const includedLettersInPlace = [];
      const mainWordAsArray = wordToFind.split("");
      for (let i = 0; i < 5; i++) {
        if (mainWordAsArray.includes(word[i])) {
          if (mainWordAsArray[i] === word[i]) {
            // case letter in best place
            includedLettersInPlace.push(`input_${currentTry}_${i}`);
          } else {
            // case letter included but not in the correct place
            includedLetters.push(`input_${currentTry}_${i}`);
          }
        } else {
          //case letter not included in main word
          unincludedLetters.push(`input_${currentTry}_${i}`);
        }
      }
      setNotIncludedLetters([...notIncludedLetters, ...unincludedLetters]);
      setDisplacedLetters([...displacedLetter, ...includedLetters]);
      setInPlaceLetters([...inPlaceLetters, ...includedLettersInPlace]);
      return includedLettersInPlace.length === 5;
    },
    [currentTry, displacedLetter, inPlaceLetters, wordToFind, notIncludedLetters],
  );

  const checkValidity = useCallback(() => {
    const currentTryWords = watch(tryRowIndex.map((index) => `input_${currentTry}_${index}`));
    const formattedWord = currentTryWords.filter((w) => w).join("");
    if (formattedWord.length !== 5) {
      notify.warn("Not enough letters");
      return;
    }
    if (wordsList.includes(formattedWord)) {
      const winningCase = checkWord(currentTryWords);
      if (winningCase) {
        score[playedGames] = 6 - currentTry;
        setScore(score);
        setModalContent({
          text: "",
          triggerCallback: true,
        });
        scoreModalRef.current.open();
      }
      setCurrentTry(currentTry + 1);
      setFocus(`input_${currentTry + 1}_0`);
    } else {
      notify.warn("Not in the word list");
    }
  }, [watch, tryRowIndex, wordsList, currentTry, checkWord, setFocus, score, playedGames]);

  const checkColors = useCallback(
    (letter) => {
      switch (true) {
        case notIncludedLetters.includes(letter):
          return "not-included";
        case displacedLetter.includes(letter):
          return "included-displaced";
        case inPlaceLetters.includes(letter):
          return "included-in-place";
      }
    },
    [displacedLetter, inPlaceLetters, notIncludedLetters],
  );

  const startNewGame = useCallback(async () => {
    const [newWord] = await fetcher({ url: "https://random-word-api.herokuapp.com/word?length=5&lang=en" });
    setWordToFind(newWord);
    reset();
    setFocus("input_0_0");
    setCurrentTry(0);
    setPlayedGames(playedGames + 1);
    setNotIncludedLetters([]);
    setDisplacedLetters([]);
    setInPlaceLetters([]);
  }, [playedGames, reset, setFocus]);

  useEffect(() => {
    setFocus("input_0_0");
  }, [setFocus]);

  useEffect(() => {
    if (currentTry === 6) {
      score[playedGames] = 0;
      setScore(score);
      setModalContent({
        text: "Unfortunately you lost this one but you can win the next one! Click on confirm to try again",
        triggerCallback: true,
      });
      scoreModalRef.current.open();
    }
  }, [currentTry, playedGames, score, setFocus, startNewGame]);

  return (
    <>
      <div className="flex justify-end mt-6">
        <Button icon={HiChartBar} onClick={() => scoreModalRef.current.open()}>
          Score
        </Button>
      </div>
      <form onSubmit={checkValidity} autoComplete="off">
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
                  change={(e) => {
                    if (e.length === 1) {
                      setFocus(`input_${tryNumber}_${rowIndex + 1}`);
                    }
                  }}
                  mouseDown={(e) => {
                    setFocus(currentBox);
                    e.preventDefault();
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        <VirtualKeyboard
          setValue={setValue}
          checkValidity={checkValidity}
          currentBox={currentBox}
          setFocus={setFocus}
          currentValue={currentValue}
        />
      </form>
      <Modal
        ref={scoreModalRef}
        type="confirm"
        callback={startNewGame}
        text={modalContent.text}
        btnText="New game"
        showButtons={modalContent.triggerCallback}
      >
        <ScoreModalContent score={score} />
      </Modal>
    </>
  );
};

GameForm.propTypes = {
  mainWord: PropTypes.string,
  wordsList: PropTypes.array,
};

export default GameForm;
