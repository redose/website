import Document, { DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () => originalRenderPage({
      enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
    });

    return Document.getInitialProps(ctx)
      .then((initialProps) => ({
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      }))
      .finally(() => {
        sheet.seal();
      });
  }
}
