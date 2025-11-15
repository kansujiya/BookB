def get_order_email_html(order_data):
    """Generate HTML email template for order confirmation"""
    
    customer_name = order_data['customer_name']
    order_number = order_data['order_number']
    order_date = order_data['created_at']
    items = order_data['items']
    subtotal = order_data['subtotal']
    total = order_data['total']
    customer_email = order_data['customer_email']
    customer_phone = order_data['customer_phone']
    city = order_data['city']
    payment_id = order_data.get('payment_id', 'N/A')
    items_with_links = order_data.get('items_with_links', [])
    other_products = order_data.get('other_products', [])
    
    # Generate order items HTML with download links
    items_html = ""
    for item in items_with_links:
        download_link = item.get('download_link', '')
        download_button = ""
        if download_link:
            download_button = f'''
            <tr>
                <td colspan="3" class="font-family text-align-left" style='font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif; text-align: left; padding: 8px 12px; padding-left: 0; padding-right: 0; border-bottom: 1px solid rgba(0,0,0,.2); padding-bottom: 24px; vertical-align: middle;' align="left">
                    <p style="margin: 0 0 8px;">📥 <a href="{download_link}" target="_blank" style="color: #256975; font-weight: bold; text-decoration: underline;">Download PDF</a></p>
                </td>
            </tr>
            '''
        
        items_html += f"""
        <tr class="order_item">
            <td class="td font-family text-align-left" style='color: #414141; border: 0; font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif; text-align: left; padding: 8px 12px; padding-left: 0; vertical-align: middle; word-wrap: break-word;' align="left">
                <table class="order-item-data" style='color: #256975; font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif;'>
                    <tr>
                        <td style="vertical-align: middle; padding-right: 0; padding-bottom: 24px; border: 0; padding: 0;">
                            {item['product_title']}
                        </td>
                    </tr>
                </table>
            </td>
            <td class="td font-family text-align-right" style='color: #414141; border: 0; font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif; text-align: right; padding: 8px 12px; vertical-align: middle;' align="right">
                ×{item['quantity']}
            </td>
            <td class="td font-family text-align-right" style='color: #414141; border: 0; font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif; text-align: right; padding: 8px 12px; padding-right: 0; vertical-align: middle;' align="right">
                <span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">₹</span>{item['price']}.00</span>
            </td>
        </tr>
        {download_button}
        """
    
    # Generate recommended products section
    recommended_html = ""
    if other_products:
        products_cards = ""
        for product in other_products[:3]:  # Maximum 3 products
            products_cards += f"""
            <td style="padding: 10px; width: 33.33%; vertical-align: top;" width="33.33%">
                <a href="https://www.bookblaze.org" style="text-decoration: none; display: block;">
                    <img src="{product['image']}" alt="{product['title']}" style="width: 100%; max-width: 150px; height: auto; border-radius: 8px; margin-bottom: 8px;">
                    <p style="color: #256975; font-size: 14px; font-weight: bold; margin: 0 0 4px; line-height: 1.3;">{product['title']}</p>
                    <p style="color: #256975; font-size: 16px; font-weight: bold; margin: 0;">₹{product['current_price']}</p>
                </a>
            </td>
            """
        
        recommended_html = f"""
        <br>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td style='color: #256975; font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif; padding: 24px 0 16px;'>
                    <h2 style="text-align: center; font-size: 24px; font-weight: bold; margin: 0 0 16px; color: #256975;">Explore More Books</h2>
                    <p style="text-align: center; margin: 0 0 16px; color: #666;">Check out these other amazing resources:</p>
                </td>
            </tr>
            <tr>
                <td>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            {products_cards}
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        """
    
    html_template = f"""<!DOCTYPE html>
<html lang="en-US">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta content="width=device-width, initial-scale=1.0" name="viewport">
		<title>BookBlaze</title>
	<style type="text/css">@media screen and (max-width: 600px){{#template_header_image,#header_wrapper{{padding: 16px 10px 0 !important;}}#header_wrapper h1{{font-size: 24px !important;}}#body_content_inner_cell{{padding: 10px !important;}}#body_content_inner,.email-order-item-meta{{font-size: 12px !important;}}#body_content .email-order-details .order-totals-total td{{font-size: 14px !important;}}.email-order-detail-heading{{font-size: 16px !important; line-height: 130% !important;}}.email-additional-content{{padding-top: 16px !important;}}}}</style></head>
	<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="background-color: #f7f7f7; padding: 0; text-align: center;" bgcolor="#f7f7f7">
		<table width="100%" id="outer_wrapper" style="background-color: #f7f7f7;" bgcolor="#f7f7f7">
			<tr>
				<td><!-- Deliberately empty to support consistent sizing and layout across multiple email clients. --></td>
				<td width="600">
					<div id="wrapper" dir="ltr" style="margin: 0 auto; padding: 24px 0; width: 100%; max-width: 600px; -webkit-text-size-adjust: none;" width="100%">
						<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="inner_wrapper" style="background-color: #fff; border-radius: 8px;" bgcolor="#fff">
							<tr>
								<td align="center" valign="top">
									<table border="0" cellpadding="0" cellspacing="0" width="100%" id="template_container" style="box-shadow: none; background-color: #fff; border: 0; border-radius: 3px;" bgcolor="#fff">
										<tr>
											<td align="center" valign="top">
												<!-- Header -->
												<table border="0" cellpadding="0" cellspacing="0" width="100%" id="template_header" style='background-color: #fff; color: #256975; border-bottom: 0; font-weight: bold; line-height: 100%; vertical-align: middle; font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif; border-radius: 3px 3px 0 0;' bgcolor="#fff">
													<tr>
														<td id="header_wrapper" style="padding: 32px 32px 20px; display: block;">
															<h1 style='font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 120%; margin: 0; color: #256975; background-color: inherit; text-align: left;' bgcolor="inherit">Good things are heading your way!</h1>
														</td>
													</tr>
												</table>
												<!-- End Header -->
											</td>
										</tr>
										<tr>
											<td align="center" valign="top">
												<!-- Body -->
												<table border="0" cellpadding="0" cellspacing="0" width="100%" id="template_body">
													<tr>
														<td valign="top" id="body_content" style="background-color: #fff;" bgcolor="#fff">
															<!-- Content -->
															<table border="0" cellpadding="20" cellspacing="0" width="100%">
																<tr>
																	<td valign="top" id="body_content_inner_cell" style="padding: 20px 32px 32px;">
																		<div id="body_content_inner" style='color: #414141; font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif; font-size: 16px; line-height: 150%; text-align: left;' align="left">

<div class="email-introduction" style="padding-bottom: 24px;"><p style="margin: 0 0 16px;">
Hi {customer_name},</p>
<p style="margin: 0 0 16px;">Thank you for your purchase! We have successfully processed your order.</p>
	<p style="margin: 0 0 16px;">Here's a summary of what you've ordered:</p>
</div>

<h2 class="email-order-detail-heading" style='color: #256975; display: block; font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif; font-size: 20px; font-weight: bold; line-height: 160%; margin: 0 0 18px; text-align: left;'>
	Order Summary<br><span style="color: #256975; display: block; font-size: 14px; font-weight: normal;">Order #{order_number} ({order_date})</span></h2>

<div style="margin-bottom: 24px;">
	<table class="td font-family email-order-details" cellspacing="0" cellpadding="6" border="0" style='color: #414141; border: 0; vertical-align: middle; font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif; width: 100%;' width="100%">
		<tbody>
		{items_html}
		</tbody>
		<tfoot>
			<tr class="order-totals order-totals-subtotal">
				<th class="td text-align-left" scope="row" colspan="2" style="color: #414141; border: 0; vertical-align: middle; text-align: left; padding: 8px 12px; font-weight: normal; padding-bottom: 5px; padding-left: 0; padding-top: 24px; border-top-width: 4px;" align="left">
					Subtotal: 
				</th>
				<td class="td text-align-right" style="color: #414141; border: 0; vertical-align: middle; text-align: right; padding: 8px 12px; font-weight: normal; padding-bottom: 5px; padding-right: 0; padding-top: 24px; border-top-width: 4px;" align="right"><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">₹</span>{subtotal}.00</span></td>
			</tr>
			<tr class="order-totals order-totals-total">
				<th class="td text-align-left" scope="row" colspan="2" style="color: #414141; border: 0; vertical-align: middle; text-align: left; padding: 8px 12px; padding-bottom: 5px; padding-top: 5px; font-weight: bold; padding-left: 0;" align="left">
					Total: 
				</th>
				<td class="td text-align-right" style="color: #414141; border: 0; vertical-align: middle; text-align: right; padding: 8px 12px; padding-bottom: 5px; padding-top: 5px; font-weight: bold; font-size: 20px; padding-right: 0;" align="right"><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">₹</span>{total}.00</span></td>
			</tr>
			<tr class="order-totals order-totals-payment_method">
				<th class="td text-align-left" scope="row" colspan="2" style="color: #414141; border: 0; vertical-align: middle; text-align: left; padding: 8px 12px; font-weight: normal; padding-top: 5px; padding-bottom: 5px; padding-left: 0;" align="left">
					Payment method: 
				</th>
				<td class="td text-align-right" style="color: #414141; border: 0; vertical-align: middle; text-align: right; padding: 8px 12px; font-weight: normal; padding-top: 5px; padding-bottom: 5px; padding-right: 0;" align="right">Razorpay (UPI/Card/NetBanking)</td>
			</tr>
			<tr class="order-totals order-totals-payment_id order-totals-last">
				<th class="td text-align-left" scope="row" colspan="2" style="color: #414141; border: 0; vertical-align: middle; text-align: left; padding: 8px 12px; font-weight: normal; padding-top: 5px; border-bottom: 1px solid rgba(0,0,0,.2); padding-bottom: 24px; padding-left: 0;" align="left">
					Payment ID: 
				</th>
				<td class="td text-align-right" style="color: #414141; border: 0; vertical-align: middle; text-align: right; padding: 8px 12px; font-weight: normal; padding-top: 5px; border-bottom: 1px solid rgba(0,0,0,.2); padding-bottom: 24px; padding-right: 0; font-family: monospace; font-size: 12px;" align="right">{payment_id}</td>
			</tr>
		</tfoot>
	</table>
</div>

<table id="addresses" cellspacing="0" cellpadding="0" border="0" style="width: 100%; vertical-align: top; margin-bottom: 0; padding: 0;" width="100%">
	<tr>
		<td class="font-family text-align-left" valign="top" width="50%" style='font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif; text-align: left; border: 0; padding: 0;' align="left">
			<b class="address-title" style='color: #256975; font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif;'>Customer Details</b>
			<address class="address" style="color: #256975; font-style: normal; padding: 8px 0; word-break: break-all;">
				{customer_name}<br>
				{city}<br>
				<a href="tel:{customer_phone}" style="color: #256975; font-weight: normal; text-decoration: underline;">{customer_phone}</a><br>
				{customer_email}
			</address>
		</td>
	</tr>
</table>
<br>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr>
		<td class="email-additional-content" style='color: #256975; font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif; padding: 32px 0 0; background-color: #E0F2F7; padding: 24px; border-radius: 8px;'>
			<p style="text-align: center; margin: 0 0 16px; font-weight: bold; font-size: 18px; #256975;" align="center">📥 Download Access</p>
			<p style="text-align: center; margin: 0 0 16px; #1e4a54;" align="center"><strong>The team will provide PDF access in the next 24 Hours to download.</strong></p>
			<p style="text-align: center; margin: 0 0 0px; #1e4a54;" align="center">You can download your purchased items using the links provided above in the order summary.</p>
		</td>
	</tr>
</table>
{recommended_html}
<br>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr>
		<td class="email-additional-content" style='color: #256975; font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif; padding: 32px 0 0;'>
			<p style="text-align: center; margin: 0 0 16px;" align="center">If you have any questions or face any issues, please don't hesitate to contact us at <a href="mailto:sell@bookblaze.org" style="color: #256975; font-weight: normal; text-decoration: underline;">sell@bookblaze.org</a></p>
			<p style="text-align: center; margin: 0 0 16px;" align="center">Thank you for choosing BookBlaze!</p>
			<p style="text-align: center; margin: 0 0 16px;" align="center">Sincerely,<br>
			<strong>BookBlaze Team</strong></p>
		</td>
	</tr>
</table>
																		</div>
																	</td>
																</tr>
															</table>
															<!-- End Content -->
														</td>
													</tr>
												</table>
												<!-- End Body -->
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td align="center" valign="top">
									<!-- Footer -->
									<table border="0" cellpadding="10" cellspacing="0" width="100%" id="template_footer">
										<tr>
											<td valign="top" style="padding: 0; border-radius: 0;">
												<table border="0" cellpadding="10" cellspacing="0" width="100%">
													<tr>
														<td colspan="2" valign="middle" id="credit" style='border-radius: 0; border: 0; border-top: 1px solid rgba(0,0,0,.2); font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif; font-size: 12px; line-height: 140%; text-align: center; padding: 32px; color: #256975;' align="center">
															<p style="margin: 0;">© 2025, BookBlaze. All rights reserved.</p>
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
									<!-- End Footer -->
								</td>
							</tr>
						</table>
					</div>
				</td>
				<td><!-- Deliberately empty to support consistent sizing and layout across multiple email clients. --></td>
			</tr>
		</table>
	</body>
</html>"""
    
    return html_template
