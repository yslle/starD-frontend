import React, { useEffect, useState, useRef, } from 'react';
 import { selectBOX } from '../../util/SelectBox.js';
 import edit from "../../css/mypage_css/edit.css";
 
function RealEstate ({mem}) {  // 컴포넌트.

    // const [city, setCity]=useState("");
    // const [district, setDistrict]=useState("");
    // const onHandleCity=(e)=>{
    //     setCity(e.target.value);
    // }
    // const onHandleDistrict=(e)=>{
    //     setCity(e.target.value);
    // }

    useEffect(() => {
        console.log("member:", mem);
//        selectBOX();  // 시/도/군/구 selectBOX 생성함수를 컴포넌트가 로드 되자마자 실행해준다.
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