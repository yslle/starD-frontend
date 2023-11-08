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
            onClick={onClick}
        />
    );
};


export default ScrapButton;