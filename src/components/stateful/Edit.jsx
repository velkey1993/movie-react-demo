import React from "react";
import ReactDOM from "react-dom";
import CloseButton from "../stateless/CloseButton";
export class Edit extends React.Component {
    constructor(props) {
        super(props);
        const { movie } = props;
        this.state = { movie: movie };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.initialOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        ReactDOM.render(
            <div className="block blur container"></div>,
            document.getElementById("blur")
        );
    }

    componentWillUnmount() {
        document.body.style.overflow = this.initialOverflow;
        ReactDOM.render(null, document.getElementById("blur"));
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            movie: { ...this.state.movie, [name]: value },
        });
    }

    render() {
        return (
            <>
                <div className="x-modal-edit-content">
                    <CloseButton
                        close={() => {
                            this.props.close();
                        }}
                    />
                    <div className="inner">
                        <h3>EDIT MOVIE</h3>
                        <h5 className="id">MOVIE ID</h5>
                        <p>{this.state.movie.id || ""} </p>
                        <h5>TITLE</h5>
                        <input
                            name={"title"}
                            type={"text"}
                            onChange={this.handleInputChange}
                            value={this.state.movie.title || ""}
                        />
                        <h5>RELEASE DATE</h5>
                        <input
                            name={"releaseDate"}
                            type={"date"}
                            onChange={this.handleInputChange}
                            value={new Date(this.state.movie.releaseDate || "")
                                .toISOString()
                                .slice(0, 10)}
                        />
                        <h5>MOVIE URL</h5>
                        <input
                            name={"movieUrl"}
                            type={"text"}
                            onChange={this.handleInputChange}
                            value={this.state.movie.movieUrl || ""}
                        />
                        <h5>GENRE</h5>
                        <select
                            name={"genre"}
                            onChange={this.handleInputChange}
                            value={this.state.movie.genre || ""}
                        >
                            {["comedy", "drama"].map((type) => {
                                return (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                );
                            })}
                        </select>
                        <h5>OVERVIEW</h5>
                        <input
                            name={"overview"}
                            type={"text"}
                            onChange={this.handleInputChange}
                            value={this.state.movie.overview || ""}
                        />
                        <h5>RUNTIME</h5>
                        <input
                            name={"runtime"}
                            type={"text"}
                            onChange={this.handleInputChange}
                            value={this.state.movie.runtime || ""}
                        />

                        <div>
                            <button
                                className="save"
                                onClick={() => {
                                    this.props.updateMovie();
                                }}
                            >
                                SAVE
                            </button>
                            <button
                                className="reset"
                                onClick={() => {
                                    this.setState({ movie: this.props.movie });
                                }}
                            >
                                RESET
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
