import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const initialvalue = {
    firstName: '',
    lastName: '',
    number: '',
    email: '',
    gender: 'male',
    subjects: [],
  };
  const [person, setPerson] = useState(initialvalue);
  const [people, setPeople] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const getFromLocal = JSON.parse(localStorage.getItem('people'));
    if (getFromLocal) {
      setPeople(getFromLocal);
    }
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson((prev) => ({ ...prev, [name]: value }));
  };

  function setinLocal(data) {
    localStorage.setItem('people', JSON.stringify(data));
  }

  const generateRandomID = () => {
    return Math.floor(Math.random() * 10000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId !== null) {
      // Editing an existing person
      const updatedPeople = people.map((p) => (p.id === editingId ? person : p));
      setPeople(updatedPeople);
      setinLocal(updatedPeople);
      setPerson(initialvalue);
      setEditingId(null);
    } else {
      // Adding a new person
      const id = generateRandomID();
      const newPerson = {
        id,
        ...person,
      };
      setPeople((prev) => [...prev, newPerson]);
      setinLocal([...people, newPerson]);
      setPerson(initialvalue);
    }
  };

  const handleEdit = (id) => {
    const personToEdit = people.find((p) => p.id === id);
    setPerson({
      ...personToEdit,
      number: '', // Clear phone number when editing
      email: '',  // Clear email when editing
    });
    setEditingId(id);
  };

  const handleDelete = (id) => {
    const updatedPeople = people.filter((person) => person.id !== id);
    setPeople(updatedPeople);
    setinLocal(updatedPeople);
  };

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    if (checked) {
      setPerson((prev) => ({
        ...prev,
        subjects: [...prev.subjects, value],
      }));
    } else {
      setPerson((prev) => ({
        ...prev,
        subjects: prev.subjects.filter((subject) => subject !== value),
      }));
    }
  };

  return (
    <>
      <div className="App">
        <h1>REACT FORM</h1>
        <h2>Person Information</h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          style={{ display: 'flex', flexDirection: 'column', width: '400px' }}
        >
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={person.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={person.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="number">Phone Number (10 digits):</label>
            <input
              type="text"
              id="number"
              name="number"
              value={person.number}
              onChange={handleChange}
              minLength={10}
              maxLength={10}
              required
              disabled={editingId !== null}  
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={person.email}
              onChange={handleChange}
              required
              disabled={editingId !== null}  
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={person.gender}
              onChange={handleChange}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Subjects:</label>
            <br></br>
            <label>
              <input
                type="checkbox"
                name="subjects"
                value="Math"
                checked={person.subjects.includes('Math')}
                onChange={handleCheckboxChange}
              />
              Math
            </label>
            <br></br>
            <label>
              <input
                type="checkbox"
                name="subjects"
                value="Science"
                checked={person.subjects.includes('Science')}
                onChange={handleCheckboxChange}
              />
              Science
            </label>
            <br></br>
            <label>
              <input
                type="checkbox"
                name="subjects"
                value="History"
                checked={person.subjects.includes('History')}
                onChange={handleCheckboxChange}
              />
              History
            </label>
            <br></br>
          </div>

          <button type="submit">{editingId !== null ? 'Update' : 'Submit'}</button>
        </form>

        <h2>Person Table</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Subjects</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>{person.number}</td>
                <td>{person.email}</td>
                <td>{person.gender}</td>
                <td>{person.subjects.join(', ')}</td>
                <td>
                  <button onClick={() => handleEdit(person.id)}>Edit</button>
                  <button onClick={() => handleDelete(person.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
