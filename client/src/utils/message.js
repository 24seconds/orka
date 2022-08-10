import { MESSAGE_TYPE } from "../schema";

function createMessage(messageType, data) {
    const message = {
        messageType,
        data,
    };

    return JSON.stringify(message);
}

function parseMessage(rawMessage) {
    console.log("rawMessage is ", rawMessage);
    const parsedMessage = ((rawMessage) => {
        try {
            const message = JSON.parse(rawMessage);

            if (!(message["messageType"] in MESSAGE_TYPE)) {
                throw new Error(
                    `This messageType is not supported! type: ${message["messageType"]}`
                );
            }

            return message;
        } catch (err) {
            return {
                messageType: MESSAGE_TYPE.ERROR,
                data: {
                    message: err.message,
                },
            };
        }
    })(rawMessage);

    return parsedMessage;
}

export { createMessage, parseMessage };
