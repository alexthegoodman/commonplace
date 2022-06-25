import React, { useState, useEffect, createContext } from "react";

export const useRouterBack = (router) => {
  const goBack = () => {
    const backPath = router.query.backPath as string;

    if (typeof backPath !== "undefined") {
      router.push(backPath);
    } else {
      router.back();
    }
  };

  return {
    goBack,
  };
};
