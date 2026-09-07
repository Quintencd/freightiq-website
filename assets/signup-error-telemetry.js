(function (global) {
  const STORAGE_KEY = 'flowiq_signup_required_field_error_fingerprints';
  const MAX_FINGERPRINTS = 12;

  function fingerprint(fields) {
    return Array.from(new Set(Array.isArray(fields) ? fields : []))
      .map((field) => String(field).trim())
      .filter(Boolean)
      .sort()
      .join('|');
  }

  function shouldTrackRequiredFields(fields) {
    const key = fingerprint(fields);
    if (!key) return true;

    try {
      const previous = JSON.parse(global.sessionStorage.getItem(STORAGE_KEY) || '[]');
      const fingerprints = Array.isArray(previous) ? previous.filter((value) => typeof value === 'string') : [];
      if (fingerprints.includes(key)) return false;
      global.sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...fingerprints, key].slice(-MAX_FINGERPRINTS)));
    } catch (_) {
      // Analytics must never interrupt the signup error path.
    }

    return true;
  }

  global.FlowIQSignupErrorTelemetry = { shouldTrackRequiredFields };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { shouldTrackRequiredFields };
  }
})(typeof window !== 'undefined' ? window : globalThis);
