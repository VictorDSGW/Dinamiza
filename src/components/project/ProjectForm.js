function ProjectForm() {
  return (
    <form>
      <div>
        <input type="text" placeholder="Insira o nome do projeto" />
      </div>
      <div>
      <input type="number" placeholder="Insira o tempo estimado do projeto (em horas)" />
      </div>
      <div>
        <select name="category_id">
          <option disabled selected>
            Selecione uma categoria
          </option>
        </select>
      </div>
      <div>
        <input type="submit" value="Criar Projeto" />
      </div>
    </form>
  )
}

export default ProjectForm