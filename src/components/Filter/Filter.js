import s from './Filter.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../redux/contacts-actions';
import contactsSelectors from '../redux/contacts-selectors';

const Filter = ({ value, onChange }) => (
  <label className={s.item_filter}>
    <p className={s.text_filter}>Contacts search</p>
    <input
      className={s.item_element}
      type="text"
      value={value}
      onChange={onChange}
    />
  </label>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
 value: contactsSelectors.getFilter(state),});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(actions.filterContacts(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);