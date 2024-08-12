import React from 'react';

interface CourseCardProps {
  title: string;
  level: number;
  icon: React.ReactNode;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, level, icon }) => {
  return (
    <div>
      <div className='text-xs font-bold text-gray-500 mb-2'>LEVEL {level}</div>
      <div
        className={`relative bg-white mb-4 flex items-center justify-center p-4 rounded-xl w-full aspect-square shadow border-2 border-gray-300`}
      >
        <div className="flex items-center justify-center w-full h-full">
          <div className="text-6xl">
            {icon}
          </div>
        </div>
      </div>

      <h3 className='font-semibold text-sm text-center'>{title}</h3>
    </div>
  );
};

export default CourseCard;
