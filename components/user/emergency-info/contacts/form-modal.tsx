import type { FC } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField } from '../../../fields';
import Footer from '../../../form-modal-footer';

export interface FormValues {
  contactId: string | null;
  email?: string;
}

const validationSchema = Yup.object().shape({
  contactId: Yup.string().nullable(),
  email: Yup.string().trim(),
})
  .required();

interface Props extends Partial<FormValues> {
  contactId?: string;
  close(): void;
  onSubmit(values: FormValues, contactId?: string): Promise<void>;
}

const EmergencyContactsFormModal: FC<Props> = function EmergencyContactsFormModal({
  contactId,
  email,
  close,
  onSubmit,
}) {
  async function handleSubmit(values: FormValues) {
    await onSubmit({
      ...values,
      email: values.email || undefined,
    }, contactId);
    close();
  }

  return (
    <Modal show onHide={() => close()}>
      <Modal.Header closeButton>
        <Modal.Title>{contactId ? 'Edit' : 'Create'} Emergency Contact</Modal.Title>
      </Modal.Header>

      <Formik<FormValues>
        initialValues={{
          contactId: contactId || null,
          email: email || '',
        }}
        validationSchema={validationSchema}
        onReset={close}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Body>
              <Row>
                <Col xs={12}>
                  <TextField name="contactId" label="Discord ID" disabled={isSubmitting} />
                </Col>

                <Col xs={12}>
                  <TextField name="email" label="Email" disabled={isSubmitting} />
                </Col>
              </Row>
            </Modal.Body>

            <Footer disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EmergencyContactsFormModal;
