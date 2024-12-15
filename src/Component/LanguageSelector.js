import React, { useState } from 'react';

const LanguageSelector = ({ languages, onLanguageChange, selectedLanguage }) => {
  const handleLanguageChange = (language) => {
    if (onLanguageChange) {
      onLanguageChange(language);
    }
  };

  return (
    <div style={styles.languageSelector}>
      {languages.map((language, index) => (
        <React.Fragment key={language}>
          <button
            style={{
              ...styles.languageButton,
              ...(selectedLanguage === language ? styles.active : {}),
            }}
            onClick={() => handleLanguageChange(language)}
          >
            {language}
          </button>
          {index < languages.length - 1 && <span style={styles.separator}>|</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

const styles = {
  languageSelector: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px', // 줄 간격을 조금 더 줄임
    flexWrap: 'wrap', // 줄바꿈을 허용
  },
  languageButton: {
    padding: '8px 18px', // 패딩을 약간 줄여서 줄 사이를 더 붙게 함
    fontSize: '14px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'color 0.3s ease-in-out',
    color: '#333',
  },
  active: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  separator: {
    color: '#ccc',
    margin: '0 4px', // 구분자 간격을 줄여서 전체적으로 더 밀착
  },
};

export default LanguageSelector;

// Example usage:
// <LanguageSelector
//   languages={["English", "한국어", "Español", "日本語"]}
//   onLanguageChange={(language) => console.log("Selected language:", language)}
//   selectedLanguage={"English"}
// />
