import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm/ContactForm";
import { Container } from "./App.styled";
import ContactsList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import Title from "./Title/Title";
import { GlobalStyle } from "./GlobalStyle";
import { nanoid } from "nanoid";
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const parseLocalContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parseLocalContacts) {
      setContacts(parseLocalContacts)
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);

  const  handleFormSubmit = ( name, number ) => {
    const checkForContact = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (checkForContact) {
      toast.error(`${name} is already in contacts.`)
      return;
    }
    setContacts([...contacts, { name, id: nanoid(), number }]);
  };

  const deleteContact = (id) => {
    const actualСontacts = contacts.filter((contact) => contact.id !== id);
    setContacts(actualСontacts);
    toast.success('Contact deleted');
  };

  const filterByName = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

    return (
      <Container>
        <GlobalStyle />
        <Toaster/>
        <Title title="Phonebook" />
        <ContactForm onSubmit={handleFormSubmit} />
        <Title title="Contacts" />
        <Filter onChangeFilter={ev => setFilter(ev.target.value)} filter={filter} />
        <ContactsList
          onDeleteContact={deleteContact}
          contacts={filterByName()}
        />
      </Container>
    );
}

export default App;
