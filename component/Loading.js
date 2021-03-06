import React from 'react';
import Image from "next/image";
import loading from "../public/asset/img/loading.gif";
const Loading = () => {
  return (
    <>
      <div style={{ width: "100%", height: "100%", position: "fixed", top: '0px', left: '0px', right: '0px', backdropFilter: 'blur(3px)', backgroundColor: "transparent", zIndex: "100" }}>
        <Image
          alt="Mountains"
          src={loading}
          layout="fill"
          objectFit="none"
          style={{ width: "200px", height: "auto" }}
        />
      </div>
    </>
  );
};

export default Loading;