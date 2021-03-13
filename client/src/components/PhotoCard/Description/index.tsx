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
    <div  className="d-flex flex-column justify-content-end" style={{width:"200px"}} >
      {edit ?
        <DescriptionEdit description={description} handleSave={save} handleCancel={() => setEdit(false)} />
        :
        (
          <div>
            <DescriptionBox description={description} />
            <div className="text-sm text-secondary">
              <FontAwesomeIcon icon={faEdit} onClick={() => setEdit(true)} />
            </div>
          </div>
        )
      }
    </div>
  );
}
