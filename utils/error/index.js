class CustomError extends Error {
  constructor(key, error) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(error);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.name = "CustomError";
    this.key = key;
    this.status = error?.response?.status;
    this.statusText = error?.response?.statusText;
    this.data = error?.response?.data;
  }
}

const redirectError = (error) => {
  // console.log('server error');
  // console.log(error.status);

  //* valutare se >= 400 & <500
  if (error.status === 404) {
    return {
      notFound: true,
    };
  }

  return {
    redirect: {
      destination: "/error",
      permanent: false,
    },
  };
};

export { CustomError, redirectError };
