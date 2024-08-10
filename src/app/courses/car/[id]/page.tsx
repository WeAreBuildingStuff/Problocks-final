import ActivityCard from '@/components/custom/ActivityCard';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { carActivitiesData } from '@/constants/courses/carActivitiesData';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps): JSX.Element {
  const activitySet = carActivitiesData.find((set) => set.id === params.id);

  if (!activitySet) {
    return <p>Activity set not found</p>;
  }

  return (
    <main className='w-screen flex bg-neutral-50 px-24 pt-12'>
      <div className='container mx-auto px-24 py-8'>
        <div className='mb-6'>
          <h2 className='text-3xl font-bold'>{activitySet.title}</h2>
          <p className='text-lg text-gray-600'>Control a physical robot car with your code</p>
        </div>
        <div className='flex flex-row'>
          <div className='w-1/2'>
            <div className='w-full p-2 sticky top-8 overflow-hidden rounded-lg shadow-md border-2 border-gray-300 group hover:shadow-lg transition-transform duration-200 ease-in-out'>
              <div className='p-4 bg-background'>
                <h3 className='text-xl font-bold'>Level 1: {activitySet.title}</h3>
                <p className='text-sm text-muted-foreground'>
                  Begin your journey with a real robot car! Learn how to connect to your car,
                  make it move, and navigate simple obstacles. Get ready for an exciting
                  adventure in the physical world of robotics!
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-col w-1/2 items-center overflow-x-auto scrollbar-hide'>
            {activitySet.activities.map((activity, index) => (
              <React.Fragment key={index}>
                <ActivityCard title={activity.title} description={activity.description} />
                {index < activitySet.activities.length - 1 && (
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