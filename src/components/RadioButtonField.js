import { Field } from 'formik';
const RadioButtonField = (props, data) => {
    console.log("Props and data :", props, data);
    return (
        <div style={{ display: "list-item", paddingLeft: "50%", paddingTop: "20px", fontWeight:"400", color:"#32699d" }}>
            <label style={{ display: "list-item"}}>{props.validations.required ? props.label + "*" : props.label}</label>
            {data && data.map(option => {
                return (<label>
                    <Field style={{fontSize: ".75rem"}} type="radio" name={props.name} value={option} />
                    {option}
                </label>)
            })}
        </div>
    );
}

export default RadioButtonField;