import React, { Component } from 'react';
import s from './ContactForm.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import contactsOperations from '../redux/contacts-operations';
import contactsSelectors from '../redux/contacts-selectors';
import { v4 as uniqueId } from 'uuid';
import { toast } from 'react-toastify';


class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  loginInputNameId = uniqueId(); 
  loginInputNumberId = uniqueId(); 

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { contacts } = this.props;
    const { name, number } = this.state;
    if (contacts.some(contact => contact.name === name)) {
      toast.info(`${name} is already in contacts`);
    } else {
      this.props.onSubmit(name, number);
    }
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={s.item_form} onSubmit={this.handleSubmit}>
        <label className={s.label_data} htmlFor={this.loginInputNameId}>
          Name
          <input
            className={s.item_input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
             id = {this.loginInputNameId}
            placeholder="Annie Copeland"
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label className={s.label_data} htmlFor={this.loginInputNumberId}>
          Phone
          <input
            className={s.item_input}
            type="text"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
             id = {this.loginInputNumberId}
            placeholder="111-11-11"
            value={number}
            onChange={this.handleChange}
          />
        </label>
        <button
          className={s.btn_submit}
          type="submit"
          disabled={name === '' || number === ''}
        >
          Save contact
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  contacts: contactsSelectors.getFilteredContacts(state),
});
const mapDispatchToProps = dispatch => ({
  onSubmit: (name, number) => {
    return dispatch(contactsOperations.addContact(name, number));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
