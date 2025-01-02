import { extendTheme } from "@chakra-ui/react";

// 예시 색상
const colors = {
  brand: {
    50: "#e3f2f9",
    100: "#c5e4f3",
    200: "#a2d4ec",
    300: "#7ac1e4",
    400: "#47a9da",
    500: "#0088cc", // 주 색상
    600: "#007ab8",
    700: "#006ba1",
    800: "#005885",
    900: "#003f5e",
  },
};

const customTheme = extendTheme({
  colors,
  fonts: {
    heading: "'Noto Sans KR', sans-serif",
    body: "'Noto Sans KR', sans-serif",
  },
});

export default customTheme;
