import styles from './Home.module.css'
import timeManagement from '../../img/time-schedule-management-business-svgrepo-com.png'
import LinkButton from '../layout/LinkButton'

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>Bem-vindo ao <span>Dinamiza</span></h1>
      <p>Gerencie seus projetos de forma eficiente!</p>
      <LinkButton to='newproject' text='Criar Projeto' />
      <img src={timeManagement} alt='Dinamiza' />
    </section>
  )
}

export default Home