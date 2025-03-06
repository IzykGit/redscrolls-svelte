export default (password: string): string => {
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
	if (!passwordRegex.test(password)) {
		return 'Invalid password';
	} else {
		return '';
	}
};
