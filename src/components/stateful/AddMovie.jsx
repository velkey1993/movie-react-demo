import React from "react";
import {Button, Modal, ModalBody, ModalFooter} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import {Formik} from "formik";
import * as yup from "yup";
import './AddMovie.css';
import Form from "react-bootstrap/Form";
import {AppContext} from "./App";

const schema = yup.object().shape({
    title: yup.string().required("Title required!"),
    release_date: yup.date().required("Release date required!"),
    poster_path: yup.string().required("Movie URL required!"),
    genres: yup.array().required("Genre required!"),
    overview: yup.string().required("Overview required!"),
    runtime: yup.number().required("Runtime required!")
})

function AddMovie({show, onHide, addMovie}) {

    const modalFormVariables = {show, onHide};

    function blurRoot() {
        const root = document.getElementById("root");
        root.style["opacity"] = "0.5";
        root.style["filter"] = "blur(5px)";
    }

    function resetRoot() {
        const root = document.getElementById("root");
        //"" removes these styles, otherwise fixed position is buggy.
        root.style["opacity"] = "";
        root.style["filter"] = "";
    }

    return (
        <Modal {...modalFormVariables} onShow={() => blurRoot()} onExit={() => resetRoot()} size="md"
               aria-labelledby="contained-modal-title-vcenter" centered style={{opacity: 1}}>
            <Formik
                validationSchema={schema}
                initialValues={{
                    title: "",
                    release_date: "",
                    poster_path: "",
                    genres: [],
                    overview: "",
                    runtime: ""
                }}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    addMovie(values);
                    resetForm();
                    setSubmitting(false);
                }}
            >
                {}
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      resetForm
                  }) => (
                    <Form onSubmit={handleSubmit}>
                        {console.log(values)}
                        <ModalHeader closeButton/>
                        <ModalBody>
                            <Modal.Title id="contained-modal-title-vcenter">
                                <h1>ADD MOVIE</h1>
                            </Modal.Title>
                            <Form.Group controlId="formText">
                                <Form.Label>TITLE</Form.Label>
                                <Form.Control
                                    className={touched.title && errors.title ? "modal-input-bg error" : "modal-input-bg"}
                                    type="text"
                                    name="title"
                                    placeholder="Select Title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}/>
                                {touched.title && errors.title
                                    ? (<div className="error-message">* {errors.title}</div>)
                                    : null}
                            </Form.Group>
                            <Form.Group controlId="formReleaseDate">
                                <Form.Label>RELEASE DATE</Form.Label>
                                <Form.Control
                                    className={touched.release_date && errors.release_date ? "modal-input-bg error" : "modal-input-bg"}
                                    type="date"
                                    name="release_date"
                                    placeholder="Select Date"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.release_date}/>
                                {touched.release_date && errors.release_date
                                    ? (<div className="error-message">* {errors.release_date}</div>)
                                    : null}
                            </Form.Group>
                            <Form.Group controlId="formPosterPath">
                                <Form.Label>MOVIE URL</Form.Label>
                                <Form.Control
                                    className={touched.poster_path && errors.poster_path ? "modal-input-bg error" : "modal-input-bg"}
                                    type="text"
                                    name="poster_path"
                                    placeholder="Movie URL here"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.poster_path}/>
                                {touched.poster_path && errors.poster_path
                                    ? (<div className="error-message">* {errors.poster_path}</div>)
                                    : null}
                            </Form.Group>
                            <AppContext.Consumer>
                                {
                                    value => {
                                        return (
                                            <Form.Group controlId="formGenres">
                                                <Form.Label>GENRES</Form.Label>
                                                <Form.Control
                                                    className={touched.genres && errors.genres ? "modal-input-bg error" : "modal-input-bg"}
                                                    multiple
                                                    as="select"
                                                    name="genres"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.genres}>
                                                    {
                                                        value.genres.map((genre, index) => {
                                                            return <option key={index}
                                                                           value={genre.name}>{genre.name}</option>
                                                        })
                                                    }
                                                </Form.Control>
                                                {touched.genres && errors.genres
                                                    ? (<div className="error-message">* {errors.genres}</div>)
                                                    : null}
                                            </Form.Group>
                                        )
                                    }
                                }
                            </AppContext.Consumer>
                            <Form.Group controlId="formOverview">
                                <Form.Label>OVERVIEW</Form.Label>
                                <Form.Control
                                    className={touched.overview && errors.overview ? "modal-input-bg error" : "modal-input-bg"}
                                    type="text"
                                    name="overview"
                                    placeholder="Overview here"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.overview}/>
                                {touched.overview && errors.overview
                                    ? (<div className="error-message">* {errors.overview}</div>)
                                    : null}
                            </Form.Group>
                            <Form.Group controlId="formRuntime">
                                <Form.Label>RUNTIME</Form.Label>
                                <Form.Control
                                    className={touched.runtime && errors.runtime ? "modal-input-bg error" : "modal-input-bg"}
                                    type="text"
                                    name="runtime"
                                    placeholder="Runtime here"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.runtime}/>
                                {touched.runtime && errors.runtime
                                    ? (<div className="error-message">* {errors.runtime}</div>)
                                    : null}
                            </Form.Group>
                        </ModalBody>
                        <ModalFooter>
                            <Button id="modal-footer-bt-reset" type="reset" onClick={resetForm}>RESET</Button>
                            <Button id="modal-footer-bt-submit" variant="primary" type="submit"
                                    disabled={isSubmitting}>SUBMIT</Button>
                        </ModalFooter>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}

export default AddMovie;
