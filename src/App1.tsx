import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Input,
  Form,
} from 'semantic-ui-react';
import { withFormik, Form as FormikForm, Field as FormikField, FormikBag, FormikProps } from 'formik'
import * as Yup from 'yup';

const App1: React.FC<App1Props> = (
  props: App1Props
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
          <FormikForm>
            <Form.Field>
              <label>Email</label>
              <FormikField as={Input}
                width={50}
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {touched.email && errors.email && <div>{errors.email}</div>}
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <FormikField as={Input}
                width={50}
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {touched.password && errors.password && <div>{errors.password}</div>}
            </Form.Field>
            <Button
              type="submit"
              disabled={isSubmitting}
            >Sign In</Button>
          </FormikForm>
        </Form>
      </div >
    );

  }
  interface MyFormProps {
    title: string;
    initialEmail?: string;
    initialPassword?: string;
  }

  const FormikForm1 = withFormik<MyFormProps, FormValues>({
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

    handleSubmit: (values: FormValues, formikBag: FormikBag<MyFormProps, FormValues>) => {
      console.log(values.email, values.password);
    },
  })(InnerForm);

  return (
    <div>
      <FormikForm1 title={props.title} />
    </div>
  );
};
type App1Props = {
  title: string;
};

export default connect(() => ({}), {})(App1);
