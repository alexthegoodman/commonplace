import * as React from "react";

import { DeleteUserModalProps } from "./DeleteUserModal.d";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GQLClient } from "commonplace-utilities/lib/GQLClient";
import {
  deletePostAdminMutation,
  deleteUserAdminMutation,
} from "../../gql/manage";
import { useCookies } from "react-cookie";

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click DeleteUserModal"),
  onConfirm = () => console.info("Confirm Delete"),
  user = null,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["coUserToken"]);

  const gqlClient = new GQLClient(cookies["coUserToken"]);
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleConfirm = async () => {
    setShow(false);

    await gqlClient.client.request(deleteUserAdminMutation, {
      generatedUsername: user?.generatedUsername,
    });

    onConfirm();
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete User
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you'd like to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No, Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Yes, Delete User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteUserModal;
