import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivities, getCountries } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import "./activityCreate.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "se requiere nombre";
  } else if (input.name.length < 3) {
    errors.name = "debe tener mas de 3 caracteres";
  }
  if (!input.difficulty) {
    errors.difficulty = "dificultad es requerido";
  } else if (!/^[1-5]$/.test(input.difficulty)) {
    errors.difficulty = "Dificultad entre 1 y 5 ";
  }
  if (!input.duration) {
    errors.duration = "duracion es requerido";
  } else if (!/^[1-10]$/.test(input.duration)) {
    errors.duration = "duracion entre 1 y 5 ";
  }
  if (!input.season) {
    errors.season = "se requiere season";
  } else if (input.season.length) {
    errors.season = "se requiere season";
  }
  return errors;
}
export default function ActivityCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const Countries = useSelector((state) => state.countries);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    country: [],
  });

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function handleChange(e) {
    if (e.target.type !== "checkbox") {
      setInput((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        status: e.target.value,
      });
    }
  }
  function handleSelect(e) {
    setInput({
      ...input,
      country: [...input.country, e.target.value],
    });
  }
  function handleSubmit(e) {
    e.preventDefault();

    dispatch(postActivities(input));
    alert("Actividad Creada");
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      country: [],
    });
    history.push("/home");
  }
  function handleDelete(e) {
    setInput({
      ...input,
      country: input.country.filter((occ) => occ !== e),
    });
  }

  return (
    <div className="create-container">
      <h2 className="h2">CREATE ACTIVITY</h2>
      <div className="form-container">
        <form
          className="all-form"
          onSubmit={(e) => handleSubmit(e)}
          onChange={(e) => handleChange(e)}
        >
          <div>
            <div>
              <label className="name-st">
                <strong>Name:</strong>
              </label>
              <br />
            </div>
            <div className="name-act">
              <input placeholder="Name" type="text" id="name" name="name" />
            </div>
          </div>
          <div className="difi-act">
            <div>
              <label>
                <strong>Difficulty:</strong>
              </label>
              <br />
            </div>
            <div className="content">
              <input
                placeholder="'Rate from 1 to 5'"
                type="tel"
                id="difficulty"
                name="difficulty"
                maxLength="1"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="difi-act">
            <div>
              <label>
                <strong>Duration:</strong>
              </label>
              <br />
            </div>
            <div className="content">
              <input
                placeholder="'Rate from 1 to 10 hours'"
                type="tel"
                id="duration"
                name="duration"
                maxLength="1"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="sea-act">
            <div>
              <label>
                <strong>Season:</strong>
              </label>
            </div>
            <div className="season" id="season">
              <div>
                <input name="summer" type="checkbox" id="summer" />
                <label htmlFor="summer">Summer.</label>
              </div>
              <div>
                <input name="autum" type="checkbox" id="autum" />
                <label htmlFor="autum">Autum.</label>
              </div>
              <div>
                <input name="winter" type="checkbox" id="winter" />
                <label htmlFor="winter">Winter.</label>
              </div>
              <div>
                <input name="spring" type="checkbox" id="spring" />
                <label htmlFor="spring">Spring.</label>
              </div>
            </div>
          </div>
          <select
            className="countries-op"
            value="Countries"
            onChange={(e) => handleSelect(e)}
          >
            {Countries.map((e) => (
              <option value={e.name}>{e.name}</option>
            ))}
          </select>

          <button className="button-create" type="submit">
            Crear Actividad
          </button>
        </form>
      </div>
      {input.country.map((el) => (
        <div className="delete">
          <p>{el}</p>
          <button className="botton-delete" onClick={() => handleDelete(el)}>
            Delete
          </button>
          <Link to="/home">
            <button className="button-back">Back</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
