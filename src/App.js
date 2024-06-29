import logo from './logo.svg';
import './App.css';
import { Formik, Field, Form } from 'formik';

const [ui, setUi] = useState(null);

useEffect(() => {
  const url = "http://localhost:3100"
  try {
    axios.get(url).then((res) => {
      console.log(res.data);
      setUi(res.data);
    }).catch((err) => {
      console.log(err)
    })
  }
  catch (err) {
    console.log(err);
  }
}, [])

function App() {
  return (
    <Formik
      initialValues={{ email: '', color: '', firstName: '', lastName: '' }}
       onSubmit={(values, actions) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           actions.setSubmitting(false);
         }, 1000);
       }}>
       <Form>
       {
        ui?.sublayout.components.map(component => {
          return mapper(component);
        })
       }

        {/* <Field id="firstName" name="firstName" placeholder="Jane" />

        <Field id="lastName" name="lastName" placeholder="Doe" />

        <Field as="select" id="color" name="color">
             <option value="red">Red</option>
             <option value="green">Green</option>
             <option value="blue">Blue</option>
        </Field>

        <Field
          id="email"
          name="email"
          placeholder="jane@acme.com"
          type="email"
        />
        <button type="submit">Submit</button> */}
      </Form>
    </Formik>
    
  );
}

export default App;
