import React, { useState, useEffect } from 'react';
import LanguageSelector from '../Component/LanguageSelector'; // 언어 선택 컴포넌트 가져오기
import { encodeLabels } from '../Label/label';

const Base64Encoder = ({inputInitialText}) => {
  const getBrowserLanguage = () => {
    const languageMap = {
      en: 'English',
      ko: '한국어',
      es: 'Español',
      fr: 'Français',
      de: 'Deutsch',
      zh: '中文',
      ja: '日本語',
      hi: 'हिंदी',
    };
    const browserLang = navigator.language.slice(0, 2);

    return languageMap[browserLang] || 'English';
  };

  const [inputText, setInputText] = useState(inputInitialText);
  const [encodedText, setEncodedText] = useState('');
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState(getBrowserLanguage());
  const [charset, setCharset] = useState('UTF-8');
  const [isLiveMode, setIsLiveMode] = useState(false);

  const encodeBase64 = (text) => {
    try {
      const encoder = new TextEncoder(charset);
      const encoded = btoa(String.fromCharCode(...encoder.encode(text)));
      return encoded;
    } catch (error) {
      return 'Error encoding to Base64. Ensure the input is valid.';
    }
  };

  const handleEncode = () => {
    if (inputText) {
      const encoded = encodeBase64(inputText);
      setEncodedText(encoded);
    }
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setEncodedText(reader.result); // 파일 Base64 데이터 저장
      };
      reader.readAsDataURL(uploadedFile); // 파일을 Base64 URL로 읽기
      setFile(uploadedFile.name);
    }
  };

  useEffect(() => {
    if (isLiveMode) {
      const encoded = encodeBase64(inputText);
      setEncodedText(encoded);
    }
  }, [inputText, isLiveMode, charset]);
  
  useEffect(() => {
    // 컴포넌트가 마운트될 때 초기 인코딩 처리
    setInputText(inputInitialText);
    if (inputInitialText) {
      const encoded = encodeBase64(inputInitialText);
      setEncodedText(encoded);
    }
  }, [inputInitialText, charset]); // inputInitialText 또는 charset 변경 시 동작

  const currentLabels = encodeLabels[language] || encodeLabels['English'];

  return (
    <div style={styles.container}>
      <LanguageSelector
        languages={['English', '한국어', 'Español', 'Français', 'Deutsch', '中文', '日本語', 'हिंदी']}
        onLanguageChange={(lang) => setLanguage(lang)}
        selectedLanguage={language}
      />
      <h1>{currentLabels.title}</h1>
      <div style={styles.inputSection}>
        <textarea
          style={styles.textArea}
          placeholder={currentLabels.inputPlaceholder}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      <div style={styles.controls}>
        <label>
          Charset:
          <select
            value={charset}
            onChange={(e) => setCharset(e.target.value)}
            style={styles.charsetSelector}
          >
            <option value="UTF-8">UTF-8</option>
            <option value="ISO-8859-1">ISO-8859-1</option>
            <option value="US-ASCII">US-ASCII</option>
          </select>

          <input
          type="file"
          style={styles.fileInput}
          onChange={handleFileUpload}
        />
        </label>
        
      

      <label style={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={isLiveMode}
          onChange={() => setIsLiveMode(!isLiveMode)}
        />
        {currentLabels.autoMode}
      </label>
      </div>

      <button
        style={
          isLiveMode
            ? { ...styles.button, ...styles.buttonDisabled }
            : styles.button
        }
        onClick={handleEncode}
        disabled={isLiveMode}
      >
        {currentLabels.encodeButton}
      </button>

      <div style={styles.outputSection}>
        <h2>{currentLabels.encodedResult}</h2>
        <textarea
          style={styles.textArea}
          placeholder={currentLabels.encodedPlaceholder}
          value={encodedText}
          readOnly
        />
      </div>

      {file && <p>{currentLabels.fileUploaded}: {file}</p>}
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  inputSection: {
    marginBottom: '20px',
  },
  textArea: {
    width: '95%',
    height: '120px',
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    resize: 'none',
    backgroundColor: '#ffffff',
    outline: 'none',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  charsetSelector: {
    marginLeft: '5px',
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  fileInput: {
    marginLeft: '5px',
    padding: '5px',
    borderRadius: '8px',
  },
  checkboxLabel: {
    fontSize: '14px',
    marginLeft: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  button: {
    width: '100%',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  },
  outputSection: {
    marginTop: '20px',
  },
};

export default Base64Encoder;
