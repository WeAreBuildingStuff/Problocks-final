import React from 'react';
import Link from 'next/link';

interface ActivityCardProps {
  title: string;
  description: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({title, description}) => {
  return (
    <div className='w-72 p-2 relative overflow-hidden rounded-lg shadow-md border-2 border-gray-300 group hover:shadow-lg hover:-translate-y-1 transition-transform duration-200 ease-in-out'>
      <Skeleton />
      {/* <img
        src="/placeholder.svg"
        alt="Level 1 Thumbnail"
        width={300}
        height={200}
        className="object-cover w-full h-48"
      /> */}
      <div className='p-4 bg-background'>
        <h3 className='text-xl font-bold'> {title} </h3>
        <p className='text-sm text-muted-foreground'>
          {description}
        </p>
      </div>
    </div>
  );
};

const Skeleton = () => (
  <div className='flex flex-1 w-full aspect-video rounded-lg bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100'></div>
);

export default ActivityCard;
