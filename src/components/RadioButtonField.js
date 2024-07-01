const RadioButtonField = (props, data) => {
    return (
        <div>
            <label>{props.label}</label>
            {data && data.map(option => {
                <label>
                    <Field type="radio" name={props.name} value={option} />
                    {option}
                </label>
            })}
        </div>
    );
}

export default RadioButtonField;