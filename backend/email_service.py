import os
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging
from email_template import get_order_email_html

logger = logging.getLogger(__name__)

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
