const format = (msg, ...args) => {
    if (args.length === 0) return msg;
    return msg.replace(/{(\d+)}/g,
        (match, number) => (args[number] != null
            ? args[number]
            : match));
};

export {format};
