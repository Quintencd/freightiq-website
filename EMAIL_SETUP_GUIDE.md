# Flow IQ Email System Setup Guide

## 📧 Complete Welcome & Onboarding Email System

This guide will help you set up a professional email system for Flow IQ with custom domain sending and automated onboarding sequences.

---

## 🛠️ **Step 1: Set Up Custom Email Domain**

### Register `welcome@flowiq.info`

1. **Through your domain provider:**
   - Log into your domain registrar (GoDaddy, Namecheap, etc.)
   - Create email forwarding or mailbox for `welcome@flowiq.info`
   - Set up SMTP credentials for sending

2. **Alternative - Use a transactional email service:**
   - **Recommended**: Use Resend, SendGrid, or AWS SES
   - Configure custom domain authentication
   - Get SMTP credentials

### Configure SMTP in Supabase

1. Go to your Supabase project: `https://supabase.com/dashboard/project/yvbhjlmvpipniedwvdji`
2. Navigate to **Settings** → **Auth** → **SMTP Settings**
3. Enable **Use custom SMTP server**
4. Configure:
   ```
   SMTP Host: your-smtp-server.com
   SMTP Port: 587 (or 465 for SSL)
   SMTP Username: welcome@flowiq.info
   SMTP Password: [your-smtp-password]
   From Address: welcome@flowiq.info
   From Name: Flow IQ Team
   ```

---

## 📨 **Step 2: Configure Supabase Email Templates**

### 1. Confirmation Email Template
1. Go to **Authentication** → **Email Templates**
2. Select **Confirm signup** template
3. Replace with content from `/email-templates/01-confirmation-email.html`
4. Update these variables:
   - **Subject**: `Welcome to Flow IQ – Activate Your Account`
   - **From**: `Flow IQ Team <welcome@flowiq.info>`

### 2. Password Reset Template
1. Select **Reset Password** template  
2. Customize to match Flow IQ branding
3. **Subject**: `Reset Your Flow IQ Password`

### 3. Magic Link Template (if using)
1. Select **Magic Link** template
2. **Subject**: `Your Flow IQ Sign-in Link`

---

## 🤖 **Step 3: Set Up Automated Email Sequences**

You have several options for automation:

### Option A: Supabase Edge Functions (Recommended)

Create automated email sequences using Supabase Edge Functions:

```typescript
// supabase/functions/email-automation/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  // Send welcome email 1 hour after signup
  // Send tips email on day 3
  // Send features email on day 7
  // Send trial ending email on day 13

  return new Response('OK')
})
```

### Option B: Third-party Automation (Easier)

Use services like:
- **Loops** (recommended for SaaS)
- **ConvertKit**
- **Mailchimp**
- **Customer.io**

---

## 📅 **Step 4: Email Sequence Timeline**

### **Email 1: Confirmation Email**
- **Trigger**: User signs up
- **Timing**: Immediate
- **Template**: `01-confirmation-email.html`
- **Purpose**: Email verification

### **Email 2: Welcome & Setup**
- **Trigger**: User confirms email
- **Timing**: 1 hour after confirmation
- **Template**: `02-welcome-email.html`
- **Purpose**: Guide initial setup

### **Email 3: Quick Wins**
- **Trigger**: Automated
- **Timing**: Day 3 after signup
- **Template**: `03-day3-tips-email.html`
- **Purpose**: Encourage key actions

### **Email 4: Advanced Features**
- **Trigger**: Automated
- **Timing**: Day 7 after signup
- **Template**: `04-day7-features-email.html`
- **Purpose**: Showcase advanced capabilities

### **Email 5: Trial Ending**
- **Trigger**: Automated
- **Timing**: Day 13 (1 day before trial ends)
- **Template**: `05-trial-ending-email.html`
- **Purpose**: Convert to paid plan

---

## ⚙️ **Step 5: Implementation Options**

### Quick Start (Using Templates Only)
1. Set up `welcome@flowiq.info`
2. Configure Supabase SMTP
3. Install confirmation email template
4. Send follow-up emails manually as needed

### Advanced Setup (Full Automation)
1. All of the above, plus:
2. Set up email automation platform
3. Create triggers based on user actions
4. Implement behavioral email sequences
5. Add analytics and tracking

---

## 📊 **Step 6: Email Analytics & Tracking**

### Track Email Performance:
- **Open rates**: Should be 40-60%
- **Click rates**: Should be 8-15%
- **Conversion rates**: Track trial-to-paid conversion

### Tools for Tracking:
- UTM parameters in links
- Email service analytics
- Google Analytics event tracking
- Supabase custom events

---

## 🎯 **Step 7: Personalization Variables**

Use these variables in your templates:

```html
{{ .Email }}                    <!-- User's email -->
{{ .UserMetaData.first_name }}  <!-- First name -->
{{ .UserMetaData.last_name }}   <!-- Last name -->
{{ .UserMetaData.company_name }} <!-- Company name -->
{{ .UserMetaData.industry }}    <!-- Industry -->
{{ .ConfirmationURL }}          <!-- Confirmation link -->
{{ .Token }}                    <!-- Reset token -->
```

---

## 🔒 **Step 8: Compliance & Best Practices**

### Email Compliance:
- Add unsubscribe links to all marketing emails
- Include physical address in footer
- Follow GDPR/CAN-SPAM guidelines
- Implement double opt-in for marketing

### Deliverability Best Practices:
- Authenticate your domain (SPF, DKIM, DMARC)
- Keep clean email lists
- Monitor reputation scores
- Use professional email service

---

## 🚀 **Step 9: Testing Your Setup**

### Pre-Launch Checklist:
- [ ] Custom domain email working
- [ ] Supabase SMTP configured
- [ ] Confirmation email sends correctly
- [ ] Links work and redirect properly
- [ ] Mobile responsiveness tested
- [ ] Spam score checked
- [ ] Unsubscribe links functional

### Test Process:
1. Sign up with test email
2. Confirm account activation works
3. Check all email links
4. Test on different devices/clients
5. Verify tracking/analytics

---

## 💡 **Pro Tips**

1. **Start Simple**: Begin with just the confirmation email, add sequences later
2. **Monitor Metrics**: Track open rates, click rates, and conversions
3. **A/B Test**: Test subject lines and content variations
4. **Segment Users**: Send different sequences based on industry/company size
5. **Personal Touch**: Use first names and company names throughout
6. **Mobile First**: 60%+ of emails are opened on mobile devices

---

## 🛟 **Troubleshooting**

### Common Issues:
- **Emails going to spam**: Check domain authentication
- **Low open rates**: Improve subject lines
- **Broken links**: Test all URLs before sending
- **Template errors**: Validate HTML in multiple clients

### Need Help?
- Supabase Auth Documentation
- Email service provider support
- HTML email testing tools (Litmus, Email on Acid)

---

## 📋 **Next Steps**

1. **Immediate**: Set up `welcome@flowiq.info` and confirmation email
2. **Week 1**: Implement welcome sequence (emails 1-2)  
3. **Week 2**: Add behavioral triggers and advanced sequences
4. **Month 1**: Optimize based on performance data

This system will create a professional, automated onboarding experience that converts more trial users to paid customers! 🎉
