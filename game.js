// Game State Variables
let currentClue = 0;
let currentDifficulty = 'beginner';
let commandHistory = [];
let historyIndex = -1;
let failedAttempts = 0;
let totalAttempts = 0;
let hintsUsed = 0;
let startTime = Date.now();
let selectedAutocompleteIndex = -1;
let isTyping = false;
let currentDirectory = '/home/user/cli-hunt';

// DOM Elements
const output = document.getElementById('output');
const commandInput = document.getElementById('command-input');
const autocompleteDropdown = document.getElementById('autocomplete-dropdown');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

// Enhanced CLI Functions
function typeText(element, htmlContent, speed = 30) {
    return new Promise((resolve) => {
        isTyping = true;
        element.innerHTML = '';
        
        // Create a temporary element to parse the HTML and extract text
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        const textContent = tempDiv.textContent || tempDiv.innerText || '';
        
        let i = 0;
        const terminalBody = document.querySelector('.terminal-body');
        
        const typeChar = () => {
            if (i < textContent.length) {
                // Get the current character
                const char = textContent.charAt(i);
                element.textContent += char;
                i++;
                
                // Scroll more frequently - every 5 characters
                if (i % 5 === 0) {
                    if (terminalBody) {
                        terminalBody.scrollTop = terminalBody.scrollHeight;
                    }
                }
                
                setTimeout(typeChar, speed);
            } else {
                // Once typing is complete, replace with full HTML content
                element.innerHTML = htmlContent;
                isTyping = false;
                
                // Multiple scroll attempts after completion
                if (terminalBody) {
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                    setTimeout(() => terminalBody.scrollTop = terminalBody.scrollHeight, 10);
                    setTimeout(() => terminalBody.scrollTop = terminalBody.scrollHeight, 50);
                }
                
                resolve();
            }
        };
        
        typeChar();
    });
}

function simulateCommandExecution(command) {
    return new Promise((resolve) => {
        const executingDiv = document.createElement('div');
        executingDiv.className = 'command-executing';
        executingDiv.textContent = `Executing: ${command}`;
        output.appendChild(executingDiv);
        
        // Simulate execution time based on command complexity
        const executionTime = command.includes('aws') ? 
            Math.random() * 1000 + 500 : // AWS commands: 500-1500ms
            Math.random() * 300 + 100;   // System commands: 100-400ms
        
        setTimeout(() => {
            output.removeChild(executingDiv);
            resolve();
        }, executionTime);
    });
}

function expandAlias(command) {
    const parts = command.trim().split(' ');
    const alias = parts[0].toLowerCase();
    
    if (commandAliases[alias]) {
        return commandAliases[alias] + (parts.length > 1 ? ' ' + parts.slice(1).join(' ') : '');
    }
    
    return command;
}

// Game Functions
function updateProgress() {
    const totalStages = gameStages[currentDifficulty].length;
    const progress = (currentClue / totalStages) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${currentClue}/${totalStages}`;
}

function addToOutput(content, className = '') {
    const div = document.createElement('div');
    div.className = `command-line ${className}`;
    div.innerHTML = content;
    output.appendChild(div);
    scrollToBottom();
}

function scrollToBottom() {
    // Get the terminal body element (the actual scrollable container)
    const terminalBody = document.querySelector('.terminal-body');
    
    if (terminalBody) {
        // Scroll the terminal body, not just the output div
        terminalBody.scrollTop = terminalBody.scrollHeight;
        
        // Backup scrolls
        setTimeout(() => terminalBody.scrollTop = terminalBody.scrollHeight, 10);
        setTimeout(() => terminalBody.scrollTop = terminalBody.scrollHeight, 50);
        setTimeout(() => terminalBody.scrollTop = terminalBody.scrollHeight, 100);
    }
    
    // Also scroll the output div as backup
    output.scrollTop = output.scrollHeight;
    setTimeout(() => output.scrollTop = output.scrollHeight, 10);
    setTimeout(() => output.scrollTop = output.scrollHeight, 50);
}

function showHint() {
    const currentStage = gameStages[currentDifficulty][currentClue];
    if (currentStage && currentStage.hint) {
        addToOutput(`<div class="hint">💡 Hint: ${currentStage.hint}</div>`);
        hintsUsed++;
    }
}

function showAutocomplete(input) {
    const matches = awsCommands.filter(item => 
        item.cmd.toLowerCase().startsWith(input.toLowerCase()) && input.length > 0
    );

    if (matches.length === 0 || input.length === 0) {
        autocompleteDropdown.style.display = 'none';
        return;
    }

    autocompleteDropdown.innerHTML = '';
    matches.forEach((match, index) => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        
        const commandSpan = document.createElement('span');
        commandSpan.textContent = match.cmd;
        
        const descSpan = document.createElement('span');
        descSpan.className = 'command-suggestion';
        descSpan.textContent = match.desc;
        
        const shortcutSpan = document.createElement('span');
        shortcutSpan.className = 'shortcut';
        shortcutSpan.textContent = match.shortcut;
        
        item.appendChild(commandSpan);
        item.appendChild(descSpan);
        item.appendChild(shortcutSpan);
        
        item.addEventListener('click', () => {
            commandInput.value = match.cmd;
            autocompleteDropdown.style.display = 'none';
            commandInput.focus();
        });
        
        autocompleteDropdown.appendChild(item);
    });

    autocompleteDropdown.style.display = 'block';
    selectedAutocompleteIndex = -1;
}

function processSpecialCommands(command) {
    const cmd = expandAlias(command.trim().toLowerCase());
    const parts = cmd.split(' ');
    const baseCmd = parts[0];
    
    // System commands
    if (systemResponses[baseCmd]) {
        const response = typeof systemResponses[baseCmd] === 'function' ? 
            systemResponses[baseCmd]() : systemResponses[baseCmd];
        addToOutput(`<span class="aws-output">${response}</span>`);
        return true;
    }
    
    // Help commands
    if (baseCmd === 'help') {
        const topic = parts[1];
        const helpContent = helpMessages[topic] || helpMessages.general;
        addToOutput(`<span class="aws-output">${helpContent}</span>`);
        return true;
    }
    
    // Clear command
    if (baseCmd === 'clear' || baseCmd === 'cls') {
        // Save the current clue before clearing
        const currentStage = gameStages[currentDifficulty][currentClue];
        let clueToPreserve = '';
        
        if (currentClue === 0) {
            // First clue - show the initial welcome message
            clueToPreserve = `<div class="clue">🔍 Welcome to the AWS CLI Scavenger Hunt! 🔍</div>
                <div class="aws-output">
Your mission: Navigate through AWS services using CLI commands to find hidden clues.
Each correct command will reveal the next step in your journey.

<span class="success">💡 Enhanced CLI Features:</span>
• Tab for smart auto-completion with descriptions
• ↑/↓ arrows for command history navigation
• Ctrl+L to clear screen, Ctrl+C to cancel input
• Type 'help [topic]' for contextual assistance
• Command aliases: ll, la, cls, h, q
• Realistic command execution timing

<span class="clue">Clue 1: The S3 Riddle</span>
${currentDifficulty === 'beginner' ? 
    'Three buckets hold the key, but only one contains what you seek.\nList the S3 buckets to begin your quest...' :
    currentDifficulty === 'intermediate' ?
    'Multiple buckets exist with different purposes. Some contain logs, others data.\nFind the right starting point for your investigation...' :
    currentDifficulty === 'expert' ?
    'Expert hunters use complex queries and multi-service analysis.\nBegin your security investigation...' :
    'Advanced hunters use efficient queries to navigate AWS resources.\nUse your CLI mastery to uncover the hidden path...'
}
                </div>`;
        } else if (currentClue > 0 && currentClue < gameStages[currentDifficulty].length) {
            // Show the previous clue that got us to this stage
            const previousStage = gameStages[currentDifficulty][currentClue - 1];
            if (previousStage && previousStage.nextClue) {
                clueToPreserve = `<div class="aws-output">${previousStage.nextClue}</div>`;
            }
        }
        
        // Clear and restore clue
        output.innerHTML = clueToPreserve;
        return true;
    }
    
    // History command
    if (baseCmd === 'history') {
        const historyOutput = commandHistory.map((cmd, index) => 
            `  ${index + 1}  ${cmd}`
        ).join('\n');
        addToOutput(`<span class="aws-output">${historyOutput || 'No command history available.'}</span>`);
        return true;
    }
    
    // Quit/Exit commands
    if (baseCmd === 'quit' || baseCmd === 'exit') {
        addToOutput(`<span class="success">Thanks for playing the AWS CLI Scavenger Hunt!</span>`);
        addToOutput(`<span class="aws-output">Refresh the page to start a new game.</span>`);
        commandInput.disabled = true;
        return true;
    }
    
    // Cat command for clue.txt
    if (baseCmd === 'cat' && parts[1] === 'clue.txt') {
        // This will be handled by the main game logic if clue.txt exists
        return false;
    }
    
    // Unknown system command
    if (!cmd.startsWith('aws') && !['cat', 'help', 'clear'].includes(baseCmd)) {
        addToOutput(`<span class="error">bash: ${baseCmd}: command not found</span>`);
        return true;
    }
    
    return false;
}

function checkAchievements(stats) {
    const earnedAchievements = [];
    
    Object.entries(achievements).forEach(([key, achievement]) => {
        if (achievement.check(stats)) {
            earnedAchievements.push(achievement);
        }
    });
    
    return earnedAchievements;
}

function displayCompletionStats() {
    const completionTime = Math.round((Date.now() - startTime) / 1000);
    const totalStages = gameStages[currentDifficulty].length;
    const efficiency = Math.round(((totalStages / totalAttempts) * 100));
    
    const stats = {
        completionTime,
        totalAttempts,
        efficiency,
        hintsUsed,
        difficulty: currentDifficulty
    };
    
    // Display main completion message
    addToOutput(`
<div class="congratulations">
🎉 CONGRATULATIONS! 🎉
You've successfully completed the ${currentDifficulty.toUpperCase()} AWS CLI Scavenger Hunt!

You discovered the secret code: ${
    currentDifficulty === 'expert' ? 'EXPERT_SECURITY_MASTER_2023' :
    currentDifficulty === 'advanced' ? 'CONGRATULATIONS_ADVANCED_MASTER_2023' : 
    currentDifficulty === 'intermediate' ? 'INTERMEDIATE_MASTER_2023' :
    'CONGRATULATIONS_HUNTER_2023'
}
</div>

<div class="stats-panel">
📊 Your Stats:
• Completion Time: ${completionTime} seconds
• Total Attempts: ${totalAttempts}
• Efficiency: ${efficiency}%
• Hints Used: ${hintsUsed}
• Difficulty: ${currentDifficulty.toUpperCase()}
</div>`, 'success');

    // Check and display achievements
    const earnedAchievements = checkAchievements(stats);
    earnedAchievements.forEach(achievement => {
        addToOutput(`<div class="achievement">${achievement.icon} ACHIEVEMENT: ${achievement.name}! (${achievement.description})</div>`);
    });
    
    // Add reset button
    const resetBtn = document.createElement('button');
    resetBtn.className = 'reset-button';
    resetBtn.textContent = 'Start New Hunt';
    resetBtn.onclick = resetGame;
    output.appendChild(resetBtn);
}

function processCommand(command) {
    totalAttempts++;
    
    // Add to command history
    if (command.trim() && commandHistory[commandHistory.length - 1] !== command) {
        commandHistory.push(command);
    }
    historyIndex = commandHistory.length;

    // Add user command to output with animation
    addToOutput(`<span class="prompt">user@cli-hunt:~$</span> <span class="user-input">${command}</span>`, 'slide-in');

    // Handle special commands first
    if (processSpecialCommands(command)) {
        return;
    }

    // Simulate command execution for AWS commands
    if (command.trim().startsWith('aws')) {
        simulateCommandExecution(command);
    }

    if (currentClue >= gameStages[currentDifficulty].length) {
        addToOutput('Game completed! Use the reset button to play again.', 'error');
        return;
    }

    const currentStage = gameStages[currentDifficulty][currentClue];
    let commandMatches = false;

    // Check if command matches expected command(s)
    if (Array.isArray(currentStage.expectedCommand)) {
        commandMatches = currentStage.expectedCommand.some(cmd => 
            command.trim().toLowerCase() === cmd.toLowerCase()
        );
    } else {
        commandMatches = command.trim().toLowerCase() === currentStage.expectedCommand.toLowerCase();
    }

    if (commandMatches) {
        // Correct command - reset failed attempts
        failedAttempts = 0;
        
        // Show output with slight delay
        setTimeout(() => {
            const outputDiv = document.createElement('div');
            outputDiv.className = 'command-line fade-in';
            outputDiv.innerHTML = `<span class="aws-output json-output">${currentStage.output}</span>`;
            output.appendChild(outputDiv);
            
            // Force immediate scroll to terminal body
            const terminalBody = document.querySelector('.terminal-body');
            if (terminalBody) {
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        }, 300);
        
        if (currentStage.isComplete) {
            // Game completed - show stats after delay
            setTimeout(() => displayCompletionStats(), 800);
        } else {
            // Show next clue with slight delay
            if (currentStage.nextClue) {
                setTimeout(() => {
                    const clueDiv = document.createElement('div');
                    clueDiv.className = 'command-line fade-in';
                    clueDiv.innerHTML = `<span class="aws-output">${currentStage.nextClue}</span>`;
                    output.appendChild(clueDiv);
                    
                    // Force immediate scroll to terminal body
                    const terminalBody = document.querySelector('.terminal-body');
                    if (terminalBody) {
                        terminalBody.scrollTop = terminalBody.scrollHeight;
                    }
                }, 600); // Slightly longer delay for clue to appear after output
            }
            currentClue++;
            updateProgress();
        }
    } else {
        // Incorrect command
        failedAttempts++;
        
        let errorMessage = `<span class="status-indicator status-error"></span>aws: error: argument operation: Invalid choice

<span class="success">Common AWS CLI commands for this hunt:</span>
• aws s3 ls [bucket-name]
• aws s3 cp &lt;source&gt; &lt;destination&gt;
• aws ssm get-parameter --name &lt;parameter-name&gt;
• aws iam list-attached-user-policies --user-name &lt;username&gt;
• aws iam get-policy-version --policy-arn &lt;arn&gt; --version-id &lt;version&gt;

<span class="clue">💡 Try using Tab for auto-completion or 'help' for more commands!</span>`;

        if (failedAttempts >= 3) {
            const hintBtn = document.createElement('button');
            hintBtn.className = 'hint-button';
            hintBtn.textContent = '💡 Get Hint';
            hintBtn.onclick = showHint;
            
            errorMessage += `\n\n<span class="status-indicator status-warning"></span>🤔 Having trouble? A hint is now available!`;
            addToOutput(errorMessage, 'error');
            output.appendChild(hintBtn);
        } else {
            addToOutput(errorMessage, 'error');
        }
    }
}

function resetGame() {
    currentClue = 0;
    failedAttempts = 0;
    totalAttempts = 0;
    hintsUsed = 0;
    startTime = Date.now();
    commandHistory = [];
    historyIndex = -1;
    
    const welcomeMessage = `
        <div class="clue">🔍 Welcome to the AWS CLI Scavenger Hunt! 🔍</div>
        <div class="aws-output">
Your mission: Navigate through AWS services using CLI commands to find hidden clues.
Each correct command will reveal the next step in your journey.

<span class="success">💡 Enhanced CLI Features:</span>
• Tab for smart auto-completion with descriptions
• ↑/↓ arrows for command history navigation
• Ctrl+L to clear screen, Ctrl+C to cancel input
• Type 'help [topic]' for contextual assistance
• Command aliases: ll, la, cls, h, q
• Realistic command execution timing

<span class="clue">Clue 1: The S3 Riddle</span>
${currentDifficulty === 'beginner' ? 
    'Three buckets hold the key, but only one contains what you seek.\nList the S3 buckets to begin your quest...' :
    currentDifficulty === 'intermediate' ?
    'Multiple buckets exist with different purposes. Some contain logs, others data.\nFind the right starting point for your investigation...' :
    'Advanced hunters use efficient queries to navigate AWS resources.\nUse your CLI mastery to uncover the hidden path...'
}
        </div>
    `;
    
    output.innerHTML = welcomeMessage;
    updateProgress();
    // Don't automatically focus - let user click when ready
}

// Event Listeners
commandInput.addEventListener('input', function(e) {
    showAutocomplete(e.target.value);
});

commandInput.addEventListener('keydown', function(e) {
    const dropdown = autocompleteDropdown;
    const items = dropdown.querySelectorAll('.autocomplete-item');

    if (e.key === 'Tab' && items.length > 0) {
        e.preventDefault();
        if (selectedAutocompleteIndex >= 0) {
            const selectedItem = items[selectedAutocompleteIndex];
            commandInput.value = selectedItem.querySelector('span').textContent;
        } else {
            commandInput.value = items[0].querySelector('span').textContent;
        }
        dropdown.style.display = 'none';
    } else if (e.key === 'ArrowDown' && items.length > 0) {
        e.preventDefault();
        selectedAutocompleteIndex = Math.min(selectedAutocompleteIndex + 1, items.length - 1);
        items.forEach((item, index) => {
            item.classList.toggle('selected', index === selectedAutocompleteIndex);
        });
    } else if (e.key === 'ArrowUp' && items.length > 0) {
        e.preventDefault();
        selectedAutocompleteIndex = Math.max(selectedAutocompleteIndex - 1, 0);
        items.forEach((item, index) => {
            item.classList.toggle('selected', index === selectedAutocompleteIndex);
        });
    } else if (e.key === 'ArrowUp' && dropdown.style.display === 'none') {
        // Command history - up
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            commandInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown' && dropdown.style.display === 'none') {
        // Command history - down
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            commandInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            commandInput.value = '';
        }
    } else if (e.key === 'Enter') {
        const command = commandInput.value.trim();
        if (command) {
            processCommand(command);
            commandInput.value = '';
            dropdown.style.display = 'none';
        }
    } else if (e.key === 'Escape') {
        dropdown.style.display = 'none';
        selectedAutocompleteIndex = -1;
    } else if (e.ctrlKey && e.key === 'c') {
        // Ctrl+C to cancel current input
        e.preventDefault();
        commandInput.value = '';
        dropdown.style.display = 'none';
        addToOutput(`<span class="prompt">user@cli-hunt:~$</span> <span class="user-input">^C</span>`);
    }
});

// Difficulty selector
document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentDifficulty = this.dataset.level;
        resetGame();
    });
});

// Focus input when clicking anywhere in terminal (but not aggressively)
document.querySelector('.terminal-body').addEventListener('click', function(e) {
    // Only focus if user clicked in the terminal area, not on buttons or other elements
    if (!e.target.closest('button') && !e.target.closest('.autocomplete-dropdown')) {
        commandInput.focus();
    }
});

// Hide autocomplete when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.input-container')) {
        autocompleteDropdown.style.display = 'none';
    }
});

// Only prevent blur when interacting with autocomplete
commandInput.addEventListener('blur', function(e) {
    // Only refocus if the user is interacting with autocomplete
    if (document.querySelector('.autocomplete-dropdown:hover')) {
        setTimeout(() => commandInput.focus(), 100);
    }
});

// Initialize game
updateProgress();
// Don't automatically focus - let user click when ready

// Add keyboard shortcuts (only when terminal input is focused)
commandInput.addEventListener('keydown', function(e) {
    // Ctrl+L to clear (like real terminal) but preserve current clue
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        processSpecialCommands('clear');
    }
    
    // Ctrl+R to reset game
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        resetGame();
    }
});
