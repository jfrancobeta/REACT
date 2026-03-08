# React Projects Monorepo — Learning Reference

This repository contains multiple small React example projects and a long-form guide to React concepts, patterns, and best practices. Use this README as a reference to review React knowledge, learn incrementally, and understand common real-world patterns.

Contents

- basic-react/ — Minimal React starter app.
- react-route/ — Example demonstrating React Router usage.
- redux/ — Example demonstrating Redux state management and patterns.

Quick start (per-project)

1. cd into a project folder (e.g., `basic-react`).
2. Install dependencies: `npm install`.
3. Start the dev server: `npm start`.
4. Run tests (if provided): `npm test`.

Recommended environment

- Node.js LTS (14+ or 16+) — check each subproject's package.json for exact requirements.
- npm or yarn as package manager.
- Optional: Visual Studio Code with React/TypeScript extensions.

How to use this guide

Read sections in order for progressive learning. Use the "Key patterns and examples" section for practical snippets. Bookmark sections you want to review later.

Fundamentals

- What is React: A component-based UI library for building declarative user interfaces. Components describe UI for given input (props/state) and React takes care of updating the DOM efficiently.
- JSX: A JavaScript syntax extension that looks like HTML. It compiles to React.createElement(...) calls. JSX is optional but common and enables expressive UI code.

Components

- Functional components (recommended): Plain functions that return JSX. Example:

  function Greeting({ name }) {
    return <h1>Hello, {name}</h1>;
  }

- Class components (legacy): Extend React.Component and implement render(); used when lifecycle methods or state were needed before hooks existed. Prefer functional components + hooks today.

Props and State

- Props: Read-only inputs passed from parent to child components. Use props for configuration and data flow downwards.
- State: Internal, mutable data local to a component. Change state with setState (class) or state updater from useState (hooks).
- Lifting state up: When siblings need shared state, move the state to the nearest common ancestor and pass it down via props.

Rendering patterns

- Conditional rendering: Use JS expressions, ternaries, && for conditional UI.
- Lists and keys: When rendering arrays, include a stable key (usually an id) for each element to preserve identity and minimize re-renders.

Hooks (Core)

- useState(initial): Manage local state inside functional components.
  - setState replaces the state value (if primitive) or you can updater form setState(prev => ...).

- useEffect(fn, deps): Side effects (data fetching, subscriptions, DOM mutations).
  - Dependency array controls when effect runs. Empty array runs once after mount.
  - Return a cleanup function to teardown subscriptions/timeouts.
  - Avoid side effects directly in render; useEffect is correct place.

- useRef(initial): Persist a mutable object across renders without triggering re-renders. Commonly used for DOM refs or to store previous values.

- useMemo(fn, deps): Memoize expensive computed values to avoid recomputation between renders when dependencies don't change.

- useCallback(fn, deps): Memoize function references so they keep stable identity across renders. Useful when passing callbacks to memoized children.

- useContext(Context): Consume context values (shared global-ish data) without prop drilling.

Advanced hooks

- useReducer(reducer, initial): An alternative to useState for complex state logic. Similar to Redux reducer pattern but local to a component.
- Custom hooks: Encapsulate reusable logic into functions prefixed with use, e.g., useFetch, useForm, useAuth. They can use other hooks.

Context and Composition

- Context API: Provide values to a subtree without passing props at every level. Useful for themes, auth, locale.
- Composition over inheritance: Build complex components by composing smaller ones. Prefer children and render-props or hooks for extensibility.

State management patterns

- Local state (useState/useReducer) for component-specific concerns.
- Context for cross-cutting concerns that are not performance-sensitive.
- Global state libraries (Redux, Zustand, Recoil) for large applications with complex shared state or where developer tooling/debugging is required.
- Keep state minimal and derive UI from state; compute values on render where cheap.

Data fetching patterns

- Simple: useEffect + fetch/axios and local state.
- With caching: SWR or React Query for caching, background refresh, retries, pagination helpers.
- Server-side rendering (SSR) and hydration: Use frameworks like Next.js for SSR patterns; fetch data during server render and hydrate on client.
- Abort controllers and cleanup: Cancel outstanding requests in effect cleanup to avoid updating unmounted components.

Performance

- Avoid unnecessary re-renders: Use React.memo for pure functional components that depend only on props.
- Use keys properly on lists to minimize DOM churn.
- useMemo/useCallback judiciously — don't overuse; they add complexity and cost if misapplied.
- Code-splitting: Use React.lazy and Suspense or dynamic imports to split bundles and load code on demand.
- Virtualization: For large lists, use react-window or react-virtualized to render only visible items.

Error handling

- Error boundaries (class components): Catch rendering errors and show fallback UI; currently not available as a hook.
- Graceful degradations: Validate and sanitize props and server responses.

Testing

- Unit and integration testing: Jest + React Testing Library (RTL) is the recommended stack.
  - Test behavior over implementation details: query by role/text rather than classNames.
  - Use msw (Mock Service Worker) to mock network requests in tests for realistic behavior.

TypeScript

- Strongly recommended for medium+ projects for better developer ergonomics and catching errors early.
- Type common patterns: React.FC<Props> (optional), typed hooks, typed dispatch/actions for reducers.

Routing

- React Router: Declarative routing with nested routes, hooks like useParams, useNavigate.
- Keep routing concerns separate from business logic; use route-based code-splitting.

Forms

- Controlled components: Store form input values in state and update on change.
- Uncontrolled components: Use refs for simple forms where controlled updates are unnecessary.
- Form libraries: Formik, React Hook Form (recommended) — for complex forms, validation, and performance.

Styling

- CSS Modules, SASS, styled-components, Emotion, Tailwind CSS — choose based on team preference.
- Prefer component-scoped styles to minimize global CSS collisions.
- Accessibility (A11y): Use semantic HTML, ARIA attributes when necessary, keyboard navigation, and color contrast checks.

Accessibility

- Use roles and labels for interactive controls.
- Test with screen readers and keyboard-only navigation.
- Follow WCAG guidelines for color contrast and focus management.

Folder structure (suggested)

- src/
  - components/ — small, reusable components (Button, Input)
  - features/ — feature-oriented folders with components, hooks, styles (e.g., auth/)
  - pages/ — route-level components (if using router)
  - hooks/ — shared custom hooks
  - context/ — React Context providers
  - services/ — API clients, data access layer
  - utils/ — utilities/helpers
  - styles/ — global styles and design tokens
  - index.js / App.js — app entry and root configuration

Key patterns and examples

- Debouncing input:

  const [value, setValue] = useState('');
  const debounced = useDebounce(value, 300); // custom hook or use a library

- Fetching with cleanup:

  useEffect(() => {
    const controller = new AbortController();
    fetch(url, { signal: controller.signal })
      .then(r => r.json())
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err);
      });
    return () => controller.abort();
  }, [url]);

- useReducer for complex forms:

  const [state, dispatch] = useReducer(formReducer, initialFormState);

  function formReducer(state, action) {
    switch (action.type) {
      case 'update-field':
        return { ...state, [action.field]: action.value };
      // more cases
    }
  }

Common mistakes to avoid

- Overusing context for high-frequency updates (can cause broad re-renders).
- Mutating state directly — always return new objects/arrays when updating.
- Forgetting effect dependencies — ESLint plugin react-hooks helps enforce correct dependencies.
- Over-optimizing prematurely with useMemo/useCallback everywhere.

Debugging tips

- React DevTools: Inspect component tree, props, state, and hooks.
- Console warnings: React provides helpful runtime warnings — fix them promptly.
- Add appropriate keys to lists — React warns when keys are missing.

Build and deploy

- Production build: `npm run build` (per project). Serve static files with nginx, Vercel, Netlify, or similar.
- Environment variables: Use .env files or platform-specific env settings. Avoid committing secrets.

Learning resources

- Official React docs: https://reactjs.org — primary source for modern React patterns.
- React Router docs: https://reactrouter.com
- Redux docs: https://redux.js.org
- Testing Library: https://testing-library.com/docs/react-testing-library/intro

Appendix: Practical exercises

- Convert a class component to functional component using hooks.
- Build a small CRUD app with local state, forms, and list virtualization.
- Add react-query to a project and compare patterns before/after.

Contributing

- Add new example projects as separate folders with a focused README and package.json.
- Submit PRs to expand this guide with patterns, examples, or corrections.

License

This repository does not specify a license. Add a LICENSE file if you want to set one.

---
Generated by Copilot CLI (Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>)