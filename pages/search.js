import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Row, InputGroup } from "react-bootstrap";

// generate a queryString that can be used for the "/artwork" route

import { useRouter } from "next/router";
import { addToHistory } from "@/lib/userData";

export default function Search() {

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  async function submitForm(data) {
    console.log(data);
    let queryString = "";

    let searchBy = data.searchBy ? `${data.searchBy}=true` : "";
    let geoLocation = data.geoLocation
      ? `&geoLocation=${data.geoLocation}`
      : "";
    let medium = data.medium ? `&medium=${data.medium}` : "";
    let isOnView = data.isOnView ? `&isOnView=true` : "";
    let isHighlight = data.isHighlight ? `&isHighlight=true` : "";
    let q = data.q ? `&q=${data.q}` : "";
    queryString = searchBy + geoLocation + medium + isOnView + isHighlight + q;

    console.log(`qString ${queryString}`);
    router.push(`/artwork?${queryString}`);
    //add to online DB
    setSearchHistory(await addToHistory(queryString))
      // current => [...current, queryString]);
  }

  const watchSearchBy = watch("searchBy");

  return (
    <>
      {/* debug : {watchSearchBy} */}
      <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <div>
                <Form.Label>Search Query</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  className={errors.q && "form-control is-invalid"}
                  {...register("q", { required: true })}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Label>Search By</Form.Label>
            <Form.Select {...register("searchBy")} className="mb-3">
              <option value="title">Title</option>
              <option value="tags">Tags</option>
              <option value="artistOrCulture">Artist or Culture</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Geo Location</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                {...register("geoLocation")}
              />
              <Form.Text className="text-muted">
                Case Sensitive String (ie &quot;Europe&quot;,
                &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;,
                &quot;New York&quot;, etc.), with multiple values separated by
                the | operator
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Medium</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                {...register("medium")}
              />
              <Form.Text className="text-muted">
                Case Sensitive String (ie: &quot;Ceramics&quot;,
                &quot;Furniture&quot;, &quot;Paintings&quot;,
                &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with
                multiple values separated by the | operator
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              id="isHighlight"
              inline
              {...register("isHighlight")}
            />
            <label htmlFor="isHighlight">Highlighted</label>
            <br />
            <Form.Check
              type="checkbox"
              id="isOnView"
              inline
              {...register("isOnView")}
            />
            <label htmlFor="isOnView">Currently on View</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <Button
              variant="primary"
              type="submit"
              disabled={Object.keys(errors).length > 0}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
