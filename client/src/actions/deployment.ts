import api from "../utils/api";

import {
  GET_DEPLOYMENTS,
  CREATE_DEPLOYMENT,
  DELETE_DEPLOYMENT,
  GET_DEPLOYMENT_ERROR,
  CREATE_DEPLOYMENT_ERROR,
  DELETE_DEPLOYMENT_ERROR,
} from "./types";

// fETCH ALL DEPLOYMENTS
export const getDeployments = () => async (dispatch: any) => {
  try {
    const res = await api.get("/deployments");

    console.log("deployments", res.data);

    dispatch({
      type: GET_DEPLOYMENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log("vineet getDeployments", err);
    dispatch({
      type: GET_DEPLOYMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update profile
export const createDeployment = (formData: any, history: any) => async (
  dispatch: any
) => {
  try {
    const res = await api.post("/deployment", formData);

    dispatch({
      type: CREATE_DEPLOYMENT,
      payload: formData,
    });

    alert("deployment started");

    history.push("/view");
  } catch (err) {
    console.log("vineet createDeployments", err);

    dispatch({
      type: CREATE_DEPLOYMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete deployment
export const deleteDepoyment = (id: string) => async (dispatch: any) => {
  try {
    const res = await api.delete(`/deployment/${id}`);

    dispatch({
      type: DELETE_DEPLOYMENT,
      payload: id,
    });

    alert("deleted deployment successfully");
  } catch (err) {
    console.log("vineet delete Deployments", err);

    dispatch({
      type: DELETE_DEPLOYMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
