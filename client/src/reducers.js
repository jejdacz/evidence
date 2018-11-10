import {
  LOAD_ASTRONAUTS_REQUEST,
  LOAD_ASTRONAUTS_SUCCESS,
  LOAD_ASTRONAUTS_ERROR,
  ADD_ASTRONAUT_REQUEST,
  ADD_ASTRONAUT_SUCCESS,
  ADD_ASTRONAUT_ERROR,
  DELETE_ASTRONAUT_REQUEST,
  DELETE_ASTRONAUT_SUCCESS,
  DELETE_ASTRONAUT_ERROR,
  UPDATE_ASTRONAUT_REQUEST,
  UPDATE_ASTRONAUT_SUCCESS,
  UPDATE_ASTRONAUT_ERROR,
  CLEAR_ERROR,
  CLEAR_CHANGED
} from "./astronautActions.js";

const initialState = {
  pending: false,
  error: null,
  changed: false,
  astronauts: { byId: {}, allIds: [] },
  lastUpdated: 0
};

const storeAstronauts = items => ({
  byId: items.reduce((acc, item) => ({ ...acc, [item.id]: item }), {}),
  allIds: items.map(item => item.id)
});

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ERROR:
      return { ...state, error: null };
    case CLEAR_CHANGED:
      return { ...state, changed: false };
    case UPDATE_ASTRONAUT_REQUEST:
    case ADD_ASTRONAUT_REQUEST:
    case LOAD_ASTRONAUTS_REQUEST:
    case DELETE_ASTRONAUT_REQUEST:
      return { ...state, pending: true };
    case LOAD_ASTRONAUTS_ERROR:
      return {
        ...state,
        pending: false,
        error: "Loading of astronauts failed. Please try reload the page later."
      };
    case LOAD_ASTRONAUTS_SUCCESS:
      return {
        ...state,
        pending: false,
        astronauts: storeAstronauts(action.success),
        lastUpdated: Date.now()
      };

    case DELETE_ASTRONAUT_ERROR:
      return {
        ...state,
        pending: false,
        error: "Deleting of astronauts failed."
      };
    case DELETE_ASTRONAUT_SUCCESS:
      return {
        ...state,
        pending: false,
        changed: true,
        lastUpdated: Date.now(),
        astronauts: storeAstronauts(
          state.astronauts.allIds
            .map(id => state.astronauts.byId[id])
            .filter(a => a.id !== action.success.id)
        )
      };
    case ADD_ASTRONAUT_ERROR:
      return {
        ...state,
        pending: false,
        error: "Adding of astronaut failed."
      };
    case ADD_ASTRONAUT_SUCCESS:
      return {
        ...state,
        pending: false,
        changed: true,
        lastUpdated: Date.now(),
        astronauts: {
          byId: {
            [action.success.id]: action.success,
            ...state.astronauts.byId
          },
          allIds: [action.success.id, ...state.astronauts.allIds]
        }
      };
    case UPDATE_ASTRONAUT_ERROR:
      return {
        ...state,
        pending: false,
        error: "Updating of astronaut failed."
      };
    case UPDATE_ASTRONAUT_SUCCESS:
      return {
        ...state,
        pending: false,
        changed: true,
        lastUpdated: Date.now(),
        astronauts: {
          byId: {
            ...state.astronauts.byId,
            [action.success.id]: action.success
          },
          allIds: state.astronauts.allIds
        }
      };
    default:
      return state;
  }
};

export default rootReducer;
