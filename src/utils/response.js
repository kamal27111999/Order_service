export const success = (res, message, data = {}, code = 200) => {
  return res.status(code).json({ success: true, message, data });
};

export const failure = (res, message, code = 400) => {
  return res.status(code).json({ success: false, message });
};
