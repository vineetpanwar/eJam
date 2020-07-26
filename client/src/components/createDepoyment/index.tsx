import React, { useState } from "react";
import TextFieldGroup from "../common/textFieldGroup";
import SelectListGroup from "../common/selectListGroup";
import { createDeployment } from "../../actions/deployment";
import { useDispatch, useSelector } from "react-redux";

const CreateDeployment = (props: any) => {
  const [url, setURL] = useState("");
  const [template, setTemplate] = useState("");
  const [errors, setErrors] = useState({ url: "", template: "", version: "" });
  const [versionArr, setVersionArr] = useState([
    {
      major: "0",
      minor: "0",
      patch: "0",
    },
  ]);
  const error = useSelector((state: any) => state.DeploymentReducer.error);
  const dispatch = useDispatch();

  // Select options for status
  const options = [
    { label: "0", value: "0" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
    { label: "14", value: "14" },
    { label: "15", value: "15" },
    { label: "16", value: "16" },
    { label: "17", value: "17" },
    { label: "18", value: "18" },
    { label: "19", value: "19" },
  ];

  const hasDuplicates = (array: any) => {
    var valuesSoFar = Object.create(null);
    for (var i = 0; i < array.length; ++i) {
      var value = array[i];
      if (value in valuesSoFar) {
        return true;
      }
      valuesSoFar[value] = true;
    }
    return false;
  };

  const validateInputData = () => {
    const tempError = { ...errors };
    if (!url) {
      tempError.url = "URL cant be empty";
      setErrors(tempError);
    } else {
      tempError.url = "";
      setErrors(tempError);
    }
    if (!template) {
      tempError.template = "Template name cant be empty";
      setErrors(tempError);
    } else {
      tempError.template = "";
      setErrors(tempError);
    }
    if (versionArr.length < 1) {
      tempError.version = "Version list cant be empty";
      setErrors(tempError);
    } else {
      tempError.version = "";
      setErrors(tempError);
      versionArr.map((curr) => {
        if (curr.major === "0" && curr.minor === "0" && curr.patch === "0") {
          tempError.version = "Version list cant have 0.0.0 as a version";
        }
      });
      if (!tempError.version) {
        const arr: any = [];
        versionArr.map((curr) => {
          arr.push(curr.major + "." + curr.minor + "." + curr.patch);
        });
        if (hasDuplicates(arr)) {
          tempError.version = "Two or more same version exists";
        }
      } else {
      }
    }
  };
  const onFormSubmit = (e: any) => {
    e.preventDefault();
    console.log(errors);
    // setErrors({ url: "", template: "", version: "" });

    //perform validation below
    validateInputData();

    if (!errors.url && !errors.template && !errors.version) {
      console.log("data sent", props);
      const data = {
        name: template,
        url: url,
        versions: versionArr.map(
          (curr) => curr.major + "." + curr.minor + "." + curr.patch
        ),
        deployedAt: new Date(),
      };
      dispatch(createDeployment(data, props.history));
    }
  };

  const onChangeTemplate = (e: any) => {
    setTemplate(e.target.value);
  };

  const onChangeURL = (e: any) => {
    setURL(e.target.value);
  };

  const onChangeVersion = (e: any, index: number) => {
    e.persist();
    console.log("vineet", e.target.name, e.target.value);
    const key = e.target.name;
    const tempArr: any = [...versionArr];
    tempArr[index][key] = e.target.value;
    setVersionArr(tempArr);
  };

  const onRemoveVersion = (index: number) => {
    const tempVersionArr = [...versionArr];
    tempVersionArr.splice(index, 1);
    setVersionArr(tempVersionArr);
  };

  const onAddNewVersion = () => {
    const tempVersionArr = [...versionArr];
    tempVersionArr.push({
      major: "0",
      minor: "0",
      patch: "0",
    });
    setVersionArr(tempVersionArr);
  };

  return (
    <div className="row">
      <div className="col-md-8 m-auto">
        <h2 className="display-4 text-center">Create Your Deployment</h2>
        <p className="small text-center">
          Let's get some information about your new deployment
        </p>
        <small className="d-block pb-3">* = required fields</small>
        <form className="form" onSubmit={onFormSubmit}>
          <TextFieldGroup
            placeholder="* URL "
            name="URL"
            value={url}
            onChange={onChangeURL}
            error={errors.url}
            info="Enter the URL you want to deploy"
          />
          <TextFieldGroup
            placeholder="* template Name "
            name="Template"
            value={template}
            onChange={onChangeTemplate}
            error={errors.template}
            info="Enter the name of the template"
          />
          <ul>
            {versionArr.map((curr: any, index: number) => (
              <li key={index}>
                {`${curr.major}.${curr.minor}.${curr.patch}`}
                <div className="select-group">
                  <SelectListGroup
                    name="major"
                    value={curr.major}
                    onChange={(e) => onChangeVersion(e, index)}
                    options={options}
                    info="Select the major version"
                  />
                  <SelectListGroup
                    name="minor"
                    value={curr.minor}
                    onChange={(e) => onChangeVersion(e, index)}
                    options={options}
                    info="Select the minor version"
                  />
                  <SelectListGroup
                    name="patch"
                    value={curr.patch}
                    onChange={(e) => onChangeVersion(e, index)}
                    options={options}
                    info="Select the patch version"
                  />
                  <a onClick={() => onRemoveVersion(index)} className="remove">
                    - Remove
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <div className="invalid-feedback">{errors.version}</div>
          <br />
          <a onClick={() => onAddNewVersion()} className="add-more">
            + Add another version
          </a>
          <br />

          <input
            type="submit"
            value="Deploy"
            className="btn btn-info btn-block mt-4"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateDeployment;
