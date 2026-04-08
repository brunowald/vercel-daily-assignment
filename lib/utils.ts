import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type AnyFunction = (...args: any[]) => any;

export function debounce<FunctionReturnType extends AnyFunction>(fn: AnyFunction, delay: number): FunctionReturnType {
	let timeout: NodeJS.Timeout;

	return function (...args: any[]) {
		if (timeout) clearTimeout(timeout);

		timeout = setTimeout(() => fn(...args), delay);
	} as unknown as FunctionReturnType;
}
