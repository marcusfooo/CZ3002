import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import Image from "react-bootstrap/Image";
import "../styles/Listing.css";
import { getOrCreateChat } from "react-chat-engine";
import { useUser } from "../contexts/UserContext";
import { publicKey } from "../chatEngine";

export default function Listing() {
  const { listingId } = useParams();
  const [listingData, setListingData] = useState();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function getListingData() {
      setLoading(true);
      const res = await axios.get(`/api/listing/${listingId}`);
      const filenames = await axios.get(`/api/images/${listingId}`);
      console.log(res);
      setImages(filenames.data.data);
      setListingData(res.data.listing);
      setLoading(false);
    }
    getListingData();
  }, [listingId]);

  async function createDirectChat() {
    const creds = {
      "Public-Key": publicKey,
      "User-Name": currentUser.email,
      "User-Secret": currentUser.password,
      "Content-Type": "application/json",
    };
    const res = await fetch("https://api.chatengine.io/chats/", {
      method: "PUT",
      body: JSON.stringify({
        is_direct_chat: true,
        usernames: [listingData.seller.email],
      }),
      headers: creds,
    });
    const data = await res.json();
    const chatId = data.id;

    // getOrCreateChat(creds, {
    //   is_direct_chat: true,
    //   usernames: [listingData.seller.email],
    // });
    navigate(`/chat/${chatId}`);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row className="mt-3">
        <h3>{listingData.title}</h3>
      </Row>
      <Row>
        <p>{listingData.location}</p>
      </Row>
      <Row className="mt-3">
        <Container>
          <div className="photo-grid">
            {images.map((image, idx) => (
              <div key={image} className="shadow-sm photo-card">
                <Image
                  rounded
                  src={`https://cz2006-bucket.s3.ap-southeast-1.amazonaws.com/${image}`}
                />
              </div>
            ))}
          </div>
        </Container>
      </Row>
      <Row className="mt-3">
        <Col>
          <Row>
            <Col>
              <h4>Description</h4>
              <p>{listingData.description}</p>
            </Col>
            <Col>
              <h5>${listingData.price} SGD/mo</h5>
            </Col>
          </Row>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              {listingData.seller.email}
              <Button onClick={createDirectChat}>Chat now</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
