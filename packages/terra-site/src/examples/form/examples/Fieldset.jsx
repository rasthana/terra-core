import React from 'react';
import Field from 'terra-form/lib/components/Field';
import Fieldset from 'terra-form/lib/components/Fieldset';
import Input from 'terra-form/lib/components/Input';

const FieldsetExamples = () => (
  <form>
    <Fieldset
      type="checkbox"
      legend="Give your full name here"
      name="children_present"
      value="children_present"
      error="All fields must be filled out"
      help="Families are eligible for family package plans"
      required
    >
      <Field
        label="First"
        isInline
        required
      >
        <Input type="text" name="first" defaultValue="" />
      </Field>
      <Field
        label="Middle"
        isInline
        required
      >
        <Input type="text" name="middle" defaultValue="" />
      </Field>
      <Field
        label="Last"
        isInline
        required
      >
        <Input type="text" name="last" defaultValue="" />
      </Field>
    </Fieldset>
  </form>
);

export default FieldsetExamples;