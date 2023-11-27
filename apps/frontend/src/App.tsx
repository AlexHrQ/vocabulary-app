import { FormEvent, useState } from 'react';

import { API_URL } from './constants';

import './App.css';

const App = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: {
          'content-type': 'application/json',
        },
      });

      const payload = await response.json();

      setResult(
        Object.entries(payload.result)
          .map(([key, value]) => `${key}: ${value}\n`)
          .join(''),
      );
    } catch (error) {
      // TODO: replace with sentry log statement
      console.error('Unexpected error', error);

      setResult('Unexpected error during text processing. Please try again later');
    }
  };

  return (
    <form className="App" onSubmit={handleSubmit}>
      <label htmlFor="text">Input Text</label>
      <textarea id="text" value={text} onChange={(e) => setText(e.target.value)} />
      <label htmlFor="results">Results</label>
      <textarea id="results" value={result} disabled />
      <button type="submit" disabled={!text}>
        Submit
      </button>
    </form>
  );
};

export default App;
