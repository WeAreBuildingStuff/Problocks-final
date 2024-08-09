"use client"
import React from 'react';
import PathHeader from '@/components/custom/PatherHeader';
import CourseCard from '@/components/custom/CourseCard';
import { Separator } from '@/components/ui/separator';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { useRouter } from 'next/navigation';

const carCourses = [
  { id: 1, title: 'Zoom Zoom Forward!', level: 1, icon: '🚗' },
  { id: 2, title: 'Beep Beep Backward!', level: 1, icon: '🔙' },
  { id: 3, title: 'Spin Like a Top!', level: 2, icon: '🌀' },
  { id: 4, title: 'Zig-Zag Adventure', level: 2, icon: '↩️' },
  { id: 5, title: 'Loopy Laps', level: 3, icon: '🔁' },
  { id: 6, title: 'Race to the Finish!', level: 3, icon: '🏁' }
];

const tileCourses = [
  { id: 1, title: 'Connect the Dots', level: 1, icon: '🔗' },
  { id: 2, title: 'Grid Maze Craze', level: 1, icon: '🧩' },
  { id: 3, title: 'Pixel Art Party', level: 2, icon: '🎨' },
  { id: 4, title: 'Shape Shifter', level: 2, icon: '🔶' },
  { id: 5, title: 'Pattern Power', level: 3, icon: '🔄' },
  { id: 6, title: 'Tile Treasure Hunt', level: 3, icon: '🗺️' }
];

const drawBotCourses = [
  { id: 1, title: 'Doodle Bot Basics', level: 1, icon: '✏️' },
  { id: 2, title: 'Squiggle and Swirl', level: 1, icon: '〰️' },
  { id: 3, title: 'Shape Creator', level: 2, icon: '🔷' },
  { id: 4, title: 'Artsy Loops', level: 2, icon: '🔄' },
  { id: 5, title: 'Masterpiece Maker', level: 3, icon: '🖼️' },
  { id: 6, title: 'Draw Bot Challenge', level: 3, icon: '🏆' }
];

const robotCarCourses = [
  { id: 1, title: 'Robot Roll-Out', level: 1, icon: '🤖' },
  { id: 2, title: 'Robo-Racer', level: 1, icon: '🏎️' },
  { id: 3, title: 'Bot Obstacle Course', level: 2, icon: '🚧' },
  { id: 4, title: 'Robo-Dance Party', level: 2, icon: '💃' },
  { id: 5, title: 'Mission: Impossible Bot', level: 3, icon: '🕵️' },
  { id: 6, title: 'Robot Car Olympics', level: 3, icon: '🥇' }
];

const Page: React.FC = () => {
  const router = useRouter()
  return (
    <div className='bg-white'>
      <main className='mx-auto px-8 md:px-12 lg:px-24 py-8'>
        <h1 className='text-3xl font-bold mb-2'>Code Adventures</h1>
        <p className='text-gray-600 mb-8'>Explore exciting coding challenges!</p>

        <div className='flex flex-col gap-16 mt-12'>
          <div>
            <PathHeader
              title='Vroom Vroom Coding!'
              description='Drive your digital car with blocks of code!'
            />
            <div className='bg-gray-100 py-6 rounded-lg mt-6 px-16'>
              <Carousel className='w-full p-2'>
                <CarouselContent className='-ml-1 gap-4'>
                  {carCourses.map((course, index) => (
                    <CarouselItem
                      key={index}
                      className='pl-1 basis-full md:basis-1/3 lg:basis-1/4 xl:basis-1/5'
                    >
                      <div className='p-1 hover:cursor-pointer' onClick={() => router.push(`courses/car/${index}`)}>
                        <CourseCard
                          title={course.title}
                          level={course.level}
                          icon={course.icon}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>

          <Separator />

          <div>
            <PathHeader
              title='Tile Tastic Drawing'
              description='Create amazing art on a grid with code blocks!'
            />
            <div className='bg-gray-100 py-6 rounded-lg mt-6 px-16'>
              <Carousel className='w-full p-2'>
                <CarouselContent className='-ml-1 gap-4'>
                  {tileCourses.map((course, index) => (
                    <CarouselItem
                      key={index}
                      className='pl-1 basis-full md:basis-1/3 lg:basis-1/4 xl:basis-1/5'
                    >
                      <div className='p-1 hover:cursor-pointer' onClick={() => router.push(`courses/tile/${index}`)}>
                        <CourseCard
                          title={course.title}
                          level={course.level}
                          icon={course.icon}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>

          <Separator />

          <div>
            <PathHeader
              title='Digital Draw Bot'
              description='Command your virtual robot to create cool drawings!'
            />
            <div className='bg-gray-100 py-6 rounded-lg mt-6 px-16'>
              <Carousel className='w-full p-2'>
                <CarouselContent className='-ml-1 gap-4'>
                  {drawBotCourses.map((course, index) => (
                    <CarouselItem
                      key={index}
                      className='pl-1 basis-full md:basis-1/3 lg:basis-1/4 xl:basis-1/5'
                    >
                      <div className='p-1 hover:cursor-pointer' onClick={() => router.push(`courses/draw/${index}`)}>
                        <CourseCard
                          title={course.title}
                          level={course.level}
                          icon={course.icon}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>

          <Separator />

          <div>
            <PathHeader
              title='Real Robot Car Adventure'
              description='Control a physical robot car with your awesome code!'
            />
            <div className='bg-gray-100 py-6 rounded-lg mt-6 px-16'>
              <Carousel className='w-full p-2'>
                <CarouselContent className='-ml-1 gap-4'>
                  {robotCarCourses.map((course, index) => (
                    <CarouselItem
                      key={index}
                      className='pl-1 basis-full md:basis-1/3 lg:basis-1/4 xl:basis-1/5'
                    >
                      <div className='p-1 hover:cursor-pointer' onClick={() => router.push(`courses/bot/${index}`)}>
                        <CourseCard
                          title={course.title}
                          level={course.level}
                          icon={course.icon}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;