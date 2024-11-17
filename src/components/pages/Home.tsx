import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plane, Sparkles, Clock, Users, Coins, Brain, CloudIcon as Firebase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGeminiEffect } from '../ui/google-gemini-effect';
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center gap-2 font-semibold" to="#">
          <Plane className="h-6 w-6" />
          <span>AI Trip Planner</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="#">
            How it Works
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/login">
            Sign In
          </Link>
        </nav>
      </header>
      <main className="w-full">
        <section className="w-full grid place-items-center">
          <GoogleGeminiEffectWrap>
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Plan Your Perfect Trip with AI
                  </h1>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Powered by Gemini AI, create personalized travel itineraries tailored to your preferences. Smart,
                    simple, and designed for modern travelers.
                  </p>
                </div>
                <div className="space-x-4">
                  <Link to="/login">
                    <Button size="lg">Get Started</Button>
                  </Link>
                  <Link to="#smart-travel-planning">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </GoogleGeminiEffectWrap>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted grid place-items-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">Powered by AI</div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Smart Travel Planning Made Simple
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our AI understands your preferences and creates the perfect itinerary. Just tell us where you want to
                  go.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardContent className="p-6">
                    <Clock className="h-12 w-12 mb-4" />
                    <h3 className="font-bold">Smart Duration</h3>
                    <p className="text-sm text-muted-foreground">
                      Optimal trip duration based on your destination and preferences
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <Users className="h-12 w-12 mb-4" />
                    <h3 className="font-bold">Group Planning</h3>
                    <p className="text-sm text-muted-foreground">Perfect for solo travelers or groups of any size</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <Coins className="h-12 w-12 mb-4" />
                    <h3 className="font-bold">Budget Friendly</h3>
                    <p className="text-sm text-muted-foreground">Plans that fit your budget, from economy to luxury</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <Brain className="h-12 w-12 mb-4" />
                    <h3 className="font-bold">AI Powered</h3>
                    <p className="text-sm text-muted-foreground">Gemini AI creates personalized recommendations</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 grid place-items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Beautiful Interface</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  A clean, intuitive interface that makes trip planning a breeze
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                alt="Trip Dashboard"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="400"
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Md8Kx0GtQ2DMwYBDyBZBMnoQmChQsM.png"
                width="600"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Trip Dashboard</h3>
                      <p className="text-muted-foreground">
                        Keep track of all your trips in one place with our intuitive dashboard
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Smart Organization</h3>
                      <p className="text-muted-foreground">All your trip details organized and easily accessible</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t grid place-items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Powered by Advanced Technology</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Built with cutting-edge tools and APIs for the best experience
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardContent className="flex flex-col items-center space-y-2 p-6">
                    <Sparkles className="h-12 w-12" />
                    <h3 className="text-xl font-bold">Gemini AI</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Advanced AI for intelligent trip planning and recommendations
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center space-y-2 p-6">
                    <Firebase className="h-12 w-12" />
                    <h3 className="text-xl font-bold">Firebase</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Secure authentication and real-time data storage
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center space-y-2 p-6">
                    <Plane className="h-12 w-12" />
                    <h3 className="text-xl font-bold">Travel API</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Real-time travel data and destination information
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted grid place-items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Start Planning?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Join thousands of travelers who plan their trips with AI
                </p>
              </div>
              <Link to="/login">
                <Button size="lg" className="mt-4">
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2024 AI Trip Planner. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link to="#">
            <div className="text-xs hover:underline underline-offset-4">Terms of Service</div>
          </Link>
          <Link to="#">
            <div className="text-xs hover:underline underline-offset-4">Privacy</div>
          </Link>
        </nav>
      </footer>
    </div>
  );
}

export function GoogleGeminiEffectWrap({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div
      className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        pathLengths={[pathLengthFirst, pathLengthSecond, pathLengthThird, pathLengthFourth, pathLengthFifth]}
      >
        {children}
      </GoogleGeminiEffect>
    </div>
  );
}
