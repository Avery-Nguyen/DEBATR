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
    case 'SET_USER_ID':
      return {
        ...state,
        userID: action.payload
      };
    case 'SET_CURRENT_ROOM':
      return {
        ...state,
        currentRoom: action.payload
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload
      };
    case 'SET_VISUAL_MODE':
      return {
        ...state,
        visualMode: action.payload
      };
    case 'SET_LOGIN_ERROR':
      return {
        ...state,
        loginErrors: action.payload
      };
    case 'SET_OPEN_SIGN_IN':
      return {
        ...state,
        openSignIn: action.payload
      };
    case 'SET_USER_AVATAR_URL':
      return {
        ...state,
        userAvatarUrl: action.payload
      };
      case 'SET_SESSION_ID':
      return {
        ...state,
        sessionID: action.payload
      };
    default:
      return state;
  }
};

export default Reducer;