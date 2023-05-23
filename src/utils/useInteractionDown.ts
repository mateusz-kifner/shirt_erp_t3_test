const useInteractionDown = (
  callback: (
    currentTarget: EventTarget & Element,
    pointerId: number | undefined,
    clientX: number,
    clientY: number
  ) => void
) => {
  return typeof PointerEvent !== "undefined"
    ? {
        onPointerDown: (e: React.PointerEvent) => {
          if (
            e.pointerType === "mouse" &&
            (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey)
          ) {
            return;
          }
          callback(e.currentTarget, e.pointerId, e.clientX, e.clientY);
        },
      }
    : {
        onMouseDown: (e: React.MouseEvent) => {
          if (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey) {
            return;
          }
          callback(e.currentTarget, undefined, e.clientX, e.clientY);
        },
        onTouchStart: (e: React.TouchEvent) => {
          callback(
            e.currentTarget,
            e.changedTouches[0]!.identifier,
            e.changedTouches[0]!.clientX,
            e.changedTouches[0]!.clientY
          );
        },
      };
};

export default useInteractionDown;
