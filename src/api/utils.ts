export const withRetrial = async <T>(
	fn: () => Promise<T>,
	retries = 3,
	delay = 2000
): Promise<T> => {
	for (let attempt = 0; attempt <= retries; attempt++) {
		try {
			return await fn();
		} catch (error: any) {
			const isLastAttempt = attempt === retries;

			if (!isLastAttempt) {
				if (error?.response?.status === 429) {
					console.log(`Rate limited (429). Retrying in ${delay}ms...`);
				} else {
					console.log(`Attempt ${attempt + 1} failed. Retrying in ${delay}ms...`, error);
				}

				await new Promise((resolve) => setTimeout(resolve, delay));
			} else {
				console.log(`All ${retries + 1} attempts failed.`);
				throw error;
			}
		}
	}
	throw new Error('Unexpected retry loop exit');
};
