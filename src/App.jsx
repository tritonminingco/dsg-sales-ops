import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [step, setStep] = useState('welcome')
  const [responses, setResponses] = useState({})
  const [lead, setLead] = useState({})

  const saveResponse = (k, v) => setResponses(r => ({ ...r, [k]: v }))
  const saveLead = (data) => setLead(data)

  useEffect(() => {
    // debug: log step changes to help trace why transitions may not happen
    // you can view this output in the browser devtools console
    console.log('[App] step ->', step)
  }, [step])

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0f172a,#1e293b)', padding: 24 }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <header style={{ textAlign: 'center', color: 'white', marginBottom: 24 }}>
          <h1 style={{ margin: 0 }}>DeepSeaGuard</h1>
          <p style={{ margin: 4, color: '#bfdbfe' }}>Real-Time Compliance & Environmental Monitoring</p>
        </header>

        {step === 'welcome' && <Welcome onNext={() => setStep('qualification')} />}
        {step === 'qualification' && <Qualification onNext={() => setStep('value-prop')} onAnswer={saveResponse} responses={responses} />}
        {step === 'value-prop' && <ValueProp onNext={() => setStep('booking')} onBack={() => setStep('qualification')} responses={responses} />}
        {step === 'booking' && <Booking onNext={() => setStep('confirmation')} onBack={() => setStep('value-prop')} onCapture={saveLead} responses={responses} />}
        {step === 'confirmation' && <Confirmation lead={lead} />}
      </div>
    </div>
  )
}

function Welcome({ onNext }) {
  return (
    <section style={{ background: 'rgba(255,255,255,0.04)', padding: 20, borderRadius: 8, color: 'white' }}>
      <h2>Welcome to DeepSeaGuard</h2>
      <p style={{ color: '#bfdbfe' }}>Automate compliance reporting and environmental monitoring for deep-sea mining operations.</p>
      <div style={{ marginTop: 12 }}>
        <button onClick={onNext} style={primaryBtn}>Get Started</button>
      </div>
    </section>
  )
}

function Qualification({ onNext, onAnswer, responses }) {
  const questions = [
    { id: 'reporting', q: 'Are you currently reporting to the ISA or NOAA?', options: ['Yes, regularly', 'Yes, occasionally', 'No, not yet', 'Not sure'] },
    { id: 'monitoring', q: 'How are you handling environmental monitoring right now?', options: ['Manual processes', 'Some automation', 'Third-party services', 'No formal process'] },
    { id: 'challenges', q: 'What are your biggest challenges with compliance and reporting?', options: ['Time consuming', 'Complex requirements', 'Data management', 'All of the above'] }
  ]
  const [i, setI] = useState(0)

  const answer = (opt) => {
    onAnswer(questions[i].id, opt)
    if (i < questions.length - 1) setI(i + 1)
    else setTimeout(onNext, 250)
  }

  return (
    <section style={{ background: 'rgba(255,255,255,0.04)', padding: 16, borderRadius: 8 }}>
      <div style={{ color: '#93c5fd', marginBottom: 8 }}>Question {i+1} of {questions.length}</div>
      <h3 style={{ color: 'white' }}>{questions[i].q}</h3>
      <div style={{ marginTop: 12 }}>
        {questions[i].options.map(o => (
          <button key={o} onClick={() => answer(o)} style={optionBtn}>{o}</button>
        ))}
      </div>
    </section>
  )
}

function ValueProp({ onNext, onBack, responses }) {
  const reporting = responses.reporting || ''
  const challenges = responses.challenges || ''

  const message = reporting.includes('Yes') && challenges.includes('Time consuming')
    ? "We can automate your reporting processes and save you time."
    : "We can streamline compliance and monitoring for your operations."

  return (
    <section style={{ background: 'rgba(255,255,255,0.04)', padding: 16, borderRadius: 8 }}>
      <h3 style={{ color: 'white' }}>How DeepSeaGuard Helps</h3>
      <p style={{ color: '#bfdbfe' }}>{message}</p>
      <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onBack} style={ghostBtn}>← Back</button>
        <div>
          <button onClick={onNext} style={{ ...primaryBtn, background: '#16a34a', marginRight: 8 }}>Book Demo</button>
          <button style={ghostBtn}>Download Info Pack</button>
        </div>
      </div>
    </section>
  )
}

function Booking({ onNext, onBack, onCapture }) {
  const [data, setData] = useState({ name: '', email: '', company: '', role: '', phone: '', message: '' })

  const submit = (e) => {
    e.preventDefault()
    onCapture(data)
    onNext()
  }

  return (
    <section style={{ background: 'rgba(255,255,255,0.04)', padding: 16, borderRadius: 8 }}>
      <h3 style={{ color: 'white' }}>Book a Demo</h3>
      <form onSubmit={submit} style={{ marginTop: 8 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <input placeholder="Full name" required value={data.name} onChange={e => setData({ ...data, name: e.target.value })} style={inputStyle} />
          <input placeholder="Email" required type="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} style={inputStyle} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
          <input placeholder="Company" required value={data.company} onChange={e => setData({ ...data, company: e.target.value })} style={inputStyle} />
          <input placeholder="Role" value={data.role} onChange={e => setData({ ...data, role: e.target.value })} style={inputStyle} />
        </div>
        <textarea placeholder="Additional info" rows={3} value={data.message} onChange={e => setData({ ...data, message: e.target.value })} style={{ ...inputStyle, marginTop: 8 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
          <button type="button" onClick={onBack} style={ghostBtn}>← Back</button>
          <button type="submit" style={primaryBtn}>Schedule Demo</button>
        </div>
      </form>
    </section>
  )
}

function Confirmation({ lead }) {
  return (
    <section style={{ background: 'rgba(255,255,255,0.04)', padding: 16, borderRadius: 8 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: 999, background: '#16a34a', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>✓</div>
        <h3 style={{ color: 'white' }}>Thank you{lead.name ? `, ${lead.name}` : ''}!</h3>
        <p style={{ color: '#bfdbfe' }}>We'll email you at {lead.email || 'your email'} with next steps.</p>
      </div>
    </section>
  )
}

const primaryBtn = { background: '#2563eb', color: 'white', border: 'none', padding: '8px 12px', borderRadius: 8, cursor: 'pointer' }
const ghostBtn = { background: 'transparent', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.06)', padding: '8px 12px', borderRadius: 8, cursor: 'pointer' }
const optionBtn = { display: 'block', width: '100%', textAlign: 'left', padding: '10px', marginBottom: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: 'white', borderRadius: 6, cursor: 'pointer' }
const inputStyle = { width: '100%', padding: 8, borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)', background: 'transparent', color: 'white' }

export default App

