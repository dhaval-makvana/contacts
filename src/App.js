import React, { Component } from 'react'
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './createContact'
import { Route } from 'react-router-dom'


class App extends Component {

  state = {
    contacts : []
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts: contacts })
    })
  }

  removeContact = (contact) => {
    console.log(contact)
    this.setState( (state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    ContactsAPI.remove(contact)
  }

  CreateContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([ contact ])
      }))
    })
  }

  render() {
    return (
      <div>
        <Route path="/" exact render={() => (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
          />
        )}/>
        <Route path="/create" exact render={( {history} ) => (
          <CreateContact onCreateContact={(contact) => {
            this.CreateContact(contact)
            history.push('/')
          }}/>
        )}/>
      </div>
    )
  }

}

export default App;
