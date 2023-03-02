import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import image from "../assets/countries.png";
import "./detail.css";

export const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detailCountry = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id));
  }, []);

  return (
    <div className="container2">
      <div className="detail">
        {detailCountry ? (
          <div className="country-detail">
            <h2 className="name1">{detailCountry.name}</h2>
            {detailCountry.flag ? (
              <div>
                <img
                  src={detailCountry.flag}
                  alt="countries"
                  className="flag-detail"
                ></img>
              </div>
            ) : (
              <div className="image-detail">
                <img src={image} alt="countries"></img>
              </div>
            )}
            <div className="text-detail">
              {
                <p>
                  <strong>Area</strong>:{`${detailCountry.area}`} km
                </p>
              }
              <p>
                <strong>Population</strong>: {`${detailCountry.population}`}
              </p>
              <p>
                <strong>Continents</strong>: {`${detailCountry.continents}`}
              </p>
              <p>
                <strong>capital</strong>: {`${detailCountry.capital}`}
              </p>
              <p>
                <strong>Subregion</strong>: {`${detailCountry.subregion}`}
              </p>
            </div>

            <div>
              <Link to="/home">
                <button className="back-button">Back</button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Detail;
