import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavBar, Container, Home, About, NewProject, Projects, Contact, Footer }  from './components/Components'

function App() {
  return (
    <Router>
      <NavBar />

        <Container customClass='min-height'>
          <Routes>
            <Route path='/' element={<Home />} />         
            <Route path='/about' element= {<About />} />
            <Route path='/newproject' element={<NewProject />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </Container>

      <Footer />
    </Router>
  );
}

export default App;
