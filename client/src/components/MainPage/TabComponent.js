import React, { useCallback, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import HomeIconLight from "../../assets/HomeIconLight";
import NotificationIconLight from "../../assets/NotificationIconLight";
import ProfileIconIconLight from "../../assets/ProfileIconIconLight";
import { Tabs } from "../../constants/constant";

const Tab = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 164px;
    height: 100px;

    cursor: pointer;
    box-sizing: border-box;
    border-radius: 30px;
    background: ${(props) => props.theme.Grayscale03};
    border: 2px solid transparent;

    > svg {
        > path,
        circle {
            stroke: ${(props) =>
                props.isSelected
                    ? props.theme.TabButtonActive
                    : props.theme.TabButtonInActive};
        }
    }

    &:hover {
        border: 2px solid ${(props) => props.theme.Grayscale01};
    }
`;

function TabComponent(props) {
    const { iconType, isSelected } = props;

    const renderIcon = useCallback(() => {
        switch (iconType) {
            case Tabs.Home:
                return <HomeIconLight />;
            case Tabs.Profile:
                return <ProfileIconIconLight />;
            case Tabs.Notification:
                return <NotificationIconLight />;
            default:
                return null;
        }
    }, [props.iconType]);

    function onClick() {
        props.onClick?.(iconType);
    }

    return (
        <Tab className="orka-tab" isSelected={isSelected} onClick={onClick}>
            {renderIcon()}
        </Tab>
    );
}

TabComponent.propTypes = {
    iconType: PropTypes.oneOf(Object.values(Tabs).map((x) => x)).isRequired,
    isSelected: PropTypes.bool,
};

export default TabComponent;
