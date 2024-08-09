import ActivityCard from '@/components/custom/ActivityCard';
import { Separator } from '@/components/ui/separator';
import React from 'react';

const activities = [
  { title: 'Pen Down and Move', description: 'Learn to start drawing with your bot!' },
  { title: 'Draw a Straight Line', description: 'Create your first line on the canvas' },
  { title: 'Make a Square', description: 'Combine movements to draw a shape' },
  { title: 'Doodle Challenge', description: `Create a fun doodle using what you've learned` }
];

export default function Page(): JSX.Element {
  return (
    <main className='w-screen flex bg-neutral-50 px-24 pt-12'>
      <div className='container mx-auto px-24 py-8'>
        <div className='mb-6'>
          <h2 className='text-3xl font-bold'>Digital Draw Bot</h2>
          <p className='text-lg text-gray-600'>Create amazing art with your coding skills</p>
        </div>
        <div className='flex flex-row'>
          <div className='w-1/2'>
            <div className='w-full p-2 sticky top-8 overflow-hidden rounded-lg shadow-md border-2 border-gray-300 group hover:shadow-lg transition-transform duration-200 ease-in-out'>
              <div className='p-4 bg-background'>
                <h3 className='text-xl font-bold'>Level 1: Doodle Bot Basics ✏️</h3>
                <p className='text-sm text-muted-foreground'>
                  Learn to control your virtual drawing bot and create simple shapes and lines. 
                  Start your journey to becoming a digital artist!
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