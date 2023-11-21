import React from "react";
import {Link} from 'react-router-dom';
const MemoizedLink = React.memo(({ to, children, style }) => {
    return (
        <Link to={to} style={style}>
            {children}
        </Link>
    );
});

export default MemoizedLink;
