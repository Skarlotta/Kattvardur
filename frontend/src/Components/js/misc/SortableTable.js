import React, {Component} from 'react';

const SortableHeading = ({i, arrowDirection, className, children, onClick}) => {
    let arrow = (arrowDirection === 1) ? "▼" : (arrowDirection === -1 ) ? "▲" : null;
    return <th index={i} onClick={onClick} className={className}>
        {children} {arrow}
    </th>
};


class SortableTable extends Component{
    constructor(p){
        super(p);
        this.state = {
            sortingField:this.props.defaultSortingField || 0,
            sortingDirection: 1,
            defaultSort:true
        }
    }
    
    // Set default props
    getDefaultProps() {
        return {
            invisibleColumns:[]
        };
    }

    render(){
        let kids = React.Children.toArray(this.props.children)
        let headers = this.props.headers.map((row,ind) => {
            if(this.props.invisibleColumns.indexOf(ind) !== -1){
                return null;
            }
            return React.cloneElement(row,
            {
                i: ind,
                onClick: (e) => {
                    let sortingField, sortingDirection, defaultSort;
                    sortingField = ind;

                    defaultSort = false;

                    if(this.state.defaultSort){
                        sortingDirection = 1;
                    } else{
                        if(this.state.sortingDirection === 1){
                            sortingDirection = -1;
                        } else{
                            defaultSort = true;
                            sortingField = this.props.defaultSortingField || 0;
                            sortingDirection = 1;
                        }
                    }
                    this.setState({
                        sortingField,
                        sortingDirection, 
                        defaultSort
                    })
                },
                arrowDirection: (this.state.defaultSort || this.state.sortingField !== ind) ? 0 : this.state.sortingDirection
            }) 
        });
        let rows = this.props.rows

        rows.sort((a,b) => {
            if(a[this.state.sortingField] > b[this.state.sortingField]){
                return 1 * this.state.sortingDirection;
            } else{
                return 1 * -this.state.sortingDirection;

            }
        })

        rows = rows.map((x,ind) =>  <tr key={ind}>
                {x.map((y,ind) => {
                    if(this.props.invisibleColumns.indexOf(ind) !== -1){
                        return null;
                    }
                    return <td>{y}</td>;
                })}
            </tr>
        );
        



        return <table className={this.props.className}>
            <thead>
                <tr>
                    {headers}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    }
}

export default SortableTable;
export {SortableTable, SortableHeading}