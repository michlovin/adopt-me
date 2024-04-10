import banner from "./assets/pawsbanner.jpeg";

export function FullWidthImageBanner() {
  return (
    <div className="text-card-wrapper">
      <img src={banner} alt="image"></img>
    </div>
  );
}
