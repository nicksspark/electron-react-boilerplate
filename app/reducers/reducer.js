import axios from 'axios';

const reducer = (state = {}, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case 'LOGIN':
      return action.user;
    case 'ADD_BOOK':
      const bookId = action.id;
      newState = Object.assign(
        newState,
        {library: [...newState.library, bookId]}
      );
      axios.post('/download', {
        id: bookId
      })
      .then((res) => (newState))
      .catch((err) => (console.log('ERROR', err)));
    case 'DELETE_BOOK':
      const bookId = action.id;
      const newLib = [];
      newState.library.forEach((id) => {
        if (id !== bookId) {
          newLib.push(id);
        };
      });
      newState = Object.assign(
        newState,
        {library: newLib}
      );
      axios.post('/delete', {
        id: bookId
      })
      .then((res) => (newState));
    case 'LOGOUT':
      return {};
    default:
      return state;
  };
};

export default reducer;
