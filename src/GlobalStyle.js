import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  color: ${theme.fontColor};
  background-color: ${theme.backColor};
  font-family: 'Source Sans Pro', sans-serif;
}
body {
  overflow-y: overlay;
  &::-webkit-scrollbar {
    width: 15px;

  }

  &::-webkit-scrollbar-track {
    opacity: 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
    height: 1px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
  
`;
