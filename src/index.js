/**
 * Takes object which has functions, applies them passing state or props value
 * and then returns object that has same keys but functions are replaced
 * with function results.
 *
 * @param {Object} stateSelectors Object that has functions as values. That
 *  kind of functions are usually considered as selectors.
 *
 * @param {Object} propsSelectors Object that has functions as values.
 * Functions will get props as an argument.
 *
 * @returns {Function} function that takes two arguments - state and props.
 * Can be passed to Redux connect higher order component as mapStateToProps
 * function.
 */
export default function composeSelectors(stateSelectors = {}, propsSelectors = {}) {
  return (state, props) => ({
    ...mapValues(applySelector(state))(stateSelectors),
    ...mapValues(applySelector(props))(propsSelectors)
  });
};

function mapValues(mapFunction) {
  return (object) => {
    const newObject = {};
    Object.keys(object).forEach((key) => {
      newObject[key] = mapFunction(object[key]);
    });
    return newObject;
  };
}

function applySelector(values) {
  return selector => {
    return selector(values);
  };
}

