import React, {Component} from "react";
import './AddMovie.css';
import {Button, Modal, ModalBody, ModalFooter} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import Form from "react-bootstrap/Form";

class AddMovie extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    blurRoot() {
        const root = document.getElementById("root");
        root.style["opacity"] = "0.5";
        root.style["filter"] = "blur(5px)";
    }

    resetRoot() {
        const root = document.getElementById("root");
        root.style["opacity"] = "1";
        root.style["filter"] = "blur(0px)";
        this.cleanUpState();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        // dummy submit handling
        alert('The title is: ' + this.state.title);
        this.cleanUpState();
        this.props.onHide();
        event.preventDefault();
    }

    cleanUpState() {
        Object.keys(this.state).map(key => {
            this.setState({
                [key]: undefined
            });
            return null;
        })
    }

    render() {
        return (
            <Modal {...this.props} onShow={() => this.blurRoot()} onExit={() => this.resetRoot()} size="md"
                   aria-labelledby="contained-modal-title-vcenter" centered style={{opacity: 1}}>
                <Form onSubmit={this.handleSubmit}>
                    <ModalHeader closeButton/>
                    <ModalBody>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <h1>ADD MOVIE</h1>
                        </Modal.Title>
                        <Form.Group>
                            <Form.Label>TITLE</Form.Label>
                            <Form.Control className="modal-input-bg" name="title" type="text"
                                          placeholder="Select Title" onChange={this.handleInputChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>RELEASE DATE</Form.Label>
                            <Form.Control className="modal-input-bg" name="releaseDate" type="date"
                                          placeholder="Select Date" onChange={this.handleInputChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>MOVIE URL</Form.Label>
                            <Form.Control className="modal-input-bg" name="movieUrl" type="text"
                                          placeholder="Movie URL here" onChange={this.handleInputChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>GENRE</Form.Label>
                            <Form.Control className="modal-input-bg" name="genre" as="select"
                                          placeholder="Select Genre..." onChange={this.handleInputChange}>
                                <option key="default" value="default">Select Genre...</option>
                                {this.props.movietypes.map((type, index) => {
                                    return <option key={index} value={type.name}>{type.name}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>OVERVIEW</Form.Label>
                            <Form.Control className="modal-input-bg" name="overview" type="text"
                                          placeholder="Overview here" onChange={this.handleInputChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>RUNTIME</Form.Label>
                            <Form.Control className="modal-input-bg" name="runtime" type="text"
                                          placeholder="Runtime here" onChange={this.handleInputChange}/>
                        </Form.Group>
                    </ModalBody>
                    <ModalFooter>
                        <Button id="modal-footer-bt-reset" onClick={this.props.onHide}>RESET</Button>
                        <Button id="modal-footer-bt-submit" variant="primary" type="submit">SUBMIT</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

export default AddMovie;
