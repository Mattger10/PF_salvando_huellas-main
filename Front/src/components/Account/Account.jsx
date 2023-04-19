import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Account.module.css";

const Account = () => {
  const [editingProfile, setEditingProfile] = useState(false);
  const [auth, setAuth] = useState(null);

  const navigate = useNavigate();

  const toggleEditingProfile = () => {
    setEditingProfile(!editingProfile);
  };

  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  {
    if (isLoading) {
      return <div>Cargando...</div>;
    }
  }

  // Ir a funciones de administrador
  const goAdminArticles = () => {
    navigate("/admin/articles");
  };
  const goAdminDogs = () => {
    navigate("/admin/dogs");
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (event) => {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('avatar', file);
      const response = await fetch('/api/upload-avatar', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      if (response.ok) {
        // actualiza la imagen del avatar
      } else {
        console.error('Error al cargar la imagen del avatar');
      }
    };
    input.click();
  };
  

  return (
    <div className={styles.container}>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://necolas.github.io/normalize.css/8.0.1/normalize.css"
      />
      <link
        rel="stylesheet"
        href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
        crossOrigin="anonymous"
      />
      <div className={styles.perfil}>
        <div className={styles.portada}>
        {isAuthenticated && (<div className={styles.avatar}>
            <img className={styles.img} src={user.picture} alt={user.name} />
            <button className={styles.botonAvatar} type="button" onClick={handleImageUpload}>
              <i className="far fa-image"></i>
            </button>
          </div>
        )}
        </div>
      </div>
      <div className={styles.perfilBody}>
      {isAuthenticated && (<div className={styles.perfilBio}>
          <h3 className={styles.titulo}>{user.name}</h3>
          <p className={styles.texto}>Email: {user.email}</p>
        </div>
      )}
        <div className={styles.perfilUsuarioFooter}>
          <ul className={styles.listaDatos}>
            <li> Mis donaciones:</li>
          </ul>
          <ul className={styles.listaDatos}>
            <li>Mis favoritos:</li>
          </ul>
        </div>
        <button onClick={goAdminArticles} className={styles.boton}>
          Gestionar Artículos
        </button>
        <button onClick={goAdminDogs} className={styles.boton}>
          Gestionar Perritos
        </button>
        <button className={styles.boton} onClick={toggleEditingProfile}>
          {editingProfile ? "Cancelar edición" : "Editar perfil"}
        </button>
        <button
          onClick={() => logout({ returnTo: "/" })}
          className={styles.boton}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Account;
