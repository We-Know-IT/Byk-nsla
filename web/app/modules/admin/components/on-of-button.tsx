"use client";

import React from "react";

type OnOfButtonProps = {
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (checked: boolean) => void;
	disabled?: boolean;
	className?: string;
};

export default function OnOfButton({
	checked,
	defaultChecked = false,
	onChange,
	disabled = false,
	className = "",
}: OnOfButtonProps) {
	const [internalChecked, setInternalChecked] = React.useState(defaultChecked);

	const isControlled = checked !== undefined;
	const isOn = isControlled ? checked : internalChecked;

	const toggle = () => {
		if (disabled) return;

		const next = !isOn;
		if (!isControlled) setInternalChecked(next);
		onChange?.(next);
	};

	return (
		<button
			type="button"
			aria-pressed={isOn}
			aria-label={isOn ? "Turn off" : "Turn on"}
			onClick={toggle}
			disabled={disabled}
			className={`inline-flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 ${
				disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
			} ${isOn ? "bg-emerald-500" : "bg-slate-300"} ${className}`}
		>
			<span className="relative h-6 w-12 rounded-full">
				<span
					className={`absolute left-0 top-0 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
						isOn ? "translate-x-6" : "translate-x-0"
					}`}
				/>
				<span
					className={`absolute inset-0 flex items-center justify-center text-[10px] font-semibold uppercase tracking-wider transition-opacity duration-300 ${
						isOn ? "opacity-100 text-white" : "opacity-70 text-slate-700"
					}`}
				>
				</span>
			</span>
		</button>
	);
}
