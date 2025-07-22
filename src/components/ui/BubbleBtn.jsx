function BubbleBtn({
  label,
  subtext,
  size,
  onClick,
  isActive,
  disabled,
  faded,
}) {
  return (
    <button
      className={`bubble-btn ${size} ${isActive ? "active" : ""} ${
        disabled ? "disabled" : ""
      } ${faded ? "faded" : ""}`}
      onClick={onClick}
      disabled={disabled}>
      {label} {subtext && <span>{subtext}</span>}
    </button>
  );
}

export default BubbleBtn;
