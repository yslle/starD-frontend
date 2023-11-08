import React, { useEffect, useState, useRef, } from 'react';
 import { selectBOX } from '../../util/SelectBox.js';
 import edit from "../../css/mypage_css/edit.css";
 
function RealEstate ({mem}) {  // 컴포넌트.
    useEffect(() => {
        if (mem) {
            selectBOX(mem);
        }
    }, [mem]);



    return (
       <div className="select_estate">
          <select name="sido1" id="sido1"></select>
          <select name="gugun1" id="gugun1"></select>

       </div> 
    );
}
export default RealEstate;