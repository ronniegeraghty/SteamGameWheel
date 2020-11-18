import React, { useState } from "react";
import PropTypes from "prop-types";

const SampleCard = ({ sample, deleteSample, setWarningMessage }) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(sample.name);
  const [oldName, setOldName] = useState(sample.name);
  const [message, setMessage] = useState(sample.message);
  const [oldMessage, setOldMessage] = useState(sample.message);

  const editSample = () => {
    if (editMode) {
      updateSample();
    }
    setEditMode(!editMode);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const updateSample = () => {
    if (!name || !message) {
      setWarningMessage({
        warningMessageOpen: true,
        warningMessageText: "All fields must be filled out!",
      });
      setName(oldName);
      setMessage(oldMessage);
      return;
    }

    fetch(`/api/sample/${sample._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        message: message,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((sampleUpdated) => {
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `${sampleUpdated}`,
        });
        setOldName(name);
        setOldMessage(message);
      })
      .catch((error) => {
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `ERROR Updating Sample: ${error}`,
        });
      });
  };

  return (
    <div className="col-5 col-sm-4 p-0 mb-3 ml-0 mr-4 d-flex align-items-lg-stretch">
      <div className="card">
        <div className="card-body py-1">
          <div className="row">
            <button
              type="button"
              className="btn btn-secondary col mr-1 mb-1 "
              onClick={editSample}
            >
              {/* FontAwesome Edit Icon */}
              <i className="fas fa-edit"></i>
            </button>
            <button
              type="button"
              className="btn btn-danger col ml-1 mb-1"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => deleteSample(sample)}
            >
              {/* FontAwesome Trash Icon */}
              <i className="fas fa-trash-alt"></i>
            </button>
            <h5 className="card-title col-12 mb-1 p-0" hidden={editMode}>
              {name}
            </h5>
            <input
              type="text"
              className="form-control col-12 mb-1 p-0"
              placeholder="Sample Name"
              aria-label="Sample Name"
              value={name}
              onChange={handleChangeName}
              hidden={!editMode}
            />
          </div>
          <div className="row">
            <p className="card-text col mb-1 p-0" hidden={editMode}>
              {message}
            </p>
            <input
              type="text"
              className="form-control col p-0"
              placeholder="Sample Message"
              aria-label="Sample Name"
              value={message}
              onChange={handleChangeMessage}
              hidden={!editMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

SampleCard.propTypes = {
  sample: PropTypes.any,
  deleteSample: PropTypes.func,
  setWarningMessage: PropTypes.func,
};

export default SampleCard;
