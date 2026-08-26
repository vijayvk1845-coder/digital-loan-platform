describe('Credit Risk Assessment - Boundary Value Analysis', () => {

  function calculateRisk(credit_score) {
    if (credit_score >= 750) return 'LOW';
    if (credit_score >= 650) return 'MEDIUM';
    return 'HIGH';
  }

  test('TC-CREDIT-001: Credit score 750 should be LOW risk', () => {
    expect(calculateRisk(750)).toBe('LOW');
  });

  test('TC-CREDIT-002: Credit score 749 should be MEDIUM risk', () => {
    expect(calculateRisk(749)).toBe('MEDIUM');
  });

  test('TC-CREDIT-003: Credit score 650 should be MEDIUM risk', () => {
    expect(calculateRisk(650)).toBe('MEDIUM');
  });

  test('TC-CREDIT-004: Credit score 649 should be HIGH risk', () => {
    expect(calculateRisk(649)).toBe('HIGH');
  });

  test('TC-CREDIT-005: Credit score 800 should be LOW risk', () => {
    expect(calculateRisk(800)).toBe('LOW');
  });

  test('TC-CREDIT-006: Credit score 500 should be HIGH risk', () => {
    expect(calculateRisk(500)).toBe('HIGH');
  });

});