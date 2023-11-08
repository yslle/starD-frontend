import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {useState} from "react";
import Header from "../../components/repeat_etc/Header";

const Logout = ({sideheader}) => {

    // TODO 바로 로그아웃 할 수 있도록 수정하기

    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옴

    const accessToken = localStorage.getItem('accessToken');
    const isLoggedInUserId = localStorage.getItem('isLoggedInUserId');

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = async () => {

        try {
            // const member = await currentMember();
            const member = localStorage.getItem('isLoggedInUserId');
            const accessToken = localStorage.getItem('accessToken');

            if (member !== "") {
                await axios.post("http://localhost:8080/api/v2/members/logout", {
                    accessToken : accessToken,
                    memberId : member
                }, {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    params : {
                        accessToken : accessToken,
                        memberId : member
                    }
                });

                console.log("로그아웃 성공");
                localStorage.removeItem('accessToken');
                localStorage.removeItem('isLoggedInUserId');
                localStorage.removeItem('todos');
                localStorage.removeItem('ApplyStudies');
                localStorage.removeItem('selectedSido');
                localStorage.removeItem('selectedGugun');
                localStorage.removeItem('tags');

                navigate("/");
            } else {
                console.log("로그아웃 실패");
                navigate("/login");
            }
        } catch (error) {
            console.error("로그아웃 에러", error);
            navigate("/logout");
        }
    };

    // const currentMember = () => {
    //     return axios
    //         .get("http://localhost:8080/api/v2/members/check", {
    //             withCredentials: true,
    //             headers: {
    //                 'Authorization': `Bearer ${accessToken}`
    //             }
    //         })
    //         .then((res) => {
    //             console.log(res.data);
    //             return res.data;
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             throw error; // 에러를 던져서 상위 코드에서 처리하도록 함
    //         });
    // };

    return (
        <div>
            <Header showSideCenter={true}/>
            <h2>Logout</h2>
            <p>이곳은 로그아웃 페이지입니다.</p>
            <button onClick={handleLogout}>로그아웃</button>
        </div>
    );
}

export default Logout;