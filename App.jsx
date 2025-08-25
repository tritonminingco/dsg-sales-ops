import { useState } from 'react'
// Removed custom UI imports for deployability
// Optionally, you can use emoji or simple SVGs for icons, or remove icons entirely
import './src/App.css'

function App() {
  const [currentStep, setCurrentStep] = useState('welcome')
  const [userResponses, setUserResponses] = useState({})
  const [leadData, setLeadData] = useState({})

  const handleResponse = (question, answer) => {
    setUserResponses(prev => ({ ...prev, [question]: answer }))
  }

  const handleLeadCapture = (data) => {
    setLeadData(data)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a, #1e293b 60%, #0f172a)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 32 }}>
        <header style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontSize: 40, fontWeight: 'bold', color: 'white', marginBottom: 16 }}>
            DeepSeaGuard
          </h1>
          <p style={{ fontSize: 22, color: '#bfdbfe', marginBottom: 8 }}>
            Real-Time Compliance & Environmental Monitoring
          </p>
          <p style={{ fontSize: 18, color: '#cbd5e1' }}>
            Mining data, not destruction.
          </p>
        </header>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          {currentStep === 'welcome' && (
            <WelcomeStep onNext={() => setCurrentStep('qualification')} />
          )}
          {currentStep === 'qualification' && (
            <QualificationStep 
              onNext={() => setCurrentStep('value-prop')}
              onResponse={handleResponse}
              responses={userResponses}
            />
          )}
          {currentStep === 'value-prop' && (
            <ValuePropStep 
              onNext={() => setCurrentStep('booking')}
              onBack={() => setCurrentStep('qualification')}
              responses={userResponses}
            />
          )}
          {currentStep === 'booking' && (
            <BookingStep 
              onNext={() => setCurrentStep('confirmation')}
              onBack={() => setCurrentStep('value-prop')}
              onLeadCapture={handleLeadCapture}
            />
          )}
          {currentStep === 'confirmation' && (
            <ConfirmationStep leadData={leadData} />
          )}
        </div>
      </div>
    </div>
  )
}

function WelcomeStep({ onNext }) {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-white mb-4">
          Welcome to DeepSeaGuard
        </CardTitle>
        <CardDescription className="text-blue-200 text-lg">
          Discover how we can help automate your compliance reporting and environmental monitoring for deep-sea mining operations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">What We Do:</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Real-time monitoring dashboards
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Automated ISA & NOAA reporting
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Environmental compliance alerts
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Map overlays & zone tracking
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Benefits:</h3>
            <ul className="space-y-2 text-slate-300">
              <li>• Save weeks of manual reporting</li>
              <li>• Reduce risk of fines or shutdowns</li>
              <li>• Build trust with regulators</li>
              <li>• Operate with full transparency</li>
            </ul>
          </div>
        </div>
        
        <div className="text-center pt-6">
          <Button 
            onClick={onNext}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Let's Talk About Your Needs
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function QualificationStep({ onNext, onResponse, responses }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  
  const questions = [
    {
      id: 'reporting',
      question: 'Are you currently reporting to the ISA or NOAA?',
      options: ['Yes, regularly', 'Yes, occasionally', 'No, not yet', 'Not sure']
    },
    {
      id: 'monitoring',
      question: 'How are you handling environmental monitoring right now?',
      options: ['Manual processes', 'Some automation', 'Third-party services', 'No formal process']
    },
    {
      id: 'challenges',
      question: 'What are your biggest challenges with compliance and reporting?',
      options: ['Time consuming', 'Complex requirements', 'Data management', 'All of the above']
    }
  ]

  const handleAnswer = (answer) => {
    onResponse(questions[currentQuestion].id, answer)
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setTimeout(() => onNext(), 500)
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-xl text-white">
          Question {currentQuestion + 1} of {questions.length}
        </CardTitle>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <h3 className="text-lg text-white font-medium">
          {questions[currentQuestion].question}
        </h3>
        
        <div className="grid gap-3">
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '16px',
                marginBottom: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ValuePropStep({ onNext, onBack, responses }) {
  const getPersonalizedMessage = () => {
    const reporting = responses.reporting
    const monitoring = responses.monitoring
    const challenges = responses.challenges

    if (reporting?.includes('Yes') && challenges?.includes('Time consuming')) {
      return "Since you're already reporting to regulators and finding it time-consuming, DeepSeaGuard can automate that entire process for you."
    } else if (monitoring?.includes('Manual') && challenges?.includes('Complex')) {
      return "With manual monitoring processes and complex requirements, DeepSeaGuard can simplify everything into a single, automated dashboard."
    } else {
      return "Based on your responses, DeepSeaGuard can help streamline your compliance and monitoring processes."
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-xl text-white">
          Here's How DeepSeaGuard Can Help You
        </CardTitle>
        <CardDescription className="text-blue-200">
          {getPersonalizedMessage()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Badge className="bg-blue-600 text-white">Real-Time Dashboards</Badge>
            <p className="text-slate-300">
              Live monitoring of your operations, environmental data, and compliance status in one place.
            </p>
          </div>
          
          <div className="space-y-4">
            <Badge className="bg-green-600 text-white">Automated Reports</Badge>
            <p className="text-slate-300">
              Generate ISA and NOAA compliant reports automatically, saving weeks of manual work.
            </p>
          </div>
          
          <div className="space-y-4">
            <Badge className="bg-purple-600 text-white">Smart Alerts</Badge>
            <p className="text-slate-300">
              Get instant notifications if you're at risk of falling out of compliance.
            </p>
          </div>
          
          <div className="space-y-4">
            <Badge className="bg-orange-600 text-white">Map Integration</Badge>
            <p className="text-slate-300">
              Visual overlays of mining zones, AUV locations, and environmental data.
            </p>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <h4 className="text-white font-semibold mb-3">Want to see it in action?</h4>
          <p className="text-slate-300 mb-4">
            The best way to understand DeepSeaGuard's value is to see a live demo. Our CEO, Jorge Pimentel, can show you exactly how it works for your specific needs.
          </p>
          <div className="flex gap-3">
            <Button 
              onClick={onNext}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book a 15-Minute Demo
            </Button>
            <Button 
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Info Pack
            </Button>
          </div>
        </div>

        <div className="flex justify-between">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-slate-300 hover:text-white"
          >
            ← Back
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function BookingStep({ onNext, onBack, onLeadCapture }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    phone: '',
    message: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          responses: userResponses
        })
      })
      
      if (response.ok) {
        onLeadCapture(formData)
        onNext()
      } else {
        const error = await response.json()
        alert(`Error: ${error.message || 'Failed to submit form'}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to submit form. Please try again.')
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-xl text-white">
          Book Your Demo with Jorge Pimentel
        </CardTitle>
        <CardDescription className="text-blue-200">
          Founder & CEO of Triton Mining Co. - Let's discuss how DeepSeaGuard can transform your operations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Full Name *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                placeholder="Your full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                placeholder="your.email@company.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-white">Company *</Label>
              <Input
                id="company"
                required
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                placeholder="Your company name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role" className="text-white">Role</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                placeholder="Your job title"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-white">Additional Information</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
              placeholder="Tell us about your current operations, specific challenges, or questions..."
              rows={3}
            />
          </div>

          <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
            <h4 className="text-white font-semibold mb-2">What to Expect:</h4>
            <ul className="text-blue-200 text-sm space-y-1">
              <li>• 15-minute personalized demo of DeepSeaGuard</li>
              <li>• Discussion of your specific compliance needs</li>
              <li>• Custom pricing and implementation timeline</li>
              <li>• Q&A with our technical team</li>
            </ul>
          </div>

          <div className="flex justify-between pt-4">
            <Button 
              type="button"
              variant="ghost" 
              onClick={onBack}
              className="text-slate-300 hover:text-white"
            >
              ← Back
            </Button>
            
            <Button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Demo
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function ConfirmationStep({ leadData }) {
  const handleDownload = async (type) => {
    try {
      const response = await fetch(`/api/download-resource?type=${type}`)
      const result = await response.json()
      
      if (result.success) {
        // In a real implementation, this would trigger a file download
        alert(`${result.filename} would be downloaded`)
      } else {
        alert('Download failed')
      }
    } catch (error) {
      console.error('Download error:', error)
      alert('Download failed')
    }
  }
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-white">
          Thank You, {leadData.name}!
        </CardTitle>
        <CardDescription className="text-blue-200 text-lg">
          Your demo request has been submitted successfully.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <h4 className="text-white font-semibold mb-3">What Happens Next:</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
              <div>
                <p className="text-white font-medium">Confirmation Email</p>
                <p className="text-slate-300 text-sm">You'll receive a confirmation email at {leadData.email} within 5 minutes.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
              <div>
                <p className="text-white font-medium">Calendar Invitation</p>
                <p className="text-slate-300 text-sm">Jorge will send you a calendar link to book your preferred time slot.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
              <div>
                <p className="text-white font-medium">Demo Preparation</p>
                <p className="text-slate-300 text-sm">We'll prepare a customized demo based on {leadData.company}'s needs.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-slate-300">
            In the meantime, feel free to download our resources:
          </p>
          
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => handleDownload('explainer')}
            >
              <Download className="mr-2 h-4 w-4" />
              DSG Overview PDF
            </Button>
            
            <Button 
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => handleDownload('checklist')}
            >
              <Download className="mr-2 h-4 w-4" />
              Compliance Checklist
            </Button>
          </div>
        </div>

        <div className="text-center pt-6 border-t border-white/10">
          <p className="text-slate-400 text-sm">
            Questions? Contact us at <span className="text-blue-300">hello@tritonmining.co</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default App

