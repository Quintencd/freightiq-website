import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Link,
} from '@react-email/components';

interface DemoRequestEmailProps {
  requestType?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  phone?: string;
  country?: string;
  featureInterest?: string;
  company?: string;
  message?: string;
}

export default function DemoRequestEmail({
  requestType = 'demo',
  firstName,
  lastName,
  name,
  email,
  phone,
  country,
  featureInterest,
  company,
  message,
}: DemoRequestEmailProps) {
  const displayName = name || (firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || 'Unknown');
  const subject = requestType === 'deck' 
    ? 'FlowIQ – Deck request'
    : requestType === 'contact'
    ? 'FlowIQ – Contact request'
    : 'FlowIQ – Demo request';

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{subject}</Heading>
          <Hr style={hr} />
          <Section style={section}>
            <Text style={label}>Name:</Text>
            <Text style={value}>{displayName}</Text>
          </Section>
          <Section style={section}>
            <Text style={label}>Email:</Text>
            <Text style={value}>
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>
            </Text>
          </Section>
          {phone && (
            <Section style={section}>
              <Text style={label}>Phone:</Text>
              <Text style={value}>{phone}</Text>
            </Section>
          )}
          {company && (
            <Section style={section}>
              <Text style={label}>Company:</Text>
              <Text style={value}>{company}</Text>
            </Section>
          )}
          {country && (
            <Section style={section}>
              <Text style={label}>Country:</Text>
              <Text style={value}>{country}</Text>
            </Section>
          )}
          {featureInterest && (
            <Section style={section}>
              <Text style={label}>Feature interest:</Text>
              <Text style={value}>{featureInterest}</Text>
            </Section>
          )}
          {message && (
            <Section style={section}>
              <Text style={label}>Message:</Text>
              <Text style={value}>{message}</Text>
            </Section>
          )}
          <Hr style={hr} />
          <Text style={footer}>
            This request was submitted through the FlowIQ website.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const section = {
  padding: '0 48px',
  marginBottom: '16px',
};

const label = {
  color: '#666',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 4px 0',
};

const value = {
  color: '#333',
  fontSize: '16px',
  margin: '0 0 16px 0',
  lineHeight: '1.5',
};

const link = {
  color: '#2563eb',
  textDecoration: 'underline',
};

const footer = {
  color: '#888',
  fontSize: '12px',
  lineHeight: '16px',
  marginTop: '32px',
  textAlign: 'center' as const,
};
