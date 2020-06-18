import React, {Component} from "react";
import './AddMovie.css';
import {Button, Modal, ModalBody, ModalFooter} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";

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
                <ModalHeader closeButton/>
                <ModalBody>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h1 style={{color: "white", marginTop: 0, marginBottom: 30}}>ADD MOVIE</h1>
                    </Modal.Title>
                    <h4>TITLE</h4>
                    <input name={"title"} type={"text"} className={"modal-input-bg"} placeholder={"Select Title"}
                           onChange={this.handleInputChange}/>
                    <h4>RELEASE DATE</h4>
                    <input name={"releaseDate"} type={"date"} className={"modal-input-bg"} placeholder={"Select Date"}
                           onChange={this.handleInputChange}/>
                    <h4>MOVIE URL</h4>
                    <input name={"movieUrl"} type={"text"} className={"modal-input-bg"} placeholder={"Movie URL here"}
                           onChange={this.handleInputChange}/>
                    <h4>GENRE</h4>
                    <select name={"genre"} className={"modal-input-bg"} onChange={this.handleInputChange}>
                        {this.props.sortbytypes.map((type, index) => {
                            return <option key={index} value={type}>{type}</option>
                        })}
                    </select>
                    <h4>OVERVIEW</h4>
                    <input name={"overview"} type={"text"} className={"modal-input-bg"} placeholder={"Overview here"}
                           onChange={this.handleInputChange}/>
                    <h4>RUNTIME</h4>
                    <input name={"runtime"} type={"text"} className={"modal-input-bg"} placeholder={"Runtime here"}
                           onChange={this.handleInputChange}/>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.props.onHide}
                            style={{backgroundColor: "#232323", borderColor: "#f65261"}}>RESET</Button>
                    <Button onClick={this.handleSubmit}
                            style={{backgroundColor: "#f65261", border: 0}}>SUBMIT</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default AddMovie;
