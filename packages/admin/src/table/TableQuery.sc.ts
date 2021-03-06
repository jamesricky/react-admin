import zIndex from "@material-ui/core/styles/zIndex";
import styled from "styled-components";

export const ProgressOverlayContainer = styled.div`
    position: relative;
`;

export const ProgressOverlayInnerContainer = styled.div`
    transform: translate(50%, 200px);
    position: sticky;
    width: 100%;
    top: 0;
    z-index: ${zIndex.modal};
`;

export const TableCircularProgressContainer = styled.div`
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.3);
    transform: translate(-50%, -50%);
    justify-content: center;
    background-color: white;
    border-radius: 10px;
    align-items: center;
    position: absolute;
    margin: 0 auto;
    height: 100px;
    width: 100px;
    display: flex;
`;
