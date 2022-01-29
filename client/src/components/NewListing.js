import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import ImageUploading from "react-images-uploading";
import Container from "react-bootstrap/Container";
import "../styles/NewListing.css";
import Button from "react-bootstrap/Button";
import { AiFillDelete } from "react-icons/ai";

export default function NewListing() {
  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  return (
    <Container className="mt-3">
      <h3>What are you listing?</h3>
      <Row sm={1} lg={2} className="g-4">
        <Card>
          <Card.Body>
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div>
                  <div
                    className="uploadBox"
                    {...dragProps}
                    style={
                      isDragging ? { filter: "brightness(50%)" } : undefined
                    }
                  >
                    <Button onClick={onImageUpload}>Click or Drop here</Button>
                  </div>
                  &nbsp;
                  <Button
                    className="mt-2"
                    variant="secondary"
                    onClick={onImageRemoveAll}
                  >
                    Remove all images
                  </Button>
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image["data_url"]} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <button onClick={() => onImageUpdate(index)}>
                          Update
                        </button>
                        <Button
                          variant="light"
                          className="mt-2"
                          onClick={() => onImageRemove(index)}
                        >
                          <AiFillDelete size={"1.5em"} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label>Listing type</Form.Label>
                <Form.Select>
                  <option>Listing type</option>
                  <option value={1}>Listing type</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}
