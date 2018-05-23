import Head from "next/head";
export default () => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <style jsx global>{`
      html,
      body {
        font: 12px "Lucida Console", Monaco, monospace;
        background: white;
        color: #2f3640;
        margin: auto;
        padding: 1rem;
      }
      main {
        text-align: left;
        max-width: 90%;
      }

      hr {
        border: 1px solid #eee;
        margin-bottom: 2rem;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-size: 12px;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p {
        padding: 0;
        padding-top: 1rem;
        margin: 0;
      }

      .link {
        color: #40739e;
        cursor: pointer;
        text-decoration: underline;
        border: none;
        background: none;
        padding-left: 0;
      }

      .link:active:not(:disabled) {
        color: #c23616;
      }

      .link:disabled {
        opacity: 0.2;
        cursor: initial;
      }
    `}</style>
  </div>
);
