function BubbleBtn({ label, subtext, size, onClick, isActive, disabled }) {
  return (
    <button
      className={`bubble-btn ${size} ${isActive ? "active" : ""} ${
        disabled ? "disabled" : ""
      }`}
      onClick={onClick}
      disabled={disabled}>
      {label} {subtext && <span>{subtext}</span>}
    </button>
  );
}

export default BubbleBtn;
