import { Row, Col, Image } from "react-bootstrap";
import "./css/footer.css";

export function Footer() {
  return (
    <Row md={1}>
      <div className="footer-container">
        <Col>{/* <Image> </Image> */}</Col>
        <Col>
          <p>FOOTER HERE </p>
        </Col>
        <Col>
          <p>FOOTER HERE </p>
        </Col>
        <Col>
          <p>FOOTER HERE </p>
        </Col>
        <Col>
          <p>FOOTER HERE </p>
        </Col>
      </div>
    </Row>
  );
}
