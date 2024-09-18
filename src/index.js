(function(global, factory) {
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        // Node/CommonJS environment (React, Angular with Webpack, etc.)
        const Split = require('split.js');  // Require Split.js if using module system
        module.exports = factory(Split);
    } else {
        // Global environment (vanilla JS or jQuery)
        global.FlexiSplit = factory(global.Split);  // Use global Split.js
    }
}(this, function(Split) {

    class FlexiSplit {
        constructor(element1, element2, options = {}) {
            this.panel1 = typeof element1 === 'string' ? document.getElementById(element1) : element1;
            this.panel2 = typeof element2 === 'string' ? document.getElementById(element2) : element2;
            this.isCollapsed = false;
            this.gutter = null;
            this.collapseButton = null;

            // Merge options with defaults
            this.options = Object.assign({
                percentage1: 50,
                percentage2: 50,
                minSize1: 100,
                minSize2: 100,
                gutterSize: 10,
                direction: 'vertical',
                collapseButtonVisible: true,
                initiallyCollapsed: false
            }, options);

            // Apply classes dynamically
            this.applyClasses();

            // Initialize Split.js (Split is either imported or globally available)
            this.splitInstance = this.initializeSplit();

            // Conditionally create the collapse button
            if (this.options.collapseButtonVisible) {
                this.createGutterButton();
            }

            // Collapse panel if the option is set
            if (this.options.initiallyCollapsed) {
                this.collapsePanel();
            }
        }

        // Method to assign necessary classes dynamically
        applyClasses() {
            const containerClass = this.options.direction === 'vertical' ? 'vertical-container' : 'horizontal-container';
            const panels = [this.panel1, this.panel2];

            const container = this.panel1.parentElement;
            container.classList.add(containerClass);

            panels.forEach(panel => panel.classList.add('splitter-panel'));
        }

        initializeSplit() {
            return Split([this.panel1, this.panel2], {
                sizes: [this.options.percentage1, this.options.percentage2],
                minSize: [this.options.minSize1, this.options.minSize2],
                direction: this.options.direction,
                gutterSize: this.options.gutterSize,
                snapOffset: 5,
                gutter: (index, direction) => {
                    const gutter = document.createElement('div');
                    gutter.className = `gutter gutter-${direction}`;
                    this.gutter = gutter;
                    return gutter;
                },
                onDrag: () => {
                    if (this.isCollapsed) {
                        return false;
                    }
                }
            });
        }

        createGutterButton() {
            const button = document.createElement('button');
            button.className = 'gutter-button';
            button.textContent = this.options.direction === 'vertical' ? 'Collapse' : 'Collapse';

            button.addEventListener('click', () => {
                this.toggleCollapse();
                button.textContent = this.isCollapsed ? 'Expand' : 'Collapse';
            });

            this.gutter.appendChild(button);
            this.collapseButton = button;
        }

        collapsePanel() {
            if (this.options.direction === 'vertical') {
                this.splitInstance.setSizes([100, 0]);
                this.panel2.style.display = 'none';
            } else {
                this.splitInstance.setSizes([0, 100]);
                this.panel1.style.display = 'none';
            }

            this.gutter.classList.add('gutter-disabled');
            this.isCollapsed = true;
        }

        expandPanel() {
            this.panel1.style.display = 'block';
            this.panel2.style.display = 'block';

            this.splitInstance.setSizes([this.options.percentage1, this.options.percentage2]);

            this.gutter.classList.remove('gutter-disabled');
            this.isCollapsed = false;
        }

        toggleCollapse() {
            if (this.isCollapsed) {
                this.expandPanel();
            } else {
                this.collapsePanel();
            }
        }
    }

    return FlexiSplit;
}));
