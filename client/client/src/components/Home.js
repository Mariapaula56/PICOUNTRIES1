import React from "react";

import { useCallback, useEffect, useState } from "react";
//UseEffect Hook le permite realizar efectos secundarios en sus componentes.
//Algunos ejemplos de efectos secundarios son: obtención de datos, actualización directa del DOM y temporizadores.
//useEffect acepta dos argumentos. El segundo argumento es opcional.
//El useState Hook de React nos permite rastrear el estado en un componente de función.
//El estado generalmente se refiere a datos o propiedades que deben rastrearse en una aplicación.

import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
  getCountries,
  filterCountriesByContinents,
  orderByName,
  orderByPopu,
} from "../actions/actions"; //importo las actio
import Pagination from "./paginations";
import SearchBar from "./searchBar";

import "../components/Home.css";
export const Home = () => {
  const dispatch = useDispatch();
  const [orden, setOrden] = useState("");
  const Countries = useSelector((state) => state.countries);
  const [currentPage, setCurrentPage] = useState(1);
  let LIMIT = 12;

  const onPageChanged = useCallback(
    //explicacion
    (event, page) => {
      event.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage]
  );
  const currentData = Countries.slice(
    //explicacion card estado global
    (currentPage - 1) * LIMIT,
    (currentPage - 1) * LIMIT + LIMIT
  );

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }
  function sortHandle(e) {
    e.preventDefault();
    dispatch(orderByPopu(e.target.value));
    setCurrentPage(1);
    setOrden(`Orden ${e.target.value}`);
  }

  function handleFilterCountries(e) {
    dispatch(filterCountriesByContinents(e.target.value));
  }
  return (
    <div className="container1">
      <div className="Nav">
        <button
          className="all-button"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          All Countries
        </button>

        <div className="orden-button">
          <select className="orden-az" onChange={(e) => handleSort(e)}>
            <option value="orden">Order</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <select className="pop-orden" onChange={(e) => sortHandle(e)}>
            <option value="Population">Population</option>
            <option value="max">Mayor Poblacion</option>
            <option value="min">Menor Poblacion</option>
          </select>
          <select
            className="continent-orden"
            onChange={(el) => handleFilterCountries(el)}
          >
            <option value="continents">Continents</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
            <option value="Antarctica">Antarctica</option>
          </select>
          <Link className="create-button" to="/activities">
            Create Activity
          </Link>
          <div>
            <SearchBar />
          </div>
        </div>
      </div>

      <div>
        <div className="card-container">
          {currentData &&
            currentData.map((country) => {
              return (
                <div key={country.id} className="country-card">
                  <Link to={`/countries/${country.id}`}>
                    <div className="container-card">
                      <img
                        src={country.flag}
                        alt="country"
                        className="image-card"
                      />
                      <div className="text-card">
                        <span className="name">{country.name}</span>
                        <span>{country.continents}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
        <div className="pagination-wrapper">
          {currentData.length > 1 && (
            <Pagination
              totalRecords={250}
              pageLimit={LIMIT}
              pageNeighbours={2}
              onPageChanged={onPageChanged}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
