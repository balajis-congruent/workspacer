import * as Yup from 'yup';

const buildValidationSchema = (components) => {
    const shape = {};
    components.forEach((component) => {
        if (component.validations) {
            console.log("Validation comps:",component.validations.required)

            let validator = Yup[component.validations.type]();

            if (component.validations.required) {
                validator = validator.required(component.validations.required_message);
            }

            if (component.validations.email) {
                console.log("Entering here");
                validator = validator.email(component.validations.email_message);
            }

            shape[component.props.fieldname] = validator;
            console.log("Validations : ",shape);
        }
    });

    return Yup.object().shape(shape);
};

export default buildValidationSchema;