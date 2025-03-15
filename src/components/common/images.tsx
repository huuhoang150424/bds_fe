import React, { useState } from "react";

interface CustomImageProps {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  loading?: "lazy" | "eager";
  placeholder?: string; 
  onClick?: () => void; // Thêm sự kiện onClick
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  width = "",
  height = "",
  className = "",
  loading = "lazy",
  placeholder = "",
  onClick, // Nhận sự kiện onClick từ props
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={` ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        overflow: "hidden",
      }}
      onClick={onClick} // Gán sự kiện onClick vào div chứa ảnh
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
        className={`transition-opacity duration-500 z-[-1] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default CustomImage;
