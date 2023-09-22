import React from "react";

export type SortableElement = {
    key : any,
    element : any
}

export function isSortableElement(element: any){
    return (typeof(element) === "object" && "key" in element && "element" in element);
  }