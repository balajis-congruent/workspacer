import ButtonField from "../components/ButtonField";
import {DropdownField} from "../components/DropdownField";
import InputField from "../components/InputField";
import RadioButtonField from "../components/RadioButtonField";

const mapperComponents = [
    {
        type:"input",
        tag:InputField
    },
    {
        type:"dropdown",
        tag:DropdownField
    },
    {
        type:"submit",
        tag:ButtonField
    },
    {
        type: "radio",
        tag: RadioButtonField
    }
];

export const mapper = (type) => {
    return mapperComponents.find((component, id) => {
        return component.type === String(type);
    })?.tag;
}
