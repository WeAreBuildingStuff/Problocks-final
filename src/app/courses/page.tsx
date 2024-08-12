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
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useRouter } from 'next/navigation';
import {
  ForwardAndBackwardIcon,
  SimpleTurnsIcon,
  AdvancedTurnsIcon,
  LoopsAndCircuitsIcon,
  ComplexRoutesIcon,
  UltimateDrivingChallengeIcon,
  PenMovementIcon,
  ComplexTurnsIcon,
  SimpleShapesIcon,
  LoopingPatternsIcon,
  ComplexPatternsIcon,
  VeryComplexPatternsIcon,
  SingleConnectionsIcon,
  ThreeToFourConnectionsIcon,
  ComplexShapesIcon,
} from '@/components/custom/sub-components/coursesIcons';

const courseCategories = [
  {
    title: 'Car Code Challenges',
    description: 'Master the road by coding your car’s every move!',
    icon: <ForwardAndBackwardIcon className="h-6 w-6 text-white" />,
    courses: [
      { id: 1, title: 'Forward and Backward Drives', level: 1, icon: <ForwardAndBackwardIcon className="h-24 w-24 text-green-500" /> },
      { id: 2, title: 'Simple Turns', level: 2, icon: <SimpleTurnsIcon className="h-24 w-24 text-green-500" /> },
      { id: 3, title: 'Advanced Turns', level: 2, icon: <AdvancedTurnsIcon className="h-24 w-24 text-green-500" /> },
      { id: 4, title: 'Loops and Circuits', level: 3, icon: <LoopsAndCircuitsIcon className="h-24 w-24 text-green-500" /> },
      { id: 5, title: 'Complex Routes', level: 3, icon: <ComplexRoutesIcon className="h-24 w-24 text-green-500" /> },
      { id: 6, title: 'Ultimate Driving Challenge', level: 4, icon: <UltimateDrivingChallengeIcon className="h-24 w-24 text-green-500" /> }
    ],
    route: 'car'
  },
  {
    title: 'Drawing Bot Adventures',
    description: 'Guide your digital pen to create amazing drawings!',
    icon: <PenMovementIcon className="h-6 w-6 text-white" />,
    courses: [
      { id: 1, title: 'Forwards and Backwards, Pen Down and Up', level: 1, icon: <PenMovementIcon className="h-24 w-24 text-green-500" /> },
      { id: 2, title: 'Simple Turns (2 Max)', level: 2, icon: <SimpleTurnsIcon className="h-24 w-24 text-green-500" /> },
      { id: 3, title: 'Complex Turns (4 Max)', level: 3, icon: <ComplexTurnsIcon className="h-24 w-24 text-green-500" /> },
      { id: 4, title: 'Drawing Simple Shapes', level: 4, icon: <SimpleShapesIcon className="h-24 w-24 text-green-500" /> },
      { id: 5, title: 'Creating Loops', level: 5, icon: <LoopingPatternsIcon className="h-24 w-24 text-green-500" /> },
      { id: 6, title: 'Complex Patterns', level: 6, icon: <ComplexPatternsIcon className="h-24 w-24 text-green-500" /> },
      { id: 7, title: 'Very Complex Patterns', level: 7, icon: <VeryComplexPatternsIcon className="h-24 w-24 text-green-500" /> }
    ],
    route: 'draw'
  },
  {
    title: 'Tile Tastic Challenges',
    description: 'Build and design with tile-based coding!',
    icon: <SingleConnectionsIcon className="h-6 w-6 text-white" />,
    courses: [
      { id: 1, title: 'Single Connections', level: 1, icon: <SingleConnectionsIcon className="h-24 w-24 text-green-500" /> },
      { id: 2, title: '3 to 4 Connections', level: 2, icon: <ThreeToFourConnectionsIcon className="h-24 w-24 text-green-500" /> },
      { id: 3, title: 'Simple Shapes', level: 3, icon: <SimpleShapesIcon className="h-24 w-24 text-green-500" /> },
      { id: 4, title: 'Complex Shapes', level: 4, icon: <ComplexShapesIcon className="h-24 w-24 text-green-500" /> },
      { id: 5, title: 'Complex Patterns', level: 5, icon: <ComplexPatternsIcon className="h-24 w-24 text-green-500" /> }
    ],
    route: 'tile'
  },
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
                <div className="bg-gray-100 py-6 rounded-xl px-16">
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
