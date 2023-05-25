/*********************************************************************************
 * WEB422 – Assignment 5 * I declare that this assignment is my own work in accordance
 * with Seneca Academic Policy. * No part of this assignment has been copied manually
 * or electronically from any other source * (including web sites) or distributed
 * to other students.
 *
 * Name: ___Chun Yin YANG__ Student ID: _150995215__ Date: __20-Mar-2023_
 *
 * ********************************************************************************/
import validObjectIDList from "@/public/data/validObjectIDList.json";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row, Col, Pagination, Card } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Index() {
  const PER_PAGE = 12;
  const [artworkList, setArtworkList] = useState([]);
  const [page, setPage] = useState(1);

  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  function previousPage() {
    if (page > 1) setPage((x) => x - 1);
  }
  function nextPage() {
    if (page < artworkList.length) setPage((x) => x + 1);
  }

  useEffect(() => {
    if (data) {
      let results = [];
      //filtering valid result with the validObjectIDList
      let filteredResults = validObjectIDList.objectIDs.filter((x) =>
        data.objectIDs?.includes(x)
      );
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  if (error) return <Error statusCode={404} />;
  else if (!artworkList) return null;
  else if (artworkList.length == 0)
    return (
      <>
        <Card>
          <Card.Body>
            <Card.Title>Nothing Here</Card.Title>
            <Card.Text>Try searching for something else.</Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  // loop through all of the values in the artworkList[page - 1] array
  //   (ie: all of the objectID values for the current page)
  else if (artworkList.length > 0) {
    return (
      <>
        <Row className="gy-4">
          {artworkList[page - 1].map((data, index) => (
            <Col lg={3} key={data}>
              <ArtworkCard objectID={data} />
            </Col>
          ))}
        </Row>
        <br />
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      </>
    );
  }
}
