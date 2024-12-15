import React, { useState, useEffect } from 'react';
import LanguageSelector from '../Component/LanguageSelector'; // 언어 선택 컴포넌트 가져오기
import { decodeLabels } from '../Label/label';

const Base64Decoder = ({inputInitialText}) => {
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
  const [decodedText, setDecodedText] = useState('');
  const [charset, setCharset] = useState('UTF-8');
  const [file, setFile] = useState(null);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [language, setLanguage] = useState(getBrowserLanguage());
  const [decodedImage, setDecodedImage] = useState('');

  const decodeBase64 = (text) => {
    try {
      const base64Data = text.includes('base64,') ? text.split('base64,')[1] : text;

      return new TextDecoder(charset).decode(
        Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0))
      );
    } catch (error) {
      return 'Error decoding Base64 string. Ensure the input is valid.';
    }
  };

  const handleDecode = () => {
    if (inputText.startsWith('data:image/')) {
      setDecodedImage(inputText); // 이미지 데이터 저장
      setDecodedText(''); // 텍스트 결과 초기화
    } else {
      const decoded = decodeBase64(inputText);
      setDecodedText(decoded);
      setDecodedImage(''); // 이미지 결과 초기화
    }
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setInputText(reader.result); // Base64 URL 데이터 저장
      };
      reader.readAsDataURL(uploadedFile); // 파일을 Base64 URL로 읽기
      setFile(uploadedFile.name);
    }
  };

  useEffect(() => {
    if (isLiveMode) {
      if (inputText.startsWith('data:image/')) {
        setDecodedImage(inputText);
      } else {
        const decoded = decodeBase64(inputText);
        setDecodedText(decoded);
        setDecodedImage('');
      }
    }
  }, [inputText, isLiveMode, charset]);

  useEffect(() => {
    const browserLang = getBrowserLanguage();
    setLanguage(browserLang);
    handleDecode();
  }, []);


  const currentLabels = decodeLabels[language] || decodeLabels['English'];

  return (
    <div style={styles.container}>
      <LanguageSelector
        languages={['English', '한국어', 'Español', 'Français','Deutsch','中文','日本語','हिंदी']}
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
        <div>
        <label>
          Charset:
          <select
            style={styles.select}
            value={charset}
            onChange={(e) => setCharset(e.target.value)}
          >
            <option value="UTF-8">UTF-8</option>
            <option value="ISO-8859-1">ISO-8859-1</option>
            <option value="UTF-16">UTF-16</option>
          </select>
        </label>

        <input
          type="file"
          style={styles.fileInput}
          onChange={handleFileUpload}
        />
        </div>

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
        onClick={handleDecode}
        disabled={isLiveMode}
      >
        {currentLabels.decodeButton}
      </button>

      
        
      {decodedImage ? (
        <div style={styles.imageSection}>
          <h2>{currentLabels.decodedImage}</h2>
          <img src={decodedImage} alt="Decoded Base64" style={styles.image} />
        </div>
      ) : (
        <div style={styles.outputSection}>
        <h2>{currentLabels.decodedPlaceholder}</h2>
        <textarea
          style={styles.textArea}
          placeholder={currentLabels.decodedPlaceholder}
          value={decodedText}
          readOnly
        />
      </div>
      )}

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
  select: {
    marginLeft : '5px',
    padding: '5px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
  },
  fileInput: {
    marginLeft : '5px',
    padding: '5px',
    borderRadius: '8px',
    
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
  checkboxLabel: {
    fontSize: '14px',
    marginLeft: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  outputSection: {
    marginTop: '20px',
  },
  imageSection: {
    marginTop: '20px',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
};

export default Base64Decoder;