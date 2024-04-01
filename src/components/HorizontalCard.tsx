import Animal from "./animal2.jpg";

export function HorizontialCard() {
  return (
    <div className="horizontialcardcontainer">
      <div className="card">
        <img src="{Animal}" alt="image"></img>
        <div className="title">Title</div>
        <div className="subtext">Subtitle</div>
        <div className="textfield">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.{" "}
        </div>
      </div>
    </div>
  );
}
