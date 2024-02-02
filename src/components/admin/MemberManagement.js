import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";

const MemberManagement = () => {
    const [members, setMembers] = useState([]);

    const accessToken = localStorage.getItem('accessToken');

    //TODO 신고 횟수 1이상인 멤버 리스트 가져오기
    useEffect(() => {
        axios.get("http://localhost:8080/reports/members", {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);

                setMembers(res.data);
            })
            .catch((error) => {
                console.error('신고 횟수가 1이상인 멤버 리스트 가져오는 중 오류 발생: ', error);
            });
    }, []);

    //TODO 강제탈퇴
    const handleWithdraw = useCallback((member) => {
        const confirmWithdraw = window.confirm("정말로 강제 탈퇴 시키겠습니까?");

        if (confirmWithdraw) {
            axios.post(`http://localhost:8080/reports/members/${member.id}`, null,
                {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                }).then((res) => {
                console.log("API Response:", res.data);
                alert("탈퇴 처리되었습니다.");

                // 탈퇴 후 회원 목록 갱신 로직 추가
                setMembers((prevMembers) => {
                    return prevMembers.filter((prevMember) => prevMember.id !== member.id);
                });

            }).catch((error) => {
                console.log(error);
                alert("탈퇴 처리에 실패하였습니다.");
            })
        }
    }, []);

    return(
        <div className="admin_sub_container">
            <h2 className="admin_title">회원 관리</h2>
            <div className="admin_table_wrapper">
                <h3>* 누적 신고 수가 10회 이상이면 자동으로 강제 탈퇴 처리됩니다.</h3>
                <table className="member_admin_table">
                    <thead>
                    <tr>
                        <th>회원 ID</th>
                        <th>닉네임</th>
                        <th>누적 신고 횟수</th>
                        <th>버튼</th>
                    </tr>
                    </thead>
                    <tbody>
                    {members.map((member) => (
                        <tr>
                            <td>{member.id}</td>
                            <td>{member.nickname}</td>
                            <td>{member.reportCount}</td>
                            <td>
                                <button className="withdraw_btn" onClick={() => handleWithdraw(member)}>강제 탈퇴</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default MemberManagement;