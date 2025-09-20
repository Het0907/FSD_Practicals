
import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100vw', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      boxSizing: 'border-box',
      margin: 0,
      padding: 0 
    }}>
      <div style={{ background: '#fff', color: '#000', border: '2px solid #333', padding: '2rem', borderRadius: '10px', minWidth: '400px', textAlign: 'center' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '1rem' }}>Count: {count}</h1>
        <div style={{ marginBottom: '1.5rem' }}>
          <button onClick={() => setCount(0)} style={{ margin: '0 5px' }}>Reset</button>
          <button onClick={() => setCount(count + 1)} style={{ margin: '0 5px' }}>Increment</button>
          <button onClick={() => setCount(count - 1)} style={{ margin: '0 5px' }}>Decrement</button>
          <button onClick={() => setCount(count + 5)} style={{ margin: '0 5px' }}>Increment 5</button>
        </div>
        <h1 style={{ fontWeight: 'bold', fontSize: '2rem', margin: '2rem 0 1rem 0' }}>Welcome to CHARUSAT!!!</h1>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <label style={{ marginRight: '10px' }}>First Name:</label>
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
          </div>
          <div>
            <label style={{ marginRight: '10px' }}>Last Name:</label>
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
          </div>
        </div>
        <div style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
          <div>First Name: {firstName}</div>
          <div>Last Name: {lastName}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
