import React from "react";

const Loader = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlns="http://www.w3.org/1999/xlink"
        version="1.0"
        width="64px"
        height="64px"
        viewBox="0 0 128 128"
        xml="preserve"
        className="m-auto mt-5"
      >
        <rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF" />
        <g>
          <path
            fill="#000000"
            d="M109.25 55.5h-36l12-12a29.54 29.54 0 0 0-49.53 12H18.75A46.04 46.04 0 0 1 96.9 31.84l12.35-12.34v36zm-90.5 17h36l-12 12a29.54 29.54 0 0 0 49.53-12h16.97A46.04 46.04 0 0 1 31.1 96.16L18.74 108.5v-36z"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 64 64"
            to="360 64 64"
            dur="960ms"
            repeatCount="indefinite"
          ></animateTransform>
        </g>
      </svg>
    </>
  );
};

export default Loader;
