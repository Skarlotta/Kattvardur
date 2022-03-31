import React from 'react';

export const node = (id, gender, data) => {
    return {
        id,
        gender,
        data,
        children:[]
    };
}

const NodeLayer = ({node, layer,  NodeComponent}) => <div style = {
        {'flexBasis': '100%',
        'textAlign': 'center',
        'alignSelf':'stretch'
        }
    }>

    <NodeComponent layer={layer} className={`_NodeComponent _NodeComponent${node.id}`} node={node}></NodeComponent>
    <div style={{'display':'flex'}}>
        {node.children.map(child => 
            <NodeLayer layer={layer + 1} node={child} parent={node} NodeComponent={NodeComponent}></NodeLayer>
        )}
    </div>
</div>;

export const TestingNode = (props) => {
    return <div className={props.className} style={{"width":"100%","text-align":"center","paddingLeft":"1em","paddingRight":"1em"}}>{props.node.data}</div>;
}

export const AncestorTree = ({root, NodeComponent}) => {
    return <NodeLayer layer={1} node={root} parent={root} NodeComponent={NodeComponent}>
        
    </NodeLayer>;
}