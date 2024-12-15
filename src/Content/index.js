import Base64Decoder from "./Base64Decoder";
import Base64Encoder from "./Base64Encoder";
const Content = ({coder, inputInitialText}) => {
    return (
        <div>
            {coder == 'Decoder' ? 
            <Base64Decoder inputInitialText={inputInitialText}/>:
            <Base64Encoder inputInitialText={inputInitialText}/>
            }
            
        </div>
    )
}

export default Content;