import * as Yup from 'yup';

const buildValidationSchema = (components) => {
    const shape = {};
    components.forEach((component) => {
        if (component.validations) {
            console.log("Validation comps:",component.validations.required)

            let validator = Yup[component.validations.type]();

            if (component.validations.required) {
                validator = validator.required(component.validations.message);
            }

            shape[component.name] = validator;
            console.log("Validations : ",shape);
        }
    });

    return Yup.object().shape(shape);
};

export default buildValidationSchema;