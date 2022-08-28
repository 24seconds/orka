import React, { useMemo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const PeerRecent = styled.div`
    position: relative;
    width: 100px;
    height: 120px;
    margin: 32px 32px 32px 36px;
`;

const RecentData = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;

    width: 80px;
    height: 100px;
    background: ${(props) => props.theme.Grayscale02};
    border-radius: 11px;
    filter: drop-shadow(0px 2.6px 2.6px rgba(0, 0, 0, 0.25));

    font-weight: 600;
    font-size: 16px;
    color: ${(props) => props.theme.Gray};
    line-height: 20px;

    left: ${(props) => props.order};
    top: ${(props) => props.order};
    z-index: ${(props) => props.zIndex};
`;

function RecentDataComponent(props) {
    const { order, dataType } = props;

    const memoizedOrderToPixel = useMemo(() => {
        return `${parseInt(order) * 11}px`;
    }, [order]);

    const memoizedZIndex = useMemo(() => {
        const bigNumber = 10;
        return `${bigNumber - parseInt(order)}`;
    }, [order]);

    return (
        <RecentData order={memoizedOrderToPixel} zIndex={memoizedZIndex}>
            {dataType}
        </RecentData>
    );
}

// TODO(young): Refactor props types. Use array of order and data types.
function PeerRecentComponent(props) {
    const { orders, dataTypes } = props;

    return (
        <PeerRecent>
            {orders.map((order, index) => {
                return (
                    <RecentDataComponent
                        key={order}
                        order={order}
                        dataType={dataTypes[index]}
                    />
                );
            })}
        </PeerRecent>
    );
}

PeerRecentComponent.propTypes = {
    orders: PropTypes.array,
    dataTypes: PropTypes.array,
};

PeerRecentComponent.defaultProps = {
    orders: ["0", "1"],
    dataTypes: ["PNG", "TXT"],
};

export default PeerRecentComponent;
