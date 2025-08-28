
import React from 'react';

interface ContentHeaderProps {
  title: string;
  subtitle?: string;
}

const ContentHeader = ({ title, subtitle }: ContentHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-biodina-blue">{title}</h1>
      {subtitle && (
        <p className="text-gray-600 mt-2">{subtitle}</p>
      )}
    </div>
  );
};

export default ContentHeader;
