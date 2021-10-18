import { createGlobalStyle } from 'styled-components';

import MontserratMedium from './Montserrat-Medium.ttf';
import MontserratBold from './Montserrat-SemiBold.ttf';

export default createGlobalStyle`
    @font-face {
        font-family: 'Montserrat';
        src: local('Font Name'), local('FontName'),
        url(${MontserratMedium}) format('truetype');
        url(${MontserratBold}) format('truetype');
        font-weight: 500;
        font-style: normal;
    }
`;