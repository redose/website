import type { User } from '@redose/types';
import type { ReactNode, FC } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import redoseApi from '../../../redose-api';
import { useToast } from '../../providers/toast';
import FormControls from '../../form-controls';
import Timestamp from '../../timestamp';
import { TextField } from '../../fields';

interface FormValues {
  notes: string;
}

interface Props extends Partial<FormValues> {
  children?: ReactNode;
  lastUpdatedAt?: Date;
  onSuccess(updatedUser: User): Promise<void>;
}

const validationSchema = Yup.object().shape({
  notes: Yup.string().trim().min(2),
})
  .required();

const NoteForm: FC<Props> = function NoteForm({
  children,
  notes,
  lastUpdatedAt,
  onSuccess,
}) {
  const toast = useToast();

  async function submit(values: FormValues) {
    return redoseApi.patch<User>('/user/me/emergency-info', values)
      .then((res) => {
        toast.success('Emergency notes updated.');
        return onSuccess(res.data);
      })
      .catch((ex) => {
        console.error(ex);
        toast.error('Emergency notes failed to update.');
      });
  }

  return (
    <Formik<FormValues>
      initialValues={{ notes: notes || '' }}
      validationSchema={validationSchema}
      onSubmit={submit}
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
