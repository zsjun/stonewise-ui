function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import compose from "lodash/fp/compose";
import debounce from "lodash/debounce";
import ColGroup from "./ColGroup";
import Header from "./Header";
import Body from "./Body";
import { withLimit, withExpand, withClick, withSelect } from "./helper";
import Item from "../Item";
import { useDefault } from "../../common/hooks";
import { nfn } from "../../common";
const handleResize = debounce((columnIndex, size, columns, setColumns) => {
  const nextColumns = [...columns]; // ?????????

  const curColumn = columns[columnIndex]; // ?????????

  const nextColumn = columns[columnIndex + 1];
  if (!curColumn || !nextColumn) return; // ???????????????

  const changed = curColumn.width - size.width;
  nextColumns[columnIndex] = _objectSpread2(_objectSpread2({}, curColumn), {}, {
    width: size.width
  });
  nextColumns[columnIndex + 1] = _objectSpread2(_objectSpread2({}, nextColumn), {}, {
    width: nextColumn.width + changed
  });
  setColumns(nextColumns);
}, 300);

function TableWrap({
  scrollHeight,
  children,
  columns,
  className
}) {
  return scrollHeight ?
  /*#__PURE__*/
  React.createElement("div", {
    className: className
  }, children) :
  /*#__PURE__*/
  React.createElement("table", {
    className: className
  },
  /*#__PURE__*/
  React.createElement(ColGroup, {
    columns: columns
  }), children);
}

function Table({
  columns,
  data,
  border,
  hover,
  background,
  striped,
  showHeader,
  scrollHeight,
  sortFlag,
  sortKey,
  lineHeight,
  className,
  handleSortChange,
  hasMore,
  showMore,
  expandRowRender,
  expandRow,
  handleExpandChange,
  activeIndex,
  onClick,
  selected,
  resizeable,
  draggable,
  setRowClassFn,
  handleDragChange
}) {
  const _useState = useState(columns),
        _useState2 = _slicedToArray(_useState, 2),
        innerColumns = _useState2[0],
        setColumns = _useState2[1];

  const _useDefault = useDefault(data),
        _useDefault2 = _slicedToArray(_useDefault, 2),
        resultData = _useDefault2[0],
        setData = _useDefault2[1];

  const cls = cx("table", className, {
    border,
    hover,
    background: background && !striped,
    striped
  }); // ??????columns

  const formatColumns = columns => {
    return columns.reduce((total, cur) => total.concat(cur.children || cur), []);
  };

  const flatColumns = useMemo(() => formatColumns(innerColumns), [innerColumns]);
  const bodyProps = {
    columns: flatColumns,
    data: resultData,
    setData,
    scrollHeight,
    lineHeight,
    hasMore,
    showMore,
    expandRow,
    expandRowRender,
    activeIndex,
    onClick,
    handleExpandChange,
    selected,
    setRowClassFn,
    draggable,
    handleDragChange
  };
  return (
    /*#__PURE__*/
    React.createElement(TableWrap, {
      className: cls,
      scrollHeight: scrollHeight,
      columns: innerColumns,
      flatColumns: flatColumns
    },
    /*#__PURE__*/
    React.createElement(Item, {
      show: showHeader
    },
    /*#__PURE__*/
    React.createElement(Header, {
      resizeable: resizeable,
      scrollHeight: scrollHeight,
      columns: innerColumns,
      sortFlag: sortFlag,
      sortKey: sortKey,
      handleSortChange: handleSortChange,
      handleResize: handleResize,
      setColumns: setColumns
    })),
    /*#__PURE__*/
    React.createElement(Body, _extends({
      body: true
    }, bodyProps)))
  );
}

Table.defaultProps = {
  data: [],
  columns: [],
  border: true,
  hover: true,
  striped: false,
  background: true,
  showHeader: true,
  lineHeight: 50,
  defaultRenderExpand: false,
  expandOnly: false,
  handleDragChange: nfn
};
Table.propTypes = {
  /** ???????????? */
  data: PropTypes.array,

  /**
   * ????????????
   * {
   *   title: '?????????',
   *   key: '??????',
   *   render: '???????????????????????????????????????',
   *   width: '????????????',
   *   align: '??????',
   *   limit: '????????????????????????????????????'
   * }
   */
  columns: PropTypes.array,

  /** ???????????????????????????????????????????????? */
  pageLimit: PropTypes.number,

  /** ??????????????? */
  border: PropTypes.bool,

  /** ????????????hover?????? */
  hover: PropTypes.bool,

  /** ????????????????????? */
  background: PropTypes.bool,

  /** ?????????????????? */
  striped: PropTypes.bool,

  /** ??????????????? */
  showHeader: PropTypes.bool,

  /** ?????????????????? */
  clickable: PropTypes.bool,

  /** ????????????????????? */
  select: PropTypes.bool,

  /** ?????????????????? */
  handleRowClick: PropTypes.func,

  /** ??????????????? */
  lineHeight: PropTypes.number,

  /** ???????????????????????? */
  expandRowRender: PropTypes.func,

  /** ??????????????????????????? */
  expandOnly: PropTypes.bool,

  /** ????????????????????? */
  defaultRenderExpand: PropTypes.bool,

  /** ???????????????????????? */
  handleSortChange: PropTypes.func,

  /** ???????????????key */
  sortKey: PropTypes.string,

  /** ????????????????????? */
  sortFlag: PropTypes.oneOf(["asc", "desc"]),

  /** ????????????????????? */
  resizeable: PropTypes.bool,

  /** ??????????????? */
  draggable: PropTypes.bool,

  /** ???????????? */
  handleDragChange: PropTypes.func,

  /** ?????????????????? */
  setRowClassFn: PropTypes.func
};
export default compose(withSelect, withClick, withExpand, withLimit)(Table);