import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/esm/Row";
import "../styles/ListingCard.css";
import { useNavigate } from "react-router-dom";

export default function ListingCard({
  id,
  images,
  title,
  location,
  isRoom,
  numRooms,
  price,
}) {
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        <Col>
          <Carousel variant="dark" interval={null}>
            {images.map((image) => (
              <Carousel.Item className="image-col" key={image.file_name}>
                <Image
                  rounded
                  className="thumbnail"
                  src={`https://cz2006-bucket.s3.ap-southeast-1.amazonaws.com/${image.file_name}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col
          role="button"
          onClick={() => navigate({ pathname: `/listing/${id}` })}
        >
          <Row className="h-100">
            <h5 className="p-0 m-0">{title}</h5>
            <span className="p-0">{location}</span>
            <hr className="m-0" />
            <ul>
              {isRoom ? <li>Individual Rooms</li> : <li>Whole unit</li>}
              <li>{numRooms} bedrooms</li>
            </ul>
            <span className="mt-auto text-end">{price} SGD/mo</span>
          </Row>
        </Col>
      </Row>
      <hr />
    </Container>
  );
}
