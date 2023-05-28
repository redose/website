import type { EmergencyContactPolicy } from '@redose/types';
import type { ReactNode, FC } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import FormControls from '../../form-controls';
import Timestamp from '../../timestamp';
import { TextField } from '../../fields';

export interface FormValues {
  notes: string;
  contactPolicy: EmergencyContactPolicy | null;
}

interface Props extends Partial<FormValues> {
  children?: ReactNode;
  lastUpdatedAt?: Date;
  onSubmit(updatedUser: FormValues): Promise<void>;
}

const validationSchema = Yup.object().shape({
  notes: Yup.string().trim().min(2),
})
  .required();

const NoteForm: FC<Props> = function NoteForm({
  children,
  notes,
  contactPolicy,
  lastUpdatedAt,
  onSubmit,
}) {
  return (
    <Formik<FormValues>
      initialValues={{
        notes: notes || '',
        contactPolicy: contactPolicy || null,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <FormikForm>
          {lastUpdatedAt && (
            <Timestamp date={lastUpdatedAt} label="Updated at" />
          )}

          <TextField
            name="notes"
            label="Notes"
            type="textarea"
            disabled={isSubmitting}
          />

          <FormControls disabled={isSubmitting}>
            {children}
          </FormControls>
        </FormikForm>
      )}
    </Formik>
  );
};

export default NoteForm;
