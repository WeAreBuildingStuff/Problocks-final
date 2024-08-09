import ActivityCard from '@/components/custom/ActivityCard';
import { Separator } from '@/components/ui/separator';
import React from 'react';

const activities = [
  { title: 'Move Forward 5 Units', description: 'Learn to make your car go forward!' },
  { title: 'Move Forward 10 Units', description: 'Can you go even further?' },
  { title: 'Zoom to the Finish Line', description: 'Race to the end in one go!' },
  { title: 'Navigate the Straight Path', description: 'Avoid obstacles while moving forward' },
];

export default function Page(): JSX.Element {
  return (
    <main className='w-screen flex bg-neutral-50 px-24 pt-12'>
      <div className='container mx-auto px-24 py-8'>
        <div className='mb-6'>
          <h2 className='text-3xl font-bold'>Vroom Vroom Coding!</h2>
          <p className='text-lg text-gray-600'>Master the art of moving your car forward</p>
        </div>
        <div className='flex flex-row'>
          <div className='w-1/2'>
            <div className='w-full p-2 sticky top-8 overflow-hidden rounded-lg shadow-md border-2 border-gray-300 group hover:shadow-lg transition-transform duration-200 ease-in-out'>
              <div className='p-4 bg-background'>
                <h3 className='text-xl font-bold'>Level 1: Zoom Zoom Forward! 🚗</h3>
                <p className='text-sm text-muted-foreground'>
                  Learn to make your digital car zoom forward using simple coding blocks. 
                  Master the basics of movement and distance!
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-col w-1/2 items-center overflow-x-auto scrollbar-hide'>
            {activities.map((activity, index) => (
              <React.Fragment key={index}>
                <ActivityCard title={activity.title} description={activity.description} />
                {index < activities.length - 1 && (
                  <Separator orientation='vertical' className='h-8' />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}