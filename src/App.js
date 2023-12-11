import React from "react";
import { useState } from "react";

const App = () => {
  // To check on and change in the form Values (username, password and email)
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);

  // To handle the Errors
  const [formErrors, setFormErrors] = useState({});

  // To Check the submission
  const [isSubmit, setIsSubmit] = useState(false);

  // To Make An Action When the input field is changed
  const handleChange = (e) => {
    // get the name and value
    // from the input field (e.target)
    const { name, value } = e.target;
    // to set the new value of the formValues (name: "value")
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
    // The Process is:
    // when you change the vlaue of the input field, there is two things happen:
    // First: automatically the (handleChange - arrow function) is called
    // then it's getting the name of the changed input field and its value that you recently set
    // Second: you set a new value in the (formValues (initialValues) - constant variable) as you recently added value
    //
    // but because that there is an (initialValues - constant variable) that has an empty value of the data (username: "", email: "", password: "")
    // and the (formValues - constant variable) that is taking its the first value from it
    // So, the FIRST value that will be returned by (handleChange - arrow function) will be empty
    // But, By the second value you will add in the input field, everything will be change, Like:
    // First: the (handleChange - arrow function) will be called
    // then will getting the name of the changed input field and its value that you recently (secondly) set
    // Second: your second value will be added in the (formValues.username - constant variable)
    // then the (initialValues - constant variable) will be fill with the data that you added
  };

  const handleSubmit = (e) => {
    // To prevent the page from refreshing
    e.preventDefault();

    // Any output of the validate function will be
    // added in the (FormErrors - constant variable) as an object
    // To check if there is any errors
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  // To Active the (formErrors - constant variable)
  // useEffect(() => {
  //   console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(formErrors);
  //   }
  // }, [formErrors]);

  // To Validate the values
  const validate = (values) => {
    const errors = {};
    const EMAIL_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

    if (!values.username) {
      errors.username = "Username is required!";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be bigger than 3 characters!";
    } else if (values.password.length > 10) {
      errors.password = "Password must be lower than 10 characters!";
    }

    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <h1 style={{ color: "teal" }}>Login Successfully ^_^</h1>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}

      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              // To set the username value in the formValues
              // to check it later
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p> {/* To Active the error if happened */}
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default App;
