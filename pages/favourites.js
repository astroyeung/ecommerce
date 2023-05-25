import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Card, Col, Row } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  if (!favouritesList) return null

  if (favouritesList.length == 0)
    return (
      <>
        <Card>
          <Card.Body>
            <Card.Title>Nothing Here</Card.Title>
            <Card.Text>Try adding some new artwork to the list.</Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  else if (favouritesList.length > 0) {
    return (
      <>
        <Row className="gy-4">
          {favouritesList.map((data, index) => (
            <Col lg={3} key={data}>
              <ArtworkCard objectID={data} />
            </Col>
          ))}
        </Row>
      </>
    );
  }
}
