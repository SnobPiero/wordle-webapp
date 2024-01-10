const colors = require("tailwindcss/colors");

const text = colors.white;

const active = "#3883A9";
const activeLight = colors.blue[100];
const activeText = colors.white;
const activeHover = "#2C5B7C";

const layerUp = colors.neutral[700];
const layerUpText = "#FCFCFC";
const layerUpHover = colors.neutral[800];

const element = colors.slate[950];

const grayType = "slate";

const theme = {
  // globals
  "body-bg": colors.slate[900],
  "body-text": text,
  "routing-from-bg": colors.black,
  "routing-to-bg": colors.white,
  "horizontal-rule-border": active,

  // layout
  "layout-top-section-bg": colors[grayType][200],
  "layout-page-section-bg": colors.slate[900],

  "header-bg": active,
  "header-text": activeText,
  "header-user-bg": layerUp,
  "header-user-text": layerUpText,
  "header-user-hover-bg": layerUpHover,
  "header-lang-bg": layerUp,
  "header-lang-text": layerUpText,
  "header-lang-hover-bg": layerUpHover,
  //* aggiungere header-theme

  //project
  "theme-icon-hover": active,

  //preferences
  "font-size-prference-bg": colors.slate[600],
  "preference-footer-text": colors.black,

  //! WWWWW DA TOGLIERE
  "footer-bg": colors.slate[900],
  "footer-border": colors.green[600],
  "footer-text": colors.slate[300],
  //! WWWWW DA TOGLIERE

  "side-bg": colors.slate[900],
  "side-text": colors.slate[200],
  "side-hover-bg": colors.slate[950],

  "breadcrumbs-text": activeText,

  "subheader-hover-bg": colors[grayType][100],
  "subheader-active-text": active,
  "subheader-separator-bg": colors[grayType][300],

  "panel-bg": element,
  "panel-border": colors[grayType][500],

  // typography
  "heading-text": text,

  // ui
  "button-bg": active,
  "button-text": activeText,
  "button-hover-bg": activeHover,
  "button-secondary-bg": colors.slate[400],
  "button-secondary-hover-bg": colors.slate[500],
  "button-secondary-text": colors.white,

  "cmenu-icon-text": colors[grayType][400],
  "cmenu-bg": layerUp,
  "cmenu-text": layerUpText,
  "cmenu-separator-bg": colors[grayType][600],
  "cmenu-hover-bg": layerUpHover,
  "cmenu-disabled-text": colors[grayType][600],

  "modal-shadow": colors[grayType][950],
  "modal-data-bg": element,
  "modal-data-text": text,
  "modal-buttons-bg": colors[grayType][800],

  "kpi-bg-from": "#24c85e",
  "kpi-bg-to": "#0f80b2",
  "kpi-text": activeText,
  "kpi-outline-bg": element,

  "pill-bg": active,
  "pill-text": activeText,

  "table-bg": element,
  "table-border": colors[grayType][700],
  "table-text": text,
  "table-loader-from": active,
  "table-loader-to": colors[grayType][400],
  "table-header-border": active,
  "table-icon-stroke": active,
  "table-icon-hover-stroke": activeHover,
  "table-pagination-disable-text": colors[grayType][700],
  "table-pagination-hover-text": activeHover,

  "tag-bg": colors.green[200],
  "tag-border": colors.green[300],
  "tag-text": colors.slate[600],
  "tag-icon": colors.green[600],

  "form-bg": element,
  "form-border": colors[grayType][700],
  "form-text": text,
  "form-text-light": colors[grayType][400],
  "form-focus-border": colors[grayType][600],
  "form-disabled-bg": colors[grayType][800],
  "form-disabled-text": colors[grayType][400],
  "form-prefix-bg": colors[grayType][900],
  "form-prefix-text": colors[grayType][400],
  "form-active-bg": active,
  "form-active-bg-dark": activeHover,
  "form-active-text": activeText,
  "form-active-text-light": activeText,
  "form-active-disable-bg": colors[grayType][900],
  "form-active-disable-text": colors[grayType][500],
  "form-ext-hover-bg": activeLight,
  "form-ext-hover-text": colors[grayType][700],
  "form-ext-hover-text-light": colors[grayType][600],
  "form-placeholder": colors[grayType][500],
  "form-tooltip-icon": colors[grayType][300],
  "form-required-icon": colors.red[700],
  "form-error-text": colors.red[700],
  "form-help-text": colors[grayType][400],
  "form-caret": active,

  "form-label-text": text,
  "form-value-text": text,

  "form-fieldset-border": colors.green[600],
  "form-fieldset-text": colors.green[600],

  "level-info": colors.sky[500],
  "level-info-light": colors.sky[200],
  "level-info-dark": colors.sky[600],
  "level-success": colors.emerald[500],
  "level-success-light": colors.emerald[200],
  "level-success-dark": colors.emerald[600],
  "level-warn": colors.amber[500],
  "level-warn-light": colors.amber[200],
  "level-warn-dark": colors.amber[600],
  "level-danger": colors.red[500],
  "level-danger-light": colors.red[200],
  "level-danger-dark": colors.red[600],
};

module.exports = {
  themeDark: theme,
};
