const paypalSec = document.createElement("section")
paypalSec.style.textAlign = "center"
paypalSec.innerHTML = 
'<p>If you like these tools, please consider making a donation.</p>' +
'<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">' +
'  <input type="hidden" name="cmd" value="_s-xclick">' +
'  <input type="hidden" name="hosted_button_id" value="DW5WW5CE3FTKQ">' +
'  <input type="image" src="https://www.paypalobjects.com/en_US/IT/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button">' +
'</form>'
document.body.appendChild(paypalSec)