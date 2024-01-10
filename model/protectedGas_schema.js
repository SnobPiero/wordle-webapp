import * as yup from "yup";

const protectedGasSchema = yup.object().shape({
  input_0_0: yup.string().nullable(),
});

export default protectedGasSchema;
