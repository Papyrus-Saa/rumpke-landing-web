import React from 'react';

const BetaBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <span
      className={`duration-100 inline-block text-[10px] tracking-tight px-2 py-0.5 rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100 ${className}`}
      aria-hidden
    >
      Beta
    </span>
  );
};

export default BetaBadge;
