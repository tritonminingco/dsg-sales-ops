from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
import json
import os
from datetime import datetime

booking_bp = Blueprint('booking', __name__)

@booking_bp.route('/submit-lead', methods=['POST'])
@cross_origin()
def submit_lead():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'company']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create lead record
        lead = {
            'name': data.get('name'),
            'email': data.get('email'),
            'company': data.get('company'),
            'role': data.get('role', ''),
            'phone': data.get('phone', ''),
            'message': data.get('message', ''),
            'timestamp': datetime.now().isoformat(),
            'qualification_responses': data.get('responses', {})
        }
        
        # Save to file (in production, this would be a database)
        leads_file = os.path.join(os.path.dirname(__file__), '..', 'database', 'leads.json')
        
        # Load existing leads
        leads = []
        if os.path.exists(leads_file):
            try:
                with open(leads_file, 'r') as f:
                    leads = json.load(f)
            except:
                leads = []
        
        # Add new lead
        leads.append(lead)
        
        # Save updated leads
        os.makedirs(os.path.dirname(leads_file), exist_ok=True)
        with open(leads_file, 'w') as f:
            json.dump(leads, f, indent=2)
        
        # In production, you would send email notifications here
        # For now, we'll just log the lead
        print(f"New lead captured: {lead['name']} from {lead['company']}")
        
        return jsonify({
            'success': True,
            'message': 'Lead captured successfully',
            'lead_id': len(leads)
        })
        
    except Exception as e:
        print(f"Error capturing lead: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@booking_bp.route('/leads', methods=['GET'])
@cross_origin()
def get_leads():
    """Get all leads (for admin purposes)"""
    try:
        leads_file = os.path.join(os.path.dirname(__file__), '..', 'database', 'leads.json')
        
        if not os.path.exists(leads_file):
            return jsonify([])
        
        with open(leads_file, 'r') as f:
            leads = json.load(f)
        
        return jsonify(leads)
        
    except Exception as e:
        print(f"Error retrieving leads: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@booking_bp.route('/download-resource', methods=['GET'])
@cross_origin()
def download_resource():
    """Handle resource download requests"""
    resource_type = request.args.get('type')
    
    if resource_type == 'explainer':
        # In production, this would serve the actual PDF
        return jsonify({
            'success': True,
            'message': 'DeepSeaGuard explainer PDF would be downloaded',
            'filename': 'dsg_explainer.pdf'
        })
    elif resource_type == 'checklist':
        return jsonify({
            'success': True,
            'message': 'Compliance checklist PDF would be downloaded',
            'filename': 'compliance_checklist.pdf'
        })
    else:
        return jsonify({'error': 'Invalid resource type'}), 400

