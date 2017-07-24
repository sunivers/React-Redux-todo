const tabReducer = (state = { focused: 0 }, action) => {
  switch(action.type) {
    case 'CHANGE_TAB':
      return {
        focused: actions.index
    };
    default: return state;
  }
};
export default tabReducer;
