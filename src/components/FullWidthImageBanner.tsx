import banner from "./assets/pawsbanner.jpeg";
import "../components/css/fullwidthbanner.css";

export function FullWidthImageBanner() {
  return (
    <>
      <div id="container">
        <div className="scroll">
          <div className="item">
            <img src={banner} alt="image"></img>
            <img src={banner} alt="image"></img>
            <img src={banner} alt="image"></img>
            <img src={banner} alt="image"></img>
            <img src={banner} alt="image"></img>
            <img src={banner} alt="image"></img>
            <img src={banner} alt="image"></img>
            <img src={banner} alt="image"></img>
          </div>
        </div>
        <div className="fade"></div>
      </div>
    </>
  );
}
