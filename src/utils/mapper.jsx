import ButtonField from "../components/ButtonField";
import {DropdownField} from "../components/DropdownField";
import InputField from "../components/InputField";

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
    }
];

export const mapper = (type) => {
    return mapperComponents.find((component, id) => {
        return component.type == String(type);
    })?.tag;
}
