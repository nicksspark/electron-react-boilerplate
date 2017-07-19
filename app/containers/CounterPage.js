import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import * as Actions from '../actions/index';

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
