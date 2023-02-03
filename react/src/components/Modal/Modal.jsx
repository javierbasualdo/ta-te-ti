import './Modal.css';

function Modal ({ show, onClick }) {
    if (show) {
        return (
            <div className="overlay fa-solid fa-repeat" onClick={onClick}>
            </div>
        )
    }
}

export default Modal