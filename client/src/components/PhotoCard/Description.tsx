import Form from "react-bootstrap/Form";
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSProperties, useState } from "react";
import { Button } from "react-bootstrap";

const showLineBreak: CSSProperties = {
  whiteSpace: 'pre-line'
};

export const Description = (props: { description?: string } ) => {
  const [edit, setEdit] = useState(false);
  const [description, setDecription]  = useState(props.description);
  const [newDescription, setNewDecription]  = useState(props.description);

  const save = () => {
    setDecription(newDescription);
    setEdit(false);
  }

  return (
    <div>
      <div className="text-sm">
        <FontAwesomeIcon icon={faEdit} onClick={() => setEdit(true)}/>
      </div>
      {edit ?
        <Form>
          <Form.Control as="textarea" onChange={(e) => {setNewDecription(e.target.value)}}>
            {description}
          </Form.Control>
          <Button variant="primary" type="submit" size="sm" onClick={() => save()}>
            Save
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setEdit(false)}>
            Cancel
          </Button>
        </Form>
        :
        <div style={showLineBreak}>
          {description}
        </div>
      }

    </div>
  );
}
