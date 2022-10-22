import "../styles/globals.css";
// import { SessionProvider } from 'next-auth/react' // REQUIRED for UserAuth

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
  // UserAuth with NextAuth
  // return (
  //   <SessionProvider session={pageProps.session}>
  //     <Component {...pageProps} />
  //   </SessionProvider>
  // )
}

export default MyApp;
