import { useRef } from "react";

const Dropdown = ({ handleDelete, setIsEditedMode }) => {
  const checkbox = useRef();
  return (
    <div>
      <label className="popup">
        <input ref={checkbox} type="checkbox" />
        <div className="burger" tabIndex="0">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className="popup-window">
          <ul>
            <li>
              <button
                onClick={() => {
                  checkbox.current.checked = false;
                  setIsEditedMode(true);
                }}
              >
                <img src="/edit.svg" />
                <span>Edit</span>
              </button>
            </li>
            <hr />
            <li>
              <button onClick={handleDelete}>
                <img src="/delete.svg" />
                <span>Delete</span>
              </button>
            </li>
          </ul>
        </nav>
      </label>
    </div>
  );
};

export default Dropdown;
