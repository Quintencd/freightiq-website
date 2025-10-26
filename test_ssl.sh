#!/bin/bash

echo "🔍 Testing SSL Certificate Status..."
echo

echo "Testing https://www.flowiq.info (should work):"
curl -I https://www.flowiq.info 2>/dev/null | head -3
echo

echo "Testing https://flowiq.info (this should be fixed):"
curl -I https://flowiq.info 2>/dev/null | head -3
echo

echo "Testing http://flowiq.info (should redirect to HTTPS www):"
curl -I http://flowiq.info 2>/dev/null | head -5
echo

echo "🌐 Online SSL Test:"
echo "Check certificate at: https://www.ssllabs.com/ssltest/analyze.html?d=flowiq.info"
echo "Both flowiq.info and www.flowiq.info should get A+ rating"
