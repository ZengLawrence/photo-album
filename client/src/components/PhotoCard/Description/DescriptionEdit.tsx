import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Button } from "react-bootstrap";

export const DescriptionEdit = (props: {
  description?: string;
  handleSave: (descripton?: string) => void;
  handleCancel: () => void;
}) => {
  const { description, handleSave, handleCancel } = props;
  const [newDescription, setNewDecription] = useState(props.description);

  const save = () => {
    handleSave(newDescription);
  };

  return (
    <Form>
      <Form.Control as="textarea" defaultValue={description} rows={5} onChange={(e) => { setNewDecription(e.target.value); }} />
      <Button variant="primary" type="submit" size="sm" onClick={() => save()}>
        Save
    </Button>
      <Button variant="secondary" size="sm" onClick={() => handleCancel()}>
        Cancel
    </Button>
    </Form>
  );
};
