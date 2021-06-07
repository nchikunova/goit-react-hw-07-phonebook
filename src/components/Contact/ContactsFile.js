import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ContactItem from './ContactItem';
import s from './ContactsFile.module.css';
import { connect } from 'react-redux';
import contactsOperations from '../redux/contacts-operations';
import contactsSelectors from '../redux/contacts-selectors';


class ContactsFile extends Component {

  static propTypes = {

  contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string).isRequired),
  onDeleteContact: PropTypes.func.isRequired,
};

 componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <>
        {this.props.isLoading && <h1>Phonebook is loading...</h1>}
        <ul className={s.contact_list}>
          {this.props.contacts.map(({ id, name, number }) => (
   <ContactItem
     key={id}
     name={name}
     number={number}
     id={id}
    onDeleteContact={this.props.onDeleteContact}
    className={s.item_contact}
    />
  ))}
      </ul>
    </>
    );
  }
}

const mapStateToProps = state => {
  return {
     contacts: contactsSelectors.getFilteredContacts(state),
     isLoading: contactsSelectors.getLoading(state),
  };
};

const mapDispatchToProps = dispatch => ({
    onDeleteContact: id => dispatch(contactsOperations.deleteContact(id)),
    fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsFile);