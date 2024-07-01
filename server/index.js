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


app.get("/",(req,res) => {
    res.json({
        sublayout: {
            type:"form",
            events: [
                {
                    event_type:"onSubmit",
                    event_action:"set-alert"
                }
            ],
            components: [
                {
                    type:"input",
                    name: "firstName",
                    label: "First Name",
                    id:"firstName",
                    placeholder: "Enter first name",
                    validations : {type: "string", required: true, required_message: "First name is required"}
                },
                {
                    type:"input",
                    name: "lastName",
                    label: "Last Name",
                    id:"lastName",
                    placeholder: "Enter last name",
                    validations : {type: "string", required: true, required_message: "Last name is required"}

                },
                {
                    type:"input",
                    name: "email",
                    id:"email",
                    label: "Email",
                    placeholder: "Enter Email",
                    validations : {type: "string", required: true, required_message: "Email is required", email_message: "Enter valid Email"}
                },
                {
                    type:"dropdown",
                    name: "company",
                    id:"company",
                    data_url: "http://localhost:3100/companies",
                    validations : {type: "string", required: true, message: "Company is required"}
                },
                {
                    type:"dropdown",
                    name: "Plan",
                    id:"plan",
                    data_url: "http://localhost:3100/plans",
                    validations : {type: "string", required: true, message: "Plan is required"}
                },
                {
                    type:"radio",
                    name: "eligibility",
                    id:"eligibility",
                    data_url: "http://localhost:3100/eligiibility",
                    validations : {type: "string", required: true, message: "Eligibility is required"}
                },
                {
                    type:"submit",
                    id:"submit",
                    name: "Submit",
                    label:"Submit"
                },

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
            "Tata",
            "ABC",
            "FireFox",
            "Google",
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

