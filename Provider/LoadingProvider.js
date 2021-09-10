import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Loading from '../component/Loading';

export const LoadingContext = React.createContext();
export const useLoading = () => useContext(LoadingContext);

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
