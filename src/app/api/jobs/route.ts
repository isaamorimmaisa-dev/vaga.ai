import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q') || 'developer'

  const response = await fetch(
    `https://himalayas.app/jobs/api?q=${encodeURIComponent(query)}&limit=20`,
    { headers: { 'Accept': 'application/json' } }
  )

  const data = await response.json()

  const jobs = data.jobs?.map((job: any) => ({
    id: job.slug,
    title: job.title,
    company: job.companyName,
    location: job.locations?.[0] || 'Remote',
    type: job.jobType,
    salary_min: job.salaryMin,
    salary_max: job.salaryMax,
    description: job.excerpt?.slice(0, 300) + '...',
    url: `https://himalayas.app/jobs/${job.slug}`,
    logo: job.companyLogo,
    posted: job.createdAt
  })) || []

  return NextResponse.json({ jobs })
}
