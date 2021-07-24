import React from "react";
import { Spinner, Modal } from "react-bootstrap";
import { useSettings } from "../../context/SettingsProvider";

const Loader: React.FC<any> = () => {
    const settings = useSettings();

    return (
        <>
            <Modal show={settings.state.showLoader} centered>
                <Modal.Body><Spinner animation="border" variant="primary" /> </Modal.Body>
            </Modal>
        </>
    );
};
export default Loader;