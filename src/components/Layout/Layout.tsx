import Head from "next/head";
import Header from "../Navbar/Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Blog Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <>{children}</>
    </>
  );
};

export default Layout;
