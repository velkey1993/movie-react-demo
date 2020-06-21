import React, { useState, useEffect } from "react";
import { usePrevious } from "../../utils/Custom";
import _ from "lodash";

const destructor = (str) => {
    return str
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length !== 0);
};

const constructor = (values) => values.join(", ");

const MultiValueInput = ({ values = [], onChange }) => {
    const [text, setText] = useState(constructor(values));
    const previousText = usePrevious(text, text);

    useEffect(() => {
        setText(constructor(values));
    }, [values]);

    useEffect(() => {
        const previousMultiValues = destructor(previousText);
        const currentMultiValues = destructor(text);

        if (!_.isEqual(previousMultiValues, currentMultiValues)) {
            onChange(currentMultiValues);
        }
    }, [text, onChange, previousText]);

    return (
        <input
            className="MultiValueInput"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => setText((input) => constructor(destructor(input)))}
        />
    );
};

export default MultiValueInput;
