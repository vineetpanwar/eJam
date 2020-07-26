import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeployments, deleteDepoyment } from "../../actions/deployment";
import "font-awesome/css/font-awesome.min.css";

export default () => {
  const error = useSelector((state: any) => state.DeploymentReducer.error);
  const deployments = useSelector(
    (state: any) => state.DeploymentReducer.deployments
  );
  const dispatch = useDispatch();

  const onDelete = (id: string) => {
    dispatch(deleteDepoyment(id));
  };

  useEffect(() => {
    dispatch(getDeployments());
  }, []);
  return (
    <div>
      <h2 className="display-4 center">View all Deployments here</h2>
      <br />
      <ul>
        <li className="deployment-list">
          <h3 className="list-row">Template Name</h3>{" "}
          <h3 className="list-row">URL</h3>{" "}
          <h3 className="list-row">Versions</h3>{" "}
          <h3 className="list-row">Deployed At</h3>
        </li>
      </ul>
      <ul>
        {deployments.length > 0 &&
          deployments.map((curr: any, index: number) => {
            return (
              <li className="deployment-list" key={index}>
                <span className="list-row">
                  {curr.name}{" "}
                  <i
                    className="fa fa-trash"
                    onClick={() => onDelete(curr._id)}
                  ></i>
                </span>
                <span className="list-row">{curr.url}</span>
                <span className="list-row">{curr.versions.join(",")}</span>
                <span className="list-row">{curr.deployedAt}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
