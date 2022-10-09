import * as React from "react";

// TODO: set ESLint ignore for `next build` type check
import { DeletePostModalProps } from "./DeletePostModal.d";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeletePostModal: React.FC<DeletePostModalProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click DeletePostModal"),
  onConfirm = () => console.info("Confirm Delete"),
}) => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleConfirm = () => {
    setShow(false);
    onConfirm();
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you'd like to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No, Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Yes, Delete Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeletePostModal;
