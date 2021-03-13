import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import { DescriptionBox } from './DescriptionBox';
import { DescriptionEdit } from "./DescriptionEdit";

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
    <div style={{width:"200px"}} >
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
