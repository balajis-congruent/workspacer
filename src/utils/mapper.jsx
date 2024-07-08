import {DropdownFieldComponent} from "../components/DropdownFieldComponent";
import InputFieldComponent from "../components/InputFieldComponent";
import RadioButtonFieldComponent from "../components/RadioButtonFieldComponent";
import TableComponent from "../components/TableComponent";
import ClickComponent from "../components/ClickComponent";
import ButtonFieldComponent from "../components/ButtonFieldComponent";
import ProfileDetails from "../layouts/ProfileDetails";
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
        tag:ButtonFieldComponent
    },
    {
        type:"button",
        tag:ButtonFieldComponent
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


const mapperLayouts = {
    ProfileDetails: ProfileDetails
}

export const renderLayout= (layout)=>{
    const Comp = mapperLayouts[layout.name];
    return <Comp {...layout} />
}

export const mapper = (type) => {
    return mapperComponents.find((component, id) => {
        return component.type === String(type);
    })?.tag;
}
