import { useRef, useEffect } from "react";  
import { Form, Button} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToNewsLetter } from "../../store/utils/thunks";
import { showToast } from "./tool"; 
import { clearNewsLetter } from "../../store/reducers/users";

const NewsLetter = () => {
    const textInput = useRef()
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const value = textInput.current.value;
        dispatch(addToNewsLetter({email:value}))
        .unwrap()
        .then((response) => {
            if(response.newsletter === 'added'){
             showToast('SUCCESS','Thanks for subscribing')
             textInput.current.value = '';
            }
            if(response.newsletter === 'failed'){
                showToast('ERROR',' You are already subscribed')
                textInput.current.value = '';
               }
               dispatch(clearNewsLetter)
        })
    }


    return(
        <div className="newsletter_container">
            <h1>Join our NewsLetter</h1>
            <div className="form">
                <Form onSubmit = {handleSubmit} className='mt-4'>
                    <Form.Group>
                    <Form.Control
                    type='text'
                    placeholder='Enter your email'
                    name = 'email'
                    ref = {textInput}
                    >
                    </Form.Control>
                    </Form.Group>
                    <Button className='mt-2' variant = "primary" type = "submit">
                        Add me to the list
                    </Button>
                </Form>
            </div>
        </div>
    )
}
export default NewsLetter;