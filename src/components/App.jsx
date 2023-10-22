import { Component } from 'react';
import { PhoneBookForm } from './PhoneBookForm/PhoneBookForm';
import { Contacts } from './Contacts/Contacts';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts-storage');
    if (savedContacts !== null) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(
        'contacts-storage',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  addContact = newContact => {
    const { contacts } = this.state;
    const isNameAlready = contacts.find(
      contact => contact.name === newContact.name
    );

    if (isNameAlready) {
      return alert(`${newContact.name} is already in contacts.`);
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, { ...newContact, id: nanoid() }],
      };
    });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = newFilter => {
    this.setState(prevState => ({
      filter: newFilter,
    }));
  };

  contactsList = () => {
    const { contacts, filter } = this.state;
    const newFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(newFilter)
    );
  };

  render() {
    return (
      <>
        <PhoneBookForm onAdd={this.addContact} />
        <Contacts
          contacts={this.contactsList()}
          filter={this.state.filter}
          onChange={this.changeFilter}
          onDelete={this.deleteContact}
        />
      </>
    );
  }
}
