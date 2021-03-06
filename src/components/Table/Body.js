import React, { memo, useState } from "react";
import map from "lodash/map";
import includes from "lodash/includes";
import compose from "lodash/fp/compose";

import BaseRow from "./Row";
import Item from "../Item";

import { withScrollHeight, withExpandRow, withDragRow } from "./helper";

const Row = compose(withExpandRow, withDragRow, memo)(BaseRow);

function Body({
  columns,
  data,
  lineHeight,
  hasMore,
  showMore,
  activeIndex,
  selected,
  selectRowBgColor,
  ...others
}) {
  return (
    <tbody className="table-body">
      {map(data, (row, index) => (
        <Row
          key={`table-row-${index}`}
          columns={columns}
          index={index}
          data={row}
          totalData={data}
          lineHeight={lineHeight}
          checked={includes(selected, row)}
          active={activeIndex === index}
          selectRowBgColor={selectRowBgColor}
          {...others}
        />
      ))}
      <Item show={hasMore}>
        <tr
          className="table-body-row table-show-more"
          onClick={showMore}
          style={{
            height: lineHeight
          }}
        >
          <td
            colSpan={columns.length}
            style={{
              height: lineHeight
            }}
          >
            显示更多
          </td>
        </tr>
      </Item>
    </tbody>
  );
}

export default withScrollHeight(Body, false);
