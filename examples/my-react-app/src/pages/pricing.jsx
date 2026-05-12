export default function Pricing() {
  const plans = [
    { name: 'Starter', price: 'Free', features: ['Basic generation', 'Community support'] },
    {
      name: 'Professional',
      price: '$49/mo',
      features: ['Unlimited routes', 'Custom converters', 'Priority support'],
      highlighted: true,
    },
    { name: 'Enterprise', price: 'Custom', features: ['Dedicated support', 'Custom SLAs'] },
  ]

  return (
    <div className="page">
      <h1>Pricing</h1>
      <p className="subtitle">Simple, transparent pricing for everyone</p>

      <div className="pricing-grid">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}
          >
            <h2>{plan.name}</h2>
            <div className="price">{plan.price}</div>
            <ul className="features-list">
              {plan.features.map((feature, i) => (
                <li key={i}>✓ {feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

