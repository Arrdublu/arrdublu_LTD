
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Briefcase } from 'lucide-react';
import Link from 'next/link';

const jobPostings = [
  {
    id: 'dev-01',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'We are seeking an experienced Frontend Developer to build and maintain our client-facing applications. You will work with modern technologies like React, Next.js, and TypeScript to create beautiful and performant user experiences.',
  },
  {
    id: 'seo-01',
    title: 'SEO Specialist',
    department: 'Marketing',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'Join our marketing team to drive organic growth through strategic SEO initiatives. You will be responsible for keyword research, on-page optimization, link building, and performance analysis.',
  },
  {
    id: 'design-01',
    title: 'UI/UX Designer',
    department: 'Creative',
    location: 'Remote',
    type: 'Contract',
    description: 'We are looking for a talented UI/UX Designer to create intuitive and visually appealing interfaces for our web and mobile products. A strong portfolio is a must.',
  },
  {
    id: 'video-editor-01',
    title: 'Video Editor',
    department: 'Creative',
    location: 'Remote',
    type: 'Freelance',
    description: 'We are looking for a creative Video Editor to assemble and edit raw footage into a polished final product that aligns with the project\'s vision. Proficiency in Adobe Premiere Pro and After Effects is required.',
  },
  {
    id: 'model-01',
    title: 'Lifestyle Model',
    department: 'Lifestyle',
    location: 'Project-based',
    type: 'Part-time',
    description: 'Seeking models for various lifestyle and product photoshoots. We welcome diverse looks and all levels of experience. Please provide a portfolio or headshots with your application.',
  },
];

export function JobList() {
  const [selectedJob, setSelectedJob] = useState(jobPostings[0]);

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <div className="flex flex-col gap-4">
          {jobPostings.map((job) => (
            <button
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className={`text-left p-4 rounded-lg border transition-all ${
                selectedJob.id === job.id
                  ? 'bg-primary/10 border-primary shadow-md'
                  : 'hover:bg-muted/50 hover:border-muted-foreground/20'
              }`}
            >
              <h3 className="font-headline font-semibold text-primary">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.department}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="md:col-span-2">
        {selectedJob && (
          <Card className="sticky top-24 shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{selectedJob.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                <div className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4" />
                  <span>{selectedJob.department}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedJob.location}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm text-foreground/90 max-w-none">
                <p>{selectedJob.description}</p>
              </div>
              <div className="mt-4">
                <Badge variant="secondary">{selectedJob.type}</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <a href={`mailto:hi@arrdublu.us?subject=Application for ${selectedJob.title}`}>
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
