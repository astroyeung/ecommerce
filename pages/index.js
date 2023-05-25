import Image from "react-bootstrap/Image";
import { Inter } from "@next/font/google";
import { Col, Row } from "react-bootstrap";

export default function Home() {
  const IMG1 = "https://www.adana.co.jp/wp-content/uploads/sites/3/2023/05/nitg_aj331_img_ogp.jpg";
  const IMG2 =
    "https://cdn.britannica.com/29/121829-050-911F77EC/freshwater-aquarium.jpg";
  const IMG3 =
    "https://cdn.britannica.com/29/121829-050-911F77EC/freshwater-aquarium.jpg";
  const IMG4 =
    "https://cdn.britannica.com/29/121829-050-911F77EC/freshwater-aquarium.jpg";
  const IMG5 =
    "https://cdn.britannica.com/29/121829-050-911F77EC/freshwater-aquarium.jpg";
  const IMG6 =
    "https://cdn.britannica.com/29/121829-050-911F77EC/freshwater-aquarium.jpg";

  const portfolioList = [
    {
      title: "portfolio1",
      githubURL: "www",
      demoURL: "demo",
      img: IMG1,
    },
    {
      title: "portfolio2",
      githubURL: "www",
      demoURL: "demo",
      img: IMG2,
    },
    {
      title: "portfolio3",
      githubURL: "www",
      demoURL: "demo",
      img: IMG3,
    },
    {
      title: "portfolio4",
      githubURL: "www",
      demoURL: "demo",
      img: IMG4,
    },
    {
      title: "portfolio5",
      githubURL: "www",
      demoURL: "demo",
      img: IMG5,
    },
  ];

  function showPorfolio(portfolioList) {
    return (
      <>
        {portfolioList.map(({ title, img, githubURL, demoURL }, index) => (
          <article className="portfolio__items">
            <img
              src={img}
              alt={title}
              className="portfolio__items-image"
              key={index}
              height="200"
            />
            <h3>{title}</h3>
            <div className="portfolio__item-cta">
              <a href={githubURL} className="btn">
                Github
              </a>
              <a href={demoURL} className="btn btn-primary" target="_blank">
                Live Demo
              </a>
            </div>
          </article>
        ))}
      </>
    );
  }

  return (
    <>
      <Image
        src="https://cdn.britannica.com/29/121829-050-911F77EC/freshwater-aquarium.jpg"
        rounded
        fluid
      />
      <br />
      <br />
      <Row>
        <Col md={6}>
          An aquarium is a vivarium of any size having at least one transparent
          side in which aquatic plants or animals are kept and displayed.
          Fishkeepers use aquaria to keep fish, invertebrates, amphibians,
          aquatic reptiles, such as turtles, and aquatic plants.
        </Col>
        <Col md={6}>
          <strong>Simon and Fai</strong> started their business in 1997 on the
          first floor of Market Village. What started as a hobby, grew in to a
          passion to make owning an aquarium easy and fun for everyone. Today,
          Simon and Fai are highly knowledgeable partners whom are here to help
          you fulfill your home aquarium needs.
          <br />
          <br />
          <a
            href="https://www.google.com/search?q=aquarium&rlz=1C5CHFA_enGB519GB519&sxsrf=APwXEddmQm0mNOB9GvSPZNemBjMK9fYIGQ:1684955085381&tbm=isch&source=iu&ictx=1&vet=1&fir=cNlO3P8jUHOQVM%252Cp33frWLgC6EQkM%252C%252Fm%252F0149r%253BZdPTRccXXFos2M%252ChINvslAPOT2DAM%252C_%253BIYv-jDzHKqrIaM%252C-j6p6E8KdGBpvM%252C_%253BLlJXnonvTs2_7M%252CHUDnKpu0UxQzyM%252C_%253BAKf1ImIDugUsgM%252CV25iyid_Y7twYM%252C_&usg=AI4_-kSl8uTfaaPm4w4VmUJ9-S2aHNKqXQ&sa=X&ved=2ahUKEwihk87q0o7_AhWul4kEHQlKBfcQ_B16BAhtEAE#imgrc=cNlO3P8jUHOQVM"
            target="_blank"
            rel="noreferrer"
          >
            Aquarium Photo
          </a>
          <a href="http://localhost:3000/artwork/247016">sample art</a>
        </Col>
      </Row>
      <section className="portfolio">
        <h5>My Recent Work</h5>
        <h2>Portfolio</h2>
        <div className="container portfolio__container">
          {showPorfolio(portfolioList)}
        </div>
      </section>
    </>
  );
}
