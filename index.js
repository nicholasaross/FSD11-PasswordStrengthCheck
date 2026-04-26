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
		const confirmPassword = this.confirmPasswordInput.value;

		const strength = this.CheckPasswordStrength(password, confirmPassword);
		console.log(strength);

		const passes = strength.filter(Boolean).length;
		const submitBtn = document.getElementById('submitBtn');
		if (submitBtn) {
			submitBtn.disabled = passes !== strength.length;
		}
		
		for (let i = 0; i < strength.length; i++) {
			const ruleElement = document.getElementById(`rule${i + 1}`);
/*				
				<span class="text-success">&#10004;&#xFE0E;</span>
				<span class="text-danger">&#10006;&#xFE0E;</span>
*/
			if (ruleElement) {
				ruleElement.className = strength[i] ? 'text-success fw-bold' : 'text-danger fw-bold';
				ruleElement.textContent = strength[i] ? '✔︎' : '✖︎';
			}
		}

		if (password.length === 0) {
			this.strengthBar.style.backgroundColor = 'transparent';
			this.strengthBar.style.width = '0%';
			this.strengthBar.textContent = '';

			return;
		}

		const strengthPercent = (passes / strength.length * 100).toFixed(0);

		const amberLimit = strength.length - 1;
		const redLimit = Math.ceil(amberLimit / 2);
		console.log({ strengthPercent, passes, redLimit, amberLimit, strengthLength: strength.length });

		if (passes <= redLimit) {
			this.strengthBar.style.backgroundColor = 'red';
		} else if (passes <= amberLimit) {
			this.strengthBar.style.backgroundColor = 'orange';
		} else {
			this.strengthBar.style.backgroundColor = 'green';
		}
		this.strengthBar.style.width = `${strengthPercent}%`;
		this.strengthBar.textContent = `${strengthPercent}%`;
	}

	Repeats(password) {
		let lastChar = null;
		for (const char of password) {
			if (char === lastChar) {
				return true;
			}

			lastChar = char;
		}

		return false;
	}

	//	https://en.wikipedia.org/wiki/List_of_the_most_common_passwords
	CommonPasswords(password) {
		password = password.toLowerCase(); // case insensitive
		password = password.replace(' ', ''); // remove spaces
		password = password.replace('123', ''); // remove spaces
		password = password.replace('@', 'a'); // common substitutions
		password = password.replace('3', 'e'); // common substitutions
		password = password.replace('5', 's'); // common substitutions
		password = password.replace('0', 'o'); // common substitutions
		password = password.replaceAll(/[^a-z0-9]/g, ''); // remove special characters

		const commonPasswords = [
			'access', 'admin', 'admintelecom', 'adobe', 'baseball', 'dragon', 'flower', 'football', 'freedom', 'hello', 'iloveyou', 'letmein', 'login', 'master', 'michael', 'monkey', 'mustang', 'ninja', 'password', 'photoshop', 'princess', 'qwerty', 'shadow', 'starwars', 'sunshine', 'superman', 'trustno1', 'welcome', 'whatever'
		];

		return commonPasswords.includes(password);
	}

	CheckPasswordStrength(password, confirmPassword) {
		const strength = [
			password.length >= 8, /* length */
			!!password.match(/[a-z]/), /* lowercase */
			!!password.match(/[A-Z]/), /* uppercase */
			!!password.match(/\d/), /* digits */
			!!password.match(/[^a-zA-Z0-9]/), /* special characters, by exception */
			!this.Repeats(password), /* no repeated characters */
			!this.CommonPasswords(password), /* not containing a (somewhat) common password */
			password === confirmPassword, /* passwords match */
		];

		return strength;
	}
}

const passwordChecker = new PasswordStrengthChecker('password', 'confirmPassword', 'strengthBar');