function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from "react";
import PropTypes from "prop-types";
import Base from "./Input";
import TextAreaWithMax from "./TextareaWithMax";
import { useControlledInputs } from "../../common/hooks";
import { nfn } from "../../common";
export default function Input(props) {
  const defaultValue = props.defaultValue,
        onChange = props.onChange,
        type = props.type,
        max = props.max,
        others = _objectWithoutProperties(props, ["defaultValue", "onChange", "type", "max"]);

  const _useControlledInputs = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue: v => v,
    mapValuetoValue: v => v
  }),
        value = _useControlledInputs.value,
        handleChange = _useControlledInputs.handleChange;

  if (type === "textarea" && max) {
    return (
      /*#__PURE__*/
      React.createElement(TextAreaWithMax, _extends({
        type: type,
        max: max,
        defaultValue: defaultValue,
        onChange: onChange
      }, others))
    );
  }

  return (
    /*#__PURE__*/
    React.createElement(Base, _extends({
      type: type,
      value: value,
      handleChange: handleChange
    }, others))
  );
}
Input.defaultProps = {
  type: "text",
  defaultValue: "",
  isSearch: false,
  onChange: nfn
};
Input.propTypes = {
  /** ?????????????????????????????? */
  onChange: PropTypes.func,

  /** ????????? */
  defaultValue: PropTypes.string,

  /** ???????????????????????? */
  isSearch: PropTypes.bool,

  /** ???????????????????????????????????? @see controled input */
  value: PropTypes.string,

  /** ?????? */
  type: PropTypes.oneOf(["text", "textarea"]),

  /** ??????Error, ??????error?????? */
  hasError: PropTypes.bool,

  /** ???type???textarea????????????max,????????????????????????????????? */
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};