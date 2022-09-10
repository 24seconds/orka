import React from "react";
import styled from "styled-components";
import CommentContainerComponent from "./CommentContainerComponent";

const CommentLayout = styled.div`
    margin-left: 28px;
`;

function CommentLayoutComponent() {
    return (
        <CommentLayout>
            <CommentContainerComponent />
        </CommentLayout>
    );
}

export default CommentLayoutComponent;
