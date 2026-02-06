
import { getLatestJobs, getRevalidate } from '@/lib/contentful'
import LatestJobsClient from '@/components/LatestJobsClient'
import SectionHeading from '@/components/SectionHeading'

export const revalidate = getRevalidate()

export default async function LatestJobs(){
  const jobs = await getLatestJobs(8)
  return (
    <section id="latest-jobs" className="container section">
        <div className="mb-8">
        <SectionHeading
  title="Laatste vacatures"
  subtitle="De meest recente vacatures. Filter snel op discipline en locatie."
/>
</div>
      <LatestJobsClient jobs={jobs} />
    </section>
  )
}
