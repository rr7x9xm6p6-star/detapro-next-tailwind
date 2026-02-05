
import { getLatestJobs, getRevalidate } from '@/lib/contentful'
import LatestJobsClient from '@/components/LatestJobsClient'

export const revalidate = getRevalidate()

export default async function LatestJobs(){
  const jobs = await getLatestJobs(8)
  return (
    <section id="latest-jobs" className="container section">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-2xl font-semibold">Laatste vacatures</h2>
        <p className="text-neutral-600 max-w-2xl">De meest recente vacatures. Filter snel op discipline en locatie.</p>
      </div>
      <LatestJobsClient jobs={jobs} />
    </section>
  )
}
