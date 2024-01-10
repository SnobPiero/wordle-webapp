/* eslint-disable security/detect-unsafe-regex */
import { setLocale } from "yup";

setLocale({
  // use constant translation keys for messages without values
  mixed: {
    required: "Valore richiesto",
  },
  string: {
    email: "email",
  },
  // use functions to generate an error object that includes the value from the schema
  number: {
    min: ({ min }) => ({ key: "min", values: { min } }),
    max: ({ max }) => ({ key: "max", values: { max } }),
  },
});

// const emptyStringToNull = (value, originalValue) => {
//   if (typeof originalValue === 'string' && originalValue === '') {
//     return null;
//   }
//   return value;
// };

// export { emptyStringToNull };

//* REFERENCE per la parte latin
// https://www.compart.com/en/unicode/block/U+0080

const reg_letters = /^[a-zA-Z\s]+$/;
const reg_letters_nospace = /^[a-zA-Z]+$/;
const reg_letters_latin = /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/;
const reg_numbers = /^[0-9\s]+$/;
const reg_numbers_nospace = /^[0-9]+$/;
const reg_alfa = /^[a-zA-Z0-9\s]+$/;
const reg_alfa_nospace = /^[a-zA-Z0-9]+$/;
const reg_alfa_nospace_around = /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/;
const reg_alfa_latin = /^([A-Za-z0-9\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/;

export {
  reg_letters,
  reg_letters_nospace,
  reg_letters_latin,
  reg_numbers,
  reg_numbers_nospace,
  reg_alfa,
  reg_alfa_nospace,
  reg_alfa_nospace_around,
  reg_alfa_latin,
};
