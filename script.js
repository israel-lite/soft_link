class PatternExplorer {
    constructor() {
        this.currentCategory = 'creational';
        this.currentPattern = null;
        this.currentLanguage = 'javascript';
        this.animationSpeed = 5;
        this.isAnimating = false;
        this.animationFrame = 0;
        this.quizMode = false;
        this.currentQuizIndex = 0;
        this.init();
    }

    init() {
        console.log('Initializing Pattern Explorer');
        this.patterns = this.initializePatterns();
        this.bindEvents();
        this.renderPatternGrid();
        console.log('Pattern Explorer initialized successfully');
    }

    initializePatterns() {
        return {
            creational: [
                {
                    id: 'singleton',
                    name: 'Singleton',
                    icon: '🔮',
                    description: 'Ensures a class has only one instance and provides global access to it.',
                    useCases: 'Database connections, logging, configuration managers.',
                    pros: 'Controlled access, memory efficiency.',
                    cons: 'Hard to test, tight coupling.',
                    visualType: 'node',
                    code: {
                        javascript: 'class Singleton {\\n    static getInstance() {\\n        if (!Singleton.instance) {\\n            Singleton.instance = new Singleton();\\n        }\\n        return Singleton.instance;\\n    }\\n}',
                        python: 'class Singleton:\\n    _instance = None\\n    @classmethod\\n    def get_instance(cls):\\n        if cls._instance is None:\\n            cls._instance = Singleton()\\n        return cls._instance',
                        java: 'public class Singleton {\\n    private static Singleton instance;\\n    private Singleton() {}\\n    public static Singleton getInstance() {\\n        if (instance == null) {\\n            instance = new Singleton();\\n        }\\n        return instance;\\n    }\\n}'
                    }
                },
                {
                    id: 'factory',
                    name: 'Factory Method',
                    icon: '🏭',
                    description: 'Creates objects without specifying their exact classes.',
                    useCases: 'UI components, database connections, parsers.',
                    pros: 'Loose coupling, easy testing.',
                    cons: 'More classes, complexity.',
                    visualType: 'node',
                    code: {
                        javascript: 'class CarFactory {\\n    createCar(type) {\\n        switch(type) {\\n            case "sedan": return new Sedan();\\n            case "suv": return new SUV();\\n        }\\n    }\\n}',
                        python: 'class CarFactory:\\n    def create_car(self, car_type):\\n        if car_type == "sedan":\\n            return Sedan()\\n        elif car_type == "suv":\\n            return SUV()',
                        java: 'class CarFactory {\\n    public Car createCar(String type) {\\n        if ("sedan".equals(type)) return new Sedan();\\n        if ("suv".equals(type)) return new SUV();\\n        return null;\\n    }\\n}'
                    }
                }
            ],
            structural: [
                {
                    id: 'adapter',
                    name: 'Adapter',
                    icon: '🔌',
                    description: 'Makes incompatible interfaces work together.',
                    useCases: 'Legacy code, third-party libraries, API integration.',
                    pros: 'Reuses existing code, separates concerns.',
                    cons: 'Extra complexity, performance overhead.',
                    visualType: 'node',
                    code: {
                        javascript: 'class Adapter {\\n    constructor(legacy) {\\n        this.legacy = legacy;\\n    }\\n    newMethod() {\\n        this.legacy.oldMethod();\\n    }\\n}',
                        python: 'class Adapter:\\n    def __init__(self, legacy):\\n        self.legacy = legacy\\n    def new_method(self):\\n        self.legacy.old_method()',
                        java: 'class Adapter {\\n    private Legacy legacy;\\n    public Adapter(Legacy legacy) {\\n        this.legacy = legacy;\\n    }\\n    public void newMethod() {\\n        legacy.oldMethod();\\n    }\\n}'
                    }
                }
            ],
            behavioral: [
                {
                    id: 'observer',
                    name: 'Observer',
                    icon: '👁️',
                    description: 'Defines one-to-many dependency between objects.',
                    useCases: 'Event systems, UI updates, stock market.',
                    pros: 'Loose coupling, dynamic relationships.',
                    cons: 'Unexpected updates, performance issues.',
                    visualType: 'node',
                    code: {
                        javascript: 'class Subject {\\n    constructor() {\\n        this.observers = [];\\n    }\\n    subscribe(observer) {\\n        this.observers.push(observer);\\n    }\\n    notify(data) {\\n        this.observers.forEach(o => o.update(data));\\n    }\\n}',
                        python: 'class Subject:\\n    def __init__(self):\\n        self.observers = []\\n    def subscribe(self, observer):\\n        self.observers.append(observer)\\n    def notify(self, data):\\n        for o in self.observers:\\n            o.update(data)',
                        java: 'class Subject {\\n    private List<Observer> observers = new ArrayList<>();\\n    public void subscribe(Observer o) {\\n        observers.add(o);\\n    }\\n    public void notify(String data) {\\n        observers.forEach(o -> o.update(data));\\n    }\\n}'
                    }
                }
            ],
            algorithms: [
                {
                    id: 'bubble-sort',
                    name: 'Bubble Sort',
                    icon: '🫧',
                    description: 'Simple sorting algorithm that repeatedly swaps adjacent elements.',
                    useCases: 'Educational purposes, small datasets.',
                    pros: 'Simple to implement, stable sort.',
                    cons: 'Inefficient for large datasets.',
                    visualType: 'array',
                    code: {
                        javascript: 'function bubbleSort(arr) {\\n    for (let i = 0; i < arr.length; i++) {\\n        for (let j = 0; j < arr.length - i - 1; j++) {\\n            if (arr[j] > arr[j + 1]) {\\n                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\\n            }\\n        }\\n    }\\n    return arr;\\n}',
                        python: 'def bubble_sort(arr):\\n    for i in range(len(arr)):\\n        for j in range(0, len(arr) - i - 1):\\n            if arr[j] > arr[j + 1]:\\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\\n    return arr',
                        java: 'void bubbleSort(int[] arr) {\\n    for (int i = 0; i < arr.length; i++) {\\n        for (int j = 0; j < arr.length - i - 1; j++) {\\n            if (arr[j] > arr[j + 1]) {\\n                int temp = arr[j];\\n                arr[j] = arr[j + 1];\\n                arr[j + 1] = temp;\\n            }\\n        }\\n    }\\n}'
                    }
                }
            ]
        };
    }

    bindEvents() {
        console.log('Binding events');
        
        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setCategory(e.target.dataset.category);
            });
        });

        // Animation controls
        const playBtn = document.getElementById('playBtn');
        const stepBtn = document.getElementById('stepBtn');
        const resetBtn = document.getElementById('resetBtn');
        
        if (playBtn) playBtn.addEventListener('click', () => this.toggleAnimation());
        if (stepBtn) stepBtn.addEventListener('click', () => this.stepAnimation());
        if (resetBtn) resetBtn.addEventListener('click', () => this.resetAnimation());
        
        // Speed slider
        const speedSlider = document.getElementById('speedSlider');
        if (speedSlider) {
            speedSlider.addEventListener('input', (e) => {
                this.animationSpeed = parseInt(e.target.value);
            });
        }

        // Event delegation for dynamic content
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('code-tab')) {
                this.setLanguage(e.target.dataset.lang);
            }
            if (e.target.classList.contains('info-tab')) {
                this.setInfoTab(e.target.dataset.tab);
            }
            if (e.target.classList.contains('pattern-card') || e.target.closest('.pattern-card')) {
                const card = e.target.classList.contains('pattern-card') ? e.target : e.target.closest('.pattern-card');
                this.selectPattern(card.dataset.pattern);
            }
            if (e.target.id === 'startQuizBtn') {
                this.startQuiz();
            }
            if (e.target.classList.contains('quiz-option')) {
                const questionIndex = parseInt(e.target.closest('.quiz-question').dataset.questionIndex || '0');
                this.handleQuizAnswer(e.target, questionIndex);
            }
            if (e.target.id === 'runCodeBtn') {
                this.runConsoleCode();
            }
            if (e.target.id === 'clearConsoleBtn') {
                this.clearConsole();
            }
        });

        // Console input - run code with Ctrl+Enter
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter' && e.target.id === 'consoleInput') {
                this.runConsoleCode();
            }
        });

        console.log('All events bound successfully');
    }

    setCategory(category) {
        this.currentCategory = category;
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        this.renderPatternGrid();
    }

    renderPatternGrid() {
        const grid = document.getElementById('patternGrid');
        const patterns = this.patterns[this.currentCategory] || [];
        
        grid.innerHTML = patterns.map(pattern => `
            <div class="pattern-card" data-pattern="${pattern.id}">
                <div class="pattern-icon">${pattern.icon}</div>
                <div class="pattern-name">${pattern.name}</div>
                <div class="pattern-type">${this.currentCategory}</div>
            </div>
        `).join('');

        grid.querySelectorAll('.pattern-card').forEach(card => {
            card.addEventListener('click', () => this.selectPattern(card.dataset.pattern));
        });
    }

    selectPattern(patternId) {
        const pattern = this.patterns[this.currentCategory].find(p => p.id === patternId);
        if (!pattern) return;

        this.currentPattern = pattern;
        
        document.querySelectorAll('.pattern-card').forEach(card => {
            card.classList.toggle('active', card.dataset.pattern === patternId);
        });

        this.updateCodeDisplay();
        this.updateInfoDisplay();
        this.renderVisualization();
    }

    updateCodeDisplay() {
        if (!this.currentPattern) return;

        const code = this.currentPattern.code[this.currentLanguage];
        document.getElementById('codeDisplay').innerHTML = `
            <pre><code class="language-${this.currentLanguage}">${this.escapeHtml(code)}</code></pre>
        `;

        document.querySelectorAll('.code-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.lang === this.currentLanguage);
        });
    }

    updateInfoDisplay() {
        if (!this.currentPattern) return;

        const sections = {
            description: `
                <h3>About This Pattern</h3>
                <p>${this.currentPattern.description}</p>
            `,
            'use-cases': `
                <h3>When to Use</h3>
                <p>${this.currentPattern.useCases}</p>
            `,
            'pros-cons': `
                <h3>Advantages</h3>
                <p>${this.currentPattern.pros}</p>
                <h3>Disadvantages</h3>
                <p>${this.currentPattern.cons}</p>
            `
        };

        document.getElementById('infoContent').innerHTML = Object.entries(sections).map(([key, content]) => `
            <div class="info-section ${key === 'description' ? 'active' : ''}" data-section="${key}">
                ${content}
            </div>
        `).join('');

        document.querySelectorAll('.info-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === 'description');
        });
    }

    renderVisualization() {
        if (!this.currentPattern) return;

        const vizArea = document.getElementById('visualizationArea');
        
        if (this.currentPattern.visualType === 'node') {
            this.renderNodeVisualization(vizArea);
        } else if (this.currentPattern.visualType === 'array') {
            this.renderArrayVisualization(vizArea);
        }
    }

    renderNodeVisualization(container) {
        container.innerHTML = `
            <div class="visualization-canvas">
                <div class="node" style="left: 50px; top: 50px;">Client</div>
                <div class="node" style="left: 200px; top: 50px;">${this.currentPattern.name}</div>
                <div class="node" style="left: 350px; top: 50px;">Implementation</div>
                <div class="edge" style="left: 100px; top: 65px; width: 100px;"></div>
                <div class="edge" style="left: 250px; top: 65px; width: 100px;"></div>
            </div>
        `;
    }

    renderArrayVisualization(container) {
        const array = [5, 2, 8, 1, 9, 3];
        container.innerHTML = `
            <div class="visualization-canvas">
                ${array.map((val, i) => `
                    <div class="array-bar" style="height: ${val * 30}px; left: ${i * 60}px;">
                        ${val}
                    </div>
                `).join('')}
            </div>
        `;
    }

    toggleAnimation() {
        if (!this.currentPattern) {
            this.showNotification('Please select a pattern first!');
            return;
        }
        
        this.isAnimating = !this.isAnimating;
        const playBtn = document.getElementById('playBtn');
        playBtn.textContent = this.isAnimating ? '⏸ Pause' : '▶ Play';
        
        if (this.isAnimating) {
            this.animate();
        }
    }

    animate() {
        if (!this.isAnimating || !this.currentPattern) return;
        
        this.stepAnimation();
        setTimeout(() => this.animate(), 1000 / this.animationSpeed);
    }

    stepAnimation() {
        if (!this.currentPattern) {
            this.showNotification('Please select a pattern first!');
            return;
        }
        
        const canvas = document.querySelector('.visualization-canvas');
        if (!canvas) return;
        
        const nodes = canvas.querySelectorAll('.node');
        const edges = canvas.querySelectorAll('.edge');
        
        nodes.forEach(node => node.classList.remove('highlighted'));
        edges.forEach(edge => edge.classList.remove('animated'));
        
        const totalElements = nodes.length + edges.length;
        const elementIndex = this.animationFrame % totalElements;
        
        if (elementIndex < nodes.length) {
            nodes[elementIndex].classList.add('highlighted');
        } else {
            edges[elementIndex - nodes.length].classList.add('animated');
        }
        
        this.animationFrame++;
    }

    resetAnimation() {
        this.isAnimating = false;
        this.animationFrame = 0;
        const playBtn = document.getElementById('playBtn');
        if (playBtn) playBtn.textContent = '▶ Play';
        
        document.querySelectorAll('.node').forEach(node => node.classList.remove('highlighted'));
        document.querySelectorAll('.edge').forEach(edge => edge.classList.remove('animated'));
    }

    setLanguage(lang) {
        console.log('Setting language to:', lang);
        this.currentLanguage = lang;
        
        const codeDisplay = document.getElementById('codeDisplay');
        const consoleContainer = document.getElementById('consoleContainer');
        
        if (lang === 'console') {
            codeDisplay.style.display = 'none';
            consoleContainer.style.display = 'flex';
            console.log('Console shown');
        } else {
            codeDisplay.style.display = 'block';
            consoleContainer.style.display = 'none';
            this.updateCodeDisplay();
            console.log('Code display shown for:', lang);
        }

        document.querySelectorAll('.code-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.lang === lang);
        });
    }

    setInfoTab(tab) {
        console.log('Setting info tab to:', tab);
        document.querySelectorAll('.info-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.tab === tab);
        });
        
        document.querySelectorAll('.info-section').forEach(section => {
            section.classList.toggle('active', section.dataset.section === tab);
        });
    }

    startQuiz() {
        console.log('Starting quiz');
        this.quizMode = true;
        this.currentQuizIndex = 0;
        const quizContent = document.getElementById('quizContent');
        const questions = this.generateQuizQuestions();
        const currentQuestion = questions[this.currentQuizIndex];
        
        quizContent.innerHTML = `
            <div class="quiz-question" data-question-index="${this.currentQuizIndex}">
                <h4>Question ${this.currentQuizIndex + 1} of ${questions.length}</h4>
                <p>${currentQuestion.question}</p>
                <div class="quiz-options">
                    ${currentQuestion.options.map((option, index) => `
                        <div class="quiz-option" data-answer="${index}">
                            ${option}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        quizContent.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', () => this.handleQuizAnswer(option, this.currentQuizIndex));
        });
    }

    generateQuizQuestions() {
        return [
            {
                question: 'Which pattern ensures only one instance of a class exists?',
                options: ['Factory', 'Singleton', 'Observer', 'Adapter'],
                correct: 1,
                explanation: 'The Singleton pattern ensures that only one instance of a class can exist and provides a global point of access to it. Think of it like having only one database connection or one configuration manager for your entire application.'
            },
            {
                question: 'Which pattern makes incompatible interfaces work together?',
                options: ['Adapter', 'Strategy', 'Builder', 'Observer'],
                correct: 0,
                explanation: 'The Adapter pattern acts as a bridge between two incompatible interfaces, allowing them to work together. It\'s like a power adapter that lets you plug different devices into the same outlet.'
            },
            {
                question: 'Which pattern defines a family of algorithms?',
                options: ['Singleton', 'Adapter', 'Strategy', 'Observer'],
                correct: 2,
                explanation: 'The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It lets you change the algorithm used at runtime without changing the client code.'
            },
            {
                question: 'Which pattern notifies multiple objects about state changes?',
                options: ['Factory', 'Singleton', 'Adapter', 'Observer'],
                correct: 3,
                explanation: 'The Observer pattern defines a one-to-many relationship between objects. When one object (the subject) changes state, all its dependents (observers) are notified and updated automatically.'
            }
        ];
    }

    handleQuizAnswer(element, questionIndex) {
        const selectedIndex = parseInt(element.dataset.answer);
        const questions = this.generateQuizQuestions();
        const currentQuestion = questions[questionIndex];
        const isCorrect = selectedIndex === currentQuestion.correct;
        
        // Disable all options after selection
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        element.classList.add(isCorrect ? 'correct' : 'incorrect');
        
        if (!isCorrect) {
            document.querySelectorAll('.quiz-option')[currentQuestion.correct].classList.add('correct');
        }
        
        // Show explanation
        const explanation = currentQuestion.explanation || '';
        const quizContent = document.getElementById('quizContent');
        
        if (this.currentQuizIndex < questions.length - 1) {
            // Show Next button for questions that aren't the last
            quizContent.innerHTML += `
                <div class="quiz-explanation">
                    <p class="explanation-text">${explanation}</p>
                    <button class="quiz-btn next-btn" onclick="patternExplorer.nextQuestion()">Next Question →</button>
                </div>
            `;
        } else {
            // Show Finish button for the last question
            quizContent.innerHTML += `
                <div class="quiz-explanation">
                    <p class="explanation-text">${explanation}</p>
                    <button class="quiz-btn finish-btn" onclick="patternExplorer.finishQuiz()">Finish Quiz</button>
                </div>
            `;
        }
    }
    
    nextQuestion() {
        this.currentQuizIndex++;
        this.startQuiz();
    }
    
    finishQuiz() {
        const quizContent = document.getElementById('quizContent');
        quizContent.innerHTML = `
            <div class="quiz-result">
                <h4>🎉 Quiz Complete!</h4>
                <p>You've completed all the questions.</p>
                <p>Review the patterns above to learn more about each one!</p>
                <button class="quiz-btn" onclick="patternExplorer.startQuiz()">Restart Quiz</button>
            </div>
        `;
    }

    runConsoleCode() {
        console.log('Running console code');
        const input = document.getElementById('consoleInput');
        const output = document.getElementById('consoleOutput');
        
        if (!input || !output) {
            console.error('Console elements not found');
            return;
        }
        
        const code = input.value.trim();
        
        if (!code) {
            this.addConsoleOutput('// Please enter some code to execute', 'info');
            return;
        }
        
        this.addConsoleOutput(`> ${code}`, 'log');
        
        try {
            const originalLog = console.log;
            const logs = [];
            console.log = (...args) => {
                logs.push(args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' '));
            };
            
            const result = eval(code);
            console.log = originalLog;
            
            logs.forEach(log => {
                this.addConsoleOutput(log, 'log');
            });
            
            if (result !== undefined) {
                const resultStr = typeof result === 'object' 
                    ? JSON.stringify(result, null, 2) 
                    : String(result);
                this.addConsoleOutput(`← ${resultStr}`, 'result');
            }
            
        } catch (error) {
            this.addConsoleOutput(`✗ Error: ${error.message}`, 'error');
        }
        
        input.value = '';
        input.focus();
    }
    
    clearConsole() {
        const output = document.getElementById('consoleOutput');
        output.innerHTML = '<div class="console-line">// Console cleared. Ready for new commands...</div>';
    }
    
    addConsoleOutput(message, type = 'log') {
        const output = document.getElementById('consoleOutput');
        const line = document.createElement('div');
        line.className = `console-line ${type}`;
        line.textContent = message;
        output.appendChild(line);
        
        output.scrollTop = output.scrollHeight;
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

const patternExplorer = new PatternExplorer();

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Pattern Explorer');
    patternExplorer.bindEvents();
});

if (document.readyState !== 'loading') {
    console.log('DOM already loaded, binding events immediately');
    patternExplorer.bindEvents();
}
