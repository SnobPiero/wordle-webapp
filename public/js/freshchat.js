const initFreshChat = () => {
  window.fcWidget &&
    window.fcWidget.init({
      token: "198bc61f-a088-4604-955b-5a579eac5cd5",
      host: "https://wchat.freshchat.com",
    });
};
const initialize = (i, t) => {
  let e;
  i.getElementById(t)
    ? initFreshChat()
    : (((e = i.createElement("script")).id = t),
      (e.async = !0),
      (e.src = "https://wchat.freshchat.com/js/widget.js"),
      (e.onload = initFreshChat),
      i.head.appendChild(e));
};
const initiateCall = () => {
  initialize(document, "freshchat-js-sdk");
};
if (typeof window !== "undefined") {
  window.addEventListener ? window.addEventListener("load", initiateCall, !1) : window.attachEvent("load", initiateCall, !1);
}
