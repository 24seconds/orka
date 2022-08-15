import styled from "styled-components";

const StyledButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 200px;
    height: 44px;
    border-radius: 13px;
    background: ${(props) => props.theme.PlaceholderBackgroundscale01};
`;

export default StyledButton;
