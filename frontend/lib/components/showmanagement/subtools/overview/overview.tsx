import React, { useEffect, useState } from "react";
import { Entry, Show, ShowOverview } from "../../../../types";
import { ShowManager } from "../../../../models/Show";
import { SortableTable } from "../../../blocks/Tables/SortableTable/SortableTable";
import Style from '../../style.module.css';
import { Boxtable } from "../../../blocks/Tables/Boxtable/Boxtable";

interface P {
    show : Show
    entries : Entry[]
}

const entryFilterFactory = (entries : Entry[]) => (id : string) => {
    const entry = entries.find((e) => e.id === id);
    if(entry){
        return ({
            catalog_nr : entry?.catalog_nr,
            ems : entry?.cat_model.colors[0]?.ems,
            judge_name : entry?.judge_name || ""
        });
    } else {
        return undefined;
    }
}

export const Overview = ({show, entries} : P) => {
    const [overview, setOverview] = useState<ShowOverview>();
    useEffect(() => {
        ShowManager.overview(show.id).then(overview => {
            setOverview(overview);
        });
    }, [show]);

    const headings = ["Sýninganúmer", "EMS", "Dómari", "Dæmdur"];
    const column_keys = ["catalog_nr", "ems", "judge_name", "status"];
    const idToEntry = entryFilterFactory(entries);


    if(!overview){
        return <div>
            <p>hleð...</p>
        </div>
    } else{
        const judged = overview.judged?.map(idToEntry).filter(e => e !== undefined).map(e => ({...e, status : "Já"}));
        const abs = overview.abs?.map(idToEntry).filter(e => e !== undefined).map(e => ({...e, status : "Abs"}));
        const unjudged = overview.unjudged?.map(idToEntry).filter(e => e !== undefined).map(e => ({...e, status : " Nei"}));
        const all = judged.concat(abs).concat(unjudged);
        const sorter = (a : string | undefined,b : string  | undefined) => parseInt( a || "0" ) - parseInt( b || "0" );

        return <div className={Style.floatTables}>
            <Boxtable title="Ódæmdir" items={unjudged.map(m => m.catalog_nr).sort(sorter)}/>
            <Boxtable title="Dæmdir/Abs" items={abs.concat(judged).map(m => m.catalog_nr).sort(sorter)}/>
        </div>
    }
}