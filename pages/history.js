import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import { Button, Card, ListGroup } from "react-bootstrap";
// import { favouritesAtom } from "@/store";

import styles from "@/styles/History.module.css";
import { removeFromHistory } from "@/lib/userData";

export default function History() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  let parsedHistory = [];
  if (!searchHistory) return null;

  // loop through the "searchHistory" list to generate a list of "parsed" search queries
  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
    console.log(`searchHistory.length ${searchHistory.length}`)
  });

  function historyClicked(e, index) {
    //navigator
    router.push(`/artwork?${searchHistory[index]}`);
  }
  async function removeHistoryClicked(e, index) {
    e.stopPropagation(); // stop the event from trigging other events
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  }

  if (parsedHistory.length === 0)
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Nothing Here</Card.Title>
          <Card.Text>Try searching for some artwork</Card.Text>
        </Card.Body>
      </Card>
    );

  if (parsedHistory.length > 0)
    return (
      <ListGroup>
        {parsedHistory.map((parsedHistory, index) => (
          <ListGroup.Item
            className={styles.historyListItem}
            onClick={(e) => historyClicked(e, index)}
          >
            {Object.keys(parsedHistory).map((key) => (
              <>
                {key}: <strong>{parsedHistory[key]}</strong>&nbsp;
              </>
            ))}
            <Button
              className="float-end"
              variant="danger"
              size="sm"
              onClick={(e) => removeHistoryClicked(e, index)}
            >
              &times;
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
}
