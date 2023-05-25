import { useRouter } from "next/router";
import ArtworkCardDetails from "@/components/ArtworkCardDetails";
import { Row, Col } from "react-bootstrap";

export default function ObjectID() {
  const router = useRouter();
  const { objectID } = router.query;
  return (
    <Row>
      <Col>
        <ArtworkCardDetails objectID={objectID} />
      </Col>
    </Row>
  );
}
