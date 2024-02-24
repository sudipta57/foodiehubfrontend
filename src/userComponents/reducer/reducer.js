const reducer = (state, action) => {
  if (action.type === "USERIN") {
    return "userin";
  } else if (action.type === "USEROUT") {
    return "userout";
  } else if (action.type === "RESTURANTIN") {
    return "resturantin";
  } else if (action.type === "RESTURANTOUT") {
    return "resturantout";
  } else if (action.type === "initial") {
    return action.payload;
  }
  return state;
};

export default reducer;
