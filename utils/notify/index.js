const loadToast = async () => (await import("react-toastify")).toast;

const toastOptions = {
  theme: "colored",
};

const notify = {
  info: async (msg) => {
    const toast = await loadToast();
    // console.log("Loaded toast", toast);
    toast.info(msg, toastOptions);
  },
  success: async (msg) => {
    const toast = await loadToast();
    toast.success(msg, toastOptions);
  },
  warn: async (msg) => {
    const toast = await loadToast();
    toast.warn(msg, toastOptions);
  },
  error: async (msg) => {
    const toast = await loadToast();
    toast.error(msg, toastOptions);
  },
};

export { notify };
