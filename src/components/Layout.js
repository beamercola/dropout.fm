import React from "react";
import { Helmet } from "react-helmet";

const Layout = ({ children }) => {
  return (
    <>
      <Helmet
        bodyAttributes={{ class: "font-mono bg-canvas dark:bg-gray-900" }}
      >
        <html lang="en" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="text/javascript">
          {`
            (function (w,d,s,o,f,js,fjs) {
              w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
              js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
              js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
            }(window, document, 'script', 'plausible', 'https://plausible.io/js/p.js'));
            plausible('page')
          `}
        </script>
      </Helmet>
      {children}
    </>
  );
};

export default Layout;
