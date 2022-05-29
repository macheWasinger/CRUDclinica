import React, { useState } from "react";
import { nanoid } from "nanoid";

import "./css/App.css";

import logo from "../src/img/logo1.png";

function App() {
  const [paciente, setPaciente] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [numSocio, setNumSocio] = useState("");
  const [arrayPacientes, setArrayPacientes] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [modoAgregar, setModoAgregar] = useState(false);
  const [id, setId] = useState("");
  const [msjError, setMsjError] = useState("");

  const agregarPaciente = (e) => {
    e.preventDefault();

    setModoAgregar(true);

    if (!paciente.trim()) {
      setMsjError("¡Ingrese Paciente!");
      return;
    }

    if (!diagnostico.trim()) {
      setMsjError("¡Ingrese Diagnóstico!");
      return;
    }

    if (!numSocio.trim()) {
      setMsjError("Ingrese N° de Socio");
      return;
    }

    if (parseInt(numSocio) <= 0) {
      setMsjError("¡Número incorrecto!");
      return;
    }

    const nuevoPaciente = [
      ...arrayPacientes,
      {
        id: nanoid(50),
        datosPaciente: paciente,
        diagnostico: diagnostico,
        numeroSocio: numSocio,
      },
    ];

    setArrayPacientes(nuevoPaciente);

    setPaciente("");
    setDiagnostico("");
    setNumSocio("");
    setMsjError("");
  };

  const eliminarPaciente = (id) => {
    const arrayFiltrado = arrayPacientes.filter((item) => item.id !== id);

    setArrayPacientes(arrayFiltrado);
  };

  const activarModoEdicion = (item) => {
    setModoEdicion(true);
    setPaciente(item.datosPaciente);
    setDiagnostico(item.diagnostico);
    setNumSocio(item.numeroSocio);
    setId(item.id);
  };

  const editarPaciente = (e) => {
    e.preventDefault();

    if (!paciente.trim()) {
      setMsjError("¡Ingrese Paciente!");
      return;
    }

    if (!diagnostico.trim()) {
      setMsjError("¡Ingrese Diagnóstico!");
      return;
    }

    if (!numSocio.trim()) {
      setMsjError("Ingrese N° de Socio");
      return;
    }

    if (parseInt(numSocio) <= 0) {
      setMsjError("¡Número incorrecto!");
      return;
    }

    const arrayEditado = arrayPacientes.map((item) =>
      item.id === id
        ? {
            id: item.id,
            datosPaciente: paciente,
            diagnostico: diagnostico,
            numeroSocio: numSocio,
          }
        : item
    );

    setArrayPacientes(arrayEditado);

    setPaciente("");
    setDiagnostico("");
    setNumSocio("");
    setId("");
    setModoEdicion(false);
    setMsjError("");
  };

  return (
    <div className="container-general-padre mt-3 p-3 border rounded shadow">
      <article className="d-flex justify-content-center align-items-center">
        <h2 className="main-title text-white text-center mx-3">
          CRUD - Clínica
        </h2>
        <div className="container_img-logo">
          <img src={logo} alt="" />
        </div>
      </article>

      <article className="main-container d-flex justify-content-between border rounded m-3 p-3 bg-light">
        <div className="container-formulario">
          <span className="text-center">
            {modoEdicion ? (
              <h3 className="text-danger">Editar Paciente</h3>
            ) : (
              <h3 className="title-form">Agregar Paciente</h3>
            )}
          </span>

          {msjError ? <div className="alert alert-danger">{msjError}</div> : ""}

          <form
            onSubmit={modoEdicion ? editarPaciente : agregarPaciente}
            className="text-center mt-3"
          >
            <input
              type="text"
              placeholder="Ingrese Paciente"
              onChange={(e) => setPaciente(e.target.value)}
              value={paciente}
              className="form-control mt-1"
            />

            <input
              type="text"
              placeholder="Ingrese Diagnóstico"
              onChange={(e) => setDiagnostico(e.target.value)}
              value={diagnostico}
              className="form-control mt-1"
            />

            <input
              type="text"
              placeholder="Ingrese n° de Socio"
              onChange={(e) => setNumSocio(e.target.value)}
              value={numSocio}
              className="form-control mt-1"
            />

            <button
              className={`btn btn-block mt-1 
              ${modoEdicion ? "btn-danger" : "btn-primary"}`}
              type="submit"
            >
              {modoEdicion ? "Editar" : "Agregar"}
            </button>
          </form>
        </div>

        {modoAgregar && arrayPacientes.length > 0 ? (
          <div className="container-listaPacientes">
            <h3 className="title-list text-center">Lista Pacientes</h3>
            <ul className="list-group">
              {arrayPacientes.map((item) => (
                <li className="list-group-item mt-3 border" key={item.id}>
                  <div className="lead">
                    <small className="container-datos-lista">
                      <p>
                        <b>Pac: </b>
                        {item.datosPaciente}
                      </p>{" "}
                      <p>
                        <b>Diagnos: </b>
                        {item.diagnostico}
                      </p>{" "}
                      <p>
                        <b>N° Soc: </b>
                        {item.numeroSocio}
                      </p>
                    </small>
                  </div>
                  <div className="container-buttons">
                    <button
                      className="btn btn-light rounded-circle btn-sm text-secondary float-right mx-2"
                      onClick={() => eliminarPaciente(item.id)}
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button
                      className="btn btn-light rounded-circle btn-sm text-danger float-right"
                      onClick={() => activarModoEdicion(item)}
                    >
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </article>
    </div>
  );
}

export default App;
