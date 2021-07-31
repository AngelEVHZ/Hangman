import React from "react";
import { Spinner, Modal } from "react-bootstrap";
import { useUtils } from "../../../Context/UtilsProvider";

const Loader: React.FC<any> = () => {
    const utils = useUtils();

    return (
        <>
            <Modal show={utils.state.showLoader} centered>
                <Modal.Body><Spinner animation="border" variant="primary" /> </Modal.Body>
            </Modal>
        </>
    );
};
export default Loader;