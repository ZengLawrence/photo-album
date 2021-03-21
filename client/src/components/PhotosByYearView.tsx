import React, { Fragment, useContext } from "react";
import { PhotosByDate, PhotosByYear } from "../models/Photo";
import { Accordion, AccordionContext, Card, Row, useAccordionToggle } from "react-bootstrap";
import { CompactPhotoCollectionRow } from "./CompactPhotoCollectionRow";
import { faAngleDoubleDown, faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function photoCollection(photosByDate: PhotosByDate) {
  return { title: photosByDate.date, photos: photosByDate.photos };
}

const PhotosByDateView = (props: { photosByDate: PhotosByDate[] }) => {
  const { photosByDate } = props;
  return (
    <Fragment>
      {
        photosByDate.map(byDate => {
          return (
            // Without the `key`, React will fire a key warning
            <CompactPhotoCollectionRow key={byDate.date} photoCollection={photoCollection(byDate)} linkUrlRoot="/years" />
          )
        })
      }
    </Fragment>

  );
}

const ContextAwareToggle = (props: { eventKey: string }) => {
  const { eventKey } = props;
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(eventKey);

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    isCurrentEventKey ? <FontAwesomeIcon icon={faAngleDoubleUp} onClick={decoratedOnClick} /> 
      : <FontAwesomeIcon icon={faAngleDoubleDown} onClick={decoratedOnClick} />
  );
}

export const PhotosByYearView = (props: { photosByYear: PhotosByYear; }) => {
  const { photosByYear } = props;
  return (
    <Accordion defaultActiveKey={photosByYear.year}>
      <Row className="justify-content-end bg-primary text-white">
        <h1 className="flex-grow-1">{photosByYear.year}</h1>
        <div className="align-self-center">
          <ContextAwareToggle eventKey={photosByYear.year} />
        </div>
      </Row>
      <Accordion.Collapse eventKey={photosByYear.year}>
        <Card.Body>
          <PhotosByDateView photosByDate={photosByYear.photosByDate} />
        </Card.Body>
      </Accordion.Collapse>
    </Accordion>
  );

};
