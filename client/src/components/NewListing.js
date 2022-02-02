import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import ImageUploading from "react-images-uploading";
import Container from "react-bootstrap/Container";
import "../styles/NewListing.css";
import Button from "react-bootstrap/Button";
import { AiFillDelete } from "react-icons/ai";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Col from "react-bootstrap/Col";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const listingSchema = yup
  .object({
    title: yup.string(100).required(),
    isRental: yup
      .string()
      .matches(/(renting|selling)/, { message: "Please select one" })
      .required(),
    postalCode: yup
      .string()
      .matches(/\d{6}/, "Invalid Singapore postal code")
      .required(),
    isRoom: yup
      .string()
      .required()
      .matches(/(room|unit)/),
    description: yup.string().max(500),
    price: yup
      .number()
      .typeError("Please enter a valid number")
      .integer()
      .required(),
    numRooms: yup
      .number()
      .typeError("Please choose one")
      .integer()
      .lessThan(6)
      .moreThan(0)
      .required(),
  })
  .required();

export default function NewListing() {
  const [images, setImages] = useState([]);
  const maxImageNumber = 69;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(listingSchema) });
  const watchListingType = watch("isRental");
  const navigate = useNavigate();
  const { currentUser } = useUser();

  const postListing = async (data) => {
    console.log(data);
    data.isRental = data.isRental === "renting" ? true : false;
    data.isRoom = data.isRoom === "room" ? true : false;
    //TODO
    const location = "somelocation";
    const finalData = {
      ...data,
      location: location,
      seller_id: currentUser.id,
    };
    console.log(finalData);
    try {
      const res = await axios.post("/api/listing", finalData, {
        withCredentials: true,
      });
      navigate(`/listing/${res.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  useEffect(() => {
    if (watchListingType === "selling") {
      setValue("isRoom", "unit");
    }
  }, [watchListingType, setValue]);

  return (
    <Container className="mt-3">
      <h3>What are you listing?</h3>
      <Row sm={1} lg={2} className="g-4">
        <Col>
          <Card>
            <Card.Body>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxImageNumber}
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
                      <Button onClick={onImageUpload}>
                        Click or Drop here
                      </Button>
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
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <form noValidate onSubmit={handleSubmit(postListing)}>
                <div className="form-group">
                  <label htmlFor="postalCode">Title</label>
                  <input
                    id="title"
                    type="text"
                    className="form-control"
                    {...register("title")}
                    placeholder="Enter a title"
                    required
                  />
                  <p className="text-danger">{errors.postalCode?.message}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="listingType">Listing Type</label>
                  <select
                    {...register("isRental")}
                    className="form-select"
                    id="listingType"
                    required
                  >
                    <option value="">Are you renting or selling?</option>
                    <option value="renting">Renting</option>
                    <option value="selling">Selling</option>
                  </select>
                  <p className="text-danger">{errors.isRental?.message}</p>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    id="postalCode"
                    type="text"
                    className="form-control"
                    {...register("postalCode")}
                    required
                  />
                  <p className="text-danger">{errors.postalCode?.message}</p>
                </div>
                <div className="form-group mt-3">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="flexRadioDefault1"
                      value="room"
                      name="isRoom"
                      disabled={watchListingType === "selling"}
                      {...register("isRoom")}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Rooms
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="flexRadioDefault2"
                      value="unit"
                      name="isRoom"
                      {...register("isRoom")}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault2"
                    >
                      Whole unit
                    </label>
                  </div>
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="numRooms">Number of Rooms</label>
                  <select
                    {...register("numRooms")}
                    className="form-select"
                    id="numRooms"
                    required
                  >
                    <option>How many rooms?</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                  </select>
                  <p className="text-danger">{errors.numRooms?.message}</p>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="price">Price</label>
                  <input
                    id="price"
                    {...register("price")}
                    type="number"
                    className="form-control"
                    required
                  />
                  <p className="text-danger">{errors.price?.message}</p>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    placeholder="Give a short description"
                    {...register("description")}
                    className="form-control"
                    rows={3}
                  />
                  <p className="text-danger">{errors.description?.message}</p>
                </div>
                <Button className="mt-3" type="submit">
                  Create new listing
                </Button>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
