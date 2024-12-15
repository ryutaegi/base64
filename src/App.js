import Header from './Header';
import Content from './Content';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function App() {
  const [coder, setCoder] = useState('Encoder');
  const [inputText, setInputText] = useState('');
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith('/decode/')) {
      setCoder('Decoder');
      setInputText(path.replace('/decode/', ''));
    } else if (path.startsWith('/encode/')) {
      setCoder('Encoder');
      setInputText(path.replace('/encode/', ''));
    } else {
      setInputText('');
    }
  }, [location.pathname]); // location.pathname이 변경될 때만 실행

  return (
    <div style={{ display: 'flex', justifyContent: 'center',
        height : '100vh',
        width : '100vw',
        overflow : 'scroll' }}>
      <div style={{ minWidth: '600px', width: '60vw', height: '100vh' }}>
        <Header coder={coder} setCoder={setCoder} />
        <Content coder={coder} inputInitialText={inputText} />
      </div>
    </div>
  );
}

export default App;
