export default function Pricing() {
    const plans = [
        {
            name: 'Starter',
            price: 'Free',
            features: ['Up to 10 routes', 'Basic HTML to Markdown', 'Community support']
        },
        {
            name: 'Professional',
            price: '$49/mo',
            features: ['Unlimited routes', 'Custom converters', 'Priority support', 'Advanced caching'],
            highlighted: true
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            features: ['Everything in Pro', 'Custom SLAs', 'Dedicated support', 'White-label options']
        }
    ]

    return (
        <div className="page">
            <h1>Pricing</h1>
            <p className="subtitle">Simple, transparent pricing for everyone</p>

            <div className="pricing-grid">
                {plans.map((plan, idx) => (
                    <div key={idx} className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}>
                        <h2>{plan.name}</h2>
                        <div className="price">{plan.price}</div>
                        <ul className="features-list">
                            {plan.features.map((feature, i) => (
                                <li key={i}>✓ {feature}</li>
                            ))}
                        </ul>
                        <button className="btn">Get Started</button>
                    </div>
                ))}
            </div>

            <section className="faq-pricing">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-item">
                    <h3>Can I upgrade or downgrade anytime?</h3>
                    <p>Yes, you can change your plan at any time. Changes take effect immediately.</p>
                </div>
                <div className="faq-item">
                    <h3>Is there a free trial?</h3>
                    <p>Our Starter plan is completely free forever. Upgrade whenever you need more features.</p>
                </div>
                <div className="faq-item">
                    <h3>Do you offer discounts for annual billing?</h3>
                    <p>Yes! Pay annually and get 2 months free. Contact our sales team for details.</p>
                </div>
            </section>
        </div>
    )
}
