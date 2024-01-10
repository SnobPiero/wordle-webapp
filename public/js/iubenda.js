/* eslint-disable */
var _iub = _iub || [];
_iub.csConfiguration = {
  invalidateConsentWithoutLog: true,
  consentOnContinuedBrowsing: false,
  perPurposeConsent: true,
  whitelabel: false,
  lang: "it",
  siteId: 2456414,
  cookiePolicyInOtherWindow: true,
  floatingPreferencesButtonDisplay: "bottom-left",
  floatingPreferencesButtonColor: "#f4f4f4",
  floatingPreferencesButtonCaptionColor: "#737373",
  floatingPreferencesButtonCaption: "Impostazioni",
  floatingPreferencesButtonIcon: true,
  floatingPreferencesButtonHover: true,
  cookiePolicyId: 13955057,
  banner: {
    acceptButtonDisplay: true,
    customizeButtonDisplay: true,
    acceptButtonColor: "#f28800",
    acceptButtonCaptionColor: "white",
    customizeButtonColor: "#3b3b3b",
    customizeButtonCaptionColor: "#ffffff",
    rejectButtonDisplay: true,
    rejectButtonColor: "#f28800",
    rejectButtonCaptionColor: "white",
    listPurposes: true,
    explicitWithdrawal: true,
    position: "bottom",
    textColor: "white",
    backgroundColor: "#202020",
    fontSize: "14px",
  },
  callback: {
    onPreferenceExpressedOrNotNeeded: function (preference) {
      dataLayer.push({
        iubenda_ccpa_opted_out: _iub.cs.api.isCcpaOptedOut(),
      });
      if (!preference) {
        dataLayer.push({
          event: "iubenda_preference_not_needed",
        });
      } else {
        if (preference.consent === true) {
          dataLayer.push({
            event: "iubenda_consent_given",
          });
        } else if (preference.consent === false) {
          dataLayer.push({
            event: "iubenda_consent_rejected",
          });
        } else if (preference.purposes) {
          for (var purposeId in preference.purposes) {
            if (preference.purposes[purposeId]) {
              dataLayer.push({
                event: "iubenda_consent_given_purpose_" + purposeId,
              });
            }
          }
        }
      }
    },
  },
};
/* eslint-enable */
