import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { fetcher } from "@/utils/fetcher";
import nookies from "nookies";

const getClientAccessToken = async (ctx) => {
  const cookies = nookies.get(ctx);
  // console.log('cookies', cookies);
  const client_access_token = cookies?.client_access_token;
  if (client_access_token) {
    return client_access_token;
  }

  const url = `${process.env.AUTHORITY_URL}/connect/token`;
  const connect_response = await fetcher({
    method: "post",
    url,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    encode: true,
    params: {
      client_id: process.env.AUTHORITY_CLIENT_ID,
      scopes: process.env.AUTHORITY_SCOPE,
      client_secret: process.env.AUTHORITY_SECRET,
      grant_type: process.env.AUTHORITY_GRANT_TYPE,
    },
  });
  // console.log("connect_response", connect_response);

  if (connect_response && connect_response.access_token) {
    nookies.set(ctx, "client_access_token", connect_response.access_token, {
      /*
      All options:
      domain
      encode
      expires
      httpOnly
      maxAge // se non impostato, mette Session
      path
      sameSite
      secure
      */
      httpOnly: true,
      maxAge: connect_response?.expires_in ? connect_response.expires_in : null,
      path: "/",
      sameSite: "lax",
      secure: process.env.AUTHORITY_USE_SECURE_COOKIE === "1" ? true : false,
    });
  }
  return connect_response?.access_token || null;
};

const TokenContext = createContext();

const ProviderToken = ({ children, token }) => {
  return <TokenContext.Provider value={token}>{children}</TokenContext.Provider>;
};
ProviderToken.propTypes = {
  children: PropTypes.element,
  token: PropTypes.string,
};

const useToken = (value) => {
  const context = useContext(TokenContext);
  if (context) return context;
  return value;
};
useToken.propTypes = {
  value: PropTypes.string,
};

const getAuthHeaders = (access_token) => {
  return {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
};

export { getClientAccessToken, ProviderToken, useToken, getAuthHeaders };
