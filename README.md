
Project Structure Highlights:
- Entry: App.jsx -> imports all components
- Component Flow: Navbar ->Hero -> About-> Features -> Story -> Contact -> Footer
- Style System: index.css (global styles)


// Always include these first
1. App.jsx (component hierarchy)
3. index.jsx (root render)
4. Any shared state/context files

Component Relationships:
graph TD
    A[App.jsx] --> B[Navbar]
    A --> C[Hero]
    A --> D[About]
    A --> E[Features]
    A --> F[Story]
    A --> G[Contact]
    A --> H[Footer]
