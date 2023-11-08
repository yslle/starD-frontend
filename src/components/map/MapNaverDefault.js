import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";

const MapNaverDefault = ({studyId, Member}) => {

    const accessToken = localStorage.getItem('accessToken');

    const [mapLat, setMapLat] = useState(null); // 위도
    const [mapLng, setMapLng] = useState(null); // 위도
    const [currentLocation, setCurrentLocation] = useState({});
    const mapElement = useRef(null);
    const {naver} = window;

    const [inputs, setInputs] = useState(["", ""]);

    useEffect(() => {
        axios.get(`http://localhost:8080/location/${studyId}/all`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                console.log("Location : ", res.data);

                setMapLat(res.data.latitude);
                setMapLng(res.data.longitude);
            })
            .catch((error) => {
                console.error("위도, 경도 불러오기 실패", error);
            });

    }, []);

    useEffect(() => {
        if (!mapElement.current || !naver) return;

        if (naver.maps) {
            const location = new naver.maps.LatLng(mapLng, mapLat);
            const mapOptions = {
                center: location,
                zoom: 16,
                zoomControl: true,
            };

            const map = new naver.maps.Map(mapElement.current, mapOptions);
            new naver.maps.Marker({
                position: location,
                map,
            });
        }
    }, [mapLat, mapLng, naver]);

    const addInput = () => {
        if (inputs.length === Member.length) {
            alert('스터디 인원을 초과할 수 없습니다.');
            return;
        }
        setInputs([...inputs, ""]);
    };

    const removeInput = (index) => {
        if (inputs.length !== 1) {
            const newInputs = [...inputs];
            newInputs.splice(index, 1);
            setInputs(newInputs);
        }
    };

    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    const findMidpoint = () => {
        if (inputs.some(input => !input.trim())) {
            alert('모든 입력 값을 올바르게 작성하세요.');
            return;
        }

        axios.get("http://localhost:8080/location/find", {
            params: {placeList: inputs.join(',')},
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                console.log("Location : ", res.data);

                setMapLat(res.data.latitude);
                setMapLng(res.data.longitude);
            })
            .catch((error) => {
                console.error("위도, 경도 불러오기 실패", error);
            });
    }

    return (
        <div className={"map_content"}>
            {inputs.map((input, index) => (
                <div key={index} id={"input-location"}>
                    <input placeholder={" 장소를 입력하세요."}
                           onChange={(e) => handleInputChange(index, e.target.value)}/>
                    {inputs.length - 1 === index && (
                        <button onClick={addInput}>+</button>
                    )}
                    {inputs.length !== 1 && index > 1 && (
                        <button onClick={() => removeInput(index)}>-</button>
                    )}
                </div>
            ))}
            <button onClick={findMidpoint}>찾기</button>
            <div ref={mapElement} style={{height: '250px', width: '580px'}} id={"naver-map"}/>
        </div>
    );
};

export default MapNaverDefault;