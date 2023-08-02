import React from 'react'
import { useMediaQuery } from 'react-responsive'

const ScreenWidthMin = ({ children, minWidth }) => {
    const isDesktop = useMediaQuery({ minWidth });
    return isDesktop ? <>{children}</> : null;
    };

export default ScreenWidthMin