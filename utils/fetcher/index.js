import qs from "qs";

const fetcher = async ({ url = null, method = "get", params = null, headers = {}, next = {}, isJson = true, encode }) => {
  if (!url) {
    throw new Error("URL not defined");
  }
  try {
    const config = {
      method,
      headers: headers,
      next: { revalidate: 10, ...next },
    };
    if (params) {
      if (method === "get") {
        url = `${url}?${new URLSearchParams(params).toString()}`;
      } else {
        config.body = encode ? qs.stringify(params) : params || {};
      }
    }
    const res = await fetch(url, config);
    if (!res.ok) {
      throw new Error();
    }
    if (!isJson) {
      return await res.blob();
    }
    return await res.json();
  } catch (e) {
    throw new Error(e);
  }
};

export { fetcher };
