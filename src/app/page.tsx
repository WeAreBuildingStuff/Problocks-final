'use client';
import Link from "next/link"
import Image from "next/image"
import { MonitorIcon, MicIcon, RobotIcon } from "@/components/custom/sub-components/Icons";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-green-400 to-green-600">
          <div className="container px-4 md:px-6 grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
                Empower kids to code through imaginative, hands-on learning
              </h1>
              <p className="text-lg text-white">
                ProBlocks makes coding fun and accessible for kids using tangible paper blocks and interactive digital experiences.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-green-600 shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Get Started
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white hover:text-green-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Learn More
                </Link>
              </div>
            </div>
            <Image
              src="/problocks-logo-dark-text.svg"
              width={400}
              height={400}
              alt="ProBlocks Logo"
              className="mx-auto shadow-xl bg-white"
            />
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Explore Our Learning Adventures
              </h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                Discover exciting ways to learn coding with ProBlocks&apos; innovative approach.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <a href="/magic-voice-quests" className="block bg-muted rounded-lg p-6 space-y-4 hover:bg-muted-hover">
                <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center">
                  <MicIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Magic Voice Quests</h3>
                <p className="text-muted-foreground">
                  Use your voice to command and control the digital world. Solve puzzles and create interactive stories using voice commands.
                </p>
              </a>
              <a href="/robot-block-quests" className="block bg-muted rounded-lg p-6 space-y-4 hover:bg-muted-hover">
                <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center">
                  <RobotIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Robot Block Quests</h3>
                <p className="text-muted-foreground">
                  Program a robot using paper blocks. Control a drawing robot, navigate obstacle courses, and perform creative tasks.
                </p>
              </a>
              <a href="/virtual-robot-quests" className="block bg-muted rounded-lg p-6 space-y-4 hover:bg-muted-hover">
                <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center">
                  <MonitorIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Virtual Robot Quests</h3>
                <p className="text-muted-foreground">
                  Utilize paper blocks to program a virtual robot in a digital environment. Draw shapes, solve mazes, and complete interactive simulations.
                </p>
              </a>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-green-500 to-green-600">
          <div className="container px-4 md:px-6 grid gap-8 md:grid-cols-2 items-center">
            <Image
              src="/placeholder.svg"
              width={400}
              height={400}
              alt="Coding Kids"
              className="mx-auto"
            />
            <div className="space-y-4 text-white">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Why Choose ProBlocks?
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Hands-on learning with tangible paper blocks</li>
                <li>AI-powered assistance for personalized guidance</li>
                <li>Cross-platform accessibility from any device</li>
                <li>Engaging challenges that grow with your skills</li>
                <li>Fun and interactive way to learn coding fundamentals</li>
              </ul>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-green-600 shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Start Learning
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white hover:text-green-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 ProBlocks. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}