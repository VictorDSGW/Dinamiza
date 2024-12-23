import styles from '../project/ProjectCard.module.css'
import { BsFillTrashFill } from 'react-icons/bs';

function ServiceCard({id, name, timePast, cost, description, handleRemove}) {
  const remove = (e) => {
    e.preventDefault()
    handleRemove(id, timePast, cost)
  }

  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Tempo Total: </span> {timePast}H
      </p>
      <p>
        <span>Custo Total: </span> ${cost}
      </p>
      <p>{description}</p>
      <div className={styles.project_card_actions}>
        <button onClick={remove}>
          <BsFillTrashFill />
          Excluir
        </button>
      </div>
    </div>
  )
}

export default ServiceCard;