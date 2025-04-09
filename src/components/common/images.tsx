import React, { useState } from "react";

interface CustomImageProps {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  loading?: "lazy" | "eager";
  placeholder?: string; 
  onClick?: () => void; 
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  width = "",
  height = "",
  className = "",
  loading = "lazy",
  placeholder = "",
  onClick,
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        overflow: "hidden",
      }}
      onClick={onClick}
    >
      {!loaded && placeholder && (
        <div
          className="absolute inset-0"
          style={{
            background: placeholder.startsWith("#")
              ? placeholder
              : `url(${placeholder})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={`w-full h-full transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};


export default CustomImage;
