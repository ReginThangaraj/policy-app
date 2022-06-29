import React from "react";
import "./IconButton.scss";

type IconButtonProps = {
  src: any;
  className?: string;
  onClick: () => void;
};

const IconButton: React.FC<IconButtonProps> = ({
  src,
  className = "",
  onClick,
}) => {
  const Icon = src;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`icon-button ${className}`}
    >
      <Icon />
    </button>
  );
};

export default IconButton;
