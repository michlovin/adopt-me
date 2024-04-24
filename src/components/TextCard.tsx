import "./css/textcard.css";

export function TextCard() {
  return (
    <div className="text-card-wrapper">
      <div className="anim-wrapper">
        <div className="eyebrow">eyebrow</div>
        <div className="title">Title</div>
        <div className="subtext">Subtitle</div>
        <div className="text-field">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.{" "}
        </div>
        <div className="button-container">
          <button className="btn btn-success">Click</button>
          <button className="btn btn-success">Here</button>
        </div>
      </div>
    </div>
  );
}
