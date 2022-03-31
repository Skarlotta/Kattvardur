import React from 'react';
import {node, AncestorTree,} from '../../misc/FamilyTree';
import urls from '../../../../Site_code/urls';
import {Link} from 'react-router-dom';
import '../../../css/show.css';


const processAncestors = (root, gender) => {
    if(!root){
        return null;
    }
    let kid = node(root.id, gender, root);
    let dam = processAncestors(root.dam, "female");
    let sire = processAncestors(root.sire,"male");
    if(dam){
        kid.children.push(dam);
    }
    if(sire){
        kid.children.push(sire);
    }
    return kid;
}

const countAdditionalAncestors =(node)=>{
    console.log(node);
    if(node){
        return 1 + countAdditionalAncestors(node.sire) + countAdditionalAncestors(node.dam);
    }
    return 0;
}

const CatNode = ({node, layer}) => {
    var fontSize = 0.9;
    let split, rest;
    split = null;
    rest = null;
    
    if(layer > 3){
        split = <br></br>
    }
    if(layer <= 4){
        rest =  <span><i>{node.data.registry}</i><br></br>
        <i>{node.data.birthdate}</i></span>;
    }
    if(layer == 5){
        let anc = countAdditionalAncestors(node.data);
        if(anc > 1){
            return <div style={{ 'font-size':fontSize+'em', 'backgroundColor':node.gender === "male" ? "#E6FBFF":"#FFE6E6", 'border':'1px solid black'}}>
            <Link to={urls.MAKECATPROFILE(node.data.id)}><b>+{countAdditionalAncestors(node.data) }</b></Link></div>;
        }
    ;
    }
    if(layer > 5){
        return null;
    }

    while(layer > 3){
        layer--;
        fontSize *= 0.75;
    }
    return <div style={{ 'font-size':fontSize+'em', 'backgroundColor':node.gender === "male" ? "#E6FBFF":"#FFE6E6", 'border':'1px solid black'}}>
        <Link to={urls.MAKECATPROFILE(node.data.id)}>
            <b>{node.data.name}</b>&#8203; {split} <i>({node.data.ems})</i>
        <br/>
        {rest}
        </Link>
    </div>;
}


const CatTree = ({root}) => <AncestorTree root={processAncestors(root, root.isMale ? "male":"female")} NodeComponent={CatNode}></AncestorTree>;

export default CatTree;