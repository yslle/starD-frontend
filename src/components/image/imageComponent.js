import React, { useState, useEffect } from 'react';
import axios from "axios";

const ImageComponent = (getImgName) => {

    let accessToken = localStorage.getItem('accessToken');
    const [imageSrc, setImageSrc] = useState(null);
    const imgName = getImgName;

    useEffect(() => {
        const imageUrl = `http://localhost:8080/user/mypage/profile/image/${imgName.getImgName}`;

        axios
            .get(imageUrl, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                responseType: 'arraybuffer',    // 매우 중요! 바이너리 데이터를 안전하게 처리
            })
            .then(response => {
                // 이미지 -> Blob 변환
                const blob = new Blob([response.data], { type: response.headers['content-type'] });
                const objectURL = URL.createObjectURL(blob);
                setImageSrc(objectURL);
            })
            .catch(error => {
                console.error('이미지 불러오기 실패: ', error);
            });
    }, [imgName]);

    return (
        <div>
            {imageSrc ? (
                <img src={imageSrc} alt="Example" />
            ) : (
                <p>Loading image...</p>
            )}
        </div>
    );
};

export default ImageComponent;