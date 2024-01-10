const colors = require("tailwindcss/colors");

// scala di colori
// #FCFCFC
// #21334F
// #2C5B7C
// #3883A9
// #44ACD7

const text = colors.slate[950];

const active = "FCFCFC";
const activeLight = colors.blue[100];
const activeText = "#FCFCFC";
const activeHover = "#2C5B7C";

const layerUp = colors.neutral[700];
const layerUpText = "#FCFCFC";
const layerUpHover = colors.neutral[800];

const element = colors.white;

const grayType = "slate";

const theme = {
  // globals
  "body-bg": "#FCFCFC",
  "body-text": text,
  "routing-from-bg": colors.black,
  "routing-to-bg": colors.white,
  "horizontal-rule-border": active,

  // layout
  "layout-top-section-bg": colors.slate[200],
  "layout-page-section-bg": "#FCFCFC",

  // "header-bg": colors.stone[600],
  "header-bg": "#21334F",
  "header-text": activeText,
  "header-user-bg": layerUp,
  "header-user-text": layerUpText,
  "header-user-hover-bg": layerUpHover,
  "header-user-circle-bg": colors.slate[200],
  // "header-lang-bg": layerUp,
  // "header-lang-text": layerUpText,
  // "header-lang-hover-bg": layerUpHover,
  //* aggiungere header-theme

  // login
  "login-button-color": active,

  // preferences
  "font-size-prference-bg": colors.slate[100],
  "preference-footer-text": text,

  "side-bg": "#FFFFFF",
  "side-text": colors.slate[800],
  "side-selected-text": active,
  "side-hover-bg": colors.slate[100],

  "breadcrumbs-text": activeText,

  "subheader-hover-bg": colors[grayType][100],
  "subheader-active-text": "#21334F",
  "subheader-separator-bg": colors[grayType][300],

  "panel-bg": element,
  "panel-border": colors[grayType][200],

  // typography
  "heading-text": text,

  // ui
  "button-bg": "#dedede",
  "button-text": colors.white,
  "button-hover-bg": activeHover,
  "button-secondary-bg": colors.slate[400],
  "button-secondary-hover-bg": colors.slate[500],
  // "button-secondary-text": colors.slate[900],

  "cmenu-icon-text": colors[grayType][400],
  "cmenu-bg": layerUp,
  "cmenu-text": layerUpText,
  "cmenu-separator-bg": colors.neutral[600],
  "cmenu-hover-bg": layerUpHover,
  "cmenu-disabled-text": colors.neutral[600],

  "modal-shadow": colors[grayType][300],
  "modal-data-bg": element,
  "modal-data-text": text,
  "modal-buttons-bg": colors[grayType][50],

  "kpi-bg-from": "#44ACD7",
  "kpi-bg-to": "#21334F",
  "kpi-text": activeText,
  "kpi-outline-bg": element,

  "pill-bg": active,
  "pill-text": activeText,

  "table-bg": element,
  "table-border": colors[grayType][200],
  "table-text": text,
  "table-loader-from": active,
  "table-loader-to": colors[grayType][200],
  "table-header-border": active,
  "table-icon-stroke": active,
  "table-icon-hover-stroke": activeHover,
  "table-pagination-disable-text": colors[grayType][300],
  "table-pagination-hover-text": activeHover,

  "tag-bg": colors.green[200],
  "tag-border": colors.green[300],
  "tag-text": colors.zinc[600],
  "tag-icon": colors.green[600],

  "form-bg": element,
  "form-border": colors[grayType][200],
  "form-text": text,
  "form-text-light": colors[grayType][400],
  "form-focus-border": colors[grayType][400],
  "form-disabled-bg": colors[grayType][100],
  "form-disabled-text": colors[grayType][400],
  "form-prefix-bg": colors[grayType][100],
  "form-prefix-text": colors[grayType][600],
  "form-active-bg": active,
  "form-active-bg-dark": activeHover,
  "form-active-text": activeText,
  "form-active-text-light": activeText,
  "form-active-disable-bg": colors[grayType][200],
  "form-active-disable-text": colors[grayType][500],
  "form-ext-hover-bg": activeLight,
  "form-ext-hover-text": colors[grayType][600],
  "form-ext-hover-text-light": colors[grayType][500],
  "form-placeholder": colors[grayType][400],
  "form-tooltip-icon": colors[grayType][500],
  "form-required-icon": colors.red[500],
  "form-error-text": colors.red[500],
  "form-help-text": colors[grayType][500],
  "form-caret": active,

  "form-label-text": text,
  "form-value-text": text,

  "form-fieldset-border": colors.green[600],
  "form-fieldset-text": colors.green[600],

  "level-info": colors.cyan[500],
  "level-info-light": colors.cyan[200],
  "level-info-dark": colors.cyan[600],
  "level-success": colors.green[500],
  "level-success-light": colors.green[200],
  "level-success-dark": colors.green[600],
  "level-warn": colors.yellow[500],
  "level-warn-light": colors.yellow[200],
  "level-warn-dark": colors.yellow[600],
  "level-danger": colors.red[500],
  "level-danger-light": colors.red[200],
  "level-danger-dark": colors.red[600],
};

module.exports = {
  themeDefault: theme,
};
