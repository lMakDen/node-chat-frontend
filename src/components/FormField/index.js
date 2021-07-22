import React from 'react';
import {validateField} from "../../utils/helpers";
import {Form, Input} from "antd";

const FormField = ({
   name,
   icon,
   placeholder,
   touched,
   errors,
   values,
   handleChange,
   handleBlur,
   type,
 }) => {
  return (
    <Form.Item
      validateStatus={validateField(name, touched, errors)}
      hasFeedback
      help={!touched[name] ? undefined : errors[name]}
    >
      <Input
        id={name}
        value={values[name]}
        prefix={icon}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        type={type}
      />
    </Form.Item>
  );
};

export default FormField;
