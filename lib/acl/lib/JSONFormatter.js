import objStringify from 'obj-stringify';

/**
 * apply JSON format for string with specific options and special handling for it out format
 */
class JSONFormatter {
    /**
     * for assigned object as strigified JSON object according to specific options
     * @param data
     * @param options
     * @returns {string}
     */
    static format(data, options) {
        return objStringify(data, {
            indent: typeof options.indentation !== 'undefined' ? options.indentation : '\t',
            depth: 6
        });
    }
}

export default JSONFormatter;