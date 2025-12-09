import os
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging
from email_template import get_order_email_html

logger = logging.getLogger(__name__)

async def send_contact_form_email(contact_data):
    """Send contact form notification email to sell@bookblaze.org"""
    try:
        # Get SMTP settings from environment
        smtp_host = os.environ.get('SMTP_HOST', 'smtp.hostinger.com')
        smtp_port = int(os.environ.get('SMTP_PORT', 465))
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        from_email = os.environ.get('SMTP_FROM_EMAIL')
        to_email = os.environ.get('SMTP_FROM_EMAIL')  # Send to sell@bookblaze.org
        
        if not all([smtp_user, smtp_password, from_email]):
            logger.error("SMTP configuration incomplete")
            return False
        
        # Prepare email
        subject = f"New Contact Form Submission from {contact_data['name']}"
        
        # Create message
        message = MIMEMultipart('alternative')
        message['From'] = f"BookBlaze Contact Form <{from_email}>"
        message['To'] = to_email
        message['Subject'] = subject
        message['Reply-To'] = contact_data['email']
        
        # Create HTML content
        html_content = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: #256975; color: white; padding: 20px; text-align: center; }}
        .content {{ background: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px; }}
        .field {{ margin-bottom: 15px; }}
        .label {{ font-weight: bold; color: #256975; }}
        .value {{ margin-top: 5px; padding: 10px; background: white; border-radius: 3px; }}
        .footer {{ margin-top: 20px; text-align: center; color: #666; font-size: 12px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Contact Form Submission</h1>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">{contact_data['name']}</div>
            </div>
            
            <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:{contact_data['email']}">{contact_data['email']}</a></div>
            </div>
            
            <div class="field">
                <div class="label">Message:</div>
                <div class="value">{contact_data['message']}</div>
            </div>
            
            <div class="field">
                <div class="label">Submitted At:</div>
                <div class="value">{contact_data.get('created_at', 'N/A')}</div>
            </div>
        </div>
        
        <div class="footer">
            <p>This message was sent from the BookBlaze contact form.</p>
            <p>Reply directly to this email to respond to the customer.</p>
        </div>
    </div>
</body>
</html>"""
        
        # Attach HTML part
        html_part = MIMEText(html_content, 'html')
        message.attach(html_part)
        
        # Send email using aiosmtplib with SSL
        await aiosmtplib.send(
            message,
            hostname=smtp_host,
            port=smtp_port,
            username=smtp_user,
            password=smtp_password,
            use_tls=True,
            start_tls=False  # Use SSL from the start
        )
        
        logger.info(f"Contact form email sent to {to_email} from {contact_data['email']}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send contact form email: {str(e)}")
        return False

async def send_order_confirmation_email(order_data):
    """Send order confirmation email via Hostinger SMTP"""
    try:
        # Get SMTP settings from environment
        smtp_host = os.environ.get('SMTP_HOST', 'smtp.hostinger.com')
        smtp_port = int(os.environ.get('SMTP_PORT', 465))
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        from_email = os.environ.get('SMTP_FROM_EMAIL')
        from_name = os.environ.get('SMTP_FROM_NAME', 'BookBlaze')
        
        if not all([smtp_user, smtp_password, from_email]):
            logger.error("SMTP configuration incomplete")
            return False
        
        # Prepare email
        to_email = order_data['customer_email']
        subject = f"Your order #{order_data['order_number']} from BookBlaze is confirmed!"
        
        # Create message
        message = MIMEMultipart('alternative')
        message['From'] = f"{from_name} <{from_email}>"
        message['To'] = to_email
        message['Subject'] = subject
        
        # Generate HTML content
        html_content = get_order_email_html(order_data)
        
        # Attach HTML part
        html_part = MIMEText(html_content, 'html')
        message.attach(html_part)
        
        # Send email using aiosmtplib with SSL
        await aiosmtplib.send(
            message,
            hostname=smtp_host,
            port=smtp_port,
            username=smtp_user,
            password=smtp_password,
            use_tls=True,
            start_tls=False  # Use SSL from the start
        )
        
        logger.info(f"Order confirmation email sent to {to_email} for order {order_data['order_number']}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send order confirmation email: {str(e)}")
        return False
