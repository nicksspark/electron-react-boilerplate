const loading = (state = { loading: true }, action) => {
  switch (action.type) {
    case 'LOADED':
      return { loading: false };
    default:
      return state
  }
}

export default loading;
