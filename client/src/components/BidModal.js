import axios from "../axios";
import React from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { MdOutlineChat } from "react-icons/md";

export default function BidModal({
  id,
  idx,
  open,
  setOpenBidModal,
  bidder,
  amount,
  status,
}) {
  const closeModal = (idx) => {
    const newRules = Object.assign({}, open);
    newRules[idx] = false;
    setOpenBidModal(newRules);
  };
  const updateBidStatus = async (status) => {
    const res = await axios.put(
      `/api/bids/${id}`,
      { status: status },
      { withCredentials: true }
    );
    console.log(res);
    closeModal(idx);
  };
  return (
    <Modal
      show={open[idx]}
      onHide={() => {
        closeModal(idx);
      }}
    >
      <Modal.Body>
        <div>
          {bidder} placed {amount}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success">
          <AiOutlineCheck />
        </Button>
        <Button onClick={() => updateBidStatus("rejected")} variant="danger">
          <AiOutlineClose />
        </Button>
        <Button>
          <MdOutlineChat />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
