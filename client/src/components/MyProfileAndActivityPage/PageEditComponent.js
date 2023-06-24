import styled from "styled-components";

const PageEdit = styled.button`
    position: relative;
    left: 32px;
    bottom: 32px;

    display: flex;
    width: 178px;
    padding: 16px 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 12px;
    background: ${(props) => props.theme.White};
    border: none;

    color: ${(props) => props.theme.Grayscale05};
    font-size: 16px;
    font-family: Poppins;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: -0.64px;

    cursor: pointer;
`;

function PageEditComponent(props) {
    const { className } = props;

    return <PageEdit className={className}>Edit my page</PageEdit>;
}

export default PageEditComponent;
