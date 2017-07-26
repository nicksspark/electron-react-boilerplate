const loading = (state = { loading: true }, action) => {
  const newState = state;
  switch (action.type) {
    case 'LOADED':
      return { loading: !newState.loading };
    default:
      return state
  }
}

export default loading;
