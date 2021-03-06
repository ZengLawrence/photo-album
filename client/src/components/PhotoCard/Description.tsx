import Form from "react-bootstrap/Form";
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSProperties, useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const showLineBreak: CSSProperties = {
  whiteSpace: 'pre-line'
};

const DescriptionBox = (props: { description?: string }) => {
  const { description } = props;
  if (description) {
    return (
      <div style={showLineBreak} >
        {description}
      </div>
    )
  } else {
    return (<div />)
  }
}

const DescriptionEdit = (props: {
  description?: string,
  handleSave: (descripton?: string) => void,
  handleCancel: () => void
}) => {
  const { description, handleSave, handleCancel } = props;
  const [newDescription, setNewDecription] = useState(props.description);

  const save = () => {
    handleSave(newDescription);
  }

  return (
    <Form>
      <Form.Control as="textarea" defaultValue={description} rows={5} onChange={(e) => { setNewDecription(e.target.value) }} />
      <Button variant="primary" type="submit" size="sm" onClick={() => save()}>
        Save
    </Button>
      <Button variant="secondary" size="sm" onClick={() => handleCancel()}>
        Cancel
    </Button>
    </Form>
  )
}

export const Description = (props: { description?: string, handleSave: (description?: string) => void }) => {
  const {description} = props;
  const [edit, setEdit] = useState(false);

  const save = (newDescription?: string) => {
    setEdit(false);
    props.handleSave(newDescription);
  }

  useEffect(()=> {
    // description could change if click another photo on nagvigation bar
    setEdit(false);
  }, [description]);

  return (
    <div>
      <div className="text-sm text-secondary">
        <FontAwesomeIcon icon={faEdit} onClick={() => setEdit(true)} />
      </div>
      {edit ?
        <DescriptionEdit description={description} handleSave={save} handleCancel={() => setEdit(false)} />
        :
        <DescriptionBox description={description} />
      }

    </div>
  );
}