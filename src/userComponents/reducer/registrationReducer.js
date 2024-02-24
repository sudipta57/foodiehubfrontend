export const initialval = {
  otpsendVerify: false,
  resotpsendVerify: false,
  otpVerify: false,
  resotpVerify: false,
  loading: false,
  resloading: false,
  codedata: [],
  codematch: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "otpsendVerify":
      return { ...state, otpsendVerify: action.payload };
    case "resotpsendVerify":
      return { ...state, resotpsendVerify: action.payload };
    case "otpVerify":
      return { ...state, otpVerify: action.payload };
    case "resotpVerify":
      return { ...state, resotpVerify: action.payload };
    case "loading":
      return { ...state, loading: action.payload };
    case "resloading":
      return { ...state, resloading: action.payload };
    case "codedata":
      return { ...state, codedata: action.payload };
    case "codematch":
      return { ...state, codematch: action.payload };
    default:
      return state;
  }
};
export default reducer;
