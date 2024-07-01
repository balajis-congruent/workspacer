import { ErrorMessage } from 'formik';
import { Form } from 'react-bootstrap';

const inputFieldComponent = (properties) => {
    const { props, events } = properties;
    return (
        <div style={{ display: "list-item"}}>
            <label style={{marginLeft:"5rem"}}>{props.name}</label>
            <Form.Control {...props} {...events.formikProps}/>
            <ErrorMessage name={props.name} component="div" className="error" style={{ color: 'red' }} />
        </div>
    )
}

export default inputFieldComponent