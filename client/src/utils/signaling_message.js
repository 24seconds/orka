import { SIGNALING_MESSAGE_TYPE } from "../schema";

function createSignalingMessage(messageType, data) {
    const message = {
        messageType,
        data,
    };

    return JSON.stringify(message);
}

function parseSignalingMessage(rawMessage) {
    console.log("rawMessage is ", rawMessage);
    const parsedMessage = ((rawMessage) => {
        try {
            const message = JSON.parse(rawMessage);

            if (!(message["messageType"] in SIGNALING_MESSAGE_TYPE)) {
                throw new Error(
                    `This messageType is not supported! type: ${message["messageType"]}`
                );
            }

            return message;
        } catch (err) {
            return {
                messageType: SIGNALING_MESSAGE_TYPE.ERROR,
                data: {
                    message: err.message,
                },
            };
        }
    })(rawMessage);

    return parsedMessage;
}

export { createSignalingMessage, parseSignalingMessage };
