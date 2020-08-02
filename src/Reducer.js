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
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.payload
      };
    case 'SET_CURRENT_ROOM':
      return {
        ...state,
        currentRoom: action.payload
      };
    default:
      return state;
  }
};

export default Reducer;