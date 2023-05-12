import type { FC } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import redoseApi from '../../../../redose-api';

const validationSchema = Yup.object().shape({
  contactId: Yup.string().uuid().required(),
  contactEmail: Yup.string().trim().email().required(),
})
  .required();

interface FormValues {
  contactId?: string;
  contactEmail?: string;
}

interface Props extends FormValues {
  id: string;
}

const EmergencyContactsTableRowForm: FC<Props> = function EmergencyContact({ id, ...props }) {
  async function submit(values: FormValues) {

  }

  return (
    <Formik
      initialValues={props}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({ isSubmitting }) => (
        <tr>
          <td>
            <Form id={`emergency-contact-form-${}`}
          </td>
        </tr>
      )}
    </Formik>
  );
};

export default EmergencyContactsTableRowForm;
