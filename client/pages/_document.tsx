import { ServerStyleSheets } from "@material-ui/core/styles"
import Document, { Head, Html, Main, NextScript } from "next/document"
import { Children } from "react"
import { theme } from "../services/custom.theme"

class CustomDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<meta name='theme-color' content={theme.palette.primary.main} />
					<link
						rel='stylesheet'
						href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

CustomDocument.getInitialProps = async ctx => {
	const sheets = new ServerStyleSheets()
	const originalRenderPage = ctx.renderPage

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: App => props => sheets.collect(<App {...props} />),
		})

	const initialProps = await Document.getInitialProps(ctx)

	return {
		...initialProps,
		styles: [...Children.toArray(initialProps.styles), sheets.getStyleElement()],
	}
}

export default CustomDocument
