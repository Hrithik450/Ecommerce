from flask import Flask, request, jsonify
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

@app.route('/send-email', methods=['POST'])
def send_mail():
    data = request.json
    recipient_email = data['email']
    subject = data['subject']
    message = data['message']

    sender_email = os.getenv('EMAIL')
    password = os.getenv('PASSWORD')
  
    try:    
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, password)

        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = subject
        msg.attach(MIMEText(message, 'html'))

        server.send_message(msg)
        server.quit()

        return jsonify({"status": "success", "message" : "Email sent successfully"}), 200
    
    except Exception as e:
        return jsonify({"status" : "error", "message" : str(e)}), 500
    
if __name__=='__main__':
    app.run(debug=True)