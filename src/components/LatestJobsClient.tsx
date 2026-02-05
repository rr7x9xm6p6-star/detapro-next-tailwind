
'use client';

import { useMemo, useState } from 'react';
import type { Job } from '@/lib/types';

/** Normaliseer naar lowercase + trim voor case-insensitive vergelijkingen */
function norm(v?: string) {
  return (v || '').trim().toLowerCase();
}

/** Unieke gesorteerde lijst uit array van (optionele) strings */
function uniqueSorted(arr: (string | undefined)[]) {
  const set = new Set(
    arr
      .filter(Boolean)
      .map((v) => (v as string).trim())
      .filter((v) => v.length > 0)
  );
  return Array.from(set).sort((a, b) => a.localeCompare(b, 'nl'));
}

export default function LatestJobsClient({ jobs }: { jobs: Job[] }) {
  const [discipline, setDiscipline] = useState<'all' | string>('all');
  const [location, setLocation] = useState<'all' | string>('all');

  // Dynamische sets voor filters
  const { disciplines, locations } = useMemo(() => {
    const disciplines = uniqueSorted(jobs.map((j) => j.discipline));
    const locations = uniqueSorted(jobs.map((j) => j.location));
    return { disciplines, locations };
  }, [jobs]);

  // Filter logic
  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const okD = discipline === 'all' || norm(j.discipline) === norm(discipline);
      const okL = location === 'all' || norm(j.location) === norm(location);
      return okD && okL;
    });
  }, [jobs, discipline, location]);

  return (
    <>
      {/* FILTERS */}
      <div className="panel">
        <div className="grid md:grid-cols-2 gap-4 items-center">
          {/* Discipline */}
          <div>
            <strong>Discipline</strong>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                className={`pill ${discipline === 'all' ? 'border-black' : ''}`}
                aria-pressed={discipline === 'all'}
                onClick={() => setDiscipline('all')}
              >
                Alle
              </button>
              {disciplines.map((d) => (
                <button
                  key={d}
                  className={`pill ${norm(d) === norm(discipline) ? 'border-black' : ''}`}
                  aria-pressed={norm(d) === norm(discipline)}
                  onClick={() => setDiscipline(d)}
                >
                  {d[0]?.toUpperCase() + d.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Locatie */}
          <div>
            <strong>Locatie</strong>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                className={`pill ${location === 'all' ? 'border-black' : ''}`}
                aria-pressed={location === 'all'}
                onClick={() => setLocation('all')}
              >
                Alle
              </button>
              {locations.map((l) => (
                <button
                  key={l}
                  className={`pill ${norm(l) === norm(location) ? 'border-black' : ''}`}
                  aria-pressed={norm(l) === norm(location)}
                  onClick={() => setLocation(l)}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* LIJST */}
      <div className="grid gap-2 mt-4">
        {filtered.map((j) => (
          <div key={j.id} className="job-row">
            <div className="flex items-center gap-3 min-w-0">
              <span className="inline-block w-2 h-2 rounded-full bg-black" aria-hidden="true" />
              <div className="min-w-0">
                <div className="font-semibold truncate"><a href={`/jobs/${j.slug}`}>{j.title}</a></div>
                <div className="meta"><a href={`/jobs/${j.slug}`}>
                  {j.location}
                  {j.workMode ? ` • ${j.workMode}` : ''}
                  {j.postedAt ? ` • Geplaatst: ${j.postedAt}` : ''}</a>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex gap-2 flex-wrap">
                {j.discipline && (
                  <span className="badge">{j.discipline[0].toUpperCase() + j.discipline.slice(1)}</span>
                )}
                {j.contract && <span className="badge">{j.contract}</span>}
              </div>
              <a href={`/jobs/${j.slug}`} className="btn">Bekijk</a>
              <a href="#solliciteer" className="btn btn-solid">Solliciteer</a>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="border border-dashed border-border rounded-xl p-4 text-neutral-600">
          Geen resultaten met deze filters.
        </div>
      )}

      <div className="flex justify-center mt-4">
        <a className="btn" href="#solliciteer">Open sollicitatie</a>
      </div>
    </>
  );
}
