import { useState } from "react";
import { PropTypes } from "prop-types";

const InputField = ({
	label,
	register,
	required,
	type = "text",
	errors,
	validation,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="mb-4">
			<label className="input-label">
				{label} {required ? <span className="text-red-500">*</span> : null}
			</label>
			<div className="relative">
				<input
					{...register(label, validation)}
					type={showPassword && type === "password" ? "text" : type}
					className={`input ${errors[label] ? "border-red-500" : ""}`}
					required={required ? true : false}
				/>
				{type === "password" && (
					<button
						type="button"
						onClick={handleTogglePassword}
						className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
					>
						{showPassword ? "Hide" : "Show"}
					</button>
				)}
			</div>
			{errors[label] && (
				<p className="text-red-500 text-xs italic">{errors[label].message}</p>
			)}
		</div>
	);
};

InputField.propTypes = {
	label: PropTypes.string.isRequired,
	register: PropTypes.func.isRequired,
	required: PropTypes.bool,
	type: PropTypes.string,
	errors: PropTypes.object.isRequired,
	validation: PropTypes.object,
};

export default InputField;
