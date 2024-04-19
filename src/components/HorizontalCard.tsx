import { Col, Row } from "react-bootstrap";
import Animal from "./animal2.jpg";
import "./css/horizontialcard.css";

export function HorizontialCard() {
  return (
    <Row lg={2} className="horzontial-container">
      <Col md={4}>
        <div className="image-container">
          <img
            src="https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F31cd9f59-3c4a-4159-a46c-b93e2c502b6b.jpg?crop=2916%2C2825%2C0%2C451&resize=412"
            alt="image"
            width="250rem"
            height="250rem"
          ></img>
        </div>
      </Col>
      <Col>
        <div className="anim-wrapper">
          <div className="content">
            <div className="title">Title</div>
            <div className="subtext">Subtitle</div>
            <div className="text-field">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.{" "}
            </div>
            <div className="button-container">
              <button className="btn btn-success">Click</button>
              <button className="btn btn-success">Here</button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
