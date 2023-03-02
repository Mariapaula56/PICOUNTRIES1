import { GET_COUNTRIES, ORDER_POP } from "../actions/actions";
import { FILTER_BY_CONTINENTS } from "../actions/actions";
import { ORDER_BY_NAME } from "../actions/actions";
import { GET_NAME_COUNTRIES } from "../actions/actions";
import { POST_ACTIVITIES } from "../actions/actions";
import { GET_DETAIL } from "../actions/actions";

const initialState = {
  countries: [],
  Countries: [],
  activities: [],
  detail: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES: {
      return {
        ...state,
        countries: [...action.payload],
        Countries: action.payload,
      };
    }
    case GET_NAME_COUNTRIES: {
      return {
        ...state,
        countries: action.payload,
      };
    }
    case FILTER_BY_CONTINENTS: {
      //hacemos otro case
      const Countries = state.Countries;

      //const countries = state.countriesFiltered;
      //hacemos una constanrte de allcountries que es lo que quiero filtrar y la traigo de el estado
      const continentsFiltered =
        action.payload === "continents"
          ? Countries
          : Countries.filter((el) => el.continents === action.payload);
      //y hago otra constante de continent y le pregunto al action .payload que me puede llegar por payload los valores del select y es lo que me llega por payload
      //y pregunto si ese action es el continente y si entra al countries y hago el filtrado

      return {
        ...state,
        countries: continentsFiltered,
      }; //devuelvo el estado concatenado y lepaso el continentsfilter
      //si concateno todo el estado
      //ahora vamos al principal de nuevo
    }
    case POST_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case ORDER_BY_NAME: {
      let sortedArr =
        action.payload === "asc"
          ? state.countries.sort(function (a, b) {
              //al sort le ponemos lo que quiere que ordene
              if (a.name > b.name) {
                //el name que hay en countriescompara el que encuentra primero con el que encuentra despues
                return 1; //retorna la posicion 1 porque el b es mayor que el a entonces retorn el 1
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0; //si son iguales lo deja igual
            })
          : state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: sortedArr,
      };
    }

    case ORDER_POP: {
      let sortedArr =
        action.payload === "max"
          ? state.countries.sort(function (a, b) {
              //al sort le ponemos lo que quiere que ordene
              if (a.population > b.population) {
                //el name que hay en countriescompara el que encuentra primero con el que encuentra despues
                return 1; //retorna la posicion 1 porque el b es mayor que el a entonces retorn el 1
              }
              if (b.population > a.population) {
                return -1;
              }
              return 0; //si son iguales lo deja igual
            })
          : state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return -1;
              }
              if (b.population > a.population) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: sortedArr,
      };
    }

    case GET_DETAIL: {
      return {
        ...state,
        detail: action.payload,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
