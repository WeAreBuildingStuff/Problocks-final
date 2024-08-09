import ActivityCard from '@/components/custom/ActivityCard';
import { Separator } from '@/components/ui/separator';
import React from 'react';

const activities = [
  { title: 'Connect Two Dots', description: 'Learn to create your first connection' },
  { title: 'Make a Triangle', description: 'Connect three points to form a shape' },
  { title: 'Create a Square', description: 'Master four-point connections' },
  { title: 'Pixel Art Challenge', description: 'Design a simple image using grid connections' },
];

export default function Page(): JSX.Element {
  return (
    <main className='w-screen flex bg-neutral-50 px-24 pt-12'>
      <div className='container mx-auto px-24 py-8'>
        <div className='mb-6'>
          <h2 className='text-3xl font-bold'>Tile Tastic Drawing</h2>
          <p className='text-lg text-gray-600'>Create pixel art masterpieces on a grid</p>
        </div>
        <div className='flex flex-row'>
          <div className='w-1/2'>
            <div className='w-full p-2 sticky top-8 overflow-hidden rounded-lg shadow-md border-2 border-gray-300 group hover:shadow-lg transition-transform duration-200 ease-in-out'>
              <div className='p-4 bg-background'>
                <h3 className='text-xl font-bold'>Level 1: Connect the Dots 🔗</h3>
                <p className='text-sm text-muted-foreground'>
                  Learn to connect points on a grid to create simple shapes and patterns. 
                  Start your journey into the world of pixel art and grid-based drawing!
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