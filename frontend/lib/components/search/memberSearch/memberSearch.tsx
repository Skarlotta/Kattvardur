import fetcher from '../../../../fetcher';
import {GenericSearch} from '../genericSearch/genericSearch';
import {GenericSearchResult} from '../genericSearch/searchresults';
import {Member} from '../../../types';


const styleData = (member:Member) => {
    return <GenericSearchResult
        url={'/member/'+member.id+"/"}
        key={member.id}
        heading={member.person.name}
        subheading={member.person.ssn || ""}
        topString={(member.person.address||"Ekkert heimilisfang") + ", " + (member.person.city||"óþekkt borg") + ", " + (member.person.country||"Óþekkt land")}
        bottomString={(member.person.email||"Ekkert tölvupóstfang") + " - " + (member.person.phoneNumber||"Ekkert símanúmer")}
    />
}

export const MemberSearch = () => {
    return <GenericSearch
        title="Félagaleit"
        url="/api/v1/member/"
        styleData={styleData}
    />
}
