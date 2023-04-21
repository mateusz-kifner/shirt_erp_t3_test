import Document, { Html, Head, Main, NextScript } from "next/document";

class DocumentWithColorMode extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="bg-gray-200 dark:bg-stone-950">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default DocumentWithColorMode;
