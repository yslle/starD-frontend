import React, { useEffect, useState, useRef, } from 'react';
import edit from "../../css/mypage_css/edit.css";
import {RegionSelectBOX} from "../../util/RegionSelectBox";

function StudyRegion ({formData, city, district, handleRegionCityChange ,handleRegionDistrictChange}) {  // 컴포넌트.

    useEffect(() => {  // 시/도 및 군/구 select 요소의 값을 상태로 설정
        const sidoSelect = document.getElementById('sido1');
        const gugunSelect = document.getElementById('gugun1');

        console.log("city : " + city);
        console.log("district : " + district);

        sidoSelect.value = city;
        gugunSelect.value = district;
    }, [city, district]);

    useEffect(() => {
        RegionSelectBOX({formData, city , district, handleRegionCityChange,handleRegionDistrictChange });

    }, [formData,city,district]);


    return (
        <div className="Study_Region">
            <select name="sido1" id="sido1"></select>
            <select name="gugun1" id="gugun1"></select>
        </div>
    );
}
export default StudyRegion;