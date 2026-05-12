export default function FAQ() {
    const faqs = [
        {
            question: 'What is @llmtxt/react?',
            answer: 'A build-time helper for React SPAs to generate llms.txt and llms-full.txt documentation files automatically from your route list.'
        },
        {
            question: 'How does it work?',
            answer: 'You provide a list of routes, and the package fetches each route from your running app and converts the HTML to Markdown for documentation.'
        },
        {
            question: 'Do I need a backend?',
            answer: 'No, it works entirely with your frontend. You can generate the documentation after deploying your SPA to any static hosting.'
        },
        {
            question: 'What formats are generated?',
            answer: 'Two files: llms.txt (lightweight index) and llms-full.txt (full documentation with page content).'
        },
        {
            question: 'Can I customize the output?',
            answer: 'Yes, you can provide custom HTML to Markdown converters and configure various generation options.'
        },
        {
            question: 'Is it compatible with React Router?',
            answer: 'Yes, it works with any React routing solution. Just provide the list of routes to document.'
        },
        {
            question: 'What about performance?',
            answer: 'Very fast. Generation typically takes seconds even for large sites. You can configure timeouts and parallel generation.'
        },
        {
            question: 'How do I update my documentation?',
            answer: 'Run the generation script anytime after deployment. We recommend including it in your CI/CD pipeline.'
        },
        {
            question: 'Is there a free version?',
            answer: 'Yes! The Starter plan is completely free. Upgrade when you need advanced features.'
        },
        {
            question: 'Can I use it with Create React App?',
            answer: 'Yes, it works with any React framework including Create React App, Vite, Next.js, Remix, and more.'
        }
    ]

    return (
        <div className="page">
            <h1>Frequently Asked Questions</h1>
            <p className="subtitle">Find answers to common questions about @llmtxt/react</p>

            <div className="faq-container">
                {faqs.map((faq, idx) => (
                    <details key={idx} className="faq-item">
                        <summary className="faq-question">{faq.question}</summary>
                        <div className="faq-answer">{faq.answer}</div>
                    </details>
                ))}
            </div>

            <section className="faq-cta">
                <h2>Still have questions?</h2>
                <p>Check out our documentation or contact us directly for more help.</p>
            </section>
        </div>
    )
}
