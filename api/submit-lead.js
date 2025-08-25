export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  const { name, email, company } = req.body || {}
  if (!name || !email || !company) {
    return res.status(400).json({ success: false, message: 'Missing required fields' })
  }

  // Placeholder: in production you could forward this data to email, Sheets, DB, etc.
  console.log('Lead received:', { name, email, company })

  return res.status(200).json({ success: true })
}
