import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import {
    DATA_EXTENSION_AUDIO,
    DATA_EXTENSION_GENERAL,
    DATA_EXTENSION_IMAGE,
    DATA_EXTENSION_LINK,
    DATA_EXTENSION_TEXT,
    DATA_EXTENSION_VIDEO,
} from "../../../constants/constant";
import DataExtensionIconGeneral from "../../../assets/DataExtensionIconGeneral";
import DataExtensionIconLink from "../../../assets/DataExtensionIconLink";
import DataExtensionIconText from "../../../assets/DataExtensionIconText";
import DataExtensionIconVideo from "../../../assets/DataExtensionIconVideo";
import DataExtensionIconAudio from "../../../assets/DataExtensionIconAudio";
import DataExtensionIconImage from "../../../assets/DataExtensionIconImage";

const PeerRecent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;    
    position: relative;
    width: 100%;
    height: 100%;
`;

const RecentData = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;

    width: 80px;
    height: 100px;
    background: ${(props) => props.theme.DataTypeHolderBackground};
    border-radius: 11px;
    filter: drop-shadow(0px 2.6px 2.6px rgba(0, 0, 0, 0.25));

    font-weight: 600;
    font-size: 16px;
    color: ${(props) => props.theme.DataTypeHolderText};
    line-height: 20px;

    left: ${(props) => props.order};
    top: ${(props) => props.order};
    z-index: ${(props) => props.zIndex};

    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
`;

const EmptyData = styled.div`
    width: 80px;
    height: 100px;
    background: ${(props) => props.theme.Grayscale03p5};
    border-radius: 11px;

    position: absolute;

    ${(props) => props.hasOrders && css`
        left: ${(props) => props.order};
        top: ${(props) => props.order};
        z-index: ${(props) => props.zIndex};
    `};
`;

const RecentDataContainer = styled.div`    
    position: relative;
    
    ${props => props.hasOrders && css`
        width: 99px; // 80px + left values
        height: 119px; // 100px + bottom values 
    `};
`;

function RecentDataComponent(props) {
    const { order, dataExtension } = props;

    const memoizedOrderToPixel = useMemo(() => {
        return `${parseInt(order) * 11}px`;
    }, [order]);

    const memoizedZIndex = useMemo(() => {
        const bigNumber = 10;
        return `${bigNumber - parseInt(order)}`;
    }, [order]);

    return (
        <RecentData order={memoizedOrderToPixel} zIndex={memoizedZIndex}>
            {(() => {
                return {
                    [DATA_EXTENSION_GENERAL]: <DataExtensionIconGeneral />,
                    [DATA_EXTENSION_LINK]: <DataExtensionIconLink />,
                    [DATA_EXTENSION_TEXT]: <DataExtensionIconText />,
                    [DATA_EXTENSION_VIDEO]: <DataExtensionIconVideo />,
                    [DATA_EXTENSION_AUDIO]: <DataExtensionIconAudio />,
                    [DATA_EXTENSION_IMAGE]: <DataExtensionIconImage />,
                }[dataExtension];
            })()}
        </RecentData>
    );
}

// TODO(young): Refactor props types. Use array of order and data types.
function PeerRecentComponent(props) {
    const { orders, dataExtensions } = props;

    const memoizedEmptyDataOrderToPixel = useMemo(() => {
        return `${parseInt(orders?.length || "0") * 11 - 3}px`;
    }, [orders]);

    const memoizedEmptyDataZIndex = useMemo(() => {
        const bigNumber = 10;
        return `${bigNumber - parseInt(orders?.length || "0")}`;
    }, [orders]);

    const hasOrders = useMemo(() => {
        return orders?.length !== 0;
    }, [orders]);

    return (
        <PeerRecent>
            <RecentDataContainer hasOrders={hasOrders}>
                {orders.map((order, index) => {
                    return (
                        <RecentDataComponent
                            key={order}
                            order={order}
                            dataExtension={dataExtensions[index]}
                        />
                    );
                })}
                <EmptyData className="orka-empty-data"
                    key={"empty-data"}
                    order={memoizedEmptyDataOrderToPixel}
                    zIndex={memoizedEmptyDataZIndex}
                    hasOrders={hasOrders}
                />
            </RecentDataContainer>
        </PeerRecent>
    );
}

PeerRecentComponent.propTypes = {
    orders: PropTypes.array,
    dataExtensions: PropTypes.array,
};

PeerRecentComponent.defaultProps = {
    orders: ["0", "1"],
    dataExtensions: [DATA_EXTENSION_GENERAL, DATA_EXTENSION_IMAGE],
};

export default PeerRecentComponent;
