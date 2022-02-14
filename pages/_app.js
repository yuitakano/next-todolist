// import { ApolloProvider } from '@apollo/client'
// import { useApollo } from '../apollo/client'

// export default function App({ Component, pageProps }) {
//     const apolloClient = useApollo(pageProps.initialApolloState)

//     return (
//         <ApolloProvider client={apolloClient}>
//             <Component {...pageProps} />
//         </ApolloProvider>
//     )
// }
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'

import Head from "next/head"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import styles from '../styles'
import Index from './index'
const darkTheme = createTheme(styles);

console.log(Index, 'Index')

export default function App({ Component, pageProps }) {
    console.log({ Component, pageProps }, '{ Component, pageProps }')
    const apolloClient = useApollo(pageProps.initialApolloState)
    return (
        <ApolloProvider client={apolloClient}>
            <Head>
                <title>Strapi todolist</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
            </Head>
            <ThemeProvider theme={darkTheme}>
                <Index {...pageProps}  />
            </ThemeProvider>
        </ApolloProvider>
    )
}