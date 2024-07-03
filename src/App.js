import './App.css';
import { Formik, Field } from 'formik';
import { useState, useEffect } from 'react';
import axios from "axios";
import { mapper } from './utils/mapper';
import { fetchDropdownData } from './components/DropdownFieldComponent';
import buildValidationSchema from './utils/validationMapper';
import { Form } from 'react-bootstrap';

function App() {

  const [ui, setUi] = useState(null);
  const [initialValues, setInitialValues] = useState({});
  const [validationSchema, setValidationSchema] = useState({});
  const [data, setData] = useState({});
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const url = "http://localhost:3100";
    axios.get(url).then((res) => {
      //console.log(res.data);
      setUi(res.data);
    }).catch((err) => {
      //console.log(err);
    });
  }, []);

  useEffect(() => {
    if (ui) {
      const initValues = {};
      const componentsToFetch = [];
  
      // Function to recursively map components and their children
      const mapComponent = (comp) => {
        if (comp.type !== "button") {
          return {
            type: comp.type,
            function: mapper(comp.type),
            props: comp.props,
            children: comp.children ? comp.children.map(child => mapComponent(child)) : [],
            events: comp.events
          };
        }
        return null; // Return null for components you want to filter out
      };
  
      // Map components to desired structure
      const mappedComponents = ui.sublayout.components.map((comp) => {
        if (comp.type !== "button") {
          return mapComponent(comp);
        }
        return null; // Return null for components you want to filter out
      }).filter(Boolean); // Filter out null values
  
      console.log("Components mapped to functions :", mappedComponents);
      setComponents(mappedComponents);
  
      ui.sublayout.components.forEach((component) => {
        if (component.type !== "submit") {
          initValues[component.props.fieldName] = '';
        }
        // if (component.data_url || component.children?.data_url) {
        //   componentsToFetch.push(component);
        // }
      });
  
      setValidationSchema(buildValidationSchema(ui.sublayout.components.filter(comp => comp.type !== "submit")));
  
      // Example of how to set initial values if needed
      console.log("Init Values",initValues);
      setInitialValues(initValues);
    }
  }, [ui]);
  
  useEffect(() => {
    async function fetchData(components) {
      const dataMap = {};
  
      async function fetchDataRecursive(component) {
        if (component.props.data_url) {
          const data = await fetchDropdownData(component.props.data_url);
          dataMap[component.props.fieldName] = data;
        }
  
        if (component.children && component.children.length > 0) {
          for (let childComponent of component.children) {
            await fetchDataRecursive(childComponent);
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
      console.log("Components before fetch",components);
      fetchData(components);
    }
  }, [components]);
  
  console.log("Data for all comps :",data);
  return (
    <>
      <p style={{ margin: "20px 0px 20px 30px", fontSize: "1.25rem", fontWeight: "500" }}>Personal Information</p>
      <div style={{paddingLeft:"30%", paddingTop:"3rem"}}>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
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
                  return (<div style={{paddingTop:"2rem"}}><Field name={elem?.props.fieldName} {...elem?.props} childComp={elem?.children} data={data}  onChange={handleChange} component={elem.function} /></div>)
                })
              } 
              <button type="submit">Submit</button>
            </Form>
          )
        }}
      </Formik>
      </div>
    </>
  );
}

export default App;
