## LEAP Dev NextJS Take Home Test

This is a very basic Book Store with static data and simple CRUD support.

Push this up to a public Github repository please. We will assess both code and commits in order to discern how you approach problem-solving.

---

Please implement the following:

1. Use a component library to make the UI and UX more appealing and user friendly. DONE

[Explain here why you chose the one you did]
I decided to use Material UI "MUI" because it's a commonly used React component library
that I've also worked with for several years. Its wide range of existing components makes it
simple and convenient to use while still being easy to customise. MUI also has a large community and
contributor base, which provides confidence that the library will continue to recieve bug fixes,
improvements, and new features in the future.

2. Implement dark mode that includes a switcher to go back to light mode. DONE

3. Deleting a book displays a JavaScript alert. Replace this with modern UX. DONE

4. Add a rating system that goes up to 5 stars. DONE

5. There is a bug in the code. Find it and fix it. DONE

[Explain here what the bug was and how you fixed it]
Bug 1: Editing a book did not reflect the updated values. In handleUpdateBook(), the object spread order was incorrect,
causing the existing book properties to overwrite the updated properties.
Fix 1: Reversed the object spread order from { ...updatedBook, ...book } to { ...book, ...updatedBook },
allowing the updated book values to correctly overwrite the existing values.

Bug 2: User-provided cover image values were passed directly to Next.js <Image>, allowing unsupported sources to cause a
runtime error.
Fix 2: Added a guard to only render <Image> for supported local image paths. Invalid or unsupported sources now display a fallback instead of crashing the application.

Good luck and have fun!

## Development Commands

```bash
pnpm dev          # Run checks and start the development server
pnpm build        # Run tests and create a production build
pnpm start        # Start the production server

pnpm check        # Run Biome checks
pnpm check:fix    # Run Biome checks and automatically fix issues

pnpm test         # Run Vitest tests
pnpm test:run     # Run Vitest tests once
```