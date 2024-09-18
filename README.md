
# FlexiSplit

**FlexiSplit** is a flexible, framework-agnostic splitter component for building resizable and collapsible panels in web applications. It can be used with **vanilla JavaScript**, **jQuery**, **React**, and **Angular**. This splitter makes it easy to create dynamic layouts with adjustable panels and customizable gutters.

## Features
- **Vertical and Horizontal Splits**: Easily split content either horizontally or vertically.
- **Resizable Panels**: Users can drag the gutter to resize the panels.
- **Collapsible Panels**: Option to collapse and expand panels with a button in the gutter.
- **Framework Agnostic**: Works with vanilla JS, jQuery, React, and Angular.
- **Configurable**: Highly customizable options like panel sizes, gutter size, and minimum panel size.
- **Auto CSS Class Assignment**: Automatically adds required CSS classes to the container and panels.
- **Global or Module Support**: FlexiSplit can be used both with module imports (React, Angular) and global script inclusions (vanilla JS, jQuery).

## Installation

Install FlexiSplit via npm:

```bash
npm install flexisplit
```

After installation, make sure to include the **CSS** file for proper styling:

### HTML (Vanilla JS or jQuery)
```html
<link rel="stylesheet" href="node_modules/flexisplit/css/flexisplit.css">
```

For React or Angular, import the CSS:

```javascript
import 'flexisplit/css/flexisplit.css';
```

## Usage

### Vanilla JavaScript or jQuery Example

1. **HTML Structure:**
   ```html
   <div id="container">
       <div id="panel1">Panel 1</div>
       <div id="panel2">Panel 2</div>
   </div>
   ```

2. **Include Split.js via CDN:**

   ```html
   <script src="https://cdn.jsdelivr.net/npm/split.js/dist/split.min.js"></script>
   ```

3. **JavaScript Initialization (for jQuery):**
   ```html
   <script>
   $(document).ready(function() {
       const splitter = new FlexiSplit($('#panel1')[0], $('#panel2')[0], {
           direction: 'horizontal',  // Use 'vertical' for vertical split
           percentage1: 70,          // 70% width for panel1
           percentage2: 30,          // 30% width for panel2
           gutterSize: 10,           // 10px gutter size
           minSize1: 100,            // Minimum size for panel1
           minSize2: 100,            // Minimum size for panel2
           collapseButtonVisible: true  // Show collapse button
       });
   });
   </script>
   ```

### React Example

1. **React Component:**
   ```javascript
   import React, { useEffect, useRef } from 'react';
   import FlexiSplit from 'flexisplit';
   import 'flexisplit/css/flexisplit.css';

   const FlexiSplitReact = ({ id1, id2, options }) => {
       const panel1Ref = useRef(null);
       const panel2Ref = useRef(null);

       useEffect(() => {
           new FlexiSplit(panel1Ref.current, panel2Ref.current, options);
       }, []);

       return (
           <div>
               <div id={id1} ref={panel1Ref}>Panel 1</div>
               <div id={id2} ref={panel2Ref}>Panel 2</div>
           </div>
       );
   };

   export default FlexiSplitReact;
   ```

2. **Usage in Parent Component:**
   ```javascript
   import React from 'react';
   import FlexiSplitReact from './FlexiSplitReact';

   const App = () => {
       return (
           <div>
               <FlexiSplitReact id1="left-panel" id2="right-panel" options={{ direction: 'horizontal' }} />
           </div>
       );
   };

   export default App;
   ```

### Angular Example

1. **Angular Component:**
   ```typescript
   import { Component, ElementRef, AfterViewInit } from '@angular/core';
   import FlexiSplit from 'flexisplit';
   import 'flexisplit/css/flexisplit.css';

   @Component({
     selector: 'app-flexisplit',
     template: `
       <div id="panel1">Panel 1</div>
       <div id="panel2">Panel 2</div>
     `,
     styles: []
   })
   export class FlexiSplitComponent implements AfterViewInit {

     constructor(private elRef: ElementRef) {}

     ngAfterViewInit() {
       const panel1 = this.elRef.nativeElement.querySelector('#panel1');
       const panel2 = this.elRef.nativeElement.querySelector('#panel2');
       new FlexiSplit(panel1, panel2, { direction: 'horizontal' });
     }
   }
   ```

2. **Usage in Parent Component:**
   ```typescript
   import { Component } from '@angular/core';

   @Component({
     selector: 'app-root',
     template: `
       <app-flexisplit></app-flexisplit>
     `,
     styles: []
   })
   export class AppComponent {}
   ```

## Options

| Option                 | Description                                                                 | Default Value |
|------------------------|-----------------------------------------------------------------------------|---------------|
| `percentage1`           | The initial size percentage of the first panel (left or top).               | `50`          |
| `percentage2`           | The initial size percentage of the second panel (right or bottom).          | `50`          |
| `minSize1`              | Minimum size (in pixels) of the first panel.                                | `100`         |
| `minSize2`              | Minimum size (in pixels) of the second panel.                               | `100`         |
| `gutterSize`            | Size of the gutter (the draggable area between the panels).                 | `10`          |
| `direction`             | Direction of the splitter: `'vertical'` or `'horizontal'`.                  | `'vertical'`  |
| `collapseButtonVisible` | Whether or not to show a collapse button inside the gutter.                 | `true`        |
| `initiallyCollapsed`    | Whether the second panel should be collapsed initially.                     | `false`       |

## Methods

- `collapse()`: Programmatically collapses the second panel.
- `expand()`: Programmatically expands the second panel to its initial size.
- `toggle()`: Toggles between collapsing and expanding the second panel.

## License

MIT License
