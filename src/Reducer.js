const Reducer = (state, action) => {
  switch (action.type) {
      case 'SET_ROOMNAME':
          return {
              ...state,
              roomName: action.payload
          };
      case 'SET_CURRENTSOCKET':
          return {
              ...state,
              currentSocket: action.payload
          };
      default:
          return state;
  }
};

export default Reducer;