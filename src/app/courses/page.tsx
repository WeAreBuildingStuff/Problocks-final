"use client"
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { MonitorIcon, MicIcon, RobotIcon, CarIcon } from "@/components/custom/sub-components/Icons";
import CourseCard from '@/components/custom/CourseCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { useRouter } from 'next/navigation';

const courseCategories = [
  {
    title: 'Vroom Vroom Coding!',
    description: 'Drive your digital car with blocks of code!',
    icon: <CarIcon className="h-6 w-6 text-white" />,
    courses: [
      { id: 1, title: 'Zoom Zoom Forward!', level: 1, icon: '🚗' },
      { id: 2, title: 'Beep Beep Backward!', level: 1, icon: '🔙' },
      { id: 3, title: 'Spin Like a Top!', level: 2, icon: '🌀' },
      { id: 4, title: 'Zig-Zag Adventure', level: 2, icon: '↩️' },
      { id: 5, title: 'Loopy Laps', level: 3, icon: '🔁' },
      { id: 6, title: 'Race to the Finish!', level: 3, icon: '🏁' }
    ],
    route: 'car'
  },
  {
    title: 'Tile Tastic Drawing',
    description: 'Create amazing art on a grid with code blocks!',
    icon: <MonitorIcon className="h-6 w-6 text-white" />,
    courses: [
      { id: 1, title: 'Connect the Dots', level: 1, icon: '🔗' },
      { id: 2, title: 'Grid Maze Craze', level: 1, icon: '🧩' },
      { id: 3, title: 'Pixel Art Party', level: 2, icon: '🎨' },
      { id: 4, title: 'Shape Shifter', level: 2, icon: '🔶' },
      { id: 5, title: 'Pattern Power', level: 3, icon: '🔄' },
      { id: 6, title: 'Tile Treasure Hunt', level: 3, icon: '🗺️' }
    ],
    route: 'tile'
  },
  {
    title: 'Digital Draw Bot',
    description: 'Command your virtual robot to create cool drawings!',
    icon: <RobotIcon className="h-6 w-6 text-white" />,
    courses: [
      { id: 1, title: 'Doodle Bot Basics', level: 1, icon: '✏️' },
      { id: 2, title: 'Squiggle and Swirl', level: 1, icon: '〰️' },
      { id: 3, title: 'Shape Creator', level: 2, icon: '🔷' },
      { id: 4, title: 'Artsy Loops', level: 2, icon: '🔄' },
      { id: 5, title: 'Masterpiece Maker', level: 3, icon: '🖼️' },
      { id: 6, title: 'Draw Bot Challenge', level: 3, icon: '🏆' }
    ],
    route: 'draw'
  }
];

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-green-400 to-green-600">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
                Code Adventures Await!
              </h1>
              <p className="text-xl text-white md:text-2xl">
                Explore exciting coding challenges and unleash your creativity!
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 space-y-16">
            {courseCategories.map((category, index) => (
              <div key={index} className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center">
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold tracking-tighter">{category.title}</h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <div className="bg-gray-100 py-6 rounded-xl px-4 md:px-16">
                  <Carousel className="w-full">
                    <CarouselContent className="-ml-2 md:-ml-4">
                      {category.courses.map((course, courseIndex) => (
                        <CarouselItem key={courseIndex} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                          <div 
                            className="p-1 hover:cursor-pointer" 
                            onClick={() => router.push(`courses/${category.route}/${courseIndex}`)}
                          >
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
            ))}
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 ProBlocks. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Page;