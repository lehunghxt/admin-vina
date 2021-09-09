import React, { useState } from "react";
import PropTypes from "prop-types";
import { LoadingContext } from "../context/loading";
import Image from "next/image";
import loading from "../public/asset/img/loading.gif";
function Loading() {
  return (
    <>
      <div style={{ width: "100%", height: "100%", position: "absolute", backgroundColor: "transparent",zIndex: "100" }}>
            <Image
            alt="Mountains"
            src={loading}
            layout="fill"
            objectFit="none"
            style={{width:"200px", height:"auto"}}
            />
      </div>
    </>
  );
}
export default function LoadingProvider(props) {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider
      value={{
        loading: loading,
        show: () => setLoading(true),
        hide: () => setLoading(false),
      }}
    >
      <>
        {loading && <Loading />}
        {props.children}
      </>
    </LoadingContext.Provider>
  );
}
LoadingProvider.propTypes = {
  children: PropTypes.node,
};
