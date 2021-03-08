import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import {
  Button,
} from 'semantic-ui-react';
import { Formik, FormikProps, FormikBag, withFormik, FormikErrors } from 'formik';
import { Form, Input, SubmitButton, ResetButton } from 'formik-semantic-ui-react';
import * as Yup from 'yup';

const App2: React.FC<App2Props> = (
  props: App2Props
) => {
  interface FormValues {
    email: string;
    password: string;
  }
  interface OtherProps {
    title: string;
  }
  const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      title
    } = props;

    return (
      <div>
        <h1>{title}</h1>
        <Form>
          <Input
            width={50}
            type="email"
            name="email"
            errorPrompt
          />
          <Input
            width={50}
            type="password"
            name="password"
            errorPrompt
          />
          <Button
            type="submit"
            disabled={isSubmitting}
          >Sign In</Button>
        </Form>
      </div >
    );

  }
  interface MyFormProps {
    title: string;
    initialEmail?: string;
    initialPassword?: string;
  }

  const FormikForm = withFormik<MyFormProps, FormValues>({
    mapPropsToValues: (props: MyFormProps) => ({
      email: "",
      password: "",
    }),

    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Email not valid")
        .required("Email is required"),
      password: Yup.string().required("Password is required")
    }),
    validate: (values: FormValues, props: MyFormProps) => {
      let errors: FormikErrors<FormValues> = {};
      return errors;
    },

    handleSubmit: (values: FormValues, formikBag: FormikBag<MyFormProps, FormValues>) => {
      console.log(values.email, values.password);
    },
  })(InnerForm);

  return (
    <div>
      <FormikForm title={props.title} />
    </div>
  );
};
type App2Props = {
  title: string;
};

export default connect(() => ({}), {})(App2);
