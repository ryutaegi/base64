import React, { useState, useEffect } from 'react';

const ChoiceToggle = ({ option1, option2, initialOption, onChange }) => {
  const [selected, setSelected] = useState(initialOption || option1);

  // initialOption 변경 시 상태 업데이트
  useEffect(() => {
    if (initialOption) {
      setSelected(initialOption);
    }
  }, [initialOption]);

  const handleToggle = (option) => {
    setSelected(option);
    if (onChange) {
      onChange(option); // 선택한 옵션 부모로 전달
    }
  };

  return (
    <div style={styles.choiceToggle}>
      <button
        style={{
          ...styles.choiceButton,
          ...(selected === option1 ? styles.active : {}),
          ...(selected !== option1 ? styles.inactive : {}),
          ...styles.leftRounded,
        }}
        onClick={() => handleToggle(option1)}
      >
        {option1}
      </button>
      <button
        style={{
          ...styles.choiceButton,
          ...(selected === option2 ? styles.active : {}),
          ...(selected !== option2 ? styles.inactive : {}),
          ...styles.rightRounded,
        }}
        onClick={() => handleToggle(option2)}
      >
        {option2}
      </button>
    </div>
  );
};

const styles = {
  choiceToggle: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0', // 버튼을 붙이기 위해 간격 제거
  },
  choiceButton: {
    padding: '3px 100px', // 좌우로 더 길게 조정
    fontSize: '16px',
    border: '2px solid #ccc',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out', // 부드러운 전환 효과 추가
  },
  active: {
    backgroundColor: '#007bff',
    color: 'white',
    borderColor: '#007bff',
  },
  inactive: {
    borderColor: '#ddd',
  },
  leftRounded: {
    borderRadius: '50px 0 0 50px', // 왼쪽 버튼 끝만 둥글게
  },
  rightRounded: {
    borderRadius: '0 50px 50px 0', // 오른쪽 버튼 끝만 둥글게
  },
};

export default ChoiceToggle;
