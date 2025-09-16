'use client'

import React, { ChangeEvent } from "react";

interface CookieInputProps {
  name: string;
  checked: boolean;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}
const CookieInput: React.FC<CookieInputProps> = ({
  name,
  checked,
  label,
  onChange,
  disabled = false,

}) => (
  <label className="flex items-center gap-1 lg:mb-1">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className="accent-mint-600"
    />
    {label}
  </label>
);

export default CookieInput;
