import React from 'react'
import { useMediaQuery } from 'react-responsive'

const ScreenWidth = ({ children, maxWidth }) => {
    const isMobile = useMediaQuery({ maxWidth });
    return isMobile ? <>{children}</> : null;
    };

export default ScreenWidth