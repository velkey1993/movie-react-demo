
const withFilter = (callback, keyCode, ref) => (event) => {
    if ((!keyCode
        || [keyCode].flatMap(x => x).includes(event.keyCode)
        || [keyCode].flatMap(x => x).includes(event.key))) {
        if ((!ref || event.target === ref.current)) {
            callback && callback(event);
        }
    }
};

export default withFilter;
