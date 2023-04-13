import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export const Profile = () => {
    const {user, isAuthenticated, isLoading } = useAuth0()

    if(isLoading){
        return <div>Cargando...</div>
    }
    return (
        isAuthenticated && (
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
            </div>
        )
    )
}

export const LogoutButton = () => {
    const { logout } = useAuth0();

    return <button onClick={() => logout({returnTo: window.location.origin}) }>Logout</button>
}

export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <button onClick={() => loginWithRedirect({redirect_uri: `${window.location.origin}/home`})}>Login</button>
}

export default function Modal() {
    const [showModal, setShowModal] = useState(false);
    const { isAuthenticated } = useAuth0();

    const handleShowModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };

    return (
        <div>
        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Salvando Huellas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Aquí agregas tus campos de formulario */}

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Ingrese su nombre" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" placeholder="Ingrese su apellido" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Ingrese su email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Ingrese su contraseña" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Registrarme
          </Button>
        </Modal.Footer>
      </Modal>

      <br />
      <Link to="/home">
      <button className={styles.button}>Ingresar como invitado</button>
      </Link>
      <br />
        {isAuthenticated ? ( 
      <>
        <Profile/>
        <LogoutButton/>
      </>
     ) : ( <LoginButton/>
  )}
  </div>
    );
}