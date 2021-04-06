import "./../component-styles/Modal.css";

const Modal = ({ handleClose, showModal, children }) => {
  const showHideClassName = showModal
    ? "modal display-block"
    : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button
          type="button"
          onClick={handleClose}
          style={{ padding: "5px", margin: "5px" }}
        >
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;
