import React from 'react';

interface PathHeaderProps {
  title: string;
  description: string;
}

const PathHeader: React.FC<PathHeaderProps> = ({ title, description }) => {
  return (
    <div className='flex items-center justify-between px-8'>
      <div className='flex flex-grow w-full'>
        <div className='w-full flex flex-col gap-2'>
          <h2 className='text-base font-bold w-full lg:w-1/3'>{title}</h2>
          <p className='text-gray-600 text-sm w-full lg:w-2/3'>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PathHeader;
