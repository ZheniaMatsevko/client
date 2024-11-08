import React, {useEffect, useState} from "react";

interface ModalProps {
    isOpen?: boolean;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    actionLabel: string;
    toggleModal: () => void;
    style?: React.CSSProperties;
}

export const Modal: React.FC<ModalProps> = ({
                                                isOpen,
                                                onSubmit,
                                                title,
                                                body,
                                                actionLabel,
                                                toggleModal,
                                                style
                                            }) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            const modalElement = document.getElementById("exampleModal");
            if (modalElement) {
                modalElement.classList.add("show");
                modalElement.style.display = "block";
            }
        } else {
            const modalElement = document.getElementById("exampleModal");
            if (modalElement) {
                modalElement.classList.remove("show");
                modalElement.style.display = "none";
            }
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={toggleModal}></button>
                        </div>
                        <div className="modal-body">{body}</div>
                        <div className="modal-footer">
                            <button onClick={onSubmit} type="button" className="btn btn-primary" style={{ width: "100%" }}>{actionLabel}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}></div>
        </>
    );
};
