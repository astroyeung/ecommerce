import useSWR from "swr";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Link from "next/link";

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );
  if (!data) {
    return null;
  }
  if (error) {
    return <Error statusCode={404} />;
  }
  const { title, objectDate, classification, medium, primaryImageSmall } = data;
  return (
    <Card>
      <Card.Img
        variant="top"
        src={
          primaryImageSmall
            ? primaryImageSmall
            : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
        }
      />
      <Card.Body>
        <Card.Title>{title ?? "N/A"}</Card.Title>
        <Card.Text>
          <strong>Date: </strong>
          {objectDate ?? " N/A"}
          <br />
          <strong>Classification: </strong>
          {classification ?? " N/A"}
          <br />
          <strong>Medium: </strong>
          {medium ?? " N/A"}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="success">ID:{objectID}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
