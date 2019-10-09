import React from 'react';
import {Link} from 'react-router-dom';

const PageNotFound = () =>(
    <div style={{textAlign:'center'}}>
        <h1>Trang bạn tìm không tồn tại</h1>
        <div>
        Bấm vào <Link to='/'><span style={{color: 'red', fontSize: '18px'}}>đây</span></Link> để trở về trang chủ
        </div>
        
    </div>
);

export default PageNotFound;