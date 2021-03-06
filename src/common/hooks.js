import { useState, useEffect, useRef, useCallback, useMemo } from "react";

/**
 * 将普通的输入内容，转换为包含defaultValue, onChange的组件
 * 并且当defaultValue的值改变，组件的值也改变
 * @param {*} defaultValue 默认值
 * @param {Function} onChange 组件的回调
 * @param {Function} mapDefaultToValue 传入的值->给组件的值的映射
 * @param {Function} mapValuetoValue 组件的值->最终传出的值的映射
 * @param {Boolean} mapValueWhenChange 组件的值变化时，是否对value进行映射
 */
export const useControlledInputs = ({
  defaultValue,
  onChange,
  mapDefaultToValue,
  mapValuetoValue,
  mapValueWhenChange = true,
  props
}) => {
  const [value, setValue] = useState(() =>
    mapDefaultToValue(defaultValue, props)
  );
  useEffect(() => {
    setValue(mapDefaultToValue(defaultValue, props));
  }, [defaultValue]);

  const handleChange = val => {
    const value = mapValueWhenChange ? mapValuetoValue(val, props) : val;
    setValue(value);
    onChange(mapValuetoValue(val, props));
  };

  return {
    value,
    handleChange,
    setValue
  };
};

/**
 * 当defaultValue改变时，value也改变
 */
export const useDefault = defaultValue => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (defaultValue !== value) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  return [value, setValue];
};

/**
 * only exec func when deps change, avoid to be executed when mounted
 */
export const useUpdateEffect = (func, deps) => {
  const didMount = useRef(true);
  useEffect(() => {
    if (didMount.current) {
      didMount.current= false;
    } else {
      func();
    }
  }, deps);
}

export const useClientRect = () => {
  const [rect, setRect] = useState({});
  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
};

// 获取对应元素的dropdown位置
export const useDropdownPosition = (ref, getContainer) => {
  const container =
    (getContainer && getContainer(ref.current)) || document.body;
  const rect =
    ref.current && ref.current.getBoundingClientRect
      ? ref.current.getBoundingClientRect()
      : {};
  const containerRect = (container && container.getBoundingClientRect()) || {};
  const scrollTop = (container && container.scrollTop) || 0;
  const scrollLeft = (container && container.scrollLeft) || 0;
  const position = useMemo(
    () => ({
      width: rect.width,
      left: rect.left - containerRect.left + scrollLeft || 0,
      top: rect.top + rect.height - containerRect.top + scrollTop || 0
    }),
    [
      rect.width,
      rect.left,
      rect.top,
      rect.height,
      containerRect.left,
      containerRect.top,
      scrollLeft,
      scrollTop
    ]
  );
  return [position, ref];
};
