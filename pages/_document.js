import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const logo =
    "https://d3ml3b6vywsj0z.cloudfront.net/company_images/605db33b10fce904a76e825a_images.png";
  return (
    <Html lang="en">
      <Head>
        <title>AquaHouse Markham</title>{" "}
        <link rel="shortcut icon" href={logo} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
