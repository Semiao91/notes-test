import {useEffect, useState, React} from 'react'
import {Headder} from "./component/Headder.jsx";
import {List} from "./component/List.jsx";
import {Form} from "./component/Form.jsx";
import {Search} from "./component/Search.jsx";
import noteService from "./services/persons.js";
import Notification from "./Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newName.trim() !== '' && !persons.some(person => person.name === newName)) {
      const person = [...persons, {name: newName, number: newNumber}];
      setPersons(person);
      setFilteredPersons(person);
      noteService.create({name: newName, number: newNumber})
      setNewName('');
      setNewNumber('')
    } else {
      alert(`${newName} already exists!`)
      setNewName('')
      setNewNumber('')
    }
  }
  const filterSearch = (searchValue) => {
    setFilteredPersons(persons.filter(person =>
      person.name.toLowerCase().includes(searchValue.toLowerCase())
    ));
  };
  const onDelete = (id) => {
    noteService.remove(id)
      .then(() => {
        const updatedPersons = persons.filter(person => person.id !== id);
        setPersons(updatedPersons);
        setFilteredPersons(updatedPersons);
      })
      .catch(error => {
        console.error('Error deleting person:', error);
      });
  };

  useEffect(() => {
    noteService.getAll().then(response => {
      setPersons(response.persons)
      setFilteredPersons(response.persons)
    }).catch(err => {
      setErrorMessage("Failed to fetch persons")
    })
  }, [])

  return (<>
    <Headder title='Phonebook'/>
    <Notification message={errorMessage}/>
    <Search filterSearch={filterSearch} text='Search' search={search} setSearch={setSearch}/>
    <Headder title='Add new'/>
    <Form onSubmit={handleSubmit} newNumber={newNumber} newName={newName} setNewNumber={setNewNumber}
          setNewName={setNewName}/>
    <Headder title='Numbers'/>
    {filteredPersons.map((person) => <List key={person.name} onDelete={() => onDelete(person.id)}
                                                  content={person.name} number={person.number}/>)}
  </>)
}

export default App