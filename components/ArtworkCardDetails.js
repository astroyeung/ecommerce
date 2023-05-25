import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function ArtworkCardDetails({ objectID }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  // Add a "showAdded" value to the state (this will control how the button (defined below) is displayed)
  // with a default value of true if the "favouritesList" includes the objectID (passed in "props") and false if it does not
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList]);

  async function favouritesClicked() {
    if (showAdded === true) {
      setShowAdded(false);
      setFavouritesList(await removeFromFavourites(objectID));
    } else {
      setShowAdded(true);
      setFavouritesList(await addToFavourites(objectID));
    }
  }

  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null
  );
  console.log(`data is ${data}`);
  if (!data) return null;
  if (error) return <Error statusCode={404} />;

  const {
    title,
    objectDate,
    classification,
    medium,
    artistDisplayName,
    artistWikidata_URL,
    creditLine,
    dimensions,
    primaryImage,
  } = data;

  return (
    <Card>
      <Card.Img variant="top" src={primaryImage ?? ""} />
      <Card.Body>
        <Card.Title>{title ?? " N/A"}</Card.Title>
        <Card.Text>
          <>
            <strong>Date: </strong>
            {objectDate ?? " N/A"}
            <br />
            <strong>Classification: </strong>
            {classification ?? " N/A"}
            <br />
            <strong>Medium: </strong>
            {medium ?? " N/A"}
            <br />
            <br />
            <strong>Artist:</strong>
            {artistDisplayName ?? " N/A"}
            {artistDisplayName && artistWikidata_URL && (
              <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                ( wiki )
              </a>
            )}
            <br />
            <strong>CreditLine: </strong>
            {creditLine ? creditLine : "N/A"}
            <br />
            <strong>Dimensions: </strong>
            {dimensions ? dimensions : "N/A"}
            <br />
            <br />
            <Button
              variant={showAdded ? "primary" : "outline-primary"}
              onClick={favouritesClicked}
            >
              {showAdded ? "+ Favourite (added)" : "+ Favourite"}
            </Button>
          </>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
