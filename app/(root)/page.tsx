/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/actions/auth.actions'
import {getInterviewsByUserId, getLatestInterviews } from '@/lib/actions/general.actions'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async() => {
  const user = await getCurrentUser()

  console.log(user?.id, "this is the userd!!!!!!!!!")
  
  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id!),
    await getLatestInterviews({userId : user?.id!})
  ])

  console.log(latestInterviews)

  const hasPastInterviews = userInterviews?.length > 0 ;
  const hasUpcomingInterviews = latestInterviews?.length > 0;
  return (
    <> 
    <section className="card-cta">
       <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>

          <p className='text-lg'>
            Practice on real Interview questions & get instant Feedback
          </p>

          <Button asChild className='btn-primary max-sm:w-full'>
              <Link href="/interview"> Start an Interview</Link>
          </Button>
       </div>

       <Image src="/robot.png" alt='robo-guy' className='max-sm:hidden' height={400} width={400}/>
       </section>

       <section className='flex flex-col gap-6 mt-8'>
          <h2>
            Your Interviews
          </h2>
          <div className='interviews-section'>
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
           
          </div>
       </section>
       <section className='flex flex-col gap-6 mt-8'>
        <h2>
          Take an interview.
        </h2>
        <div className='interviews-section'>
        {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
        </div>
        </section> 

       </>
  )
}

export default page