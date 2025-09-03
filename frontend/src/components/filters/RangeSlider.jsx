import "./RangeSlider.css";
const RangeSlider = ({ priceMin, priceMax, setPriceMin, setPriceMax }) => {
  return (
    <>
      <div className="f-full mt-4">
        <div className="slider-container">
          <div className="progress-bar">
            <div className="bar"></div>
          </div>
          <div className="range-inputs pt-4">
            <input type="range" name="min-range" className="min-range" value={priceMin / 10} onChange={(e) => setPriceMin(e.target.value * 10)} />
            <input type="range" name="max-range" className="max-range" value={priceMax / 10} onChange={(e) => setPriceMax(e.target.value * 10)} />
          </div>
          <div className="value-inputs">
            <div className="value-input">
              <label htmlFor="min-value">Min</label><br />
              <input type="number" name="min-value" id="min-value" className="min-value" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} />
            </div>
            <div className="value-input">
              <label htmlFor="max-value">Max</label><br />
              <input type="number" name="max-value" id="max-value" className="max-value" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
            </div>
            <div className="go">
              <span>Go</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RangeSlider;