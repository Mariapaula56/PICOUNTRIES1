import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const FILTER_BY_CONTINENTS = "FILTER_BY_CONTINENTS";
export const GET_NAME_COUNTRIES = "GET_NAME_COUNTRIES";
export const POST_ACTIVITIES = "POST_ACTIVITIES";
export const GET_DETAIL = "GET_DETAIL";
export const ORDER_POP = "ORDER_POP";

//exportamos unget para todos los paises que devuelva
//con promesas

export const getCountries = () => {
  return (dispatch) =>
    axios
      .get("http://localhost:3001/countries") //me traigo la ruta con un .get y despacho el type y el payload para dispara la accion
      .then((response) => {
        dispatch({
          type: GET_COUNTRIES,
          payload: response.data, //la respuesta la recibo en un data
        });
      })
      .catch((error) => {
        console.log(error);
      });
};

export const getNameCountries = (name) => {
  return (dispatch) =>
    axios
      .get("http://localhost:3001/countries?name=" + name) //me traigo la ruta con un .get y despacho el type y el payload para dispara la accion
      .then((response) => {
        dispatch({
          type: GET_NAME_COUNTRIES,
          payload: response.data, //la respuesta la recibo en un data osea me devuelve lo que me devuelve la ruta
        });
      })
      .catch((error) => {
        console.log(error);
      });
};

export function postActivities(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/activities",
      payload
    ); //quiero que en esta ruta hacer el post del payload y ese payload es lo que me va llegar en el front
    console.log(response);
    return response;
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
//la accion es la funcion a la que le voy a pasar el apyload que es lo que le mando del componente principal en el select
export const filterCountriesByContinents = (payload) => {
  //hacemos la action
  //exportamos una funcion que se llae filter y le paso el value en este caso el payload es el value que nos va llegar
  console.log(payload);
  return {
    type: "FILTER_BY_CONTINENTS", //le paso un type y despues le paso el payload
    payload,
  };
};
export function getDetail(id) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/countries/${id}`)
      .then((res) => {
        dispatch({ type: GET_DETAIL, payload: res.data });
      })
      .catch((err) => {
        return err;
      });
  };
}

export function orderByPopu(payload) {
  return {
    type: "ORDER_POP",
    payload,
  };
}
