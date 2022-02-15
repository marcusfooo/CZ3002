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
import BidModal from "./BidModal";
import Spinner from "react-bootstrap/Spinner";

export async function createDirectChat(currentUser, users) {
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
      usernames: users,
    }),
    headers: creds,
  });
  const data = await res.json();
  return data.id;
}

export default function Listing() {
  const { listingId } = useParams();
  const [listingData, setListingData] = useState();
  const [images, setImages] = useState([]);
  const [listingBids, setListingBids] = useState([]);
  const [myBid, setMyBid] = useState({});
  const [loading, setLoading] = useState(true);
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [openBidModal, setOpenBidModal] = useState({});

  useEffect(() => {
    async function getListingData() {
      setLoading(true);
      const res = await axios.get(`/api/listing/${listingId}`);
      //get bidding data if user is the lister
      if (res.data?.listing.seller.email === currentUser?.email) {
        const bids = await axios.get(`/api/bids/listing/${listingId}`, {
          withCredentials: true,
        });
        setListingBids(bids.data.bids);
        const bidControls = {};
        bids.data.bids.forEach((_, idx) => (bidControls[idx] = false));
        setOpenBidModal(bidControls);
      } else if (currentUser) {
        //get own bid if not lister
        const res = await axios.get(`/api/bids/listing/${listingId}`, {
          withCredentials: true,
        });
        setMyBid(res.data.bid);
        setValue("amount", res?.data?.bid?.amount);
      }
      setImages(res.data.listing.images);
      setListingData(res.data.listing);
      setLoading(false);
    }
    getListingData();
  }, [listingId, currentUser, setValue]);

  async function placeBid(data) {
    const res = await axios.post(`/api/bids/listing/${listingId}`, data, {
      withCredentials: true,
    });
    setMyBid(data);
  }

  async function closeListing(id) {
    const res = await axios.put(
      `/api/bids/${id}`,
      { status: "approved" },
      { withCredentials: true }
    );
    setListingData({ ...listingData, status: "closed" });
  }

  if (loading) {
    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
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
            {listingData.status === "closed" ? (
              <Card.Body>
                <p>{listingData.seller.email}</p>
                <Button className="w-100">Sold</Button>
              </Card.Body>
            ) : currentUser &&
              currentUser.email === listingData?.seller.email ? (
              <Card.Body>
                <p>Current bids</p>
                <div>
                  {listingBids.map((bid, idx) => (
                    <div key={idx}>
                      <BidModal
                        id={bid.id}
                        idx={idx}
                        open={openBidModal}
                        setOpenBidModal={setOpenBidModal}
                        bidder={bid.bidder.email}
                        amount={bid.amount}
                        closeListing={closeListing}
                      />
                      <div
                        type="button"
                        onClick={() => {
                          setOpenBidModal({ ...openBidModal, [idx]: true });
                        }}
                      >
                        <p
                          className={`${
                            bid.status === "rejected" ? "text-danger" : ""
                          }`}
                        >
                          {bid.bidder.email} placed ${bid.amount}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            ) : (
              <Card.Body>
                <p>{listingData.seller.email}</p>
                <Button
                  className="w-100 mb-2"
                  variant="secondary"
                  onClick={async () => {
                    const chatId = await createDirectChat(currentUser, [
                      listingData.seller.email,
                    ]);
                    navigate(`/chat/${chatId}`);
                  }}
                  disabled={!currentUser}
                >
                  {currentUser ? "Chat now" : "Login to chat"}
                </Button>
                <Form onSubmit={handleSubmit(placeBid)}>
                  <Form.Control
                    {...register("amount")}
                    name="amount"
                    type="number"
                    disabled={myBid.amount}
                    placeholder="Enter a bid eg. 1000"
                  />
                  <Button
                    disabled={!currentUser || myBid.amount}
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
