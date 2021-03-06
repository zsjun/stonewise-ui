import React from "react";
import map from "lodash/map";
import get from "lodash/get";
import cx from "classnames";

import Item from "../Item";
import { Resizable } from "react-resizable";
import { withScrollHeight } from "./helper";

function SortIcon({ column, handleSortChange, sortKey, sortFlag }) {
  const change = sort => () => handleSortChange(column.key, sort);
  const active = sort =>
    column.key === sortKey && sort === sortFlag ? "table-active" : "";

  return (
    <div className="table-sort-button">
      <span
        className={`topTriangle ${active("asc")}`}
        onClick={change("asc")}
      />
      <span
        className={`bottomTriangle ${active("desc")}`}
        onClick={change("desc")}
      />
    </div>
  );
}

function Header({ columns, setColumns, resizeable, handleResize, ...others }) {
  // 是否包含二级标题
  const columnHasChild = column => get(column, "children.length");

  // 二级标题
  const children = columns.reduce(
    (total, cur) => total.concat(cur.children || []),
    []
  );
  const hasChild = children.length;

  return (
    <thead className="table-head">
      <tr>
        {map(columns, (column, index) => {
          const { title, sortable, width } = column;
          const hidePdl = get(title, "type.type") === "select";

          const th = (
            <th
              rowSpan={columnHasChild(column) ? 1 : 2}
              colSpan={columnHasChild(column) || 1}
              key={`table-header-${index}`}
              style={column.style || null}
              className={cx("table-head-item", {
                center: column.align === "center",
                pdl10: column.align !== "center" && !hidePdl
              })}
            >
              {title}
              <Item show={sortable}>
                <SortIcon column={column} {...others} />
              </Item>
            </th>
          );

          if (!resizeable) return th;

          return (
            <Resizable
              width={width}
              onResize={(e, { size }) =>
                handleResize(index, size, columns, setColumns)
              }
            >
              {th}
            </Resizable>
          );
        })}
      </tr>
      <Item show={hasChild}>
        <tr>
          {map(children, (column, index) => {
            const { title, sortable } = column;
            return (
              <th
                key={`table-header-child-${index}`}
                className="table-head-item"
              >
                {title}
                <Item show={sortable}>
                  <SortIcon column={column} {...others} />
                </Item>
              </th>
            );
          })}
        </tr>
      </Item>
    </thead>
  );
}

export default withScrollHeight(Header);
