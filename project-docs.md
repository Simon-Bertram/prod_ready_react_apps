# React Photo Gallery App

A simple React application that displays a gallery of photos and allows users to add new photo URLs to the gallery.

## Features

- View a gallery of sample photos.
- Add new photo URLs via an upload form.
- Toggle the visibility of the upload form.
- Responsive, real-time updates to the gallery.

## Component Structure

- **App**: Main component managing state and layout.
- **Navbar**: Displays the navigation bar.
- **Card**: Renders individual photo cards.
- **UploadForm**: Handles input and submission for new photo URLs.

## State Management

- Uses React’s `useState` for:
  - The current input value (`input`)
  - The list of photo URLs (`items`)
  - The upload form’s visibility (`isCollapsed`)

## Data Flow

1. The gallery is initialized with a set of default photo URLs.
2. Users can toggle the upload form using the "Add/Hide" button.
3. When a new URL is submitted, it is added to the top of the gallery.
4. The gallery updates to show the new photo immediately.

## Usage

1. Click the "Add" button to show the upload form.
2. Enter a valid image URL and submit.
3. The new image appears at the top of the gallery.

## Example Code Snippet

```tsx
const [input, setInput] = useState("");
const [items, setItems] = useState(photos);
const [isCollapsed, setIsCollapsed] = useState(false);

const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  setInput(e.target.value);

const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setItems([input, ...items]);
};
```

## Contributing

- Follow best practices for React and TypeScript.
- Use functional components and hooks.
- Keep code clean and well-documented.

## License

MIT
