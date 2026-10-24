import { useState } from 'react'
import type { FormEvent } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, Route, Switch } from 'wouter'
import './App.css'
import './forms.css'

type AccessReview = { id: number; title: string; owner: string; status: 'Draft' | 'Review' | 'Approved'; priority: 'Low' | 'Medium' | 'High' }
const api = '/api/items'

async function readEvidence(): Promise<AccessReview[]> {
  const response = await fetch(api)
  if (!response.ok) throw new Error('The space traffic coordination service is unavailable.')
  return response.json()
}

async function createEvidence(item: Omit<AccessReview, 'id'>): Promise<AccessReview> {
  const response = await fetch(api, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) })
  if (!response.ok) throw new Error('The coordination case could not be saved.')
  return response.json()
}

async function advanceEvidence(item: AccessReview): Promise<AccessReview> {
  const status = item.status === 'Draft' ? 'Review' : 'Approved'
  const response = await fetch(`${api}/${item.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...item, status }) })
  if (!response.ok) throw new Error('The coordination case could not be updated.')
  return response.json()
}

function Register() {
  const cache = useQueryClient()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { data = [], isPending, error } = useQuery({ queryKey: ['evidence'], queryFn: readEvidence })
  const save = useMutation({ mutationFn: createEvidence, onSuccess: () => { cache.invalidateQueries({ queryKey: ['evidence'] }); setOpen(false) } })
  const advance = useMutation({ mutationFn: advanceEvidence, onSuccess: () => cache.invalidateQueries({ queryKey: ['evidence'] }) })
  const visible = data.filter((item) => `${item.title} ${item.owner} ${item.status}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => a.title.localeCompare(b.title))
  const approved = data.filter((item) => item.status === 'Approved').length
  const high = data.filter((item) => item.priority === 'High').length

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    save.mutate({ title: String(values.get('title')), owner: String(values.get('owner')), status: 'Draft', priority: String(values.get('priority')) as AccessReview['priority'] })
  }

  return <main>
    <header className="hero"><div><span className="eyebrow">Keep European orbits safe, sustainable and usable</span><h1>Space Traffic Coordination Office</h1><p>Bring conjunction risks, operator responses and accountable space-safety teams into one shared workspace.</p></div><button className="primary" onClick={() => setOpen(!open)}>{open ? 'Close form' : 'Add coordination case'}</button></header>
    <section className="metrics" aria-label="space traffic coordination summary"><article><span>Reviews tracked</span><strong>{isPending ? '…' : data.length}</strong><small>Shared operator view</small></article><article><span>Approved</span><strong>{approved}</strong><small>Ready for delivery</small></article><article><span>High priority</span><strong>{high}</strong><small>Needs urgent attention</small></article></section>
    {open && <form className="panel form" onSubmit={submit}><h2>Add a coordination case</h2><label>space traffic coordination need or continuity action<input required name="title" minLength={4} placeholder="Example: Satellite continuity exercise" /></label><label>Responsible space operations team<input required name="owner" minLength={3} placeholder="Example: Brussels Space Traffic Team" /></label><label>Priority<select name="priority"><option>High</option><option>Medium</option><option>Low</option></select></label><button className="primary" disabled={save.isPending}>{save.isPending ? 'Saving…' : 'Save coordination case'}</button>{save.error && <p role="alert">{save.error.message}</p>}</form>}
    <section className="panel"><div className="panel-title"><h2>space traffic coordination pipeline</h2><span>{error ? 'Connection problem' : 'Live API data'}</span></div><label className="search">Find a coordination case<input aria-label="Find a coordination case" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by orbit, conjunction expertise, owner or status" /></label>{error && <p role="alert">{error.message}</p>}{!isPending && !error && visible.length === 0 && <p>No coordination cases match this view.</p>}{visible.map((item) => <div className="row" key={item.id}><span className={`dot ${item.status === 'Approved' ? '' : 'degraded'}`} /><div><b>{item.title}</b><small>{item.owner} · {item.status}</small></div><strong>{item.priority}</strong>{item.status !== 'Approved' && <button className="secondary" disabled={advance.isPending} onClick={() => advance.mutate(item)}>Move to {item.status === 'Draft' ? 'review' : 'approved'}</button>}</div>)}</section>
  </main>
}

function About() { return <main><header className="hero"><div><span className="eyebrow">Why it matters</span><h1>Early coordination protects crowded European orbits</h1></div></header><section className="panel prose"><h2>A clear path from conjunction alert to operator action</h2><p>Teams can see who owns each response, which spacecraft are exposed and what still needs attention before a safe decision.</p></section></main> }

export default function App() { return <div className="shell"><nav><b>SpaceTrafficEU<span>/coordination cases</span></b><div><Link href="/">Reviews</Link><Link href="/about">Purpose</Link></div></nav><Switch><Route path="/" component={Register} /><Route path="/about" component={About} /></Switch></div> }
