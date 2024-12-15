import React from 'react';
import Title from "./Title";
import ChoiceToggle from "../Component/ChoiceToggle";
import LanguageSelector from '../Component/LanguageSelector';
const Header = ( {coder, setCoder} ) => {
    const handleChoiceChange = (selectedOption) => {
        //console.log('Selected:', selectedOption);
        setCoder(selectedOption);
      };
    return (
        <div style={{padding : '20px', width : "100%"}}>
            <Title/>
            <ChoiceToggle
            option1="Encoder"
            option2="Decoder"
            initialOption={coder}
            onChange={handleChoiceChange}
            />
         
        </div>
    )
}
export default Header;