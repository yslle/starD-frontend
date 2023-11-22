import {Link} from "react-router-dom";

const AdminCategory = ({onCategoryChange}) => {
    const handleCategoryClick = (category) => {
        onCategoryChange(category);
    };

    return (
        <div className="category">
            <div className="c_01">
                <div className="sub_c">
                    <nav>
                        <ul>
                            <li>
                                <Link to="#" onClick={() => handleCategoryClick("memberManagement")}>
                                    회원 관리
                                </Link>
                            </li>
                            <li>
                                <Link to="#" onClick={() => handleCategoryClick("reportManagement")}>
                                    신고 관리
                                </Link>
                            </li>
                            <li>
                                <Link to="/qna"
                                      style={{
                                          textDecoration: "none",
                                          color: "inherit"
                                      }}>
                                    FAQ 등록
                                </Link>
                            </li>
                            <li>
                                <Link to="/notice"
                                      style={{
                                          textDecoration: "none",
                                          color: "inherit"
                                      }}>
                                    공지사항 등록
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}
export default AdminCategory;