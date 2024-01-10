import * as yup from "yup";

// import { emptyStringToNull } from '@/utils/yup';

const test_schema = yup.object().shape({
  string_required: yup.string().required(),
  phone_required: yup.string().required(),
  number_required: yup.number().nullable().required(),
  number_minmax: yup.number().nullable().min(5).max(98765),
  amount_required: yup.number().nullable().required(),
  amount_minmax: yup.number().nullable().min(5).max(98765),
  select_required: yup.string().nullable().required(),
  checkbox_required: yup.boolean().oneOf([true], "required").required(),
  radiobox_required: yup.mixed().required(),
  switch_required: yup.boolean().required(),
  date_required: yup.string().nullable().required(),
});

export default test_schema;
