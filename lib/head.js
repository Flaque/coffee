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
        text-align: center;
        max-width: 90%;
      }
    `}</style>
  </div>
);
