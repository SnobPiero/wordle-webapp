import { useEffect } from "react";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

import localFont from "next/font/local";

import "../styles/index.css";

import { ProviderGlobalState } from "@/utils/global-state";
import { ProviderPreference } from "@/utils/preference";
import { getLocalStorage } from "@/utils/storage";
import { ProviderToken } from "@/utils/auth";

import "@/utils/yup";

const fontFamily = localFont({
  src: [
    {
      path: "../fonts/Gotham/Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/Gotham/ThinItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../fonts/Gotham/ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/Gotham/ExtraLightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../fonts/Gotham/Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Gotham/LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/Gotham/Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Gotham/RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/Gotham/Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Gotham/MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/Gotham/Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Gotham/BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/Gotham/ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/Gotham/ExtraBoldItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../fonts/Gotham/Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/Gotham/BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-base",
});

const MyApp = ({ Component, pageProps }) => {
  const { session = null, redirectSignIn = false, access_token = null } = pageProps;

  const router = useRouter();

  useEffect(() => {
    const currentCulture = getLocalStorage("culture");
    if (currentCulture && currentCulture !== router.locale) {
      router.push(router.asPath, router.asPath, { locale: currentCulture });
    }
  }, [router]);

  return (
    <ProviderToken token={access_token}>
      <ProviderGlobalState>
        <ProviderPreference>
          {redirectSignIn && !session ? null : (
            <>
              <main className={`${fontFamily.variable} font-sans`}>
                <Component {...pageProps} />
              </main>
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </>
          )}
        </ProviderPreference>
      </ProviderGlobalState>
    </ProviderToken>
  );
};

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  access_token: PropTypes.string,
};

export default MyApp;
