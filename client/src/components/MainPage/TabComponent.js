import React, { useCallback, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import HomeIconLight from "../../assets/HomeIconLight";
import NotificationIconLight from "../../assets/NotificationIconLight";
import ProfileIconIconLight from "../../assets/ProfileIconIconLight";

const Tab = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 164px;
    height: 100px;
    cursor: pointer;
    border-radius: 30px;
    background: ${(props) => props.theme.Grayscale03};
    border: none;

    > svg {
        > path,
        circle {
            stroke: ${(props) =>
                props.isSelected ? props.theme.White : props.theme.Grayscale01};
        }
    }

    /* > svg {
        > path {
            stroke: ${(props) => props.theme.White};
        }
    } */
    .icon {
    }
`;

function TabComponent(props) {
    const { iconType } = props;
    const [isSelected, setisSelected] = useState(false);

    const renderIcon = useCallback(() => {
        switch (iconType) {
            case "Home":
                return <HomeIconLight />;
            case "Profile":
                return <ProfileIconIconLight />;
            case "Notification":
                return <NotificationIconLight />;
            default:
                return null;
        }
    }, [props.Icon]);

    function onClick() {
        setisSelected(!isSelected);
    }

    return (
        <Tab className="orka-tab" isSelected={isSelected} onClick={onClick}>
            {renderIcon()}
        </Tab>
    );
}

TabComponent.propTypes = {
    iconType: PropTypes.oneOf(["Home", "Profile", "Notification"]).isRequired,
};

export default TabComponent;
