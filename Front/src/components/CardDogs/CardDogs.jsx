import React from "react";
import styles from "../CardDogs/CardDogs.module.css";
import { useLocation } from "react-router-dom";
//Acá traigo a todas las cards de los perros -iri-
export default function CardDogs({ photoD, nameD, ageD, sexD, sizeD, postD, handleEdit, handleDelete }) { //Funciones handle vienen de AdminDogs

  // --------------------------valentin-------------------------
  const location = useLocation() // RENDERIZO DISTINTA LA CARD SI ESTAMOS EN ADMIN -- Valentin
  if(location.pathname === "/admin/dogs"){
    return (
      <>
      <div className={styles.container}>
        <div>
          <h3>{nameD}</h3>
        </div>
        <div>
          <img src={photoD} alt="img" />
        </div>
        <div>
          <div>
            <h4>Age:</h4>
            <p>{ageD}</p>
          </div>
          <div>
            <h4>Size:</h4>
            <p>{sizeD}</p>
          </div>
          <div>
            <h4>Sex:</h4>
            <p>{sexD === "true" ? "Macho" : sexD === "false" ? "Hembra" : ""}</p>
          </div>
          <div>
            <button onClick={handleEdit}>EDITAR</button>
            <button onClick={handleDelete}>ELIMINAR</button>
          </div>
        </div>
      </div>
    </>
    )
  }
 // -----------------------valentin-----------------------------
  return (
    <>
      <div className={styles.container}>
        <div>
          <h3>{nameD}</h3>
        </div>
        <div>
          <img src={photoD} alt="img" />
        </div>
        <div>
          <div>
            <h4>Age:</h4>
            <p>{ageD}</p>
          </div>
          <div>
            <h4>Size:</h4>
            <p>{sizeD}</p>
          </div>
          <div>
            <h4>Sex:</h4>
            <p>{sexD === "true" ? "Macho" : sexD === "false" ? "Hembra" : ""}</p>
          </div>
          <div>
            <h4>Posts:</h4>
            {postD.map((posts) => (
              <div key={posts.id_Post}>
                <h4>{posts.titleP}</h4>
                <p>{posts.commentP}</p>
                <p>{posts.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

