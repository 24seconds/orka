class LocalDropEvent {
    constructor(eventType, data) {
        this.type = eventType;

        if (data) {
            for (const key of Object.keys(data)) {
                this[key] = data[key];
            }
        }
    }
}

export default LocalDropEvent;
