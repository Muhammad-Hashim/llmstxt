export default function FAQ() {
  return (
    <div className="page">
      <h1>FAQ</h1>
      <ul>
        <li>
          <strong>Why is llms-full.txt empty?</strong> In client-rendered SPAs, fetch returns the same
          HTML shell. Use SSR/prerender, <code>route.markdown</code>, or Playwright rendering.
        </li>
        <li>
          <strong>What about dynamic routes?</strong> Expand <code>/blog/:slug</code> into concrete
          paths like <code>/blog/introducing-v2</code>.
        </li>
      </ul>
    </div>
  )
}

