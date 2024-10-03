# react-gradient-animation

[![npm version](https://img.shields.io/npm/v/react-gradient-animation)](https://www.npmjs.com/package/react-gradient-animation)
[![npm downloads](https://img.shields.io/npm/dm/react-gradient-animation)](https://www.npmjs.com/package/react-gradient-animation)
[![license](https://img.shields.io/npm/l/react-gradient-animation)](https://github.com/yourusername/react-gradient-animation/blob/main/LICENSE)

A highly customizable, animated gradient background component for React applications.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

````bash
npm install react-gradient-animation
```
Or with Yarn:
```bash
yarn add react-gradient-animation
````

## Usage

To use react-gradient-animation, wrap the GradientBackground component within a container that has a set width and height and a `position: relative` style.

```jsx
import React from "react";
import { GradientBackground } from "react-gradient-animation";

function App() {
  return (
    <div style={{ position: "relative", width: "100%", height: "500px" }}>
      <GradientBackground
        count={20}
        size={{ min: 500, max: 700, pulse: 0.3 }}
        speed={{ x: { min: 0.5, max: 2 }, y: { min: 0.5, max: 2 } }}
        colors={{
          background: "#1e1e1e",
          particles: ["#ff007f", "#7f00ff", "#00ffff"],
        }}
        blending="overlay"
        opacity={{ center: 0.5, edge: 0 }}
        skew={-2}
        shapes={["c", "s", "t"]}
        style={{ opacity: 0.8 }}
      />
      {/* Other content */}
    </div>
  );
}

export default App;
```

## Props

| Prop                 | Type                                 | Default Value                                                                 | Description                                                                       |
| -------------------- | ------------------------------------ | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| count                | number                               | 12                                                                            | The number of particles (shapes) to animate.                                      |
| size                 | `SizeConfig`                         | `{ min: 1000, max: 1200, pulse: 0.5 }`                                        | Configuration for the size of the particles. Includes min, max, and pulse values. |
| speed                | `SpeedConfig`                        | `{ x: { min: 0.6, max: 3 }, y: { min: 0.6, max: 3 } }`                        | Configuration for the movement speed of particles along the x and y axes.         |
| colors               | `ColorsConfig`                       | `{ background: 'transparent', particles: ['#ff681c', '#87ddfe', '#231efe'] }` | Colors for the background and particles.                                          |
| blending             | `GlobalCompositeOperation` or 'none' | 'overlay'                                                                     | The global composite operation to use for blending particles.                     |
| opacity              | `OpacityConfig`                      | `{ center: 0.45, edge: 0 }`                                                   | Opacity settings for particles.                                                   |
| skew                 | number                               | -1.5                                                                          | The skew angle in degrees for the canvas transformation.                          |
| shapes               | `ShapeType[]`                        | ['c']                                                                         | An array of shape types for the particles.                                        |
| className            | string                               | ''                                                                            | Additional CSS classes to apply to the canvas element.                            |
| translateYcorrection | boolean                              | true                                                                          | Adjusts the vertical translation to compensate for the skew transformation.       |
| style                | `CSSProperties`                      | {}                                                                            | Inline styles to apply to the canvas element.                                     |

### Type Definitions

#### SizeConfig

```typescript
interface SizeConfig {
  min: number;
  max: number;
  pulse: number;
}
```

#### SpeedAxisConfig

```typescript
interface SpeedAxisConfig {
  min: number;
  max: number;
}
```

#### SpeedConfig

```typescript
interface SpeedConfig {
  x: SpeedAxisConfig;
  y: SpeedAxisConfig;
}
```

#### ColorsConfig

```typescript
interface ColorsConfig {
  background: string;
  particles: string[];
}
```

#### OpacityConfig

```typescript
interface OpacityConfig {
  center: number;
  edge: number;
}
```

#### ShapeType

```typescript
type ShapeType = "c" | "s" | "t"; // 'c' for circle, 's' for square, 't' for triangle
```

## Examples

### Basic Usage

```jsx
import React from "react";
import { GradientBackground } from "react-gradient-animation";

function BasicExample() {
  return (
    <div style={{ position: "relative", height: "400px" }}>
      <GradientBackground />
      {/* Your content here */}
    </div>
  );
}

export default BasicExample;
```

### Custom Configuration

```jsx
import React from "react";
import { GradientBackground } from "react-gradient-animation";

function CustomExample() {
  return (
    <div style={{ position: "relative", width: "100%", height: "600px" }}>
      <GradientBackground
        count={15}
        size={{ min: 800, max: 1000, pulse: 0.4 }}
        speed={{ x: { min: 1, max: 2 }, y: { min: 1, max: 2 } }}
        colors={{
          background: "#0d0d0d",
          particles: ["#ff6347", "#1e90ff", "#32cd32"],
        }}
        blending="screen"
        opacity={{ center: 0.6, edge: 0 }}
        skew={-3}
        shapes={["c", "t"]}
        style={{ opacity: 0.9 }}
      />
      {/* Your content here */}
    </div>
  );
}

export default CustomExample;
```

## Usage Notes

- **Container Requirements**: The `GradientBackground` component should be placed within a container that has:
  - A set width and height.
  - `position: relative` style to ensure the canvas overlays correctly.
- **Styling**: You can pass custom styles via the `style` prop or use the `className` prop to apply CSS classes.
- **Shapes**: Mix and match different shapes by passing an array to the `shapes` prop. The particles will cycle through the provided shapes.
- **Performance Considerations**: Higher values for `count` and larger size ranges may impact performance on lower-end devices. Adjust the speed and pulse values to optimize animation smoothness.

## Contributing

Contributions are welcome! Please open an issue or pull request for any bugs, improvements, or feature requests.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## What's Included

- **Component**: `GradientBackground` React component.
- **Type Definitions**: Fully typed with TypeScript for better developer experience.
- **Customization**: Highly customizable with various props to adjust the animation to your needs.

## Dependencies

- **React**: `react` is a peer dependency. Ensure it is installed in your project.

Happy coding!
