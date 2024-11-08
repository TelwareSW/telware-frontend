const sizes = {
  mobile: "480px",
  desktop: "600px",
};

const media = {
  mobile: `(max-width: ${sizes.desktop})`,
  desktop: `(min-width: ${sizes.desktop})`,
};
export { sizes, media };
