let config = {
	ncga: {
		key_timeout: !!process.env.NCGA_KEY_TIMEOUT_MINUTES ? 1000 * 60 * JSON.parse(process.env.NCGA_KEY_TIMEOUT_MINUTES) : 1000 * 60 * 60 * 4
	}
};

module.exports = config;
