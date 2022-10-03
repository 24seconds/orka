import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "../../assets/CloseIcon";
import CommentRowComponent from "./CommentRowComponent";
import CommentInputComponent from "./CommentInputComponent";
import { shallowEqual, useSelector } from "react-redux";
import { selectTableCommentsByDataID, selectTableUsersByID } from "../../utils/localApi";

const StyledCommentRowComponent = styled(CommentRowComponent)`
    margin: 0 32px 28px 32px;

    :last-child {
        margin-bottom: 0px;
    }
`;

const StyledCommentInputComponent = styled(CommentInputComponent)`
    margin: 36px 32px;
`;

const CommentRowContainer = styled.div`
    overflow-y: scroll;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    ::-webkit-scrollbar {
        display: none;
    }
`;

const CommentInputContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const CommentContainer = styled.div`
    display: grid;
    grid-template-rows: 95px auto 126px;
    width: 366px;
    height: 746px;
    background: ${(props) => props.theme.Grayscale03};
    border-radius: 30px;
`;

const CommentTitleContainer = styled.div`
    display: flex;
    align-items: center;

    .orka-title {
        flex-grow: 1;
    }

    svg {
        margin-right: 32px;
    }
`;

const CommentTitle = styled.div`
    display: flex;
    align-items: center;
    padding-left: 32px;
    height: 95px;

    color: ${(props) => props.theme.PlaceholderTextscale01};
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: -0.04em;
`;

function renderCommentRow(comment, user) {
    const { id, text, created_at } = comment;
    const { name } = user;

    return (
        <StyledCommentRowComponent 
            key={id}
            senderName={name}
            createdAt={new Date(created_at)}
            text={text}/>
    )
}

function CommentContainerComponent() {
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null);

    const dataID = useSelector((state) => state.selectedRow, shallowEqual);
    const senderID = useSelector((state) => state.selectedSender, shallowEqual);
    const tableComments = useSelector(
        (state) => state.tableComments,
        shallowEqual
    );
    console.log("dataID:", dataID);
    console.log("senderID:", senderID);

    useEffect(() => {
        (async () => {
            if (!!dataID && !!senderID) {
                const [comments, user] = await Promise.all([
                    selectTableCommentsByDataID(dataID, senderID),
                    selectTableUsersByID(senderID),
                ]);

                console.table(comments);
                setComments(comments);
                setUser(user?.[0]);
            }
        })();
    }, [dataID, senderID, tableComments]);

    return (
        <CommentContainer>
            <CommentTitleContainer>
                <CommentTitle className="orka-title">Comments</CommentTitle>
                <CloseIcon />
            </CommentTitleContainer>
            <CommentRowContainer className="hoho">
                {
                    user &&
                    comments.map(c => renderCommentRow(c, user))
                }                
            </CommentRowContainer>
            <CommentInputContainer>
                <StyledCommentInputComponent />
            </CommentInputContainer>
        </CommentContainer>
    );
}

export default CommentContainerComponent;
