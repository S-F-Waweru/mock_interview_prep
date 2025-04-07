import Agent from '@/components/Agent'
import { getCurrentUSer } from '@/lib/actions/auth.actions'
import React from 'react'

const page = async () => {
  const user = await getCurrentUSer()
  return (
    <>
    <h3>Interview Generation</h3>
{/* <Agent userName={user?.name} userId={user?.id} type="generate" /> */}

<Agent
        userName={user?.name!}
        userId={user?.id}
        // profileImage={user?.profileURL}
        type="generate"
      />
    </>

  )
}

export default page