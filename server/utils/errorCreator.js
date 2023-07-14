const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `${method} ${type}: ERROR: ${
      typeof err === "object" ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in ${method}. Check server logs for more details.`,
    },
  };
};

module.exports = { createErr };
