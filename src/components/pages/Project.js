import styles from "./Project.module.css";
import { v4 as uuidv4 } from "uuid";
import {useParams} from 'react-router-dom';
import { useState, useEffect } from "react";
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import Message from '../layout/Message';
import ProjectForm from "../project/ProjectForm";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/TempNameServiceCard";

function Project() {
  const {id} = useParams()

  const [project, setProject] = useState([])
  const [services, setServices] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [message, setMessage] = useState()
  const [type, setType] = useState()

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
      .then((data) => {
        // console.log(data)
        setProject(data)
        setServices(data.services)
      })
      .catch((err) => console.log(err))
    }, 200);
  }, [id])

  function editPost(project) {
    setMessage('')
    // console.log(project);
    // Time & Budget validation
    if (project.time < project.timePast) {
      setMessage("O Tempo adicionado não pode ultrapassar o tempo total do Projeto!")
      setType("error")
      return false
    }
    if (project.budget < project.cost) {
      setMessage("O Orçamento não pode ultrapassar o custo do Projeto!")
      setType("error")
      return false
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then(resp => resp.json())
      .then((data) => {
        setProject(data)
        setShowProjectForm(false)
        setMessage("Projeto Atualizado!")
        setType("success")
      })
      .catch(err => console.log(err))
  }

  function createService(project) {
    setMessage('')

    //last service
    const lastService = project.services[project.services.length - 1]

    lastService.id = uuidv4()

    const lastServiceTimePast = lastService.timePast
    const lastServiceCost = lastService.cost

    const newTimePast = parseFloat(project.timePast) + parseFloat(lastServiceTimePast)
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    // maximum value validation
    if(newTimePast > parseFloat(project.time)) {
      project.services.pop()
      setMessage('Orçamento ultrapassado, verifique o valor do serviço')
      setType('error')
      return false
    }
    if(newCost > parseFloat(project.budget)) {
      project.services.pop()
      setMessage('Orçamento ultrapassado, verifique o valor do serviço')
      setType('error')
      return false
    }

    //add service cost to project total cost
    project.timePast = newTimePast
    project.cost = newCost

    // update project
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then(resp => resp.json())
      .then((data) => {
        //exibir os serviços
        setProject(data)
        setShowProjectForm(false)
        setShowServiceForm(false)
        setMessage("Projeto Atualizado!")
        setType("success")
      })
      .catch(err => console.log(err))
  }

  function removeService() {}

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }

  return (<>
    {project.name ? (
      <div className={styles.project_details}>
        <Container customClass="Column">
          {message && <Message type={type} msg={message} />}
          <div className={styles.details_container}>
            <h1>Projeto: {project.name}</h1>
            <button className={styles.btn} onClick={toggleProjectForm}>
              {!showProjectForm ? 'Editar Projeto' : 'Detalhes'}
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
                      <span>Tempo Utilizado:</span> {project.timePast}
                    </p>
                    <p>
                      <span>Tempo restante:</span> {project.time - project.timePast}
                    </p>
                  </div>
                  <div className={styles.costSide}>
                    <p>
                      <span>Total de Orçamento:</span> ${project.budget}
                    </p>
                    <p>
                      <span>Total Utilizado:</span> ${project.cost}
                    </p>
                    <p>
                      <span>Total restante:</span> ${project.budget - project.cost}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.project_info}>
                <ProjectForm
                 handleSubmit={editPost}
                 btnText="Concluir Edição"
                 projectData={project}
                />
              </div>
            )}
          </div>
          <div className={styles.service_form_container}>
            <h2>Adicione um Serviço:</h2>
            <button className={styles.btn} onClick={toggleServiceForm}>
              {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
            </button>
            <div className={styles.project_info}>
              {showServiceForm && <ServiceForm
                handleSubmit={createService}
                btnText="Adicionar Serviço"
                projectData={project}
              />}
            </div>
          </div>
          <h2>Serviços</h2>
          <Container customClass="start">
            {services.length > 0 && 
              services.map((service) => (
                <ServiceCard
                  id={service.id}
                  name={service.name}
                  timePast={service.timePast}
                  cost={service.cost}
                  description={service.description}
                  key={service.key}
                  handleRemove={removeService}
                />
              ))

            }
            {services.length === 0 && <p>Não há serviços cadastrados.</p>}
          </Container>
        </Container>
      </div>
    ): (
      <Loading />
    )}
  </>)
}

export default Project