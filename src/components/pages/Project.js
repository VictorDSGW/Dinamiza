import styles from "./Project.module.css";
import {useParams} from 'react-router-dom';
import { useState, useEffect } from "react";
import Loading from '../layout/Loading';
import Container from '../layout/Container';

function Project() {
  const {id} = useParams()
  const [project, setProject] = useState({})
  const [showProjectForm, setShowProjectForm] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((resp) => {
        // console.log(resp)
        return resp.json()
      })
      .then((data) => {setProject(data)})
      .catch((err) => console.log(err))
    }, 200);
  }, [id])

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  return (<>
    {project.name ? (
      <div className={styles.project_details}>
        <Container customClass="Column">
          <div className={styles.details_container}>
            <h1>Projeto: {project.name}</h1>
            <button className={styles.btn} onClick={toggleProjectForm}>
              {!showProjectForm ? 'Editar Projeto' : 'Editar'}
            </button>
            {!showProjectForm ? (
              <div className={styles.project_info}>
                <p className={styles.category}>
                  <span>Categoria:</span> {project.category.name}
                </p>
                <div className={styles.timeCost}>
                  <div className={styles.timeSide}>
                    <p>
                      <span>Total de Tempo:</span> {project.time}
                    </p>
                    <p>
                      <span>Tempo Restante:</span> {project.time - project.timePast}
                    </p>
                  </div>
                  <div className={styles.costSide}>
                    <p>
                      <span>Total de Orçamento:</span> ${project.budget}
                    </p>
                    <p>
                      <span>Total Utilizado:</span> ${project.cost}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.project_info}>
                <p>Detalhes do Projeto</p>
              </div>
            )}
          </div>
        </Container>
      </div>
    ): (
      <Loading />
    )}
  </>)
}

export default Project