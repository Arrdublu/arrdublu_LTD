'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';


// Mock data for archived projects for demonstration purposes
const archivedProjects: Record<string, { title: string; description: string, category: string }> = {
  '2023-10-26': {
    title: 'Project Alpha Launch',
    description: 'The successful launch campaign for Project Alpha, a milestone in our creative journey that set a new standard for engagement.',
    category: 'Creative Campaign'
  },
  '2022-05-15': {
    title: 'Brand Relaunch for InnovateCo',
    description: 'A complete brand overhaul that successfully repositioned InnovateCo as a market leader, resulting in a 200% increase in brand recognition.',
    category: 'Branding'
  },
  '2021-11-01': {
    title: 'The "FutureScapes" Viral Video',
    description: 'A visionary viral video campaign that garnered over 10 million views in its first week, demonstrating the power of compelling storytelling.',
    category: 'Video Production'
  },
};

export default function ArchivesPage() {
  const [date, setDate] = useState<Date | undefined>(new Date('2023-10-26'));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const selectedDateString = date ? format(date, 'yyyy-MM-dd') : '';
  const project = archivedProjects[selectedDateString as keyof typeof archivedProjects];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Project Archives
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-foreground/80">
          Explore our history of iconic projects. Select a date on the calendar to view our achievements.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="md:col-span-1 flex justify-center">
            <Card className="p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="p-0"
                    disabled={(d) => d > new Date()}
                />
            </Card>
        </div>
        <div className="md:col-span-2">
          <Card className="h-full min-h-[250px] flex flex-col justify-center shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDateString}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {!isMounted ? (
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                ) : project ? (
                  <>
                    <CardHeader>
                      <CardDescription>{format(date!, 'MMMM d, yyyy')} | {project.category}</CardDescription>
                      <CardTitle className="font-headline text-2xl text-primary">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{project.description}</p>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="text-center">
                    <h3 className="text-xl font-semibold text-muted-foreground">No project archived for this date.</h3>
                    <p className="text-sm text-muted-foreground/80 mt-2">Please select another date.</p>
                  </CardContent>
                )}
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </div>
  );
}
