import React from 'react'


export default function Privacy() {

  window.scrollTo(0, 0)
  return (
    <div style={{
       display: 'flex',
      alignItems: 'start',
      justifyContent: 'center',
      flexDirection:'column'
    }} className='p-5'>
       <h3>Privacy Policy for Zunamu.com</h3>
<br></br>
       <h5>Introduction</h5>
       <p>
At Zunamu.com, we are committed to protecting the privacy and security of our users. Our Privacy Policy
describes the types of personal information we collect, how we use it, the measures we take to keep your
information safe, and how you can manage your personal data with us.</p>

<h5>Information We Collect</h5>
<p>We collect the following types of personal information:</p>
<ul>
<li>Personal Identification Information: Name, email address, gender identity (optional), and date of
birth (optional).</li> 
<li>Career and Professional Information: Seniority level, career goals, resumes, and job descriptions.</li>
<li>Payment Information: We plan to collect payment information through a PCI DSS certified
payment provider in the future.</li>
</ul>

<h5>How We Use Your Information</h5>
<p>We use your personal information to personalize our services and better understand our customers. This
helps us provide a more tailored and effective service in career advocacy, focusing primarily on interview
preparation.</p>

<h5>Security Measures</h5>
<p>We take the security of your personal information seriously. All data is encrypted, password protected,
and accessible only through two-factor authentication to ensure the highest level of security. Our team is
dedicated to maintaining secure data storage practices and safeguarding your information against
unauthorized access.</p>

<h5>Your Privacy Rights</h5>
<p>Zunamu.com empowers you to manage your personal data. You have the ability to delete your account at
any time through the application. However, please note that we may retain certain data for up to 7 years
as required by law to comply with our legal obligations.
For any questions or concerns about your privacy rights or how to exercise them, please contact us at
[insert contact information].</p>

    </div>
  )
}
