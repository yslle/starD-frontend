import React, {useEffect, useState} from "react";
import axios from "axios";

const ReportManagement = () => {
    const [reports, setReports] = useState([]);
    const [reportReason, setReportReason] = useState([]);
    const [showReasonModal, setShowReasonModal] = useState(false);

    const accessToken = localStorage.getItem('accessToken');

    //TODO 신고목록 조회
    useEffect(() => {
        axios.get("http://localhost:8080/reports", {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);

                setReports(res.data);
            })
            .catch((error) => {
                console.error('신고 목록을 가져오는 중 오류 발생: ', error);
            });
    }, []);

    //TODO 신고이유
    useEffect(() => {
        reports.forEach((report) => {
            axios.get(`http://localhost:8080/reason/${report.id}`, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then((res) => {
                    console.log("전송 성공");
                    console.log(res.data);

                    // 신고 이유를 신고 ID를 키로 하는 객체로 설정
                    setReportReason(prevReasons => ({
                        ...prevReasons,
                        [report.id]: res.data
                    }));
                })
                .catch((error) => {
                    console.error('신고 이유를 가져오는 중 오류 발생: ', error);
                });
        });
    }, [reports]);

    const openReasonModal = () => {
        setShowReasonModal(true);
        document.body.classList.add("modal-open");
    }

    const closeReasonModal = () => {
        setShowReasonModal(false);
        document.body.classList.add("modal-open");
    }

    const tableType = (report) => {
        if (report.tableType === "COMM") {
            return "게시글";
        }
        else if (report.tableType === "STUDY"){
            return "스터디";
        }
        // 예시: 삭제할 대상이 댓글인 경우
        else if (report.tableType === "REPLY") {
            return "댓글";
        }
    }

    const tableTypeID = (report) => {
        if (report.tableType === "COMM") {
            return report.post.id;
        }
        else if (report.tableType === "STUDY"){
            return report.study.id;
        }
        // 예시: 삭제할 대상이 댓글인 경우
        else if (report.tableType === "REPLY") {
            return report.reply.id;
        }
    }

    const getTitleOrContent = (report) => {
        if (report.tableType === "COMM") {
            return report.post.title;
        }
        else if (report.tableType === "STUDY"){
            return report.study.title;
        }
        // 예시: 삭제할 대상이 댓글인 경우
        else if (report.tableType === "REPLY") {
            return report.reply.content;
        }
    }
    //TODO 신고승인
    const handleReportAccept = ({report}) => {
        axios.post(`http://localhost:8080/reports/accept/${report.id}`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);

                setReports(res.data);
            })
            .catch((error) => {
                console.error('신고 이유를 가져오는 중 오류 발생: ', error);
            });
    }

    //TODO 신고반려
    const handleReportReject = ({report}) => {
        axios.delete(`http://localhost:8080/reports/${report.id}`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);

                setReports(res.data);
            })
            .catch((error) => {
                console.error('신고 이유를 가져오는 중 오류 발생: ', error);
            });
    }

    return (
        <div className="admin_sub_container">
            <h2 className="admin_title">신고 관리</h2>
            <div className="admin_table_wrapper">
                <table className="report_admin_table">
                    <thead>
                    <tr>
                        <th>구분</th>
                        <th>게시글 / 댓글 ID</th>
                        <th>게시글 제목 / 댓글 내용</th>
                        <th>신고 횟수</th>
                        <th>신고 사유</th>
                        <th>신고 승인 버튼</th>
                        <th>신고 반려 버튼</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reports.map((report) => (
                        <tr key={report.id}>
                            <td>{tableType(report)}</td>
                            <td>{tableTypeID(report)}</td>
                            <td>{getTitleOrContent(report)}</td>
                            <td>8</td> {/* 신고 횟수 아직 못함.. */}
                            <td>
                                <button className="reason_btn" onClick={openReasonModal}>신고 사유</button>
                            </td>
                            <td>
                                <button className="remove_btn" onClick={() => handleReportAccept(report)}>신고 승인(삭제)</button>
                            </td>
                            <td>
                                <button className="reject_btn" onClick={() => handleReportReject(report)}>신고 반려</button>
                            </td>
                            {showReasonModal && (
                                <div className="modal">
                                    <div className="modal-content">
                                        <span className="close" onClick={closeReasonModal}>&times;</span>
                                        <h4>신고 사유</h4>
                                        <p>{reportReason}</p>
                                    </div>
                                </div>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ReportManagement;