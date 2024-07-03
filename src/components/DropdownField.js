// import React from 'react'
// import { Field, ErrorMessage } from 'formik';
// import axios from 'axios';


// const fetchDropdownData = async (dataUrl) => {
//     try {
//         console.log("URL :", dataUrl)
//         const response = await axios.get(dataUrl);
//         const optionsArray = Object.values(response.data.options);
//         console.log('Response data:', optionsArray);
//         return optionsArray;
//     } catch (error) {
//         console.error('Error fetching dropdown data:', error);
//         return [];
//     }
// };

// const DropdownField = (props, data, formikProps) => {
//     console.log("Data in drop", data);
//     return (
//         <div style={{ display: "list-item", paddingLeft: "50%", paddingTop: "20px",fontWeight:"400", color:"#32699d"}} >
//             {
//                 <label style={{ display: "list-item"}}>{props.label}</label>
//             }
//             {/* <label style={{ display: "list-item"}}>{props.validations.required ? props.label + "*" : props.label}</label> */}
//             {/* <Field style={{fontSize: ".75rem"}} {...props} component="select" {...formikProps}>
//                 <option value="" disabled>Select {props.name}</option>
//                 {
//                     data && data.map(option => {
//                         return (<option key={option} value={option}>{option}</option>)
//                     })
//                 }
//             </Field> */}

//             <div>
//             <DropdownButton {...eventHandlers} {...props}>
//                {
//                 datafromApi &&
//                  datafromApi.map((elem,id)=>{
//                     return (<Dropdown.Item>{elem}</Dropdown.Item>)
//                  })
//                }
//             </DropdownButton >
//         </div>
//             <ErrorMessage name={props.name} component="div" className="error" style={{ color: 'red' }} />
//         </div>
//     )
// }

// export { fetchDropdownData, DropdownField }