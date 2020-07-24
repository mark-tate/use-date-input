import createDateAPI from "../createDateAPI";
import dateFnsAdapter from "@use-date-input/date-fns-adapter";

let animating = false;
export const setAnimating = value => (animating = value);

let isDayDisabled = () => false;
export const setIsDayDisabled = value => (isDayDisabled = value);

let numOfColumns = 0;
export const setNumOfColumns = value => (numOfColumns = value);

let numOfVisibleMonths = 0;
export const setNumOfVisibleMonths = value => (numOfVisibleMonths = value);

let visibleFromDate;
export const setVisibleFromDate = value => (visibleFromDate = value);

let clickOutsideWhiteList;
export const setClickOutsideWhiteList = value =>
  (clickOutsideWhiteList = value);

let enableKeyboardNavigation;
export const setEnableKeyboardNavigation = value =>
  (enableKeyboardNavigation = value);

let focusedDate;
export const setFocusedDate = value => (focusedDate = value);

let focusableDate;
export const setFocusableDate = value => (focusableDate = value);

let isKeyboardCursorValid;
export const setIsKeyboardCursorValid = value =>
  (isKeyboardCursorValid = value);

let keyboardCursor;
export const setKeyboardCursor = value => (keyboardCursor = value);

let isMouseCursorValid;
export const setIsMouseCursorValid = value => (isMouseCursorValid = value);

let mouseCursor;
export const setMouseCursor = value => (mouseCursor = value);

export const useCalendarProps = jest.fn().mockImplementation(() => ({
  clickOutsideWhiteList,
  isDayDisabled,
  numOfColumns,
  numOfVisibleMonths
}));

export const useCalendarState = jest.fn().mockImplementation(() => ({
  animating,
  enableKeyboardNavigation,
  focusedDate,
  focusableDate,
  isKeyboardCursorValid,
  isMouseCursorValid,
  keyboardCursor,
  mouseCursor,
  visibleFromDate
}));

export const mouseClickOutsideMock = jest.fn();
export const navigateNextMock = jest.fn();
export const navigatePreviousMock = jest.fn();
export const setAnimatingMock = jest.fn();
export const setEnableKeyboardNavigationMock = jest.fn();
export const selectDateMock = jest.fn();
export const setKeyPressMock = jest.fn();
export const setKeyboardCursorMock = jest.fn();
export const setMouseCursorMock = jest.fn();
export const setOpenMock = jest.fn();

export const useCalendarDispatch = jest.fn().mockImplementation(() => ({
  mouseClickOutside: mouseClickOutsideMock,
  navigateNext: navigateNextMock,
  navigatePrevious: navigatePreviousMock,
  setAnimating: setAnimatingMock,
  setEnableKeyboardNavigation: setEnableKeyboardNavigationMock,
  selectDate: selectDateMock,
  setKeyboardCursor: setKeyboardCursorMock,
  setKeyPress: setKeyPressMock,
  setMouseCursor: setMouseCursorMock,
  setOpen: setOpenMock
}));

let components = {};
export const setComponents = value => {
  components = value;
};

export const useCalendarComponent = jest
  .fn()
  .mockImplementation(() => components);

let weekOffset = 0;
export const setWeekOffset = value => {
  weekOffset = value;
};

let adapter = dateFnsAdapter;
export const setAdapter = value => {
  adapter = value;
};

export const useDateAPI = props =>
  createDateAPI({ numOfVisibleMonths, weekOffset, adapter, ...props });

export const resetMocks = () => {
  animating = false;
  components = {};
  enableKeyboardNavigation = false;
  focusedDate = undefined;
  focusableDate = undefined;
  isDayDisabled = () => false;
  keyboardCursor = undefined;
  mouseCursor = undefined;
  numOfColumns = 0;
  numOfVisibleMonths = 0;
  visibleFromDate = undefined;
  weekOffset = 0;
};
