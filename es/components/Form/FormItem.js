function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper2(Derived) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * @Author: wangweixin
 * @Date: 2017-12-15 11:01:33
 * @Last Modified by: wangweixin
 * @Last Modified time: 2019-04-04 19:36:54
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import validate from "./validators";
import classNames from "classnames";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
/**
 * ??????????????????
 * ??????????????????????????????
 * ???????????????????????????????????????
 */

let FormItem =
/*#__PURE__*/
function (_Component) {
  _inherits(FormItem, _Component);

  var _super = _createSuper2(FormItem);

  function FormItem(...args) {
    var _this;

    _classCallCheck(this, FormItem);

    _this = _super.call(this, ...args);

    _defineProperty(_assertThisInitialized(_this), "state", {
      hasError: false,
      value: _this.props.defaultValue
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", () => {
      const collector = _this.props.collector;
      collector && collector.add(_assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillUnmount", () => {
      const collector = _this.props.collector;
      collector && collector.remove(_assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "validate", currentValue => {
      const _this$props = _this.props,
            validators = _this$props.validators,
            data = _this$props.data;
      const value = _this.state.value;
      const testValue = currentValue || value;
      if (isEmpty(validators)) return true;
      const failed = validators.some(rule => {
        if (Array.isArray(testValue)) {
          if (rule.required) {
            return !validate(testValue, rule);
          }

          return testValue.some(v => {
            return !validate(v, rule, data);
          });
        }

        return !validate(testValue, rule, data);
      });

      if (failed) {
        _this.setState({
          hasError: true
        });
      }

      return !failed;
    });

    _defineProperty(_assertThisInitialized(_this), "handleInput", value => {
      const _this$props2 = _this.props,
            onChange = _this$props2.onChange,
            trigger = _this$props2.trigger;

      if (trigger === "input") {
        let isOk = _this.validate(value);

        _this.setState({
          hasError: !isOk
        });
      }

      _this.setState({
        value
      });

      onChange && onChange(value);
    });

    return _this;
  }

  _createClass(FormItem, [{
    key: "reset",

    /**
     * ????????????defaultValue
     * @public
     */
    value: function reset() {
      const defaultValue = this.props.defaultValue;
      this.setState({
        value: defaultValue,
        hasError: false
      });
    }
    /**
     * validate???????????????collector.validate????????????????????????
     */

  }, {
    key: "renderChildren",
    value: function renderChildren() {
      const _this$props3 = this.props,
            children = _this$props3.children,
            showInfo = _this$props3.showInfo,
            placeholder = _this$props3.placeholder;
      const _this$state = this.state,
            hasError = _this$state.hasError,
            value = _this$state.value;

      if (showInfo) {
        return (
          /*#__PURE__*/
          React.createElement("div", {
            className: "form-item-info"
          }, value)
        );
      }

      return children ?
      /*#__PURE__*/
      React.cloneElement(children, {
        onChange: this.handleInput,
        defaultValue: value,
        hasError,
        placeholder
      }) : "";
    }
  }, {
    key: "render",
    value: function render() {
      const _this$props4 = this.props,
            label = _this$props4.label,
            _this$props4$labelWid = _this$props4.labelWidth,
            labelWidth = _this$props4$labelWid === void 0 ? "100px" : _this$props4$labelWid,
            labelStyle = _this$props4.labelStyle,
            className = _this$props4.className,
            style = _this$props4.style,
            hasColon = _this$props4.hasColon;
      const hasError = this.state.hasError;
      const lwidth = labelWidth.indexOf("px") > 0 ? labelWidth : labelWidth + "px";
      const classes = classNames("form-group form-item-group", className);
      const labelClasses = classNames("form-item-title-label", {
        required: this.isRequired,
        hasColon
      });
      return (
        /*#__PURE__*/
        React.createElement("div", {
          className: classes,
          style: style
        },
        /*#__PURE__*/
        React.createElement("div", {
          className: labelClasses,
          style: _objectSpread2({
            flex: "0 0 ".concat(lwidth)
          }, labelStyle)
        },
        /*#__PURE__*/
        React.createElement("span", null, label), hasColon ? " :" : ""),
        /*#__PURE__*/
        React.createElement("div", {
          className: "form-item-input ".concat(hasError ? "has-error" : "")
        }, this.renderChildren()))
      );
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (!isEqual(nextProps.value, prevState.prevValue) && nextProps.value !== undefined) {
        return _objectSpread2(_objectSpread2({}, prevState), {}, {
          value: nextProps.value,
          prevValue: nextProps.value
        });
      }

      return null;
    }
  }]);

  return FormItem;
}(Component);

export { FormItem as default };
FormItem.displayName = "FormItem";
FormItem.defaultProps = {
  trigger: "input",
  hasColon: true,
  showInfo: false
};
FormItem.propTypes = {
  /** ????????????????????? */
  label: PropTypes.any,

  /** ???????????? */
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** ????????????????????? */
  labelStyle: PropTypes.object,

  /** ????????? */
  defaultValue: PropTypes.any,

  /** ???????????? */
  validators: PropTypes.array,

  /** ??????????????? */
  hasColon: PropTypes.bool,

  /** ??????????????????????????? */
  showInfo: PropTypes.bool,

  /** ????????????????????? */
  trigger: PropTypes.oneOf(["input", "blur"]),

  /** Collector?????? */
  collector: PropTypes.any
};