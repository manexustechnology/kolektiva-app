export const getOrderbookWidthStyle = (value: number, max: number) => {
  return {
    width: `${value * (100 / max)}%`,
    backgroundColor: "#CCFBF1",
    position: "absolute" as "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    height: "100%",
  };
};
