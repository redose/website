import type { FC } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField } from '../../fields';
import Footer from '../../form-modal-footer';

const validationSchema = Yup.object().shape({
  content: Yup.string().trim().required(),
  channelId: Yup.string(),
})
  .required();

export interface FormValues {
  content: string;
  channelId: string | null;
}

interface Props extends Partial<FormValues> {
  noteId?: string;
  close(): void;
  onSubmit(values: FormValues, noteId?: string): Promise<void>;
}

const NoteFormModal: FC<Props> = function NoteFormModal({
  noteId,
  content,
  channelId,
  close,
  onSubmit,
}) {
  return (
    <Modal show size="sm" onHide={() => close()}>
      <Modal.Header closeButton>
        <Modal.Title>{noteId ? 'Edit' : 'Create'} User Note</Modal.Title>
      </Modal.Header>
      <Formik<FormValues>
        initialValues={{
          content: content || '',
          channelId: channelId || null,
        }}
        validationSchema={validationSchema}
        onReset={close}
        onSubmit={(values) => onSubmit(values, noteId)}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Body>
              <Row>
                <Col xs={12}>
                  <TextField
                    name="content"
                    label="Note"
                    type="textarea"
                    disabled={isSubmitting}
                  />
                </Col>

                <Col xs={12}>
                  <TextField
                    name="channelId"
                    label="Channel"
                    disabled={isSubmitting}
                  />
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

export default NoteFormModal;
