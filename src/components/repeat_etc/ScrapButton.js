import React from "react";
import PropTypes from "prop-types";
import StarFill from "../../images/star-fill.png";
import StarEmpty from "../../images/star-empty.png";

const ScrapButton = ({ scrap, onClick }) => {
    return (
        <img
            src={scrap ? StarFill : StarEmpty}
            className="scrap_img"
            alt="Scrap Button"
            onClick={onClick} // 클릭 시 onClick 함수 실행
        />
    );
};

// ScrapButton.propTypes = {
//     scrap: PropTypes.bool.isRequired, // 스크랩 상태를 받아와야 함
//     onClick: PropTypes.func.isRequired, // 클릭 시 실행할 함수를 받아와야 함
// };

export default ScrapButton;