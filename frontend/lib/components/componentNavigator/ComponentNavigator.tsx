import React, { useState } from "react";
import { Navbar } from "./Navbar/Navbar";

interface ComponentNavigatorProps {
    items : string[],
    pages : ((props : any) => JSX.Element)[],
    props? : any
}
export const ComponentNavigator = ({items, pages, props} : ComponentNavigatorProps) => {
    const [page, setPage] = useState<number>(0);
    const SelectedComponent = pages[page];

    return <>
        <Navbar items={items} page={page} setPage={setPage}/>
        <div>
            <SelectedComponent {...props} />
        </div>
    </>
}