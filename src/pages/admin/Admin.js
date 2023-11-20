import React, { useState } from "react";
import Header from "../../components/repeat_etc/Header";
import AdminCategory from "../../components/repeat_etc/AdminCategory";
import MemberManagement from "../../components/admin/MemberManagement";
import ReportManagement from "../../components/admin/ReportManagement";
import "../../css/admin_css/Admin.css"

const Admin = () => {
    const [currentCategory, setCurrentCategory] = useState("memberManagement");

    const handleCategoryChange = (category) => {
        setCurrentCategory(category);
    };

    // 선택된 카테고리에 따라 다른 내용 렌더링
    const renderContent = () => {
        switch (currentCategory) {
            case "memberManagement":
                return <MemberManagement />;
            case "reportManagement":
                return <ReportManagement />;
            default:
                return null;
        }
    };

    return (
        <div>
            <Header showSideCenter={true}/>
            <div className="container admin_container">
                <h1 className="admin">관리자 페이지</h1>
                <div className="admin_body">
                    <AdminCategory onCategoryChange={handleCategoryChange} />
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default Admin;
