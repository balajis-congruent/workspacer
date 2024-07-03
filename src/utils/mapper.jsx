import ButtonField from "../components/ButtonField";
import {DropdownFieldComponent} from "../components/DropdownFieldComponent";
import InputFieldComponent from "../components/InputFieldComponent";
import RadioButtonFieldComponent from "../components/RadioButtonFieldComponent";
import TableComponent from "../components/TableComponent";
import ClickComponent from "../components/ClickComponent";
const mapperComponents = [
    {
        type:"input",
        tag:InputFieldComponent
    },
    {
        type:"dropdown",
        tag:DropdownFieldComponent
    },
    {
        type:"submit",
        tag:ButtonField
    },
    {
        type: "radio",
        tag: RadioButtonFieldComponent
    },
    {
        type: "table",
        tag: TableComponent
    },
    {
        type: "click",
        tag: ClickComponent
    }
];

export const mapper = (type) => {
    return mapperComponents.find((component, id) => {
        return component.type === String(type);
    })?.tag;
}
