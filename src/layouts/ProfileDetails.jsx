import React, { useEffect, useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { mapper } from '../utils/mapper';
import { fetchDropdownData } from '../components/DropdownFieldComponent';
import buildValidationSchema from '../utils/validationMapper';
import { Form } from 'react-bootstrap';
import '../css/layouts.css'


const ProfileDetails = (sublayout) => {
    const [initialValues, setInitialValues] = useState({});
    const [validationSchema, setValidationSchema] = useState({});
    const [data, setData] = useState({});
    const [components, setComponents] = useState([]);
    const [buttonComponents, setButtonComponents] = useState([]);

    // const [ui, setUi] = useState([]);

    // useEffect(() => {
    //     const url = "http://localhost:3100";
    //     axios.get(url).then((res) => {
    //         setUi(res.data);
    //     }).catch((err) => {
    //     });
    // }, []);

    useEffect(() => {
        
        if (sublayout) {
            const initValues = {};
            const componentsToFetch = [];

            // Function to recursively map components and their children
            const mapComponent = (comp) => {
                return {
                    type: comp.type,
                    function: mapper(comp.type),
                    props: comp.props,
                    children: comp.children ? comp.children.map(child => mapComponent(child)) : [],
                    events: comp.events
                };
                return null; // Return null for components you want to filter out
            };

            // Map components to desired structure
            const mappedComponents = sublayout.components?.map((comp) => {
                return mapComponent(comp);
            }).filter(Boolean); // Filter out null values

            console.log("Components mapped to functions :", mappedComponents);
            setComponents(mappedComponents.filter(comp => comp.type !== "button"));
            setButtonComponents(mappedComponents.filter(comp => comp.type === "button"));

            sublayout.components.forEach((component) => {
                if (component.type !== "submit") {
                    initValues[component.props.fieldname] = '';
                }
                // if (component.data_url || component.children?.data_url) {
                //   componentsToFetch.push(component);
                // }
            });

            setValidationSchema(buildValidationSchema(sublayout.components.filter(comp => comp.type !== "submit")));

            // Example of how to set initial values if needed
            console.log("Init Values", initValues);
            setInitialValues(initValues);
        }
    }, []);

    useEffect(() => {
        async function fetchData(components) {
            const dataMap = {};

            async function fetchDataRecursive(component) {
                if (component.props.data_url) {
                    const data = await fetchDropdownData(component.props.data_url);
                    dataMap[component.props.fieldname] = data;
                }

                if (component.children && component.children.length > 0) {
                    for (let childcomponent of component.children) {
                        await fetchDataRecursive(childcomponent);
                    }
                }
            }

            for (let component of components) {
                await fetchDataRecursive(component);
            }
            console.log(dataMap);
            setData(dataMap);
        }

        if (components.length > 0) {
            console.log("Components before fetch", components);
            fetchData(components);
        }
    }, [components]);

    console.log("Data for all comps :", data);
    return (

     <>
            <p style={{ margin: "20px 0px 20px 30px", fontSize: "1.25rem", fontWeight: "500" }}>Personal Information</p>
            <div style={{ paddingLeft: "30%", paddingTop: "3rem" }}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            console.log("Values : ", values);
                            alert(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                        }, 1000);
                    }}
                >
                    {(formikProps) => {
                        const {
                            handleChange,
                            setFieldValue,
                            handleSubmit,
                            setValues,
                            setTouched,
                            values,
                            setSubmitting,
                            setFieldError,
                            fieldValue,
                            errors,
                            ...rest
                        } = formikProps;
                        console.log("Errors : ", errors);
                        return (
                            <Form onSubmit={handleSubmit} style={{ fontSize: ".75rem", color: "#495057", border: "1px solid #949494" }}>
                                {components &&
                                    components.map((elem) => {
                                        return (
                                            <div style={{ paddingTop: "2rem" }}>
                                                <Field classname="profileDetailsContainer" as={elem?.props.type} name={elem?.props.fieldname} {...elem?.props} childcomp={elem?.children} data={data} onChange={handleChange} component={elem.function} />
                                                {/* <ErrorMessage name={elem?.props.fieldname} component="div" style={{color:"red"}}/> */}
                                            </div>)
                                    })
                                }
                                {buttonComponents && buttonComponents.map(elem => {
                                    return (
                                        elem?.function(elem.props)
                                    )
                                })}
                                {/* <button type="submit">Submit</button> */}
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </>
    );
}


export default ProfileDetails