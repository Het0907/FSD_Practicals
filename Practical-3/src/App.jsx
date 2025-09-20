import { useEffect, useState } from 'react';

function App() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        boxSizing: 'border-box',
      }}
    >
      <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>Welcome to CHARUSAT!!!!</h1>
      <h2 style={{ fontWeight: 'bold', marginTop: '2rem' }}>It is {formattedDate}</h2>
      <h2 style={{ fontWeight: 'bold' }}>It is {formattedTime}</h2>
    </div>
  );
}

export default App;
