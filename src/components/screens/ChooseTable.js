import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { countOrderByTable } from '../../helpers/helpers';
import store from '../../redux/store/store'; 
const tables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class ChooseTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { orders } = store.getState().collectionReducer;
        return (
           <div className="table-wrapper">
                <h1 className="screen-title">Chọn Bàn</h1>
                <div className="tables">
                    {
                        tables.map(item => (
                            <NavLink to={`/dat-mon/${item}`} key={item} className="table-link">{item}
                                {
                                    countOrderByTable(orders, item) ? <em>{countOrderByTable(orders, item)} tô</em> : ''
                                }
                            </NavLink>
                        ))
                    }
                </div>
           </div>
        )
    }
}

export default ChooseTable;