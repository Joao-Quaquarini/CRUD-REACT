import React, { useState } from 'react';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({
    nome: '',
    funcao: '',
    salario: '',
    endereco: '',
    idade: '',
    cpf: '',
    jogofavorito: '',
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveEmployee = () => {
    if (
      currentEmployee.nome === '' ||
      currentEmployee.funcao === '' ||
      currentEmployee.salario === '' ||
      currentEmployee.endereco === '' ||
      currentEmployee.idade === '' ||
      currentEmployee.cpf === '' ||
      currentEmployee.jogofavorito === ''
    ) {
      return;
    }

    if (employees.includes(currentEmployee)) {
      // Edit existing employee
      const updatedEmployees = employees.map((employee) =>
        employee === currentEmployee ? currentEmployee : employee
      );
      setEmployees(updatedEmployees);
    } else {
      // Add new employee
      setEmployees([...employees, currentEmployee]);
    }

    setCurrentEmployee({
      nome: '',
      funcao: '',
      salario: '',
      endereco: '',
      idade: '',
      cpf: '',
      jogofavorito: '',
    });

    closeModal();
  };

  const editEmployee = (employee) => {
    setCurrentEmployee(employee);
    openModal();
  };

  const deleteEmployee = (employee) => {
    const updatedEmployees = employees.filter(
      (emp) => emp !== employee
    );
    setEmployees(updatedEmployees);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <span>King of Games</span>
          <button onClick={openModal} id="new">
            Incluir
          </button>
        </div>
        <div className="divTable">
          <table>
            {/* Table header */}
            <thead>
              <tr>
                <th>Nome</th>
                <th>Função</th>
                <th>Salário</th>
                <th>Endereço</th>
                <Th>Idade</Th>
                <th>CPF</th>
                <th>Jogo Favorito</th>
                <th className="acao">Editar</th>
                <th className="acao">Excluir</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.nome}</td>
                  <td>{employee.funcao}</td>
                  <td>R$ {employee.salario}</td>
                  <td>{employee.endereco}</td>
                  <td>{employee.idade}</td>
                  <td>{employee.cpf}</td>
                  <td>{employee.jogofavorito}</td>
                  <td className="acao">
                    <button onClick={() => editEmployee(employee)}>
                      Editar
                    </button>
                  </td>
                  <td className="acao">
                    <button onClick={() => deleteEmployee(employee)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isModalOpen && (
          <div className="modal-container">
            <div className="modal">
              <form>
                <label for="m-nome">Nome</label>
                <input
                  id="m-nome"
                  type="text"
                  required
                  value={currentEmployee.nome}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      nome: e.target.value,
                    })
                  }
                />
                {/* (Rest of the input fields go here) */}
                <button id="btnSalvar" onClick={saveEmployee}>
                  Salvar
                </button>
              </form>
              <button onClick={closeModal} id="btnCancelar">
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
