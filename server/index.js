const express = require("express");
const cors = require("cors");
const { Placeholder } = require("react-bootstrap");
const app = express();

const plansData = {
    plansForCompanies: [
        {
            companyName: "Tata",
            plans: ["Plan A", "Plan B"]
        },
        {
            companyName: "ABC",
            plans: ["Plan C, Plan D"]
        },
        {
            companyName: "FireFox",
            plans: ["Plan E", "Plan F"]
        },
        {
            companyName: "Google",
            plans: ["Plan G", "Plan H"]
        }
    ]
}

app.use(cors());

app.get("/button", (req, res) => {
    res.json({
        sublayout: {
            type: "form",
            components: [
                {
                    field: "button",
                    props: {
                        variant: "secondary",
                        size: "lg",
                        // disabled: "true",
                    },
                    children: "Fetch Data",
                    events: [
                        {
                            event_name: "onClick",
                            event_data: {
                                event_type: "data-fetching",
                                endpoint: "http://localhost:3000/endpoint",

                            }
                        }

                    ]
                }
            ]
        }
    })
})


app.get("/", (req, res) => {
    res.json({
        sublayout: {
            type: "form",
            components: [
                {
                    type: "input",
                    props: {
                        name: "firstName",
                        label: "First Name",
                        id: "firstName",
                        placeholder: "Enter first name",
                    },
                    validations: { type: "string", required: true, required_message: "First name is required" }
                },
                {
                    type: "input",
                    props: {
                        name: "lastName",
                        label: "Last Name",
                        id: "lastName",
                        placeholder: "Enter last name",
                    },
                    validations: { type: "string", required: true, required_message: "First name is required" }

                },
                {
                    type: "input",
                    props: {
                        name: "email",
                        id: "email",
                        label: "Email",
                        placeholder: "Enter Email",
                    },
                    validations: { type: "string", required: true, email: true, required_message: "Email is required", email_message: "Enter valid Email" }
                },

                {
                    type: "dropdown",
                    props: {
                        name: "company",
                        id: "company",
                        label: "Company",
                        data_url: "http://localhost:3100/companies",
                    },
                    validations: { type: "string", required: true, message: "Company is required" }
                },
                {
                    type: "dropdown",
                    props: {
                        name: "plan",
                        id: "plan",
                        label: "Plan",
                        data_url: "http://localhost:3100/plans",
                    },
                    validations: { type: "string", required: true, message: "Plan is required" }
                },
                {
                    type: "radio",
                    props: {
                        name: "eligibility",
                        id: "eligibility",
                        label: "Eligibility",
                        data_url: "http://localhost:3100/eligibility",
                    },
                    validations: { type: "string", required: true, message: "Eligibility is required" }
                },
                {
                    type: "input",
                    props: {
                        name: "rehireDate",
                        label: "Rehire Date",
                        id: "rehireDate",
                        placeholder: "Enter rehire date",
                    },
                    children: [
                        {
                            type: "click",
                            props: {
                                name: "rehireDetails",
                                label: "Rehire Details",
                                id: "rehireDetails"
                            },
                            stateProps: ["isAdd"],
                            events: [
                                {
                                    event_type: "toggle-RehireDetails",
                                    event_name: "onClick"
                                }
                            ]
                        },
                        {
                            type: "table",
                            props: {
                                name: "rehireTable",
                                label: "Rehire Table",
                                id: "rehireTable",
                                columns: [{ name: "rehireLocation", label: "Rehire Location" }, { name: "rehireDate", label: "Rehire Date" }],
                                data_url: "http://localhost:3100/tableData",
                            }
                        }
                    ],
                    validations: { type: "string", required: false }
                },
                // {
                //     type: "submit",
                //     props: {
                //         id: "submit",
                //         name: "Submit",
                //         label: "Submit"
                //     }
                // },
            ]
        }
    })
})


app.get("/rehireDetailsUI", (req, res) => {
    res.json({
        sublayout: {
            type: "modal",

            components: [
                {
                    type: "table",
                    name: "rehireTable",
                    label: "Rehire Table",
                    id: "rehireTable",
                    columns: [{ name: "rehireLocation", label: "Rehire Location" }, { name: "rehireDate", label: "Rehire Date" }],
                    data_url: "http://localhost:3100/tableData",
                },
                {
                    type: "input",
                    name: "lastName",
                    label: "Last Name",
                    id: "lastName",
                    placeholder: "Enter last name",
                    validations: { type: "string", required: true, required_message: "Last name is required" }

                }
            ]
        }
    })
})
// app.get('/companies', (req, res) => {
//     res.json({
//         options: [
//             "Tata",
//             "ABC",
//             "Axis",
//         ]
//     })
// })

// app.get("/", (req, res) => {
//     res.json({
//         sublayout: {
//             type: "form",
//             components: [
//                 {
//                     field: "input",
//                     props: {
//                         name: "email",
//                         type: "email",
//                         placeholder: "Enter the name",
//                     },
//                     validations: {
//                         "email" : {
//                             required: true
//                         }
//                     }
//                 }
//                 },
//                 {
//             field: "dropdown",
//             props: {
//                 title: "Company",
//             },
//             events: [
//                 {
//                     event_name: "useEffect",
//                     event_data: {
//                         event_type: "data-fetching",
//                         url: "http://localhost:3000/companies"
//                     }
//                 }
//             ]
//         },
//         {
//             field: "dropdown",
//             props: {
//                 title: "Plans",
//                 disabled: true
//             },
//             events: [
//                 {
//                     event_name: "useEffect",
//                     event_data: {
//                         event_type: "data-fetching",
//                         event_props: {
//                             url: "http://localhost:3000/plans"
//                         }
//                     }
//                 }
//             ]
//         },
//         {
//             field: "button",
//             props: {
//                 type: "submit"
//             },
//             children: "Submit"
//         },
//         {
//             field: "button",
//             props: {
//                 variant: "secondary",
//                 size: "md",
//                 // disabled: "true",
//             },
//             children: "Fetch Data",
//             events: [
//                 {
//                     event_name: "onClick",
//                     event_data: {
//                         event_type: "data-fetching",
//                         event_props: {
//                             endpoint: "http://localhost:3000/endpoint",
//                         }
//                     }
//                 }
//             ]
//         }

//             ]
//         }
//     })
// })

app.get("/endpoint", (req, res) => {
    res.json({ message: "Hi this is my endpoints" });
})

app.get('/companies', (req, res) => {
    res.json({
        options: [
            "Tata",
            "ABC",
            "FireFox",
            "Google",
        ]
    })
})

app.get('/plans', (req, res) => {
    res.json({
        options: [
            "Plan A",
            "Plan B",
        ]
    })
})

app.get('/tableData', (req, res) => {
    res.json({
        options: [
            {
                rehireLocation: "Chennai",
                rehireDate: "May 5th,2015"
            },
            {
                rehireLocation: "Bangalore",
                rehireDate: "March 3rd,2019"
            }
        ]
    })
})

app.get('/eligibility', (req, res) => {
    res.json({
        options: [
            "Eligible",
            "Ineligible"
        ]
    })
})


app.get('/plans/', (req, res) => {
    res.json(getPlansByCompanyName(req.body.companyName))
})


function getPlansByCompanyName(companyName) {
    return plansData.find((data) => data.companyName == companyName).plans;
}




app.listen(3100, () => {
    console.log("running on port ", 3100);
})


