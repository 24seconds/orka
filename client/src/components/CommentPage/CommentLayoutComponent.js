import React from "react";
import styled from "styled-components";
import CommentContainerComponent from "./CommentContainerComponent";

const CommentLayout = styled.div``;

// TODO(young): duplicate. Reafactor this
const EmptyDivForTitle = styled.div`
    height: 68px;
    margin-bottom: 20px;
`;

function CommentLayoutComponent(props) {
    const { className } = props;
    return (
        <CommentLayout className={className}>
            <EmptyDivForTitle />
            <CommentContainerComponent />
        </CommentLayout>
    );
}

export default CommentLayoutComponent;
