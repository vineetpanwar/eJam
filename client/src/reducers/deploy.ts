import {
  GET_DEPLOYMENTS,
  CREATE_DEPLOYMENT,
  DELETE_DEPLOYMENT,
  GET_DEPLOYMENT_ERROR,
  CREATE_DEPLOYMENT_ERROR,
  DELETE_DEPLOYMENT_ERROR,
} from "../actions/types";

const initialState = {
  deployments: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case GET_DEPLOYMENTS:
      console.log("vineet reducer", payload, type);
      return {
        ...state,
        deployments: payload,
        loading: false,
      };
    case CREATE_DEPLOYMENT:
      return {
        ...state,
        loading: false,
      };
    case DELETE_DEPLOYMENT:
      return {
        ...state,
        deployments: state.deployments.filter(
          (deployment: any) => deployment._id !== payload
        ),
        loading: false,
      };
    case GET_DEPLOYMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CREATE_DEPLOYMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_DEPLOYMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
