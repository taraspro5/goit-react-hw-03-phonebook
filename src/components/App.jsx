import { Component } from 'react';
import { PhoneBookForm } from './PhoneBookForm/PhoneBookForm';
import { Contacts } from './Contacts/Contacts';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

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
