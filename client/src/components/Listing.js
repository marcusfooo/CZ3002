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
import { useUser } from "../contexts/UserContext";
import { publicKey } from "../chatEngine";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

export default function Listing() {
  const { listingId } = useParams();
  const [listingData, setListingData] = useState();
  const [images, setImages] = useState([]);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    async function getListingData() {
      setLoading(true);
      const res = await axios.get(`/api/listing/${listingId}`);
      //get bidding data if user is the lister
      if (res.data?.listing.seller.email === currentUser?.email) {
        const bids = await axios.get(`/api/bids/listing/${listingId}`, {
          withCredentials: true,
        });
        setBids(bids.data.bids);
      }
      setImages(res.data.listing.images);
      setListingData(res.data.listing);
      setLoading(false);
    }
    getListingData();
  }, [listingId, currentUser]);

  console.log(images);

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

    navigate(`/chat/${chatId}`);
  }

  async function placeBid(data) {
    const res = await axios.post(`/api/bids/listing/${listingId}`, data, {
      withCredentials: true,
    });
    console.log(res);
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
              <div key={image.id} className="shadow-sm photo-card">
                <Image
                  rounded
                  src={`https://cz2006-bucket.s3.ap-southeast-1.amazonaws.com/${image.file_name}`}
                />
              </div>
            ))}
          </div>
        </Container>
      </Row>
      <Row className="mt-3">
        <Col sm={8}>
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
            {currentUser && currentUser.email === listingData?.seller.email ? (
              <Card.Body>
                <p>Current bids</p>
                <div>
                  {bids.map((bid) => (
                    <p>
                      {bid.bidder.email} placed ${bid.amount}
                    </p>
                  ))}
                </div>
              </Card.Body>
            ) : (
              <Card.Body>
                <p>{listingData.seller.email}</p>
                <Button
                  className="w-100 mb-2"
                  variant="secondary"
                  onClick={createDirectChat}
                  disabled={!currentUser}
                >
                  {currentUser ? "Chat now" : "Login to chat"}
                </Button>
                <Form onSubmit={handleSubmit(placeBid)}>
                  <Form.Control
                    {...register("amount")}
                    name="amount"
                    type="number"
                    placeholder="Enter a bid eg. 1000"
                  />
                  <Button
                    disabled={!currentUser}
                    className="w-100 mt-2"
                    type="submit"
                  >
                    {currentUser ? "Place Bid" : "Login to Bid"}
                  </Button>
                </Form>
              </Card.Body>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
