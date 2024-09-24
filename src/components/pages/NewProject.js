import { useNavigate } from 'react-router-dom'
import styles from './NewProject.module.css'
import ProjectForm from '../project/ProjectForm'

function NewProject() {
  const navigate = useNavigate()

  function createPost(project) {

    // initialize time, cost and services
    project.time = 0; // !
    project.cost = 0;
    project.servises = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        //redirect
        const state = { message: 'Projeto criado com sucesso!' };
        navigate('../projects', {state})
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
  )
}

export default NewProject