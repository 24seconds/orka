import styled from "styled-components";
import { mobileWidth } from "../../constants/styleConstants";

const PageEdit = styled.button`
    position: absolute;
    left: 32px;
    bottom: 32px;

    display: flex;
    width: 178px;
    padding: 16px 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 12px;
    background: ${(props) => props.theme.MyPageEditButton};
    border: none;

    color: ${(props) => props.theme.Grayscale05};
    font-size: 16px;
    font-family: Poppins;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: -0.64px;

    cursor: pointer;

    @media (max-width: ${mobileWidth}) {
        display: none;
        visibility: hidden;
    }
`;

function PageEditComponent(props) {
    const { className, onClick } = props;

    function onChangeEditMode() {
        onClick?.();
    }

    return (
        <PageEdit className={className} onClick={onChangeEditMode}>
            Edit my page
        </PageEdit>
    );
}

export default PageEditComponent;
