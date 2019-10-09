import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom'
import addOrder from '../../redux/actions/AddOrderAction';
import updateOrder from '../../redux/actions/UpdateOrderAction';
import removeOrder from '../../redux/actions/RemoveOrderAction';
import saveOrder from '../../redux/actions/SaveOrderAction';
import {connect} from 'react-redux';
import update from 'react-addons-update';
import axios from 'axios';

const phoData = {
    loai_pho: [
        {
            id: 'tai',
            value: 'Tái'
        },
        {
            id: 'chin',
            value: 'Chín'
        },
        {
            id: 'nam',
            value: 'Nạm'
        },
        {
            id: 'gau',
            value: 'Gầu'
        },
        {
            id: 'gan',
            value: 'Gân'
        },
        {
            id: 'bap',
            value: 'Bắp'
        },
        {
            id: 'bam',
            value: 'Bằm'
        },
        {
            id: 'nhu',
            value: 'Nhừ'
        },
        {
            id: 'du_thu',
            value: 'Đủ Thứ'
        },
    ],
    loai_to: [
        {
            id: 'nho',
            value: 'Nhỏ',
        },
        {
            id: 'lon',
            value: 'Lớn',
        },
        {
            id: 'xe_lua',
            value: 'Xe Lửa',
        },
        {
            id: 'chen',
            value: 'Chén',
        },
    ],
    banh_pho: [
        {
            id: 'binh_thuong',
            value: 'Bình Thường',
        },
        {
            id: 'it_banh',
            value: 'Ít Bánh',
        },
        {
            id: 'nhieu_banh',
            value: 'Nhiều Bánh',
        },
    ],
    yeu_cau_dac_biet: [
        {
            id: 'khong_hanh',
            value: 'Không Hành',
        },
        {
            id: 'bo_hop',
            value: 'Hộp',
        },
        {
            id: 'nuoc_nong',
            value: 'Nước Nóng',
        },
        {
            id: 'nhieu_nuoc',
            value: 'Nhiều Nước',
        },
    ],
    mon_an_kem: [
       {
            id: 'hot_ga',
            value: 'Hột Gà',
       },
       {
            id: 'nuoc_tiet',
            value: 'Nước Tiết',
        },
       {
        id: 'nuoc_tiet_hot_ga',
        value: 'Nước Tiết Hột Gà',
        },
        {
            id: 'tiet_tuy',
            value: 'Nước Tiết Tủy',
        },
        {
            id: 'tiet_tuy_hot_ga',
            value: 'Tiết Tủy Hột Gà',
        },
        {
            id: 'tuy_bo',
            value: 'Tủy Bò',
        },
        {
            id: 'chen_banh',
            value: 'Chén Bánh',
        },
    ],
    mon_mang_di: [
        {
             id: 'lap_xuong',
             value: 'Lạp Xưởng',
        },
        {
             id: 'kho_ga',
             value: 'Khô Gà',
         },
        {
         id: 'cha_gio',
         value: 'Chả Giò',
         },
         {
             id: 'banh_gai',
             value: 'Bánh Gai',
         },
         {
             id: 'yaua',
             value: 'Yaua',
         },
         {
             id: 'tuong_bac',
             value: 'Tương Bắc',
         },
     ],
};


class MainDisks extends  Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlerSpinner = this.handlerSpinner.bind(this);
        this.handlerOrder = this.handlerOrder.bind(this);
        this.editOrder = this.editOrder.bind(this);
        this.removeOrder = this.removeOrder.bind(this);
        this.handleTabOpen = this.handleTabOpen.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);

        this.state = {
            //form data state
            frmData: {
                loai_pho: [],
                loai_to: '',
                banh_pho: '',
                yeu_cau: [],
                ghi_chu: '',
                is_an_tai_cho: '',
                mon_an_kem: {
                    hot_ga: 0,
                    nuoc_tiet: 0,
                    nuoc_tiet_hot_ga: 0,
                    tiet_tuy: 0,
                    tiet_tuy_hot_ga: 0,
                    tuy_bo: 0,
                    chen_banh: 0,
                },
                mon_mang_di:{
                    lap_xuong: 0,
                    cha_gio: 0,
                    kho_ga: 0,
                    banh_gai: 0,
                    yaua: 0,
                    tuong_bac: 0
                },
                so_luong_to: 1,
                ma_ban: this.props.match.params.maban,
                orderid: ''
           },
            //screen state
            active_tab : 'mon-chinh',
            is_edit : false,
            notification : '',
            is_busy: false,
        };

        this.baseState = this.state;
    }

    handleInputChange(e){
        const target = e.target;
        const name = target.name;
        const {frmData} = JSON.parse(JSON.stringify(this.state));
        if(name === 'loai_pho' || name ==='yeu_cau'){
            switch (name) {
                case 'loai_pho':
                    {
                        const {loai_pho} = frmData;
                        if(target.checked && loai_pho.indexOf(target.value) < 0){
                            loai_pho.push(target.value);
                        }else{
                            loai_pho.splice(loai_pho.indexOf(target.value), 1);
                        }
                        frmData.loai_pho = loai_pho;
                        break;
                    }
                case 'yeu_cau':
                    {
                        const {yeu_cau} = frmData;
                        if(target.checked && yeu_cau.indexOf(target.value) < 0){
                            yeu_cau.push(target.value);
                        }else{
                            yeu_cau.splice(yeu_cau.indexOf(target.value), 1);
                        }
                        break;
                    }
                default:
                    break;
            }
        }else{
            frmData[e.target.name] = e.target.value;
        }

        this.setState({
            frmData
        });
    }

    componentDidMount() {
        const {maban} = this.props.match.params;
      
        if(maban){
            return <Redirect to='/' />
        }
    }

    handlerSpinner(e){
        e.preventDefault();
        const {frmData} = JSON.parse(JSON.stringify(this.state));
        const target = e.target;
        const { dir, statename, parentstate } = target.dataset;
        let soLuongOnState = 1;

        if(statename === 'so_luong_to'){
            soLuongOnState = (Number(frmData.so_luong_to) === 'NaN') ? 1 : Number(frmData.so_luong_to);
        }else{
            soLuongOnState = (Number(frmData[parentstate][statename]) === 'NaN') ? 0 : Number(frmData[parentstate][statename]);
        }
      
        switch (dir) {
            case 'giam':
                soLuongOnState--;
                break;
            case 'tang':
                soLuongOnState++;
                break;
            default:
                break;
        }
       
        if(statename === 'so_luong_to'){
            if(soLuongOnState < 1)  soLuongOnState = 1;
        }else{
            if(soLuongOnState < 0)  soLuongOnState = 0;
        }
        
        if(statename === 'so_luong_to'){
            frmData.so_luong_to = soLuongOnState;
        }else{
            frmData[parentstate][statename] = soLuongOnState;
        }
       
        this.setState({
            frmData
        });
    }

    handlerSubmit(e){
        //save order submit
        e.preventDefault();
        let {orders} = this.props.colletionsReducer;
        const {ma_ban} = this.state.frmData;
        if(orders.length && ma_ban){
            this.setState({
                is_busy: true
            });
            const filtered = orders.filter(item => item.ma_ban === ma_ban);
            const url = `https://jsonplaceholder.typicode.com/posts`;
            axios.post(url, filtered)
                .then(response => {
                    console.log(response);
                    this.props.saveOrder(filtered);
                    this.setState(this.baseState);
                    alert('Thêm Đơn Hàng Thành Công');
                })
                .catch(e => console.log(e))
                .finally(() => this.setState({is_busy: false}));
        }
    }

    handlerOrder(e){
        e.preventDefault();
        if(!this.state.is_edit){
            const frmData = update(this.state.frmData, 
                {
                    orderid : {$set: new Date().getTime()}
                });
            this.props.addOrder(frmData);
        }else{
            this.props.updateOrder(this.state.frmData);
            this.setState({
                notification: 'Cập Nhật Thành công'
            });
    
            setTimeout(() => {
                this.setState({
                    notification: ''
                });
            }, 3000);
        }
    }

    editOrder(e){
        e.preventDefault();
       
        const id = e.target.id;
        let {orders} = this.props.colletionsReducer; 

        this.setState({
            is_edit: true
        });
    
        const orderEdit = orders.find(item => item.orderid.toString() === id);

        this.setState({
            frmData: orderEdit
        });
    }

    removeOrder(e){
        e.preventDefault()
        const orderid = e.target.id;
    
        this.setState({
            is_edit: true
        });
        
        this.props.removeOrder({ orderid });
        this.setState(this.baseState);
    }

    handleTabOpen(e){
        e.preventDefault();
        const target = e.target.dataset.target;
        const $tab = document.getElementById(target);
        const $sibs = $tab.parentNode.childNodes;

        document.querySelectorAll('.tab-heading .tab-title').forEach(item => {
            item.classList.remove('open');
        });

        e.target.classList.add('open');

        $sibs.forEach($item => {
            if($item.id !== e.target.id){
                $item.classList.remove('open');
            }
        });

        this.setState({
            active_tab: $tab.id
        });

        $tab.classList.add('open');
    }

    handleReset(e){
        e.preventDefault();
        this.setState(this.baseState);
    }

    renderOrder(order){
        const {loai_pho, loai_to, banh_pho, yeu_cau, mon_an_kem, mon_mang_di} = order;
        let monAnKemHTML = '', monMangDiHTML = '';

        Object.entries(mon_an_kem).forEach(entry => {
            if(entry[1] > 0){
                const val = phoData.mon_an_kem.find(item => entry[0] === item.id);
                monAnKemHTML += `${val.value} ${entry[1]} `; 
            }
        });

        Object.entries(mon_mang_di).forEach(entry => {
            if(entry[1] > 0){
                const val = phoData.mon_mang_di.find(item => entry[0] === item.id);
                monMangDiHTML += `${val.value} ${entry[1]} `; 
            }
        });

        //if(monAnKemHTML)     monAnKemHTML.trim().replace(' ', ',');
        //if(monMangDiHTML)    monMangDiHTML.trim().replace(' ', ',');
        
        return(
            <div className="order-ele">
                <div className="summary-order">
                    {
                        loai_pho.length > 0 ?
                            loai_pho.map((val, index) => (
                                <span key={index}>
                                    {val}&nbsp;
                                </span>
                            )) : ''
                    }
                    <span>{loai_to}&nbsp;</span>
                    <span>{banh_pho}&nbsp;</span>
                    {
                        yeu_cau.length > 0 ?
                            yeu_cau.map((val, index) => (
                                <span key={index}>
                                    {val}&nbsp;
                                </span>
                            )) : ''
                    }
                    <span> {monAnKemHTML ? ' ' + monAnKemHTML : ''}</span>
                    <span> {monMangDiHTML ? ' ' + monMangDiHTML : ''}</span>
                </div>
                <div className="edit-buttons">
                    <a href="#" onClick={this.editOrder} id={order.orderid} className="button edit">Chỉnh sửa</a>
                    <a href="#" onClick={this.removeOrder} id={order.orderid} className="button remmove">Xóa</a>
                </div>
            </div>
        )
    }

    render() {
        const { loai_pho, loai_to, banh_pho, yeu_cau_dac_biet, mon_an_kem, mon_mang_di } = phoData;
        let {orders} = this.props.colletionsReducer;
        const orderByMaBan = orders.filter(item => item.ma_ban.toString() === this.state.frmData.ma_ban);
        const _self = this;

        return (
            <div className={this.state.is_busy ? "main-screen busy" : "mainscreen"} >
                <form className="pick-food frm" id="main-disk-htmlForm" action="" method="post" onSubmit={this.handlerSubmit}>
                    <div className="screen-top">
                        <NavLink className="link" to='/'>Quay Lại màn hình chọn bàn</NavLink>
                        {
                            this.state.is_edit ? <h1 className="screen-title">Chỉnh Sửa </h1> : <h1 className="screen-title">Chọn món (bàn {this.state.frmData.ma_ban})</h1>
                        }
                    </div>
                    {
                    orderByMaBan.length ? 
                    <div className="order-wrapper">
                        <h1>Món đã gọi</h1>
                        <ul className="orders-list">
                            {
                                orderByMaBan.map((item, index) => (
                                    <li key={index} data-maban={item.ma_ban}>
                                        <div className="ordered-number">{item.so_luong_to} Tô {item.is_an_tai_cho}:&nbsp;</div>
                                        {
                                            _self.renderOrder(item)
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                        <div className="invoice">
                            {
                                (!this.state.is_edit && orders.length) ? <input type="submit" value="Tạo Đơn" className="button primary"/> : ''
                            }
                        </div>
                        <hr/>
                    </div>
                    : ''
                }
                    <div className="tab-heading">
                        <a href="#" onClick={this.handleTabOpen} data-target="mon-chinh" className="tab-title open">phở</a>
                        <a href="#" onClick={this.handleTabOpen} data-target="mon-an-kem" className="tab-title">Món ăn kèm</a>
                        <a href="#" onClick={this.handleTabOpen} data-target="mon-mang-di" className="tab-title">Món mang đi</a>
                    </div>
                    <div className="tab-content">
                        <section className="tab-item open" id="mon-chinh">
                        <div role="group" className="fieldset metro">
                                <legend>Ăn Tại Chỗ / Mang Đi</legend>
                                    <div className="input-box">
                                        <input type="radio" 
                                                name="is_an_tai_cho" 
                                                value={'Ăn tại chỗ'} 
                                                id={`rad-an-tai-cho`} 
                                                onChange={this.handleInputChange} 
                                                checked={this.state.frmData.is_an_tai_cho === 'Ăn tại chỗ' ? true : false}
                                        />
                                        <label htmlFor={`rad-an-tai-cho`}>Ăn Tại Chỗ</label>
                                    </div>
                                    <div className="input-box">
                                        <input type="radio" 
                                                name="is_an_tai_cho" 
                                                value={'Mang đi'} 
                                                id={`rad-mang-di`} 
                                                onChange={this.handleInputChange} 
                                                checked={this.state.frmData.is_an_tai_cho === 'Mang đi' ? true : false}
                                        />
                                        <label htmlFor={`rad-mang-di`}>Mang Đi</label>
                                    </div>
                            </div>
                            <div role="group" className="fieldset metro">
                                <legend>Loại phở</legend>
                                {
                                    loai_pho.map(item => (
                                        <div className="input-box" key={item.id}>
                                            <input type="checkbox" 
                                                    value={item.value} 
                                                    id={`cb-${item.id}`} 
                                                    name="loai_pho" 
                                                    onChange={this.handleInputChange}
                                                    checked={this.state.frmData.loai_pho.indexOf(item.value) > -1 ? true : false}
                                            />
                                            <label htmlFor={`cb-${item.id}`}>{item.value}</label>
                                        </div>
                                    ))
                                }
                            </div>
                            <div role="group" className="fieldset metro">
                                <legend>Loại Tô</legend>
                                {
                                    loai_to.map(item => (
                                        <div className="input-box" key={item.id}>
                                            <input type="radio" 
                                                    name="loai_to" 
                                                    value={item.value} 
                                                    id={`rad-${item.id}`} 
                                                    onChange={this.handleInputChange} 
                                                    checked={this.state.frmData.loai_to === item.value ? true : false}
                                            />
                                            <label htmlFor={`rad-${item.id}`}>{item.value}</label>
                                        </div>
                                    ))
                                }
                            </div>
                            <div role="group" className="fieldset metro">
                                <legend>Bánh Phở</legend>
                                {
                                    banh_pho.map(item => (
                                        <div className="input-box" key={item.id}>
                                            <input type="radio" 
                                                    name="banh_pho" 
                                                    value={item.value} 
                                                    id={`rad-${item.id}`} 
                                                    onChange={this.handleInputChange}
                                                    checked={this.state.frmData.banh_pho === item.value ? true : false}
                                            />
                                            <label htmlFor={`rad-${item.id}`}>{item.value}</label>
                                        </div>
                                    ))
                                }
                            </div>
                            <div role="group" className="fieldset metro">
                                <legend>Yêu Cầu Đặc Biệt</legend>
                                {
                                    yeu_cau_dac_biet.map(item => (
                                        <div className="input-box" key={item.id}>
                                            <input type="checkbox" 
                                                    name="yeu_cau" 
                                                    value={item.value} 
                                                    id={`cb-${item.id}`} 
                                                    onChange={this.handleInputChange}
                                                    checked={this.state.frmData.yeu_cau.indexOf(item.value) > -1 ? true : false}
                                            />
                                            <label htmlFor={`cb-${item.id}`}>{item.value}</label>
                                        </div>
                                    ))
                                }
                            </div>
                            <div role="group" className="fieldset middle">
                                <div className="input-box">
                                    <label htmlFor="textarea-ghi_chu">Ghi Chú</label>
                                    <textarea id="textarea-ghi_chu" 
                                                name="ghi_chu" 
                                                onChange={this.handleInputChange}
                                                value={this.state.frmData.ghi_chu}
                                    />
                                </div>
                            </div>
                            <div role="group" className="fieldset middle">
                                <div className="input-box qty">
                                    <label htmlFor="text-so_luong">Số Lượng</label>
                                    <button onClick={this.handlerSpinner} data-dir="giam" data-statename="so_luong_to" className="spinner" disabled={this.state.frmData.so_luong_to <= 1 ? true : false}>-</button>
                                    <input type="number" value={this.state.frmData.so_luong_to} name="so_luong_to" id="text-so_luong_to"  min="1" readOnly/>
                                    <button onClick={this.handlerSpinner} data-dir="tang"  data-statename="so_luong_to" className="spinner">+</button>
                                </div>
                            </div>
                        </section>
                        <section className="tab-item" id="mon-an-kem">
                                <div role="group" className="fieldset middle">
                                    <legend>Món Ăn Kèm</legend>
                                    {
                                        mon_an_kem.map(item => (
                                            <div className="input-box qty" key={item.id}>
                                                <label htmlFor={`text-${item.id}`}>{item.value}</label>
                                                <button onClick={this.handlerSpinner} data-dir="giam" data-parentstate="mon_an_kem" data-statename={item.id} className="spinner" disabled={this.state.frmData.mon_an_kem[item.id] <= 0 ? true : false}>-</button>
                                                <input type="number" value={this.state.frmData.mon_an_kem[item.id]} name={item.id} id={`text-${item.id}`}  min="0" readOnly/>
                                                <button onClick={this.handlerSpinner} data-dir="tang"  data-parentstate="mon_an_kem" data-statename={item.id} className="spinner">+</button>
                                            </div>
                                        ))
                                    }
                                </div>
                        </section>
                        <section className="tab-item" id="mon-mang-di">
                                <div role="group" className="fieldset middle">
                                    <legend>Món Mang Đi</legend>
                                    {
                                        mon_mang_di.map(item => (
                                            <div className="input-box qty" key={item.id}>
                                                <label htmlFor={`text-${item.id}`}>{item.value}</label>
                                                <button onClick={this.handlerSpinner} data-dir="giam" data-parentstate="mon_mang_di" data-statename={item.id} className="spinner" disabled={this.state.frmData.mon_mang_di[item.id] <= 0 ? true : false}>-</button>
                                                <input type="number" value={this.state.frmData.mon_mang_di[item.id]} name={item.id} id={`text-${item.id}`}  min="0" readOnly/>
                                                <button onClick={this.handlerSpinner} data-dir="tang"  data-parentstate="mon_mang_di" data-statename={item.id} className="spinner">+</button>
                                            </div>
                                        ))
                                    }
                                </div>
                        </section>
                    </div>
                    <div className="main-buttons">
                        <button onClick={this.handlerOrder} className="button secondary">{this.state.is_edit ? 'Lưu Thay Đổi Chỉnh Sửa' : 'Đặt Món'}</button>
                        <button onClick={this.handleReset} className="button">{this.state.is_edit ? 'Quay Lại' : 'Reset'}</button>
                    </div>
                    {
                        this.state.notification ? <div className="notification">{this.state.notification}</div> : ''
                    }
                </form>
            </div>
        );
    }
}

function mapStateToProps(state, props){
    return{
        colletionsReducer: state.collectionReducer
    }
}

function mapDispatchToProps(dispatch){
    return{
        addOrder: (payload) => dispatch(addOrder(payload)),
        updateOrder: (payload) => dispatch(updateOrder(payload)),
        removeOrder: (payload) => dispatch(removeOrder(payload)),
        saveOrder: (payload) => dispatch(saveOrder(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainDisks);