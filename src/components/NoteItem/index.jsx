import { Container } from "./style";
import { FiPlus, FiX } from "react-icons/fi";
export function NoteItem({ isNew = false, value, onClick, ...rest})
{
    return(
        <Container isNew={isNew}>
            <input 
            type="text" 
            value={value} 
            readOnly={!isNew}
            {...rest} 
            />
            <button 
            type="button"
            className={isNew ? 'btn-add' : 'btn-delete'}
            onClick={onClick}    
            >
                    {isNew ? <FiPlus/> : <FiX/>}
            </button>
        
        </Container>
    )
}