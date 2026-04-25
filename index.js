class PasswordStrengthChecker {
	constructor(inputId, confirmPasswordId, strengthBarId) {
		this.passwordInput = document.getElementById(inputId);
		this.confirmPasswordInput = document.getElementById(confirmPasswordId);
		this.strengthBar = document.getElementById(strengthBarId);
		this.passwordInput.addEventListener('input', () => this.UpdateStrength());
		this.confirmPasswordInput.addEventListener('input', () => this.UpdateStrength());
	}

	UpdateStrength() {
		const password = this.passwordInput.value;
		if (password.length === 0) {
			this.strengthBar.style.width = '0%';
			this.strengthBar.textContent = '';
			this.strengthBar.style.backgroundColor = 'transparent';
			return;
		}
		
		const confirmPassword = this.confirmPasswordInput.value;

		const strength = this.CheckPasswordStrength(password, confirmPassword);
		const strengthPercent = (strength / 6 * 100).toFixed(0);

		this.strengthBar.style.backgroundColor = strength < 3 ? 'red' : strength < 5 ? 'orange' : 'green';
		this.strengthBar.style.width = `${strengthPercent}%`;
		this.strengthBar.textContent = `${strengthPercent}%`;
	}

	CheckPasswordStrength(password, confirmPassword) {
		let strength = 0;

		if (password.length >= 8) strength++;
		if (password.match(/[a-z]/)) strength++;
		if (password.match(/[A-Z]/)) strength++;
		if (password.match(/\d/)) strength++;	/* digits */
		if (password.match(/[^a-zA-Z0-9]/)) strength++;	/* special characters, by exception */
		if (password === confirmPassword) strength++;
		return strength;
	}
}

const passwordChecker = new PasswordStrengthChecker('password', 'confirmPassword', 'strengthBar', ['lengthRule', 'lowercaseRule', 'uppercaseRule', 'digitRule', 'specialCharRule', 'repeatedCharRule', 'confirmRule']);